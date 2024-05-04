const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();

const PORT = 8000;

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

app.get("/users", (req, res) => {
    const html = `
    <h1>All Users First Name</h1>
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
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

app.post("/api/users", (req, res) => {
    // Create a new User
    const body = req.body;

    if (!body || !body.email) {
        return res.status(400).json({ error: "Missing email" });
    }
    // console.log("Body", body);
    users.push({
        id: users.length + 1,
        ...body,
    });

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        res.status(201).json({ status: "Created", id: users.length });
    });
});

app.listen(PORT, console.log(`Server is listening on PORT ${PORT}`));
