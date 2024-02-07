const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// routes
const userRoutes = require("./routes/user.routes");

const app = express();
const port = process.env.PORT;

app.use(bodyparser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ Success: `Server is listening on poert ${port}` });
});

app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
