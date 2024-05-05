import { nanoid } from "nanoid";
import URL from "../models/url.model.js";

export async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "URL is required" });
    const shortID = nanoid(8);
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });

    return res.status(201).json({ Id: shortID });
}

export async function handleGetShortURL(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamps: Date.now(),
                },
            },
        }
    );

    res.redirect(entry.redirectURL);
}

export async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}
