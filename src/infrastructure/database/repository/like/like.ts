
import { IPostLikes } from "../../../../domain/likes";
import PostLikesModel from "../../models/postLikes";


export const like = async({
    postId,
    postLikesModel,
    userId,
}:{
    postId:string,
    postLikesModel:typeof PostLikesModel,
    userId:string
}):Promise<IPostLikes>=> {
    // Create a new like entry
    const newLike = await postLikesModel.create({ postId, userId });
    return await newLike.save();
}