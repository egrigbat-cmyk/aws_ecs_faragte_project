const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "appuser",
  password: process.env.DB_PASSWORD || "apppassword",
  database: process.env.DB_NAME || "fargatedb"
});

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.json({
      status: "healthy",
      database: "connected"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "unhealthy",
      database: "disconnected"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
