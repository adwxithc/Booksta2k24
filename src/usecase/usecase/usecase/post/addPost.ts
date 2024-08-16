import { IPost } from "../../../../domain/post";
import { HttpStatusCode } from "../../../../domain/types/httpStatusCodes";
import { ImageObj } from "../../../../domain/types/imageObj";
import ErrorResponse from "../../../handler/errorResponse";
import { IPostRepository } from "../../interface/repository/IpostRepository";
import { ICloudinary } from "../../interface/services/ICloudinary";
import { IResponse } from "../../interface/services/IResponse";

// Function to add a post to the database
export const addPost = async (
    postData: IPost,
    postImages: Express.Multer.File[],
    postRepository: IPostRepository,
    cloudinary: ICloudinary
): Promise<IResponse> => {
    try {

        // Check if there are any images to upload
        if (Object.values(postImages).length > 0) {

            // Create an array of promises to upload each image
            const imageUploadPromises = Object.values(postImages).flat().map(file => {

                // Check if the file buffer is undefined
                if (!file.buffer) {

                    console.log('File buffer is undefined for:', file.originalname);
                    throw new Error('File buffer is undefined');
                }

                console.log('Uploading file:', file.originalname);
                return cloudinary.uploadImage(file.buffer, 'booksta-user-posts');

            });

            // Wait for all images to be uploaded
            const uploadedImages: ImageObj[] = await Promise.all(imageUploadPromises);

            // Add image data to postData
            postData.content = uploadedImages.map(image => image);
        }

        // Add the post to the database
        const response = await postRepository.addPost(postData);

        // Check if the post was added successfully
        if (response) {
            return {
                status: HttpStatusCode.OK,
                success: true,
                message: "Post added successfully",
                data: response
            }
        } else {
            throw ErrorResponse.internalError;
        }

    } catch (error) {
        throw error;
    }
}