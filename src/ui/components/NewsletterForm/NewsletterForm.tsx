"use client";

import { submitWelcomeEmailForNewsLetterSignup } from "@/server-actions/email";
import { isValidateEmail } from "@/utils/email";
import { useState } from "react";
const errorOnSignUp =
  "Your e-mail address is invalid or you are already subscribed!";

const NewsletterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitWelcomeEmailForNewsLetterSignup(email as string);
      setEmail("");
      setHasSubscribed(true);
    } catch {
      setError(errorOnSignUp);
    }
    setIsSubmitting(false);
  };

  const validateEmailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // get input
    // set error state if not valid
    setError(
      email && isValidateEmail(email) ? "" : "Your e-mail address is invalid"
    );
  };

  const isDisabled =
    !email || (email && !isValidateEmail(email)) || isSubmitting;

  return (
    <form className="flex flex-col gap-2 w-full max-w-[500px]">
      <div className="grid  gap-2">
        <div className="grid gap-2">
          <label htmlFor="email" className="sm:text-left">
            Subscribe to the newsletter
          </label>
          <div className="grid  sm:grid-cols-[auto,max-content] gap-2 w-full">
            <input
              placeholder={
                !hasSubscribed ? "Enter your email" : "You're subscribed !  🎉"
              }
              name="email"
              type="email"
              className="bg-gray-800 border-pink-500 dark:focus:border-pink-400 border-2 rounded p-2 outline-none w-full"
              onBlur={validateEmailOnChange}
              onFocus={() => setError(undefined)}
              onChange={(e) => setEmail(e.currentTarget.value)}
              value={email}
            />
            <button
              className="bg-pink-500 dark:hover:bg-pink-400 p-2 min-w-[120px] rounded"
              disabled={isDisabled}
              type="button"
              onClick={handleSubmit}
            >
              {isSubmitting ? "Submitting..." : "Sign up"}
            </button>
          </div>
          <span className="text-red-400 text-sm sm:text-left">{error}</span>
        </div>
      </div>
    </form>
  );
};

export { NewsletterForm };
