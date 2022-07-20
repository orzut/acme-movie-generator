const express = require("express");
const app = express();
const path = require("path");
const { syncAndSeed, Movie } = require("./db");

app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get("/api/movies", async (req, res, next) => {
  try {
    res.send(await Movie.findAll());
  } catch (error) {
    next(error);
  }
});

app.post("/api/movies", async (req, res, next) => {
  try {
    res.status(201).send(await Movie.create(req.body));
  } catch (error) {
    next(error);
  }
});

app.delete("/api/movies/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    await movie.destroy();
    res.send(movie);
  } catch (error) {
    next(error);
  }
});

app.put("/api/movies/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    res.status(201).send(await movie.update(req.body));
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({ err });
});

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
