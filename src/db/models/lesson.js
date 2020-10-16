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

  create(body) {
    return Promise.resolve(
      this.model.create(body)
    )
  }

  findAll() {
    return Promise.resolve(
      this.model.find()
    )
  }

  findOne(_id) {
    return Promise.reject(
      this.model.findById(_id)
      .then(res => {
        console.log(res)
      })
    )
  }

  findTutor(_id) {
    return Promise.reject(
      this.model.findById(_id)
    )
  }
}
