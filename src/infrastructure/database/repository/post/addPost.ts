import { IPost } from "../../../../domain/post";
import PostModel from "../../models/post";


export const addPost = async(
    postData: IPost,
    postModel: typeof PostModel
):Promise<IPost | null> => {
    try {
        //creating new post data
        const addData = await postModel.create(postData);
        const post =  await addData.save();
        if (post) {
            return post;
        } else {
            return null;
        }

    } catch (error) {
        throw error;
    }
}