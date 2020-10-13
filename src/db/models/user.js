import mongoose from "mongoose";
import { Helper } from "../../config";

export class AuthModel {
  constructor() {
    this.define();
  }

  define() {
    const userSchema = new mongoose.Schema({
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      username: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      role: [{
        type: String,
        enum: ["Admin", "Tutor", "Student"],
        required: true,
      }],
    }, { timestamps: true });

    // Format response in JSON, hide password and id
    userSchema.set("toJSON", {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        // delete ret._id;
        delete ret.password;
      },
    });

    // Add save pre-hook: encrypt password
    userSchema.pre("save", (next) => {
      const doc = this;
      if (doc.isModified("password")) doc.password = Helper.hashPassword(doc.password);
      next();
    });

    this.model = mongoose.model("User", userSchema);
  }

  create(body) {
    return Promise.resolve(
      this.model.create(body),
    );
  }

  findByEmail(email) {
    return Promise.resolve(
      this.model.findOne({ email }),
    );
  }

  findById(_id) {
    return Promise.resolve(
      this.model.findById(_id),
    );
  }

  findAll() {
    return Promise.resolve(
      this.model.find(),
    );
  }

  findByIdAndUpdate(_id, update) {
    return Promise.resolve(
      this.model.findByIdAndUpdate(_id, update, { new: true }),
    );
  }
}
