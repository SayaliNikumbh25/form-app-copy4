import express from "express"
import folder from "../controllers/folder.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

router.get('/:userID', verifyToken, folder.getFolder)

router.post('/create',verifyToken, folder.createFolder);

router.delete('/delete/:folderId',verifyToken, folder.deleteFolder);

export default router