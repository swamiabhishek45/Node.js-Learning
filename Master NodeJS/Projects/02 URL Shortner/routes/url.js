import express from "express";
import {
    handleGenerateNewShortURL,
    handleGetShortURL,
    handleGetAnalytics,
} from "../controllers/url.controller.js";

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/:shortId", handleGetShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

export default router;
