import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import { postAdapter } from './injections/injections';
import { auth } from '../middleware/auth';
import upload from '../middleware/uploadImage';

const postRouter = express.Router();

/**
 * @route   POST /api/posts/add-post
 * @desc    Create a new post
 * @access  Private
 * @body    { title: String, content: String, description: String, userId: String }
 * @return  { success: Boolean, data: Object, message: String }
 */

postRouter.post("/add-post", auth, upload, (req: Request, res:Response, next:NextFunction) => {       
    postAdapter.addPost(req, res, next);
});

/**
 * @route   POST /api/posts/edit-post
 * @desc    Create a new patch
 * @access  Private
 * @body    { title: String, content: String, description: String, userId: String }
 * @return  { success: Boolean, data: Object, message: String }
 */

postRouter.patch("/edit-post", auth, upload, (req: Request, res:Response, next:NextFunction) => {       
    postAdapter.addPost(req, res, next);
});



export default postRouter;