import { Timestamps } from "./post";

export interface CommentedUser {
    userId: string;
    commentedAt: Date;
}

export interface CommentReply {
    commentText: string; 
    commentedByUsers: CommentedUser[]; 
}

export interface IPostComment extends Timestamps {
    id: string; 
    postId: string;
    commentText: string; 
    commentedByUsers: CommentedUser[]; 
    replies: CommentReply[];
}