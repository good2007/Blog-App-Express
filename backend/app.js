require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./server/config/db');
const Post = require('./server/models/Post');
const app = express();
const PORT = process.env.PORT || 5000;
const FrontendLink = process.env.FRONTEND_URL;

// Connect to the Cloud MongoDB Atlas cluster infrastructure
connectDB();

// Middleware: Enable cross-origin communication between ports 3000 and 5000
app.use(cors({ origin: FrontendLink }));
// Middleware: Body parsers to extract raw text stream sequences into JSON format

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/**
 * ============================================================================
 * ENDPOINT 1: GET /api/posts
 * Use Case: Fetches all saved blog posts to display on the frontend homepage.
 * ============================================================================
 */
app.get('/api/posts', async (req, res) => {
    console.log("Server has successfully received the request to fetch the blog data")
 try {
 // Query MongoDB for all entries, sorted by creation date (newest first)
 const posts = await Post.find().sort({ createdAt: -1 });
 res.status(200).json(posts);
 console.log('Blogs Fetched', {posts})
 } catch (error) {
 console.log("Server-side data read failure. Please try again.", {error});
 res.status(500).json({ success: false, message: "Server-side data read failure." });
 }
});
/**
 * ============================================================================
 * ENDPOINT 2: POST /api/posts
 * Use Case: Receives blog data from the frontend form and writes it to MongoDB.
 * ============================================================================
 */
app.post('/api/posts', async (req, res) => {
try {
 console.log("Server has successfully received the form values");
 const { title, thumbnail, summary, readTime, content, author } = req.body;

 // Automatically convert titles into clean URL-friendly slugs
 // Example: "My fat cat sat on the mat" -> "my-fat-cat-sat-on-the-mat"
 const slug = title
 .toLowerCase()
 .replace(/[^a-z0-9]+/g, '-')
 .replace(/(^-|-$)/g, '');

 // Construct an operational document structure inside memory
 const newPost = new Post({ title, slug, thumbnail, summary, readTime, content, author });

 // Execute the database write operation
 await newPost.save();

 // Respond with an HTTP 211 Created success status
 res.status(201).json({ success: true, data: newPost });
 console.log("Server has successfully written the form values into the database");

 } catch (error) {
 console.log("Server-side data write failure. Please try again.", {error});
 res.status(400).json({ success: false, error: error.message });
 }
});

/**
 * ============================================================================
 * ENDPOINT 3: PUT /api/posts/:id
 * Use Case: Updates an existing blog post by ID.
 * ============================================================================
 */
app.put('/api/posts/:id', async (req, res) => {
  try {
    console.log("Server has successfully received the update request");
    const { id } = req.params;
    const { title, thumbnail, summary, readTime, content, author } = req.body;

    // Validate that ID is a valid MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid blog ID format." });
    }

    // Generate new slug if title changed
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Find and update the post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, slug, thumbnail, summary, readTime, content, author },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ success: false, message: "Blog post not found." });
    }

    res.status(200).json({ success: true, data: updatedPost });
    console.log("Server has successfully updated the blog post");
  } catch (error) {
    console.log("Server-side update failure. Please try again.", { error });
    res.status(400).json({ success: false, error: error.message });
  }
});

/**
 * ============================================================================
 * ENDPOINT 4: DELETE /api/posts/:id
 * Use Case: Deletes a blog post by ID.
 * ============================================================================
 */
app.delete('/api/posts/:id', async (req, res) => {
  try {
    console.log("Server has successfully received the delete request");
    const { id } = req.params;

    // Validate that ID is a valid MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid blog ID format." });
    }

    // Find and delete the post
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ success: false, message: "Blog post not found." });
    }

    res.status(200).json({ success: true, message: "Blog post deleted successfully.", data: deletedPost });
    console.log("Server has successfully deleted the blog post");
  } catch (error) {
    console.log("Server-side delete failure. Please try again.", { error });
    res.status(400).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
 console.log(`Express Backend executing operations actively on port: ${PORT}
`);
});
