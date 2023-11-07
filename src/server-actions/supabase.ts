"use server"
import { isValidateEmail } from "@/utils/email"
import pg from "pg"

const dbClient = async ()=> {
  const client = new pg.Client(process.env.SUPABASE_URL)
  await client.connect()
  return client
}

const saveEmailFromNewsLetterSignup = async (email: string) => {
  // validate email
  if (!isValidateEmail(email)) {
    throw new Error('Email is required')
  }
  const db = await dbClient()
  await db.query("INSERT INTO newsletter_subscribers (email) VALUES ($1)", [email])
  await db.end()
};

export {  saveEmailFromNewsLetterSignup }