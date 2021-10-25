const express = require("express");

const app = express();
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Running Genius server");
});

app.listen(port, () => {
  console.log("Running Genius Server on Port", port);
});
