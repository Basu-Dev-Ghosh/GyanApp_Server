const express = require("express");
const router = express.Router();
const Messege = require("../models/Messeges");
const Blog = require("../models/blogs");
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "basu1735@gmail.com" && password === "17351304") {
    res.cookie("admin", true, {
      expires: new Date(Date.now() + 50000000),
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });
    res.status(200).json({ msg: "Login successfull" });
  } else {
    res.status(422).json({ msg: "Login failed" });
  }
});
router.post("/addblog", async (req, res) => {
  const { Title, Description, Content, ImageLink } = req.body;
  try {
    const blog = await new Blog({
      Title,
      Description,
      Content,
      ImageLink,
    });
    await blog.save();
    res.status(200).json({ msg: "Blog Added" });
  } catch (err) {
    res.status(422).json({ msg: "Blog added failed" });
  }
});
router.post("/addmsg", async (req, res) => {
  const { Name, Email, Msg } = req.body;
  console.log(Email);
  try {
    const messege = new Messege({
      Name,
      Email,
      Msg,
    });
    await messege.save();
    res.status(200).json({ msg: "Messege Sent" });
  } catch (err) {
    res.status(422).json({ msg: "Messege Send failed" });
  }
});
router.get("/logout", (req, res) => {
  res.clearCookie("admin", {
    sameSite: "None",
    secure: true,
  });
  res.status(200).json({ msg: "Logged out" });
});
router.get("/check", (req, res) => {
  const isAdmin = req.cookies.admin;
  if (isAdmin) {
    res.status(200).json({ msg: "User Logged In" });
  } else {
    res.status(422).json("user not logged in");
  }
});
router.get("/getblogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ msg: "Blogs Found", blogs });
  } catch (err) {
    res.status(422).json({ msg: "Something went wrong" });
  }
});
router.post("/getblog", async (req, res) => {
  try {
    const blog = await Blog.findOne({ Title: req.body.title },{_id:0});
    res.status(200).json({msg:"Blog Found",blog})
  } catch (err) {
    res.status(422).json({ msg: "Blog not found" });
  }
});
module.exports = router;
