import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  background: { type: String },
  fields:  { type: Array, default: [] },
  responses: { 
    type: [
      {
        name: String,
        email: String,
        answers: Array,
        submittedAt: { type: Date, default: Date.now }
      } 
    ], 
    default: [] 
  },
  
  refUserId: {
    type: mongoose.ObjectId,
    },
  refFolderId: {
      type: mongoose.ObjectId,
      default: null
  },
  visits: { type: Number, default: 0 }
},
{ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const Form = mongoose.model('Form', FormSchema);

export default Form
