"use server"
import { Resend } from 'resend';
import { saveEmailFromNewsLetterSignup } from './supabase';
import { readFileSync } from 'fs';


const submitWelcomeEmailForNewsLetterSignup = async (email: string) => {
  const html = readFileSync('src/email/templates/welcome.html', 'utf8');
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