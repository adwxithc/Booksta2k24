// src/infrastructure/models/post.model.ts
import mongoose, { Schema, Document } from "mongoose";
import { IPost } from "../../../domain/post";


// Create a new Schema for the Post model
const postSchema: Schema<IPost & Document> = new Schema<IPost & Document>({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, {
    timestamps: true 
});

// Create a new Model for the Post schema
const PostModel = mongoose.model<IPost & Document>("Post", postSchema);

// Export the PostModel
export default PostModel;
