import Form from '../models/Form.js'

const getForms = async(req,res)=>{
    try {
      const {userID, folderID} = req.query;
      console.log(userID, folderID)
      let forms = []
      if(folderID){
        forms = await Form.find({
          refUserId:userID,
          refFolderId:folderID
        });
        console.log("folders")
      }else{
        forms = await Form.find({
          refUserId:userID,
          refFolderId:null
        });
        console.log("forms")
      }
      
      if (!forms) {
          return res.status(404).json({ message: 'Forms not found'  });
        }
      
      res.status(200).json(forms)
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
     
  }


  const deleteForm = async (req, res) => {
    try {
      const {formId} = req.params;
      const response = await Form.findByIdAndDelete(formId)
      console.log(response)
  
      res.status(201).json({response});
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  const createForm = async (req, res) => {
    const { title, background, fields } = req.body;
    console.log(title, background, fields)
    const refUserId = req.body.userID
    const refFolderId = req.body.folderID || null
    try {
      const newForm = new Form({ title, background, fields, refUserId, refFolderId  });
      const response  = await newForm.save();
      console.log(response)
      res.status(201).json(newForm);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }


  const updateForm = async (req, res) => {
    const { formId } = req.params;
    const updatedFormData = req.body;
  
    try {
      const updatedForm = await Form.findByIdAndUpdate(formId, updatedFormData, { new: true });
  
      if (!updatedForm) {
        return res.status(404).json({ message: 'Form not found' });
      }
  
      res.status(200).json(updatedForm);
    } catch (error) {
      console.error('Error updating form:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }


  const getOneForm = async (req, res) => {
    try {
      const form = await Form.findById(req.params.id);
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
      form.visits += 1;
      await form.save();
      res.status(200).json(form);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }


  const submitForm = async (req, res) => {
    const { name, email, answers } = req.body;
    try {
      const form = await Form.findById(req.params.id);
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
      // Find existing response by the same user, if any
      const existingResponseIndex = form.responses.findIndex(r => r.name === name && r.email === email);
      if (existingResponseIndex > -1) {
        form.responses[existingResponseIndex].answers = answers
      } else {
        form.responses.push({ name, email, answers });
      }
      await form.save();
      res.status(200).json({ message: 'Response submitted' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  const getSubmittedForm = async (req, res) => {
    try {
      const form = await Form.findById(req.params.id);
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
      res.status(200).json(form);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  export default {getForms, deleteForm, createForm, updateForm, getOneForm,submitForm , getSubmittedForm}