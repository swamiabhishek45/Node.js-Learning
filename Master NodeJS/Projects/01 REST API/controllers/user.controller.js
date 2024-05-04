const User = require("../models/user.model");

const handleGetAllUsers = async (req, res) => {
    // custom header
    // res.setHeader("myName", "Abhishek");

    const allDBusers = await User.find({});
    return res.json(allDBusers);
};

const getUserById = async (req, res) => {
    const user = User.findById(req.param.id);
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json(user);
};

const updateUserById = async (req, res) => {
    // Update an existing User
    await User.findByIdAndUpdate(req.params.id, { lastName: "Kumar" });
    res.json({ status: "Updated" });
};

const deleteUserById = async (req, res) => {
    // Delete the specified user
    await User.findByIdAndDelete(req.params.id);
    res.json({ status: "Deleted" });
};

const createNewUser = async (req, res) => {
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

    res.status(201).json({ msg: "User successfully created", id: result._id });
};

module.exports = {
    handleGetAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    createNewUser,
};
