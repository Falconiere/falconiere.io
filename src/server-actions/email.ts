"use server"
import { Resend } from 'resend';
import { saveEmailFromNewsLetterSignup } from './supabase';
import welcome from '@/templates/welcome';
const submitWelcomeEmailForNewsLetterSignup = async (email: string) => {
  await saveEmailFromNewsLetterSignup(email);
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: 'hello@falconiere.io',
    to: email,
    subject: 'NewsLetter Signup',
    html:welcome
  });
}

export { submitWelcomeEmailForNewsLetterSignup }