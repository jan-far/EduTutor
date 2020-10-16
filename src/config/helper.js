import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Environment } from "../env";

export class Helper {
  /* Hash Password Method */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  /** comparePassword */
  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  /* isValidEmail helper method  */
  static statisValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  /* Gnerate Token */
  static generateToken(payload) {
    const token = jwt.sign({...payload}, Environment.JWT_SECRET, { expiresIn: "4d" });
    return token;
  }

  /* Verify the token */
  static verifyToken(token) {
    return jwt.verify(token, Environment.JWT_SECRET);
  }

  /* Decode token */
  static decode(token) {
    return jwt.decode(token);
  }
}
