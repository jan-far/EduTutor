// Import all model folders here, so as to import from the root by other folder. 
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
