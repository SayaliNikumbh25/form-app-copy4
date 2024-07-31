import mongoose, { Schema } from "mongoose";

const FolderSchema = new Schema({
    title :{
        type: String,
        required: true 
    },
    refUserId: {
        type: mongoose.ObjectId,
    },
    refFormId: { type: Array, default: [] }
})

const Folder = mongoose.model('Folder', FolderSchema)

export default Folder