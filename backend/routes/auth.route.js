const router = require("express").Router();

const userCtrl = require("./../controllers/user.ctrl");

// @route POST api/register
// @description register new user
// @access Public
router.post("/register", userCtrl.register);

// @route POST api/login
// @description login user
// @access Public
router.post("/login", userCtrl.login);

module.exports = router;
