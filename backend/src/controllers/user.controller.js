const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  try {
    const { email } = req.body;
    let userExists;
    if (email) {
      userExists = await User.findOne({
        where: { email },
      });
    }

    if (userExists) {
      throw new BadRequestError("Email is already associated with an accound");
    }

    const user = await User.create(req.body);

    const token = user.createJWT();
    const { password, ...userWithoutPassword } = user;
    res
      .status(StatusCodes.CREATED)
      .json({ user: userWithoutPassword, accessToken: token });
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Rethrow the error to see the complete stack trace
  }
};

const login = async (req, res) => {
  try {
    const { email, password: candidatePass } = req.body;

    if (!email || !candidatePass) {
      throw new BadRequestError("Please provide the email and password");
    }
    const user = await User.findOne({
      where: { email },
    });
    const isPasswordCorrect = await user.comparePasswords(candidatePass);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
    const token = user.createJWT();
    const { password, ...userWithoutPassword } = user;
    res
      .status(StatusCodes.OK)
      .json({ user: userWithoutPassword, accessToken: token });
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Rethrow the error to see the complete stack trace
  }
};

module.exports = {
  register,
  login,
};
