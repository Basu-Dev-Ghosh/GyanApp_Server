const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema({
  Title: {
    type: String,
  },
  Description: {
    type: String,
  },
  Content: {
    type: String,
  },
  ImageLink: {
    type: String,
  },
});

const Blog = new mongoose.model("Blog", BlogSchema);
module.exports = Blog;
