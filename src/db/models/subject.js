import mongoose from "mongoose";

export class Subject {
  constructor() {
    this.define();
  }

  define() {
    const subjectSchema = new mongoose.Schema({
      name: { type: String, required: true },
      topic: { type: String, required: true },
      description: { type: String, required: true },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        require: true,
      },
      tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    }, { timestamps: true });

    this.model = mongoose.model("Subject", subjectSchema);
  }
}
