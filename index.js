const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");

const PORT = 4000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.get("/posts/:id", ({ params: { id } }, res) => {
  const post = posts[id];
  if (!post) {
    res.status(404).send({ message: `post with id "${id}" not found` });
  }
  res.send(posts[id]);
});

app.post("/posts", ({ body: { title } }, res) => {
  const id = randomBytes(4).toString("hex");
  posts[id] = { id, title };
  res.status(201).send(posts[id]);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
