import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getForms, deleteForm } from '../services/api.js';
import styles from '../pages/Dashboards.module.css';
import deleteIcon from '../assets/dashboard/deleteIcon.png'

const Form = ({userID, token}) => {
  const [forms, setForms] = useState([])
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [formId , setFormId] = useState(null);
  
  const folderID = localStorage.getItem("folderID")
  const navigate = useNavigate();

  useEffect(()=>{
    handelGetForms()
    },[folderID])

const handelGetForms = async()=>{
    try {
        
        const response = await getForms({userID, folderID},token)
        setForms(response.data)
        console.log(response.data)
        
    } catch (error) {
        console.error('Error geting Forms:', error);
    }
    
}

const handelDeleteForm = async(formId)=>{
    console.log(formId)
    try {
        const res = await deleteForm(formId, token)
        if(res.status == 201){
            setForms(forms.filter((form)=>(form._id !== formId)))
            setShowConfirmPopup(false)
        }
    } catch (error) {
        console.error('Error deleting form:', error.response.data);
    }
}

const handleEditForm = (form) => {
  localStorage.setItem('id',form._id)
  navigate("/workspace", { state: { form } });
};
  return (
    <>
      <div className={styles.formContainer}>
      <div className={styles.createFormDiv} onClick={() => navigate("/workspace")}> <span style={{fontSize:'5rem', fontWeight :"200"}}>+</span> <span style={{fontSize:'1.2rem'}}>Create a typebot</span> </div>
      {forms.map((form, index) => (
        <>
        <div  key={index} className={styles.formDiv}>
          <div onClick={() => handleEditForm(form)} className={styles.formTitle} >
          <p >{form.title}</p>
          </div>
          
          <div className={styles.deleteButtonDiv}>
            <button className={styles.deleteButton} onClick={() => {setShowConfirmPopup(true); setFormId(form._id)}}>
              <img style={{width:"1.5rem"}} src={deleteIcon} alt="deleteIcon" />
            </button>
          </div>
        </div>

          
        </>
        
        
      ))}
    </div>

      {showConfirmPopup && (
          <div className={styles.popupContainer}>
            <div className={styles.popup}>
            <p className={styles.popupPara}>Are you sure you want to delete this Form ?</p>
            <div className={styles.popupButtonDiv}>
                <div className={styles.popupButton} style={{borderRight: "3px solid #27282a"}} onClick={() => handelDeleteForm(formId)}>Confirm</div>
                <div className={styles.popupButton} onClick={() => setShowConfirmPopup(false)}>Cancel</div>
            </div>
            
          </div>
        </div>
      )}
    </>
    
  );
};

export default Form;
