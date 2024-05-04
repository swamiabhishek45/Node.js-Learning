const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");

const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

// MongoDB Connection
mongoose
    .connect("mongodb://127.0.0.1:27017/nodejs")
    .then(() => {
        console.log("MongoDB Connected!!!");
    })
    .catch((err) => {
        console.log("MongoDB Connnection Error!!", err);
    });

// Schema
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        gender: {
            type: String,
        },
        jobTitle: {
            type: String,
        },
    },
    { timestamps: true }
);

// Model
const User = mongoose.model("user", userSchema);

// Middleware
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies (with support for arrays)

app.use((req, res, next) => {
    fs.appendFile(
        "log.txt",
        `${Date.now()}: ${req.method} - ${req.path} \n`,
        (err, data) => {
            next();
        }
    );
});

// Routes
app.get("/", (req, res) => {
    res.send("HI");
});

app.get("/api/users", (req, res) => {
    // custom header
    res.setHeader("myName", "Abhishek");
    return res.json(users);
});

app.get("/users", async(req, res) => {
    const allDBusers = await User.find({});
    const html = `
    <h1>All Users First Name</h1>
    <ul>
        ${allDBusers.map((user) => `<li>${user.firstName}</li>`).join("")}
    </ul>
    `;

    res.send(html);
});

app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        if (!user) return res.status(404).json({ error: "Not found" });
        res.json(user);
    })
    .patch((req, res) => {
        // Update an existing User
        const body = req.body;
        users.push({ ...body });

        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
            res.json({ status: "Updated", id: users.id });
        });
    })
    .delete((req, res) => {
        // Delete the specified user
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
            res.json({ status: "Deleted" });
        });
    });

app.post("/api/users", async (req, res) => {
    // Create a new User
    const body = req.body;

    if (!body || !body.email) {
        return res.status(400).json({ error: "Missing email" });
    }

    const result = User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });
    console.log("result", result);

    res.status(201).json({ msg: "User successfully created" });
});

app.listen(PORT, console.log(`Server is listening on PORT ${PORT}`));
