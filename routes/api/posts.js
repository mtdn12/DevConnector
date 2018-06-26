const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Loading Post model
const Post = require("../../models/Post");
// Loading Profile model
const Profile = require("../../models/Profile")

// Load validation
const validatePostInput = require("../../validation/post");

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Posts Works"
  })
);

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  async (req, res) => {
    const {
      errors,
      isValid
    } = validatePostInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    try {
      const newPost = new Post({
        text: req.body.text,
        name: req.user.name,
        avatar: req.user.avatar,
        user: req.user.id
      });
      const post = await newPost.save();
      return res.json(post);
    } catch (err) {
      return res.json({
        result: 'fail',
        status: 400,
        message: "Cant't create post now, please try again later"
      })
    }
  }
);
// @route   PUT api/posts
// @desc    Edit post
// @access  Private
router.put(
  "/:post_id",
  passport.authenticate("jwt", {
    session: false
  }),
  async (req, res) => {
    const {
      errors,
      isValid
    } = validatePostInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    try {
      const post = await Post.findById(req.params.id)
      if (post.user.toString() !== req.user.id) {
        errors.notAuthorized = "You are not authorized"
        res.status(401).json(errors)
      }
      const updatePost = {
        text: req.body.text,
        name: req.user.name,
        avatar: req.user.avatar,
        user: req.user.id
      };
      const postUpdate = await Post.findByIdAndUpdate(req.params.post_id, {
        $set: updatePost
      }, {
        new: true
      })
      if (!post) {
        errors.post = "Post does not exist"
        return res.json(errors)
      }
      return res.json(post);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
);

// @route   GET api/posts
// @desc    get all posts
// @access  Public

router.get("/", async (req, res) => {
  try {
    const errors = {}
    const page = +req.query.page || 0
    const limit = +req.query.limit || 10000    
    const totalCount = await Post.count()
    const posts = await Post.find().skip(page * limit).limit(limit).sort('-date')
    if (!posts) {
      return res.json({
        result:'fail',
        status: 404,
        message: 'There is no posts'
      })
    }
    return res.json({
      posts,
      page,
      limit,
      totalCount
    })
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

// @route   GET api/posts/user/:user_id
// @desc    get all posts of a user
// @access  Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const errors = {}
    const page = +req.query.page || 0
    const limit = +req.query.limit || 10000
    const totalCount = await Post.count()
    const posts = await Post.find({
      user: req.params.user_id
    }).skip(page * limit).limit(limit).sort('-date')
    if (!posts) {
      errors.posts = "There is no posts"
      return res.status(400).json(errors)
    }
    return res.json({
      posts,
      page,
      limit,
      totalCount
    })
  } catch (error) {
    return res.status(400).json(error.message);
  }
});
// @route   GET api/posts/:post_id
// @desc    get detail of a post
// @access  Public

router.get("/:post_id", async (req, res) => {
  try {
    console.log(req.params.post_id)
    const post = await Post.findById(req.params.post_id)
    if (!post) {      
      return res.json({
        result: 'fail',
        status: 400,
        message: 'There is no post match that id'
      })
    }
    return res.json(post)
  } catch (error) {
    return res.json({
        result: 'fail',
        status: 400,
        message: 'There is no post match that id'
      })
  }
});
// @route   DELETE api/posts/post_id
// @desc    Delete a post
// @access  Private
router.delete('/:post_id', passport.authenticate('jwt', {
  session: false
}), async (req, res) => {
  try {    
    const post = await Post.findById(req.params.post_id)
    // Check post belong to that user or not
    if (post.user.toString() !== req.user.id) {      
      return res.json({
        result: 'fail',
        status: 401,
        message: 'User not authorized'
      })
    }
    // Delete
    await post.remove()
    return res.json({
      result: 'success',
      status: 200,
      message: 'Delete success'
    })
  } catch (error) {
    return res.json({
      result: 'fail',
      status: 400,
      message: "Can't delete post"
    })
  }
})

// @route   Post api/posts/like/:post_id
// @desc    Like Post
// @access  Private
router.post('/like/:post_id', passport.authenticate('jwt', {
  session: false
}), async (req, res) => {
  try {
    const errors = {}
    const post = await Post.findById(req.params.post_id)
    // Check user liked post or not
    if (post.likes.some(like => like.user.toString() === req.user.id)) {      
      return res.json({
        result: 'fail',
        status: 400,
        message: 'You already like this post'
      })
    }
    // Add like to likes array
    post.likes.unshift({
      user: req.user.id
    })
    const newPost = await post.save()
    return res.json(newPost)
  } catch (error) {
    return res.status(400).json(error.message)
  }
})
// @route   Post api/posts/unlike/:post_id
// @desc    Un Like Post
// @access  Private
router.post('/unlike/:post_id', passport.authenticate('jwt', {
  session: false
}), async (req, res) => {
  try {
    const errors = {}
    const post = await Post.findById(req.params.post_id)
    // Check user liked post or not
    if (!post.likes.some(like => like.user.toString() === req.user.id)) {      
      return res.json({
        result: 'fail',
        status: 400,
        message: 'You did not like this post yet'
      })
    }
    // Add like to likes array
    const newLikes = post.likes.filter(like => like.user.toString() !== req.user.id)
    post.likes = newLikes
    const newPost = await post.save()
    return res.json(newPost)
  } catch (error) {
    return res.status(400).json(error.message)
  }
})
// @route   Post api/posts/comment/:post_id
// @desc    Add Comment to Post
// @access  Private
router.post('/comment/:post_id', passport.authenticate('jwt', {
  session: false
}), async (req, res) => {
  try {
    const {
      errors,
      isValid
    } = validatePostInput(req.body)
    const newComment = {
      text: req.body.text,
      name: req.user.name,
      avatar: req.user.avatar,
      user: req.user.id
    }
    const post = await Post.findById(req.params.post_id)
    post.comments.unshift(newComment)
    const newPost = await post.save()
    return res.json(newPost)
  } catch (error) {
    return res.json({
      result: 'fail',
      status: 400,
      message: 'Cant create commnet'
    })
  }
})
// @route   PUT api/posts/comment/:post_id
// @desc    Edit Comment on a Post
// @access  Private
router.put('/comment/:post_id/:comment_id', passport.authenticate('jwt', {
  session: false
}), async (req, res) => {
  try {
    const {
      errors,
      isValid
    } = validatePostInput(req.body)
    const post = await Post.findById(req.params.post_id)
    const index = post.comments.findIndex(com => com.id === req.params.comment_id)
    if (index === -1) {
      errors.comment = "Not found that comment"
      return res.status(400).json(errors)
    }
    if (post.comments[index].user.toString() !== req.user.id) {
      errors.notAuthorized = "You are not authorized"
      res.status(401).json(errors)
    }
    const newComment = {
      _id: post.comments[index].id,
      text: req.body.text,
      name: req.user.name,
      avatar: req.user.avatar,
      user: req.user.id
    }
    post.comments[index] = newComment
    const newPost = await post.save()
    return res.json(newPost)
  } catch (error) {
    return res.status(400).json(error.message)
  }
})
// @route   Post api/posts/comment/:post_id
// @desc    Delete Comment from a Post
// @access  Private
router.delete('/comment/:post_id/:comment_id', passport.authenticate('jwt', {
  session: false
}), async (req, res) => {
  try {
    const errors = {}
    const post = await Post.findById(req.params.post_id)
    if (!post.comments.some(com => com.id === req.params.comment_id)) {
      errors.comment = "Do not have that comment id"
      return res.status(400).json(errors)
    }
    const newComments = post.comments.filter(com => com.id !== req.params.comment_id)
    post.comments = newComments
    const newPost = await post.save()
    return res.json(newPost)
  } catch (error) {
    return res.status(400).json(error.message)
  }
})

module.exports = router;