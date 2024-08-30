import { Next, Req, Res } from '../infrastructure/types/expressTypes';
import { PostUsecase } from '../usecase/usecase/usecase/postUsecase';

export class PostAdapter {
    private readonly _postUsecase: PostUsecase;

    constructor(postUsecase: PostUsecase) {
        this._postUsecase = postUsecase;
    }

    async addPost(req: Req, res: Res, next: Next) {
        try {
            const postData = { userId: req.userId, ...req.body };

            const response = await this._postUsecase.addPost(
                postData,
                req.files as Express.Multer.File[]
            );

            res.status(response.status).json({
                message: response.message,
                data: response.data,
                success: response.success,
            });
        } catch (error) {
            next(error);
        }
    }

    async likePost(req: Req, res: Res) {
        const { postId } = req.params;
        const { userId } = req as { userId: string };

        const response = await this._postUsecase.likePost({ postId, userId });

        res.status(response.status).json({
            message: response.message,
            data: response.data,
            success: response.success,
        });
    }

    async unLikePost(req: Req, res: Res) {
        const { postId } = req.params;
        const { userId } = req as { userId: string };

        const response = await this._postUsecase.unLIkePost({ postId, userId });

        res.status(response.status).json({
            message: response.message,
            data: response.data,
            success: response.success,
        });
    }

    async addComment(req: Req, res: Res) {
        const { postId } = req.params;
        const { userId } = req as { userId: string };
        const { text, parentId = null } = req.body;
        const response = await this._postUsecase.addComment({
            postId,
            userId,
            text,
            parentId,
        });

        res.status(response.status).json({
            message: response.message,
            data: response.data,
            success: response.success,
        });
    }

    async deleteComment(req: Req, res: Res) {
        const { commentId } = req.params;
        const { userId } = req as { userId: string };
        
        const response = await this._postUsecase.deleteComment({ commentId, userId });

        res.status(response.status).json({
            message: response.message,
            data: response.data,
            success: response.success,
        });
    }

    async getComments(req: Req, res: Res){
        const { postId } = req.params;
        const { page = 1, limit = 5, parentId = null } = req.query;

        const response = await this._postUsecase.getComments({
            page: Number(page),
            limit: Number(limit),
            postId,
            parentId: parentId as string | null,
        });


        res.status(response.status).json({
            message: response.message,
            data: response.data,
            success: response.success,
        });
    }

    async updateComment(req: Req, res: Res){
        const { postId,commentId } = req.params;
        const { userId } = req as { userId: string };
        const { text } = req.body;
        const response = await this._postUsecase.updateComment({
            postId,
            commentId,
            userId,
            text,
        });

        res.status(response.status).json({
            message: response.message,
            data: response.data,
            success: response.success,
        });
    }
}
