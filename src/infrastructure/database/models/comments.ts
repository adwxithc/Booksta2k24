// src/domain/comments/comments.model.ts

import mongoose, { Schema, Document } from "mongoose";
import { IPostComment } from "../../../domain/comments";

// Define schema for CommentedUser
const commentedUserSchema: Schema = new Schema({
    userId: {
        type: String,
        required: true
    },
    commentedAt: {
        type: Date,
        required: true
    }
});

// Define schema for CommentReply
const commentReplySchema: Schema = new Schema({
    commentText: {
        type: String,
        required: true
    },
    commentedByUsers: [commentedUserSchema]
});

// Define schema for IPostComment
const postCommentSchema: Schema<IPostComment & Document> = new Schema<IPostComment & Document>({
    postId: {
        type: String,
        required: true
    },
    commentText: {
        type: String,
        required: true
    },
    commentedByUsers: [commentedUserSchema],
    replies: [commentReplySchema]
}, {
    timestamps: true 
});

// Create a model for the PostComment schema
const PostCommentModel = mongoose.model<IPostComment & Document>("PostComment", postCommentSchema);

// Export the PostCommentModel
export default PostCommentModel;
