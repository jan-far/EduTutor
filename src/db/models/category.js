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

    this.model = mongoose.model("Category", categorySchema);
  }

  create(body) {
    return Promise.resolve(
      this.model.create(body)
    )
  }

  findOne(body) {
    return Promise.resolve(
      this.model.findOne({ name: body })
    )
  }

  estimate() {
    return Promise.resolve(
      this.model.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
          new this.model({
            name: "primary"
          }).save(err => {
            if (err) {
              console.log("error", err);
            }

            console.log("added 'Primary' to category collection");
          });

          new this.model({
            name: "jss"
          }).save(err => {
            if (err) {
              console.log("error", err);
            }

            console.log("added 'Jss' to category collection");
          });

          new this.model({
            name: "sss"
          }).save(err => {
            if (err) {
              console.log("error", err);
            }

            console.log("added 'Sss' to category collection");
          });
        }
      })
    )
  }
}
