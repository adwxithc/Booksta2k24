// src/domain/likes/likes.model.ts

import mongoose, { Schema, Document } from "mongoose";
import { IPostLikes } from "../../../domain/likes";



// Define schema for LikedUser
const likedUserSchema: Schema = new Schema({
    userId: {
        type: String,
        required: true
    },
    likedAt: {
        type: Date,
        required: true
    }
});

// Define schema for IPostLikes
const postLikesSchema: Schema<IPostLikes & Document> = new Schema<IPostLikes & Document>({
    postId: {
        type: String,
        required: true
    },
    likedByUsers: [likedUserSchema]
}, {
    timestamps: true 
});

// Create a model for the PostLikes schema
const PostLikesModel = mongoose.model<IPostLikes & Document>("PostLikes", postLikesSchema);

// Export the PostLikesModel
export default PostLikesModel;
