import Joi from "@hapi/joi";
import { Helper } from "../config";
import { ErrorResponse } from "../custom";
import { User } from "../db";

export const checkToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token)
    throw new ErrorResponse(403, "Token not provided!");

  try {
    // decode the token
    token = Helper.decode(token);
    next()
  } catch (error) {
    if (error instanceof TokenExpiredError)
      throw new ErrorResponse(401, "Token has expired. Log in to sign another.");
    throw new ErrorResponse(401, error.message);
  }
};

export const checkEmailExist = async (req, res, next) => {
  try {
    //  Find user by email
    const user = await User.findByEmail(req.body.email);

    // Check if user with email exist. Throw error if so.
    if (user)
      throw new ErrorResponse(400, `User with email ${req.body.email} already registered`);
    next();
  } catch (error) {
    res.status(error.c || 500).json({
      statusCode: error.c || 500,
      message: error.message
    });
  }
};

export const ValidateBody = async (req, res, next) => {
  try {
    const requestBody = Joi.object({
      username: Joi.string().min(3).max(15).required(),
      firstname: Joi.string().min(3).max(20).required(),
      lastname: Joi.string().min(3).max(20).required(),
      email: Joi.string().email({
        tlds: { allow: ["com", "net", "org"] },
      })
        .required(),
      password: Joi.string().alphanum().min(7).max(30)
        .required(),
    });

    const { error } = requestBody.validate({ ...req.body });

    let msg = ""

    // check for error during validation
    if (error) {
      msg = error.details[0].message
        .replace("\"", "")
        .replace("\"", "")
        .replace("firstname", "First name")
        .replace("lastname", "Last name")
        .replace("email", "Email")
        .replace("password", "Password")

      throw new ErrorResponse(400, msg);
    }

    // Generate random 3 digit numbers
    const d3 = Math.floor(Math.random() * (999 - 100 + 1) + 100);

    //  Find user by email
    const user = await User.findByEmail(req.body.email);

    // Check if user with email exist. Throw error if so.
    if (user)
      throw new ErrorResponse(400, `User with email ${req.body.email} already registered`);

    // Check if username exist
    const username = await User.findByUsername(req.body.username);

    // Check if username exist. Throw error if so.
    if (username) {
      throw new ErrorResponse(400, `Username '${req.body.username}' already Taken, try '${req.body.username}${d3}' `)
    }

    next();
  } catch (error) {
    res.status(error.c || 500).json({
      statusCode: error.c || 500,
      message: error.message
    });
  }
}