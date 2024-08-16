const path = require("path");
const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const app = express();
const PORT = 8000;

const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// app.use(express.json()); // parse json data
app.use(express.urlencoded({ extended: false })); // parse form data coming from frontend

app.get("/", (req, res) => {
    return res.render("homepage");
});

app.post("/upload", upload.single("image"), (req, res) => {
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/");
});

app.listen(PORT, () => console.log("Server Started at PORT 8000"));
