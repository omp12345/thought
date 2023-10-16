const express = require('express');
const BlogRouter = express.Router();
const jwt = require('jsonwebtoken');
// const Blog = require('../models/blog.model');
const User = require('../models/user.model');
const { authenticateUser } = require('../middlewares/auth.middleware');
const { Blog } = require('../models/blog.model');




BlogRouter.get('/blogs', authenticateUser, async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blogs' });
  }
});
BlogRouter.get('/blogs/:id', authenticateUser, async (req, res) => {
  const {id}=req.params
  try {
    const blogs = await Blog.findById({_id:id});
    
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blogs' });
  }
});


BlogRouter.post('/blogs', authenticateUser, async (req, res) => {
  try {
    
    
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create blog' });
  }
});


BlogRouter.patch('/blogs/:id', authenticateUser, async (req, res) => {
  let { id } = req.params;
  let userID = req.body.userId;


  const blogdata = await Blog.findOne({ _id: id });
  const userdataId = blogdata.userId;

  if (userdataId === userID) {
    try {
      await Blog.findByIdAndUpdate(
        {
          _id: id,
        },
        req.body
      );
      res.status(200).json(`${id} is updated `);
    } catch (error) {
      res.status(404).json("not found");
    }
  }
  
});


BlogRouter.delete('/blogs/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete blog' });
  }
});


  
  // Comment on a blog
 
module.exports = {

  BlogRouter
};