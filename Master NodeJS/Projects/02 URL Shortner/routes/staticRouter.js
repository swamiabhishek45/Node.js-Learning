import express from "express";
import URL from "../models/url.model.js";
import USER from "../models/user.model.js";
import { restrictTo } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
    const allurls = await URL.find({});
    return res.render("home", {
        urls: allurls,
    })
});

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    // if(!req.user) return res.redirect('/login');
    // Find all URL's according to given condition
    const allurls = await URL.find({ createdBy: req.user._id });
console.log("Allurls", allurls);
    const userInfo = await USER.find({});
    console.log("userinfo", userInfo);
    return res.render("home", {
        urls: allurls,
        user: userInfo,
    });
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});
router.get("/login", (req, res) => {
    return res.render("login");
});

export default router;
