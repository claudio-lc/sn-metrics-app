import express from "express";
import pool from "./pool";
import { Metric } from "common/interfaces";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

app.get("/api/getAllMetrics", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM metrics");
    res.send(result.rows);
  } catch (err) {
    next(err);
  }
});

app.put("/api/addMetric", async (req, res, next) => {
  try {
    const { snowQuality, occupation, windSpeed }: Metric = req.body;
    const result = await pool.query(
      "INSERT INTO metrics (snow_quality, occupation, wind_speed) VALUES ($1, $2, $3)",
      [snowQuality, occupation, windSpeed]
    );
    res.send({ success: result.rowCount === 1 });
  } catch (err) {
    next(err);
  }
});

app.delete("/api/deleteMetric", async (req, res, next) => {
  try {
    const { id } = req.body;
    const result = await pool.query("DELETE FROM metrics WHERE id = $1", [id]);
    res.send({ success: result.rowCount === 1 });
  } catch (err) {
    next(err);
  }
});

// Global error handler middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Server error" });
  }
);