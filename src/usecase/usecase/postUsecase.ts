import { IPost } from "../../domain/post";
import { File } from "../../domain/types/file";
import { IPostRepository } from "../interface/repository/IpostRepository";
import { ICloudinary } from "../interface/services/ICloudinary";
import { addPost } from "./post/addPost";



export class PostUsecase{
    private readonly _postRepository: IPostRepository;
    private readonly _cloudinary: ICloudinary;

    constructor(
        postRepository: IPostRepository,
        cloudinary: ICloudinary
    ){
        this._postRepository = postRepository
        this._cloudinary = cloudinary
    }


    addPost(postData: IPost, postImages: File[]) {
        return addPost(postData, postImages, this._postRepository, this._cloudinary);
    }
}