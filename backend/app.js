require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/dbconn");
const corsOption = { origin: true, credentials: true };
const port = process.env.PORT || 8082;

//Routes
const books = require("./routes/api/books");

// Connect Database
connectDB();

//Express Init
const app = express();

//Cors Setting
app.use(cors(corsOption));
app.use(express.json());

app.get("/", (req, res) => res.send("Hello Deo!"));

// use Routes
app.use("/api/books", books);

app.listen(port, () => console.log(`Server running on port ${port}`));
