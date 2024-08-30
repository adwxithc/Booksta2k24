import { PostAdapter } from '../../../controller/postAdapter';
import { PostUsecase } from '../../../usecase/usecase/usecase/postUsecase';
import PostModel from '../../database/models/post';
import PostLikesModel from '../../database/models/postLikes';
import { PostLikeRepository } from '../../database/repository/postLikeRepository';
import { PostRepository } from '../../database/repository/postRepository';
import { CloudinaryService } from '../../services/cloudinary';

const postRepository = new PostRepository(PostModel);
const postLikeRepository = new PostLikeRepository(PostLikesModel);

const cloudinary = new CloudinaryService();

const postUsecase = new PostUsecase({
    postRepository,
    cloudinary,
    postLikeRepository,
});

const postAdapter = new PostAdapter(postUsecase);

export { postAdapter, postRepository };
