import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { initDb } from "./db.js";
import { createMailer } from "./mailer.js";

dotenv.config();

const app = express();
app.use(express.json());

// Frontend runs on Vite usually: http://localhost:5173
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:8080", "http://localhost:8081"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

const TEAM_NOTIFY_EMAIL = process.env.TEAM_NOTIFY_EMAIL;
const APP_BASE_URL = process.env.APP_BASE_URL || "http://localhost:5173";
const SERVER_BASE_URL = process.env.SERVER_BASE_URL || `http://localhost:${PORT}`;

const isGmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(String(email || "").trim());

const normalizeUSPhone = (value) => {
  const digits = String(value || "").replace(/\D/g, "");
  const ten = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (ten.length !== 10) return null;
  return `+1${ten}`;
};

const signToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

const db = await initDb();
const mailer = createMailer();

app.get("/health", (_, res) => res.json({ ok: true }));

/**
 * SIGNUP: creates a PENDING account
 * - emails your team with details
 * - tells user "activation in progress"
 */
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, confirmPassword } = req.body || {};

    if (!firstName || !lastName) return res.status(400).json({ message: "First/Last name required" });
    if (!isGmail(email)) return res.status(400).json({ message: "Email must be a valid @gmail.com address" });

    const phoneNorm = normalizeUSPhone(phone);
    if (!phoneNorm) return res.status(400).json({ message: "Enter a valid US phone number" });

    if (!password || password.length < 6)
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const existing = await db.get("SELECT id FROM users WHERE email = ?", [email.trim().toLowerCase()]);
    if (existing) return res.status(400).json({ message: "Account already exists. Please login." });

    const hash = await bcrypt.hash(password, 10);

    // Create a pending user (activated=0)
    const result = await db.run(
      `INSERT INTO users (firstName, lastName, email, phone, passwordHash, activated)
       VALUES (?, ?, ?, ?, ?, 0)`,
      [firstName.trim(), lastName.trim(), email.trim().toLowerCase(), phoneNorm, hash]
    );

    const userId = result.lastID;

    // approval token (team clicks)
    const approveToken = signToken({ type: "approve", userId });

    const approveLink = `${SERVER_BASE_URL}/api/auth/approve?token=${encodeURIComponent(approveToken)}`;

    // email TEAM
    if (TEAM_NOTIFY_EMAIL) {
      await mailer.sendMail({
        from: process.env.MAIL_FROM || process.env.SMTP_USER,
        to: TEAM_NOTIFY_EMAIL,
        subject: "New account request (activation needed)",
        html: `
          <h2>New Account Request</h2>
          <p><b>Name:</b> ${firstName} ${lastName}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phoneNorm}</p>
          <p><b>Approve link:</b> <a href="${approveLink}">${approveLink}</a></p>
        `,
      });
    }

    // email USER (verification link)
    await mailer.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: email.trim().toLowerCase(),
      subject: "True Grade Transport - Verify your email to activate your account",
      html: `
        <p>Hi ${firstName},</p>
        <p>Please click the link below to activate your account:</p>
        <p><a href="${approveLink}">Activate account</a></p>
        <p>If you did not request this, you can ignore this email.</p>
      `,
    });

    return res.json({ message: "ACTIVATION_IN_PROGRESS" });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * APPROVE: team clicks link, activates user, emails user that they can login
 */
app.get("/api/auth/approve", async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) return res.status(400).send("Missing token");

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch {
      return res.status(400).send("Invalid/expired token");
    }

    if (payload?.type !== "approve" || !payload?.userId) return res.status(400).send("Bad token");

    const user = await db.get("SELECT * FROM users WHERE id = ?", [payload.userId]);
    if (!user) return res.status(404).send("User not found");

    if (user.activated) {
      return res.redirect(`${APP_BASE_URL}/login?approved=1`);
    }

    await db.run("UPDATE users SET activated = 1 WHERE id = ?", [payload.userId]);

    // notify user
    await mailer.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: user.email,
      subject: "True Grade Transport - Account activated",
      html: `
        <p>Your account has been activated. You can now login.</p>
        <p><a href="${APP_BASE_URL}/login">Login</a></p>
      `,
    });

    return res.redirect(`${APP_BASE_URL}/login?approved=1`);
  } catch (err) {
    console.error("APPROVE ERROR:", err);
    return res.status(500).send("Server error");
  }
});

/**
 * LOGIN: requires activated user
 */
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, phone, password } = req.body || {};
    if (!isGmail(email)) return res.status(400).json({ message: "Email must be @gmail.com" });

    const phoneNorm = normalizeUSPhone(phone);
    if (!phoneNorm) return res.status(400).json({ message: "Enter a valid US phone number" });

    const user = await db.get("SELECT * FROM users WHERE email = ?", [email.trim().toLowerCase()]);
    if (!user) return res.status(401).json({ message: "Incorrect details" });

    if (!user.activated) {
      return res.status(403).json({ message: "Account not activated yet. Please wait for approval." });
    }

    const ok = await bcrypt.compare(password || "", user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Incorrect details" });

    // phone must match the stored phone too
    if (user.phone !== phoneNorm) return res.status(401).json({ message: "Incorrect details" });

    const token = signToken({ userId: user.id, email: user.email });
    return res.json({ token });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * ORDER: inserts into orders table (MATCHES db.js schema)
 * and emails TEAM with order details
 */
app.post("/api/orders", auth, async (req, res) => {
  try {
    const { fuelType, gallons, stationName, address, dateTime, notes } = req.body || {};

    const fuel = String(fuelType || "").trim();
    const allowed = ["Regular", "Ultra", "Diesel"];
    if (!allowed.includes(fuel)) {
      return res.status(400).json({ message: "Invalid fuel type" });
    }

    const g = Number(gallons);
    if (!Number.isFinite(g) || g <= 0) return res.status(400).json({ message: "Gallons must be a number > 0" });

    if (!stationName?.trim() || !address?.trim()) {
      return res.status(400).json({ message: "Station name/address required" });
    }
    if (!dateTime || !String(dateTime).trim()) {
  return res.status(400).json({ message: "Preferred date & time required" });
  }


    await db.run(
      `INSERT INTO orders (fuelType, gallons, stationName, address, dateTime, notes, userId)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        fuel,
        g,
        stationName.trim(),
        address.trim(),
        (dateTime || "").trim(),
        (notes || "").trim(),
        req.user.userId,
      ]
    );

    if (TEAM_NOTIFY_EMAIL) {
      await mailer.sendMail({
        from: process.env.MAIL_FROM || process.env.SMTP_USER,
        to: TEAM_NOTIFY_EMAIL,
        subject: "New Fuel Order Request",
        html: `
          <h2>New Fuel Order</h2>
          <p><b>User:</b> ${req.user.email}</p>
          <p><b>Fuel Type:</b> ${fuel}</p>
          <p><b>Gallons:</b> ${g}</p>
          <p><b>Station Name:</b> ${stationName}</p>
          <p><b>Station Address:</b> ${address}</p>
          <p><b>Preferred Date/Time:</b> ${dateTime || "-"}</p>
          <p><b>Notes:</b> ${notes || "-"}</p>
          <p>Please reply to the customer with confirmation.</p>
        `,
      });
    }

    return res.json({ message: "ORDER_RECEIVED" });
  } catch (err) {
    console.error("ORDER ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Auth server running on http://localhost:${PORT}`));