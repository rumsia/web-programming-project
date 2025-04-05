import { Router } from "express";
import upload from "../middlewares/multer.js";
import { newPost, getPosts } from "../controllers/post.js";
const postsRouter = Router();

postsRouter.get("/", getPosts);
postsRouter.post("/new", upload.single("image"), newPost);

export default postsRouter;
