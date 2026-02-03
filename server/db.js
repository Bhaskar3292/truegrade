import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function initDb() {
  const db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });

  // USERS (match server/index.js which uses "activated")
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT NOT NULL,
      passwordHash TEXT NOT NULL,
      activated INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // MIGRATION: add activated if an old table exists without it
  const userCols = await db.all(`PRAGMA table_info(users)`);
  const hasActivated = userCols.some((c) => c.name === "activated");
  const hasCreatedAt = userCols.some((c) => c.name === "createdAt");

  if (!hasActivated) {
    await db.exec(`ALTER TABLE users ADD COLUMN activated INTEGER NOT NULL DEFAULT 0;`);
  }
  if (!hasCreatedAt) {
    await db.exec(`ALTER TABLE users ADD COLUMN createdAt TEXT NOT NULL DEFAULT (datetime('now'));`);
  }

  // ORDERS (createdAt must exist + dateTime should be required if you want it)
  await db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      fuelType TEXT NOT NULL,
      gallons INTEGER NOT NULL,
      stationName TEXT NOT NULL,
      address TEXT NOT NULL,
      dateTime TEXT NOT NULL,
      notes TEXT,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY(userId) REFERENCES users(id)
    );
  `);

  // MIGRATION: if old orders table exists but missing createdAt
  const orderCols = await db.all(`PRAGMA table_info(orders)`);
  const hasOrderCreatedAt = orderCols.some((c) => c.name === "createdAt");
  if (!hasOrderCreatedAt) {
    await db.exec(`ALTER TABLE orders ADD COLUMN createdAt TEXT NOT NULL DEFAULT (datetime('now'));`);
  }

  return db;
}
