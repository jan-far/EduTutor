import { User } from "../db";
import { Helper } from "../config";
import { ErrorResponse } from "../custom"

export class Auth {
  static async register(req, res) {
    try {
      // Create new user
      const user = await User.create(req.body)

      // generate token
      const Token = Helper.generateToken(user)

      //  API response
      const response = {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: `${user.firstname} ${user.lastname}`,
        role: user.role,
        token: Token,
      };

      // Send response
      res.status(200).json({
        statusCode: 200,
        response
      });
    } catch (error) {
      console.log(error.message)
      res.status(error.c || 500).json({
        statusCode: error.c || 500,
        message: error.message
      });
    }
  }

  static async login(req, res) {
    try {
      // Create new user
      const user = await User.findByEmail(req.body.email)

      // Respond with a 404 if no user with email is found
      if (!user)
        throw new ErrorResponse(404, `User with email ${req.body.email} not found. Kindly signUp!`);

 
        // Respond with a 400 if password is incorrect
      if (!Helper.comparePassword(user.password, req.body.password))
        throw new ErrorResponse(400, "Password is incorrect.");

      // generate token
      const Token = Helper.generateToken(user)

      //  API response
      const response = {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: `${user.firstname} ${user.lastname}`,
        role: user.role,
        token: Token,
      };

      console.log(user)

      // Send response
      res.status(200).json({
        statusCode: 200,
        response
      });
    } catch (error) {
      console.log(error.message)
      res.status(error.c || 500).json({
        statusCode: error.c || 500,
        message: error.message
      });
    }
  }
}