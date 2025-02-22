import type { CollectionEntry } from "astro:content";

type Post = CollectionEntry<"blog">;

export const sortByDate = (a: Post, b: Post) => {
	const dateA = new Date(a.data.date).getTime();
	const dateB = new Date(b.data.date).getTime();
	return dateB - dateA;
};
