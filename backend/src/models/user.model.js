const { DataTypes } = require("sequelize");
const sequelize = require("../db/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Pls provide a valid email id",
        },
      },
    },
    user__type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user__language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subjectExpertise: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    classGrade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isLongEnough(value) {
          if (value.length < 8) {
            throw new Error("Password must be at least 8 characters long");
          }
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.changed("password")) {
          const saltRounds = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, saltRounds);
        }
      },
    },
  }
);

User.prototype.createJWT = function(){
  return jwt.sign(
    {
      userId: this.id,
      name: this.name,
      type: this.user__type,
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

User.prototype.comparePasswords = async function (candidatePass){
    const isMatch = await bcrypt.compare(candidatePass, this.password);
    return isMatch;
};

module.exports = User;
