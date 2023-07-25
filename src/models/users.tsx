import mongoose, { Document, Schema } from "mongoose";

interface UserDocument extends Document{
    firstName: string;
    lastName: string;
    wish: number;
    email: string;
    password: string;
    role: 'user' | 'admin';
    dateUpdated: Date;
    dateCreated: Date;
}

interface Methods {
    comparePassword(password: string): Promise<boolean>
}

export const usersSchema = new Schema<UserDocument, {}, Methods>({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true},
    wish:{ type: Number, default: 3 },
    email: { type: String, required: true},
    password: { type: String, required: true },
    role:{ type: String, enum: ['user', 'admin'], default: 'user' },
    dateUpdated:{ type: Date, default: Date.now },
    dateCreated:{ type: Date, default: Date.now }
})

export const usersModel = mongoose.models.users || 
    mongoose.model("users", usersSchema);
