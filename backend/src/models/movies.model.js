const { DataTypes } = require("sequelize");
const sequelize = require("../db/index");

const Movies = sequelize.define("Movies", {
  Title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Genre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Movies;
