import nodemailer from "nodemailer";

let cachedTransporter = null;

export function createMailer() {
  if (cachedTransporter) return cachedTransporter;

  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE || "true") === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return cachedTransporter;
}

/**
 * Convenience named export for code that does:
 *   import { sendMail } from "./mailer.js"
 */
export async function sendMail(options) {
  const transporter = createMailer();
  return transporter.sendMail(options);
}
