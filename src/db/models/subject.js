import mongoose from "mongoose";

export class Subject {
  constructor() {
    this.define();
  }

  define() {
    const subjectSchema = new mongoose.Schema({
      name: { type: String, required: true },
      topic: { type: String, required: true },
      description: { type: String, required: true, default: 'Topic simplified' },
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

  findByCategory(body) {
    return Promise.resolve(
      this.model.findOne({category: body})
    )
  }

  findById(_id) {
    return Promise.resolve(
      this.model.findById(_id)
    )
  }

  update(_id, update) {
    return Promise.resolve(
      this.model.findByIdAndUpdate(_id, update, { new: true })
    )
  }

  deleteOne(_id) {
    return Promise.resolve(
      this.model.findByIdAndDelete(_id)
    )
  }

  deleteAll() {
    return Promise.resolve(
      this.model.deleteMany({})
    )
  }
}
