const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const { default: axios } = require("axios");

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

app.post("/posts/create", async ({ body: { title } }, res) => {
  const id = randomBytes(4).toString("hex");
  await axios
    .post("http://event-bus-srv:4005/events", {
      type: "PostCreated",
      data: { id, title },
    })
    .catch((e) => {
      console.log(e);
    });
  res.status(201).send(posts[id]);
});

app.post("/events", ({ body: { type, data: post } }, res) => {
  if (type === "PostCreated") {
    console.log("Received Event", type);
    posts[post.id] = post;
  }
  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
