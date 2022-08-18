import express from "express";

import {
  getPostsBySearch,
  getPosts,
  getPost,
  createPosts,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} from "../controllers/posts.js";

//middleware auth import//
import auth from "../middleware/auth.js";

//Router
const router = express.Router();

router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", auth, createPosts);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);

export default router;
