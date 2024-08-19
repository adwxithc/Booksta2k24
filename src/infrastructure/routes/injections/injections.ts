import { PostAdapter } from "../../../controller/postAdapter";
import { PostUsecase } from "../../../usecase/usecase/postUsecase";
import PostModel from "../../database/models/post";
import { PostRepository } from "../../database/repository/postRepository";
import { CloudinaryService } from "../../services/cloudinary";


const postRepository = new PostRepository(PostModel);

const cloudinary = new CloudinaryService();

const postUsecase = new PostUsecase(postRepository, cloudinary);

const postAdapter = new PostAdapter(postUsecase);

export {postAdapter, postRepository};