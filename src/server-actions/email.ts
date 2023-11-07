"use server"
import { Resend } from 'resend';
import { saveEmailFromNewsLetterSignup } from './supabase';
import { join } from 'path';
import { readFileSync } from 'fs';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig()
const getHtmlPath = (dir: string) => join(serverRuntimeConfig.PROJECT_ROOT, dir);
const submitWelcomeEmailForNewsLetterSignup = async (email: string) => {
  const html = readFileSync(getHtmlPath('src/email/templates/welcome.html'), 'utf8');
  await saveEmailFromNewsLetterSignup(email);
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: 'hello@falconiere.io',
    to: email,
    subject: 'NewsLetter Signup',
    html
  });
}

export { submitWelcomeEmailForNewsLetterSignup }