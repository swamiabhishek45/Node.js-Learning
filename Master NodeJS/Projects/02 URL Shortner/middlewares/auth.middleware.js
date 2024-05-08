import { getUser } from "../services/auth.js";

export function checkForAuth(req, res, next) {
    // const authHeaderVal = req.headers["authorization"];
    const tokenCookie = req.cookies?.token;
    req.user = null;

    if (!tokenCookie) return next();

    // const token = authHeaderVal.split("Bearer ")[1];
    const user = getUser(tokenCookie);

    req.user = user;
    return next();
}


export function restrictTo(roles){
    return function(req, res, next){
        if(!req.user) return res.redirect('/login');

        if(!roles.includes(req.user.role)) return res.end("Unauthorized!!");

        next();
    }
}

// export async function restrictToLoggedinUserOnly(req, res, next) {
//     // const userUid = req.cookies?.uid;

//     const userUid = req.headers["Authorization"]; // "Bearer 32fdkjfnh234xcc3rn3"
//     if (!userUid) return res.redirect("/login");

//     const token = userUid.split("Bearer ")[1]; // ["", "32fdkjfnh234xcc3rn3"]
//     // const user = getUser(userUid); // cookie

//     const user = getUser(token);
//     if (!user) return res.redirect("/login");

//     req.user = user;
//     next();
// }

// export async function checkAuth(req, res, next) {
//     console.log(req.headers);
//     const userUid = req.headers["authorization"]; // "Bearer 32fdkjfnh234xcc3rn3"
//     const token = userUid.split("Bearer ")[1];

//     const user = getUser(token);

//     req.user = user;
//     next();
// }
