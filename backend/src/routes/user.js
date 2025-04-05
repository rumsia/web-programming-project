import { Router } from "express";
const userRouter = Router();

import { updateUser } from "../controllers/user.js";

userRouter.put("/update", updateUser);

export default userRouter;
