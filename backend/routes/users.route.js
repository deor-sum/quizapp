const router = require("express").Router();

const userCtrl = require("./../controllers/user.ctrl");

// @route GET api/Users
// @description Get all Users
// @access Public
router.get("/", userCtrl.all);

// @route GET api/Users/:id
// @description Get single User by id
// @access Public
router.get("/:id", userCtrl.getById);

// @route POST api/Users
// @description add/save User
// @access Public
router.post("/", userCtrl.create);

// @route PUT api/Users/:id
// @description Update User
// @access Public
router.put("/:id", userCtrl.update);

// @route DELETE api/Users/:id
// @description Delete User by id
// @access Public
router.delete("/:id", userCtrl.destroy);

module.exports = router;
