// routes/api/Users.js
const express = require("express");
const router = express.Router();

// Load User model
const User = require("../../models/User");

// @route GET api/Users/test
// @description tests Users route
// @access Public
router.get("/test", (req, res) => res.send("User route testing!"));

// @route GET api/Users
// @description Get all Users
// @access Public
router.get("/", (req, res) => {
  User.find()
    .then((Users) => res.json(Users))
    .catch((err) => res.status(404).json({ noUsersfound: "No Users found" }));
});

// @route GET api/Users/:id
// @description Get single User by id
// @access Public
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((User) => res.json(User))
    .catch((err) => res.status(404).json({ noUserfound: "No User found" }));
});

// @route POST api/Users
// @description add/save User
// @access Public
router.post("/", (req, res) => {
  User.create(req.body)
    .then((User) => res.json({ msg: "User added successfully" }))
    .catch((err) => res.status(400).json({ error: "Unable to add this User" }));
});

// @route PUT api/Users/:id
// @description Update User
// @access Public
router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((User) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route DELETE api/Users/:id
// @description Delete User by id
// @access Public
router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, req.body)
    .then((User) => res.json({ mgs: "User entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a User" }));
});

module.exports = router;
