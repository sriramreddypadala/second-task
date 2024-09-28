const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // To serve static files
const Post = require('./models/post'); // MongoDB model

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/social_platform', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Route to create a post
app.post('/post', async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).send({ message: 'Content is required' });
    }

    try {
        const post = new Post({ content, likes: 0, comments: [] });
        await post.save();
        res.status(201).send({ message: 'Post created successfully', post });
    } catch (error) {
        res.status(500).send({ message: 'Error creating post', error });
    }
});

// Route to get all posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching posts' });
    }
});

// Route to like a post
app.post('/post/:id/like', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        post.likes += 1;
        await post.save();
        res.status(200).send({ message: 'Post liked successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error liking post' });
    }
});

// Route to comment on a post
app.post('/post/:id/comment', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).send({ message: 'Comment content is required' });
    }

    try {
        const post = await Post.findById(id);
        post.comments.push({ content });
        await post.save();
        res.status(200).send({ message: 'Comment added successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error adding comment' });
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
