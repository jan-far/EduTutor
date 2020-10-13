import mongoose from "mongoose";

export class Lesson {
  constructor() {
    this.define();
  }

  define() {
    const lessonSchema = new mongoose.Schema({
      topic: { type: String, require: true },
      subject: { type: String, require: true },
      tutor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }],
      student: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }]
    }, { timestamps: true });

    this.model = mongoose.model("Lesson", lessonSchema);
  }
}
