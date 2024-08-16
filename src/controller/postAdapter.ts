import { Next, Req, Res } from "../infrastructure/types/expressTypes";
import { PostUsecase } from "../usecase/usecase/usecase/postUsecase";

// Class to handle the adding of a post
export class PostAdapter {
    // Private variable to store the PostUsecase
    private readonly _postUsecase: PostUsecase;

    // Constructor to initialize the PostUsecase
    constructor(
        postUsecase: PostUsecase
    ) {
        this._postUsecase = postUsecase
    }

    // Method to add a post
    async addPost(req:Req, res:Res, next:Next){
        try {           

            // Create a postData object with the userId and the body of the request
            const postData = { userId: req.userId, ...req.body};

            // Call the addPost method of the PostUsecase with the postData and the files
            const response = await this._postUsecase.addPost(postData, req.files as Express.Multer.File[]);

            // Send the response back to the client
            res.status(response.status).json({
                message: response.message,
                data: response.data,
                success: response.success
            });

        } catch (error) {
            // If an error occurs, call the next middleware
            next(error);
        }
    }

}