import express, { response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "./db.js";
import authenticateUser from "./authMiddleware.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("<h1>Welcome</h1>");
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
      [username, hashedPassword]
    );
    res.json({ message: "User registered successfully", userId: result.rows[0].id });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (result.rows.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

router.post("/sleep/start", authenticateUser, async (req, res) => {
  const userId = req.user.userId;
  try {
    const result = await pool.query(
      "INSERT INTO sleep_records (user_id, start_time) VALUES ($1, NOW()) RETURNING *",
      [userId]
    );
    res.json({ message: "Sleep started", record: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Error starting sleep" });
  }
});

router.post("/sleep/end", authenticateUser, async (req, res) => {
  const userId = req.user.userId;
  try {
    const result = await pool.query(
      "UPDATE sleep_records SET end_time = NOW(), duration = EXTRACT(EPOCH FROM (NOW() - start_time)) / 3600 WHERE user_id = $1 AND end_time IS NULL RETURNING *",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "No active sleep session found" });
    }

    res.json({ message: "Sleep ended", record: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Error ending sleep" });
  }
});

router.get("/sleep/today", authenticateUser, async (req, res) => {
  const userId = req.user.userId;
  try {
    const result = await pool.query(
      "SELECT COALESCE(SUM(duration), 0) AS total_sleep FROM sleep_records WHERE user_id = $1 AND start_time >= CURRENT_DATE",
      [userId]
    );
    const totalSleep = result.rows.length ? result.rows[0].total_sleep || 0 : 0;
    res.json({ total_sleep: totalSleep });
  } catch (error) {
    res.status(500).json({ error: "Error fetching sleep data" });
  }
});

export default router;
