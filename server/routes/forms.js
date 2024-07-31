import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import forms from '../controllers/forms.js';

const router = express.Router();


router.get('/',verifyToken,forms.getForms)

router.delete('/delete/:formId',verifyToken, forms.deleteForm);

router.post('/create',verifyToken, forms.createForm);

router.put('/update/:formId',verifyToken, forms.updateForm);

router.get('/public/:id', forms.getOneForm);

router.post('/submit/:id', forms.submitForm);

router.get('/submissions/:id',verifyToken, forms.getSubmittedForm);

export default router
