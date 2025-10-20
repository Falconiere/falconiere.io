#!/usr/bin/env node
// One-way sync from existing symlink targets into the repo so Git can track files.
// It detects if `src/data/assets` and `src/data/blog/posts` are symlinks, reads
// their targets (your Obsidian vault paths), removes the symlink, and copies
// the files into real directories inside the repo.

import fs from 'node:fs/promises';
import fssync from 'node:fs';
import path from 'node:path';

const REPO_ROOT = path.resolve(process.cwd());

const TARGETS = [
  path.join(REPO_ROOT, 'src/data/assets'),
  path.join(REPO_ROOT, 'src/data/blog/posts'),
];

const DEFAULT_IGNORES = new Set([
  '.DS_Store',
  '.ds_store',
  '.git',
  '.obsidian',
]);

async function readAssetIgnores(rootDir) {
  const ignoreFile = path.join(rootDir, '.assetsignore');
  try {
    const raw = await fs.readFile(ignoreFile, 'utf8');
    const lines = raw
      .split(/\r?\n/)
      .map(l => l.trim())
      .filter(l => !!l && !l.startsWith('#'));
    return new Set(lines);
  } catch {
    return new Set();
  }
}

function shouldIgnore(name, extraIgnores) {
  const lower = name.toLowerCase();
  if (DEFAULT_IGNORES.has(lower)) return true;
  if (extraIgnores && (extraIgnores.has(name) || extraIgnores.has(lower)))
    return true;
  return false;
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function emptyDir(p) {
  try {
    const entries = await fs.readdir(p, { withFileTypes: true });
    await Promise.all(
      entries.map(async ent => {
        const cur = path.join(p, ent.name);
        await fs.rm(cur, { recursive: true, force: true });
      })
    );
  } catch (err) {
    if ((err?.code ?? '') !== 'ENOENT') throw err;
  }
}

async function copyRecursive(src, dest, extraIgnores) {
  const stat = await fs.stat(src);
  if (stat.isDirectory()) {
    await ensureDir(dest);
    const entries = await fs.readdir(src, { withFileTypes: true });
    for (const ent of entries) {
      if (shouldIgnore(ent.name, extraIgnores)) continue;
      const s = path.join(src, ent.name);
      const d = path.join(dest, ent.name);
      if (ent.isDirectory()) {
        await copyRecursive(s, d, extraIgnores);
      } else if (ent.isSymbolicLink()) {
        // Resolve and copy the contents the symlink points to
        const target = await fs.readlink(s);
        const abs = path.isAbsolute(target)
          ? target
          : path.resolve(path.dirname(s), target);
        await copyRecursive(abs, d, extraIgnores);
      } else if (ent.isFile()) {
        await fs.copyFile(s, d);
      }
    }
  } else if (stat.isFile()) {
    await ensureDir(path.dirname(dest));
    await fs.copyFile(src, dest);
  }
}

async function migrateSymlinkFolder(repoPath) {
  const rel = path.relative(REPO_ROOT, repoPath);
  let lst;
  try {
    lst = await fs.lstat(repoPath);
  } catch {
    console.error(`Path not found: ${rel}`);
    return;
  }
  if (!lst.isSymbolicLink()) {
    console.log(`Skipping ${rel}: not a symlink (already a real folder).`);
    return;
  }
  const linkTarget = await fs.readlink(repoPath);
  const absSource = path.isAbsolute(linkTarget)
    ? linkTarget
    : path.resolve(path.dirname(repoPath), linkTarget);

  // Validate source exists
  if (!fssync.existsSync(absSource)) {
    console.error(`Source does not exist for ${rel}: ${absSource}`);
    return;
  }

  console.log(`Importing from: ${absSource}`);
  const ignores = await readAssetIgnores(REPO_ROOT);

  // Remove the symlink and create a real directory
  await fs.rm(repoPath, { force: true });
  await ensureDir(repoPath);
  await emptyDir(repoPath);
  await copyRecursive(absSource, repoPath, ignores);
  console.log(`Done: ${rel} now contains real files tracked by Git.`);
}

async function main() {
  for (const p of TARGETS) {
    await migrateSymlinkFolder(p);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
