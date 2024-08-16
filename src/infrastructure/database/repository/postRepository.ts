import { IPost } from "../../../domain/post";
import { IPostRepository } from "../../../usecase/usecase/interface/repository/IpostRepository";
import PostModel from "../models/post";
import { addPost } from "./post/addPost";


export class PostRepository implements IPostRepository {
    
    constructor(
        private readonly postModel: typeof PostModel
    ){}

    addPost(postData: IPost): Promise<IPost | null>{
        return addPost(postData, this.postModel);
    }

}