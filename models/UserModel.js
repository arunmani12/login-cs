const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
      name: { type: String, required: true },
      UserId:{type: String, required: true ,unique:true},
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true, select: false }
    })

module.exports =  mongoose.model('UserModel',UserSchema)