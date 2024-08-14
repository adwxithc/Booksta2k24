import { Timestamps } from "./post";

export interface LikedUser {
    userId: string;
    likedAt: Date;
}

export interface IPostLikes extends Timestamps {
    id?: string; 
    postId: string;
    likedByUsers: LikedUser[]; 
}