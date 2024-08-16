import { Next, Req, Res } from "../infrastructure/types/expressTypes";
import { PostUsecase } from "../usecase/usecase/usecase/postUsecase";


export class PostAdapter {
    private readonly _postUsecase: PostUsecase;

    constructor(
        postUsecase: PostUsecase
    ) {
        this._postUsecase = postUsecase
    }

    async addPost(req:Req, res:Res, next:Next){
        try {           

            const postData = { userId: req.userId, ...req.body};

            const response = await this._postUsecase.addPost(postData, req.files as Express.Multer.File[]);

            res.status(response.status).json({
                message: response.message,
                data: response.data,
                success: response.success
            });

        } catch (error) {
            next(error);
        }
    }

}