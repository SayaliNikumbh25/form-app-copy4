import React from 'react'
import { useState, useEffect } from 'react';
import { createFolder, deleteFolder, getFolders } from '../services/api.js';
import { Navigate, useNavigate } from 'react-router-dom';
import styles from '../pages/Dashboards.module.css';
import deleteIcon from '../assets/dashboard/deleteIcon.png'
import createFolderIcon from '../assets/dashboard/createFolder.png'

const Folder = ({userID, token}) => {
    const [showCreateFolderPopup, setShowCreateFolderPopup] = useState(false);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [id, setId] = useState(null)
    const [folders, setFolders] = useState([])
    const [title, setTitle] = useState('')

    const  navigate = useNavigate();
    

    useEffect(()=>{
        handelGetFolders()
    },[])

    const handelGetFolders = async()=>{
        try {
            const response = await getFolders(userID,token)
            setFolders(response.data)
            
        } catch (error) {
            console.error('Error geting folder:', error.response.data);
        }
        
    }

    const handelCreateFolder =async ()=>{
        try {
            const res = await createFolder ({title,userID},token)
            setFolders([...folders, res.data]);
            setTitle('');
            setShowCreateFolderPopup(false);
        } catch (error) {
            console.error('Error creating folder:', error.response.data);
        }
    }

    const handelDeleteFolder = async(folderId)=>{
        console.log(folderId)
        try {
            const res = await deleteFolder(folderId, token)
            if(res.status == 201){
                setFolders(folders.filter((folder)=>(folder._id !== folderId)))
                setShowConfirmPopup(false)
            }
        } catch (error) {
            console.error('Error deleting folder:', error.response.data);
        }
    }


    const handlerShowForms =(folderId)=>{
        try {
            localStorage.setItem("folderID",folderId)
            navigate(`/folder/forms/${folderId}`)
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    }
  return (
    <>
        <div className={styles.folderContainer}>
            <div className={styles.createFolder} onClick={()=>setShowCreateFolderPopup(true)}>
            <img src={createFolderIcon} alt="createFolderIcon"  style={{width: '1.2rem'}}/> &nbsp; Create folder 
            </div>
            {folders.map((folder, index)=>(
                <div className={styles.createFolder} key={index}>
                    <div onClick={()=>handlerShowForms(folder._id)}>
                       {folder.title}
                    </div> &nbsp;&nbsp;&nbsp;
                    <button className={styles.deleteButton} onClick={()=> {setShowConfirmPopup(true);  setId(folder._id)}}>
                        <img style={{width: '1.2rem'}} src={deleteIcon} alt='deleteIcon'/>
                    </button>
                
                </div>
            ))}
        </div>

        {showCreateFolderPopup && (
        <div className={styles.popupContainer}>
          <div className={styles.popup}>
            <h1 className={styles.popupHeading}>Create New Folder</h1>
            <input 
              type="text" 
              placeholder="Enter folder name"
              autoComplete="off"
              value={title}
              className={styles.popupInput}
              onInput={(e) => setTitle(e.target.value)}
            />
            <div className={styles.popupButtonDiv}>
                <div className={styles.popupButton} style={{borderRight: "3px solid #27282a"}} onClick={handelCreateFolder}>Done</div>
                <div className={styles.popupButton} onClick={() => setShowCreateFolderPopup(false)}>Cancel</div>
            </div>
            
          </div>
        </div>
      )}

        {showConfirmPopup && (
        <div className={styles.popupContainer}>
          <div className={styles.popup}>
            <p className={styles.popupPara}>Are you sure you want to delete this Folder ?</p>
            <div className={styles.popupButtonDiv}>
                <div className={styles.popupButton} style={{borderRight: "3px solid #27282a"}} onClick={()=>handelDeleteFolder(id)}>Confirm</div>
                <div className={styles.popupButton} onClick={() => setShowConfirmPopup(false)}>Cancel</div>
            </div>
            
          </div>
        </div>
      )}
    </>
    
  )
}

export default Folder