import mongoose, { Schema } from "mongoose";
import { IUser } from "../../../domain/users";


// Define a schema for the user model
const userSchema: Schema<IUser & Document> = new Schema<IUser & Document>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
});


// Create a new Model for the user schema
const UserModel = mongoose.model<IUser & Document>("User", userSchema);

// Export the UserModel
export default UserModel;