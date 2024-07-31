import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createForm, updateForm } from "../services/api";
import WorkSpaceNavbar from "../components/WorkSpaceNavbar";
import Flow from "../components/Flow";
import Theme from "../components/Theme";
import styles from './Workspace.module.css';
import Submissions from "./Submissions.jsx";

const Workspace = () => {
  const { state } = useLocation();
  const [title, setTitle] = useState("");
  const [background, setBackground] = useState("lightTheme");
  const [fields, setFields] = useState([]);
  const [token, setToken] = useState("");
  const [showFlow, setShowFlow] = useState(true);
  const [showTheme, setShowTheme] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [formSaved, setFormSaved] = useState(false);
  const [errorIdList, setErrorIdList] = useState([])
  const [id, setId] =useState(0);

  const [error, setError] = useState({
       fields:false,
       title:false,
       inputfield:false
  });
  const navigate = useNavigate();
  let hasError = false

  useEffect(() => {
    // Fetch token from local storage or context
    const token = localStorage.getItem("token");
    setToken(token);
    if (state && state.form) {
      const { form } = state;
      setTitle(form.title);
      setBackground(form.background);
      setFields(form.fields);
      setFormSaved(true)
    }
  }, [state]);

  useEffect(()=>{
    setId(localStorage.getItem("id"))
  },[id])

  const userID = localStorage.getItem("userID");
  const folderID = localStorage.getItem("folderID");


  const saveForm = async () => {

    setError((prevState) => {
      return {
       fields:false,
       title:false,
       inputfield:false
      };
    });


    setErrorIdList([])

    if (!title){
      hasError = true;
      setError((prevState) => {
        return {
          ...prevState,
          title: true,
        };
      });
    }
      console.log("lengt",fields.length)
    if(fields.length == 0){
      hasError = true;
      setError((prevState) => {
        return {
          ...prevState,
          fields: true,
        };
      });
    }else{
      fields.map((field, index)=>{
        if(field.type =="bubles" && !field.label ){
            hasError = true;
            setErrorIdList((prevList) => [...prevList, index]);
        }
        if(field.inputType == "Button" && !field.label ){
          hasError = true;
          setErrorIdList((prevList) => [...prevList, index]);
        }
      })
    }

    
 
    if (!hasError){
      try {
        console.log(folderID);
        console.log(fields)
        if (state && state.form) {
          // Update existing form
          const res = await updateForm(
            state.form._id,
            { title, background, fields },
            token
          );
          console.log(res);
          const id = res.data._id;
          setId(res.data._id)
          localStorage.setItem("id", id);
          setFormSaved(true);
        }else if(id){
            // Update existing form
          const res = await updateForm(
            id,
            { title, background, fields },
            token
          );

          console.log(res);
          setFormSaved(true);
        } 
        
        else {
          // Create new form
          console.log("New form saving");
          const res = await createForm(
            { title, background, fields, userID, folderID },
            token
          );
          console.log("Form created:", res.data);
          console.log(res.data._id)
          setId(res.data._id)
          localStorage.setItem("id", res.data._id);
          setFormSaved(true);
        }
      } catch (error) {
        console.error("Error saving form:", error);
      }
    }
    console.log(id)
    
  };

  return (
    <div className={styles.mainContainer}>
      <WorkSpaceNavbar
        title={title}
        fields={fields}
        setTitle={setTitle}
        saveForm={saveForm}
        setShowFlow={setShowFlow}
        setShowTheme={setShowTheme}
        setShowResponse={setShowResponse}
        formSaved={formSaved}
        setFormSaved={setFormSaved}
      />
      {showFlow && <Flow fields={fields} setFields={setFields} error={error} errorIdList={errorIdList}/>}
      {showTheme && (
        <Theme background={background} setBackground={setBackground} />
      )}
      {showResponse && <Submissions id={id} fields={fields}  />}

    </div>
  );
};

export default Workspace;
