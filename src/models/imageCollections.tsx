import mongoose, {Schema} from "mongoose";

export const imageCollectionsSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    image:{
        type: Object,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }

})

export const imageCollectionsModel = mongoose.models.imageCollections || 
mongoose.model("imageCollections", imageCollectionsSchema)