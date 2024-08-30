import { IComment } from '../../../../domain/comments';
import { HttpStatusCode } from '../../../../domain/types/httpStatusCodes';
import ErrorResponse from '../../../handler/errorResponse';
import { ICommentRepository } from '../../interface/repository/ICommentRepository';
import { IPostRepository } from '../../interface/repository/IpostRepository';

export const addComment = async ({
    postRepository,
    commetnRepository,
    text,
    postId,
    userId,
    parentId,
}: {
    postRepository: IPostRepository;
    commetnRepository: ICommentRepository;
    text: string;
    postId: string;
    userId: string;
    parentId: string;
}) => {
    const post = await postRepository.findById(postId);

    if (!post) throw ErrorResponse.badRequest('invalid post');

    const comment = {
        parentId,
        text,
        userId,
        postId,
    };

    const newComment = await commetnRepository.createComment(comment);

    return {
        status: HttpStatusCode.OK,
        success: true,
        message: "Comment added successfully",
        data: newComment
    }
};
