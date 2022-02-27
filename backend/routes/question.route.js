const router = require("express").Router();

const questionCtrl = require("./../controllers/question.ctrl");

// @route GET api/Users
// @description Get all Users
// @access Public
router.get("/", questionCtrl.all);

// @route GET api/Users/:id
// @description Get single User by id
// @access Public
router.get("/:id", questionCtrl.getById);

// @route POST api/Users
// @description add/save User
// @access Public
router.post("/", questionCtrl.create);

// @route PUT api/Users/:id
// @description Update User
// @access Public
router.put("/:id", questionCtrl.update);

// @route DELETE api/Users/:id
// @description Delete User by id
// @access Public
router.delete("/:id", questionCtrl.destroy);

module.exports = router;
