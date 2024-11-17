"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pool_1 = __importDefault(require("./pool"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
app.get("/api/getAllMetrics", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool_1.default.query("SELECT * FROM metrics");
        res.send(result.rows);
    }
    catch (err) {
        next(err);
    }
}));
app.put("/api/addMetric", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { snowQuality, occupation, windSpeed, date } = req.body;
        const result = yield pool_1.default.query("INSERT INTO metrics (snow_quality, occupation, wind_speed, date) VALUES ($1, $2, $3, $4) RETURNING id", [snowQuality.toLowerCase(), occupation, windSpeed, date]);
        res.send({ id: result.rows[0].id });
    }
    catch (err) {
        next(err);
    }
}));
app.delete("/api/deleteMetric", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const result = yield pool_1.default.query("DELETE FROM metrics WHERE id = $1", [id]);
        res.send({ success: result.rowCount === 1 });
    }
    catch (err) {
        next(err);
    }
}));
// Global error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Server error" });
});
