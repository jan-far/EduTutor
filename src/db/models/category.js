import mongoose from "mongoose";
import { Subject } from "./subject";

export class Category {
  constructor() {
    this.define();
  }

  define() {
    const categorySchema = new mongoose.Schema({
      name: { type: String, required: true },
    });

    categorySchema.pre("remove", (next) => {
      Subject.remove({ id: this._id }).exec();
      next();
    });

    this.model = mongoose.model(" Category", categorySchema);
  }
}
