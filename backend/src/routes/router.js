import { Router } from "express";
import authRouter from "./auth.js";
import userRouter from "./user.js";
import postsRouter from "./post.js";
const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/post", postsRouter);

export default router;
