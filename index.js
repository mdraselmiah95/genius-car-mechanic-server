const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const port = 5000;

// middleware
// app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rzfie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("carMechanic");
    const servicesCollection = database.collection("services");

    //POST API
    app.post("/services", async (req, res) => {
      const service = {
        name: "ENGINE DIAGNOSTIC",
        price: "300",
        description:
          "Lorem ipsum dolor sit amet, consectetu radipisi cing elitBeatae autem aperiam nequ quaera molestias voluptatibus harum ametipsa.",
        img: "https://i.ibb.co/dGDkr4v/1.jpg",
      };

      const result = await servicesCollection.insertOne(service);
      console.log(result);
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running Genius server");
});

app.listen(port, () => {
  console.log("Running Genius Server on Port", port);
});
