import Folder from "../models/Folder.js";
import Form from "../models/Form.js"

const getFolder = async(req,res)=>{
    const {userID} = req.params;
      const folders = await Folder.find({
        refUserId:userID
      });
      if (!folders) {
          return res.status(404).json({ message: 'Folders not found'  });
        }
      res.status(200).json(folders)
  }

const createFolder = async (req, res) => {
    const {title , userID} = req.body;
    try {
      const newFolder = new Folder({ title , refUserId:userID });
      await newFolder.save();
      console.log(newFolder)
      res.status(201).json(newFolder);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

const deleteFolder = async (req, res) => {
    try {
      const {folderId} = req.params;
      const response = await Folder.findByIdAndDelete(folderId)
      const forms = await Form.deleteMany({ refFolderId: folderId });
      console.log(forms)
      console.log(response)
      res.status(201).json({response});
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }


export default {getFolder, createFolder, deleteFolder}