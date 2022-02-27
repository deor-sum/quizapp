const User = require("./../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    // Get user input
    const { name, email, password } = req.body;

    // Validate user input
    if (!(email && password && password)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const isUserExist = await User.findOne({ email });

    if (isUserExist)
      return res.status(409).send("User Already Exist. Please Login");

    //Encrypt password
    let encryptedPassword = await bcrypt.hashSync(password, 10);

    // Create user
    const user = await User.create({
      name: name,
      email: email,
      password: encryptedPassword,
    });

    // Create jwt-token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: process.env.TOKEN_KEY_EXPIRED,
      }
    );
    // save user token
    user.token = token;
    user.save();
    // return new user
    res.status(201).json({ status: "register berhasil", user });
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password))
      return res.status(400).send("All input is required");

    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (!user) return res.status(400).send("Invalid User Credentials");

    if (user && (await bcrypt.compareSync(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: process.env.TOKEN_KEY_EXPIRED,
        }
      );

      // save user token
      user.token = token;
      user.save();

      // user
      res.status(200).json({ status: "Login Berhasil", user });
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};

const all = (req, res) => {
  User.find()
    .then((Users) => res.json(Users))
    .catch((err) => res.status(404).json({ noUsersfound: "No Users found" }));
};

const getById = (req, res) => {
  User.findById(req.params.id)
    .then((User) => res.json(User))
    .catch((err) => res.status(404).json({ noUserfound: "No User found" }));
};

const create = (req, res) => {
  User.create(req.body)
    .then((User) => res.json({ User, msg: "User added successfully" }))
    .catch((err) => res.status(400).json({ error: "Unable to add this User" }));
};

const update = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((User) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
};

const destroy = (req, res) => {
  User.findByIdAndRemove(req.params.id, req.body)
    .then((User) => res.json({ mgs: "User entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a User" }));
};

module.exports = { register, login, all, getById, create, update, destroy };
