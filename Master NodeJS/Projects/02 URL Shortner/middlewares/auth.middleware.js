import { getUser } from "../services/auth.js";

export async function restrictToLoggedinUserOnly(req, res, next) {
    // const userUid = req.cookies?.uid;

    const userUid = req.headers["Authorization"]; // "Bearer 32fdkjfnh234xcc3rn3"
    if (!userUid) return res.redirect("/login");

    const token = userUid.split("Bearer ")[1]; // ["", "32fdkjfnh234xcc3rn3"]
    // const user = getUser(userUid); // cookie

    const user = getUser(token);
    if (!user) return res.redirect("/login");

    req.user = user;
    next();
}

export async function checkAuth(req, res, next) {
    console.log(req.headers);
    const userUid = req.headers["authorization"]; // "Bearer 32fdkjfnh234xcc3rn3"
    const token = userUid.split("Bearer ")[1];

    const user = getUser(token);

    req.user = user;
    next();
}
