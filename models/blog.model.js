// models/blog.js

const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
image:[String],
note:String,
userId:String,
username:String

});
const Blog=mongoose.model("Blog",blogSchema)
module.exports={
  Blog
}