import React from 'react'
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import styles from "../pages/Workspace.module.css";

const WorkSpaceNavbar = ({fields,title, setTitle, saveForm , setShowFlow, setShowTheme, setShowResponse, formSaved, setFormSaved}) => {
  const navigate = useNavigate()
  const [linkcopied, setLinkcopied] = useState(false)
  let id = localStorage.getItem("id");
  let linkToCopy = `http://localhost:5173/form/${id}`; 

  const handleSaveForm = async() => {
    const res = await saveForm();
    navigate(`/form/${id}`)
    console.log(res)

  };
  useEffect(()=>{
    setFormSaved(false)
  },[fields])
  const handleCopyLink = () => {
    navigator.clipboard.writeText(linkToCopy)
      .then(() => {
        setLinkcopied(true);
        setTimeout(()=>{
          setLinkcopied(false)
        },2000)
      })
      .catch((err) => {
        console.error("Failed to copy the link: ", err);
      });
  };

  const handleCloseButton = ()=>{
    if(localStorage.getItem("id")){
      localStorage.removeItem("id")
    }
    navigate("/dashboard")
  }
  const handleFlow =()=>{
    setShowFlow(true);
    setShowResponse(false);
    setShowTheme(false);
  }

  const handleTheme =()=>{
    setShowFlow(false);
    setShowResponse(false);
    setShowTheme(true);
  }
  const handleResponse =()=>{
    setShowFlow(false);
    setShowResponse(true);
    setShowTheme(false);
  }

  
  return (
    <div className={styles.navbarcontainer}>
      <div className={styles.rightContainer}>
      <input className={styles.nameInput} type="text" placeholder="Enter Form Name" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.navButton} onClick={handleFlow}>Flow</div>
        <div className={styles.navButton} onClick={handleTheme}>Theme</div>
        <div className={styles.navButton} onClick={handleResponse}>Response</div>
      </div>
      <div className={styles.leftContainer}>
        <button onClick={handleCopyLink} 
        disabled={!formSaved}
        className={`${styles.shareButton} ${!formSaved ? styles.disabledButton : ''}`}
        >Share</button>
        <button className={styles.saveButton} onClick={handleSaveForm}>Save</button>
        <button className={styles.closeButton} onClick={handleCloseButton}>X</button>
         {linkcopied && <button className={styles.copyButton}>✔️ Link copied</button>}
      </div>

      
    </div>
  )
}

export default WorkSpaceNavbar