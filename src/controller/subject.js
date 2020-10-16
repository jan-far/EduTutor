import { ErrorResponse } from "../custom";
import { category, subject, User, } from "../db";

export class SubControl {
  static async create(req, res) {
    const { payload } = req;
    // return console.log('payload', payload)
    try {
      //  Find the user
      const tutor = await User.findById(payload._id)

      // Find the category
      let cat = await category.findOne(req.body.category)

      // Parse the data recieved from the request multipart/form-data
      const body = req.body

      //  Add user
      body.tutor = tutor._id

      //  Add Category
      body.category = cat

      //  Create subject
      const sub = await subject.create(req.body);

      //  API response
      const response = {
        id: sub._id,
        name: sub.name,
        topic: sub.topic,
        description: sub.description,
        category: sub.category,
        tutor: sub.tutor
      }

      // Send the response
      res.status(200).json({
        statusCode: 200,
        response
      })
    } catch (error) {
      res.status(500).json({
        statusCode: error.c || 500,
        message: error.message
      })
    }
  }

  static async findOneSubject(req, res) {
    //  Get and Assign id params
    const id =  req.params.id;

    try {
      // Find the subject
      const sub = await subject.findById(id);

      // API response
      const response = {
        ...sub
      }

      // Send response
      res.status(200).json({
        statusCode: 200,
        response
      })
    } catch (error) {
      res.status(error.c || 500).json({
        statusCode: error.c || 500,
        message: error.message
      })
    }
  }

  static async findAllSubject(req, res) {
    try {
      //  Find the whole registered subject
      const sub = await subject.findAll()

      // API response
      const response = { ...sub }

      res.status(200).json({
        statusCode: 200,
        response: response,
      })
    } catch (error) {
      res.status(error.c || 500).json({
        statusCode: error.c || 500,
        message: error.message,
      })
    }
  }

  static async deleteOne(req, res) {
    const id = req.params.id
    try {
      //  Find if subject exist
      const subExist = await subject.findById(id)

      // If subject doesnt exist throw an error
      if (!subExist)
        throw new ErrorResponse(404, 'Subject does not exist or already deleted!')
      
        // Find and delete subject
      const sub = await subject.deleteOne(id);

      //  API response
      const response = {
        message: 'Subject successfully deletec!'
      }


      //  Send reponse
      res.status(201).json({
        statusCode: 200,
        response: response
      })
    } catch (error) {
      res.status(error.c || 500).json({
        statusCode: error.c || 500,
        message: error.message,
      })
    }
  }

  static async deleteAll(req, res) {
    try {
      // Find and delete subject
      const sub = await subject.deleteAll();

      //  API response
      const response = {
        ...sub,
        message: 'All Subjects deleted successfully!'
      }

      //  Send reponse
      res.status(201).json({
        statusCode: 200,
        response: response
      })
    } catch (error) {
      res.status(error.c || 500).json({
        statusCode: error.c || 500,
        message: error.message,
      })
    }
  }
}
