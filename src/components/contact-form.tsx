"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRightIcon, CheckIcon } from "./icons";
import { buildContactEmail } from "@/lib/catalog.mjs";
import { supportEmail } from "@/lib/data";

export function ContactForm() {
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const recipient = draft ? new URL(draft).pathname : supportEmail;
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = buildContactEmail({
      name: String(data.get("name")),
      email: String(data.get("email")),
      topic: String(data.get("topic")),
      message: String(data.get("message")),
    });
    setDraft(email);
    setCopied(false);
    setCopyError(false);
    window.location.href = email;
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(recipient);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      onChange={() => setDraft("")}
    >
      <h2>A note to the studio</h2>
      <p>Tell us what’s on your mind.</p>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="contact-name">Your name</label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            required
            maxLength={100}
          />
        </div>
        <div className="form-field">
          <label htmlFor="contact-email">Email address</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            maxLength={254}
          />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="contact-topic">What’s this about?</label>
        <select id="contact-topic" name="topic">
          <option>Game support</option>
          <option>App support</option>
          <option>Feedback & ideas</option>
          <option>Press & collaboration</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="contact-message">Your message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Include the product name and a few details so we can help."
          required
          minLength={10}
          maxLength={3000}
        />
      </div>
      <p className="form-help" id="email-help">
        This opens a draft in your email app. Review it and press Send there.
        Your message is not stored on this website.
      </p>
      <button
        className="button button-primary"
        type="submit"
        aria-describedby="email-help"
      >
        Prepare email
        <ArrowUpRightIcon size={19} />
      </button>
      {draft && (
        <div className="draft-status" role="status">
          <CheckIcon size={20} />
          <div>
            <strong>Your draft is ready.</strong>
            <p>
              If your email app didn’t open, <a href={draft}>open the draft</a>{" "}
              or email <a href={`mailto:${recipient}`}>{recipient}</a> directly.
            </p>
            <button type="button" className="text-link" onClick={copyEmail}>
              {copied ? "Address copied" : "Copy email address"}
            </button>
            {copyError && <p>Select and copy the email address above.</p>}
          </div>
        </div>
      )}
    </form>
  );
}
