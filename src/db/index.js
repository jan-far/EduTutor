// Import all model folders here, so as to import from the root by other folder. 
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
import {
  Subject,
  AuthModel,
  Category,
  Lesson,
} from "./models";

export const subject = new Subject();
export const category = new Category();
export const User = new AuthModel();
export const lesson = new Lesson();

export const db = {
  ROLES: ["Admin", "Tutor", "Student"],
  CATEGORY: ["Primary", "Jss", "Sss"],
};