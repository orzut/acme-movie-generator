const Sequelize = require("sequelize");
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_movies_db"
);
const { STRING, INTEGER } = Sequelize;

const Movie = db.define("movie", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  rating: {
    type: INTEGER,
    defaultValue: 3,
  },
});

Movie.addHook("beforeUpdate", (movie) => {
  if (movie.rating > 5 || movie.rating < 1) {
    throw "The rating should be between 1 and 5";
  } else {
    return;
  }
});

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });
    console.log("db is seeded");
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = {
  syncAndSeed,
  Movie,
};
