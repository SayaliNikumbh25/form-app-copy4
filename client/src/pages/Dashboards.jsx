import React from 'react'
import { useState, useEffect } from 'react'
import { createFolder, deleteFolder, getFolders, getForms, deleteForm } from '../services/api.js';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Folder from '../components/Folder.jsx';
import Form from '../components/Form.jsx';
import styles from './Dashboards.module.css';

const Dashboards = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const name = localStorage.getItem('userName')
    const userID = localStorage.getItem('userID')
    const token = localStorage.getItem("token")
    useEffect(()=>{
        setUserName(name)
    }) 
    
    useEffect(()=>{
        if(localStorage.getItem("folderID")){
            localStorage.removeItem("folderID")
        }
        if(localStorage.getItem("id")){
            localStorage.removeItem("id")
        }
    })

   
  return (   
    <>
    <div className={styles.navbar}>
        <Navbar userName={userName} userID = {userID}/>
    </div>

    <div className={styles.mainContainer}>
        <div>
            <Folder userID={userID} token ={token} />
        </div>
        <div>
            <Form userID={userID} token ={token}/>
        </div>
        
    </div>

    </>
    
  )
}

export default Dashboards