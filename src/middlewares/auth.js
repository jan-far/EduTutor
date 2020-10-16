import Joi from "@hapi/joi";
import { TokenExpiredError } from "jsonwebtoken";
import { Helper } from "../config";
import { ErrorResponse } from "../custom";
import { User } from "../db";
import { Environment } from "../env";

export const checkToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token)
    throw new ErrorResponse(403, "Token not provided!");

  let decoded = null;

  try {
    // decode the token
    decoded = Helper.verifyToken(token, Environment.JWT_SECRET, (err, decode) => {
      return decode
    });

    // Throw error if token is not present
    if (!token)
      throw new ErrorResponse(401, "Token not present in authorization header");

    req.payload = decoded.$__;
    // console.log(decoded.$__._id)
    next()
  } catch (error) {
    if (error instanceof TokenExpiredError)
      throw new ErrorResponse(401, "Token has expired. Log in to sign another.");
    throw new ErrorResponse(401, error.message);
  }
};

export const checkRole = (role) => {
  return async (req, res, next) => {
    const { payload } = req;

    try {
      // Find the user
      const user = await User.findById(payload._id);

      // Check if user have valid role. Throw error if not so.
      if (user.role[0] !== role)
        throw new ErrorResponse(400, `User not authorized! User must be a ${role} to access page`);

      next();
    } catch (error) {
      res.status(error.c || 500).json({
        statusCode: error.c || 500,
        message: error.message
      });
    }
  }
};

export const ValidateBody = async (req, res, next) => {
  try {
    const requestBody = Joi.object({
      username: Joi.string().min(3).max(15).required(),
      firstname: Joi.string().min(3).max(20).required(),
      lastname: Joi.string().min(3).max(20).required(),
      phone: Joi.number().required(),
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
    const user = await User.findByEmail(req.body.email.toLowerCase());

    // Check if user with email exist. Throw error if so.
    if (user)
      throw new ErrorResponse(400, `User with email ${req.body.email} already registered`);

    // Check if username exist
    const username = await User.findByUsername(req.body.username);

    // Check if username exist. Throw error if so.
    if (username) {
      throw new ErrorResponse(400, `Username '${req.body.username}' already Taken, try '${req.body.username}${d3}' `)
    }

    req.body.email = req.body.email.toLowerCase();

    next();
  } catch (error) {
    res.status(error.c || 500).json({
      statusCode: error.c || 500,
      message: error.message
    });
  }
}

export const ValidateSubjectBody = async (req, res, next) => {
  try {
    const requestBody = Joi.object({
      name: Joi.string().min(5).max(30).required(),
      topic: Joi.string().min(5).max(50).required(),
      description: Joi.string().min(10).max(50).required(),
      category: Joi.string().valid("primary", "jss", "sss"),
    })

    // Validate the request body
    const { error } = requestBody.validate({...req.body});

    let msg;

    // check for error during validation
    if (error) {
      msg = error.details[0].message
        .replace("\"", "")
        .replace("\"", "")

      throw new ErrorResponse(400, msg);
    }

    next()
  } catch (error) {
    res.status(error.c || 500).json({
      statusCode: error.c || 500,
      message: error.message
    });
  }

}