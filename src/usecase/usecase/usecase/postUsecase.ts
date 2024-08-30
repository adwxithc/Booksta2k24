import { IPost } from '../../../domain/post';
import { IPostLikeRepository } from '../interface/repository/IpostLikeRepository';
import { IPostRepository } from '../interface/repository/IpostRepository';
import { ICloudinary } from '../interface/services/ICloudinary';
import { addPost, likePost, unLikePost } from './post';

export class PostUsecase {
    private readonly _postRepository: IPostRepository;
    private readonly _postLikeRepository: IPostLikeRepository;
    private readonly _cloudinary: ICloudinary;

    constructor({
        postRepository,
        postLikeRepository,
        cloudinary,
    }: {
        postRepository: IPostRepository;
        postLikeRepository: IPostLikeRepository;
        cloudinary: ICloudinary;
    }) {
        this._postRepository = postRepository;
        this._postLikeRepository = postLikeRepository;
        this._cloudinary = cloudinary;
    }

    addPost(postData: IPost, postImages: Express.Multer.File[]) {
        return addPost(
            postData,
            postImages,
            this._postRepository,
            this._cloudinary
        );
    }
    async likePost({ postId, userId }: { postId: string; userId: string }) {
        return await likePost({
            postId,
            userId,
            postRepository: this._postRepository,
            postLikeRepository: this._postLikeRepository,
        });
    }

    async unLIkePost({ postId, userId }: { postId: string; userId: string }) {
        return await unLikePost({
            postId,
            userId,
            postRepository: this._postRepository,
            postLikeRepository: this._postLikeRepository,
        });
    }
}
