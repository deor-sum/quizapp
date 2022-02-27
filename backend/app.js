require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8082;
const express = require("express");
const cors = require("cors");

// Connect Database
const connectDB = require("./db/dbconn");
connectDB();

//Express Init
const app = express();
const authVerify = require("./middleware/auth");

//Cors Setting
const corsOption = { origin: true, credentials: true };
app.use(cors(corsOption));
app.use(express.json());

//Routes
const auth = require("./routes/auth.route");
const users = require("./routes/users.route");
const question = require("./routes/question.route");

// use Routes
const prefix = "/api/v1/";
app.use(prefix, auth);
app.use(prefix + "users", users);
app.use(prefix + "questions", question);
app.get("/", (req, res) => res.send("Hello Deo!"));

app.post("/home", authVerify, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});
app.listen(port, () => console.log(`Server running on port ${port}`));
