import User from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../services/auth.js";

export async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    });

    return res.redirect("/");
}
export async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
        password,
    });

    if (!user)
        return res.render("login", {
            error: "Invalid username or password",
        });

    const token = setUser(user);
    res.cookie('token', token);
    return res.redirect("/");
}
