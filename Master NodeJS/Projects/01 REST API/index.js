const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();

const PORT = 8000;

// Routes
app.get("/", function (req, res) {
    res.send("HI");
});

app.get("/api/users", (req, res) => {
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

        res.json(user);
    })
    .post((req, res) => {
        // Create a new User
        res.send({ ststus: "Created" });
    })
    .patch((req, res) => {
        // Update an existing User
        res.send({ status: "Updated" });
    })
    .delete((req, res) => {
        // Delete the specified user
        res.send({ ststus: "Deleted" });
    });

app.listen(PORT, console.log(`Server is listening on PORT ${PORT}`));
