import React from "react";
import { useState, useEffect } from "react";
import styles from "../pages/Workspace.module.css";
import text from "../assets/text.png";
import button from "../assets/button.png";
import date from "../assets/date.png";
import email from "../assets/email.png";
import flag from "../assets/flag.png";
import gif from "../assets/gif.png";
import image from "../assets/image.png";
import number from "../assets/number.png";
import phone from "../assets/phone.png";
import rating from "../assets/rating.png";
import textInput from "../assets/textInput.png";
import video from "../assets/video.png";
import deleteIcon from "../assets/dashboard/deleteIcon.png";

const Flow = ({ fields, setFields, error, errorIdList }) => {
  const [counts, setCounts] = useState({
    Text: 0,
    Image: 0,
    Video: 0,
    GIF: 0,
    TextInput: 0,
    Number: 0,
    Email: 0,
    Phone: 0,
    Date: 0,
    Rating: 0,
    Button: 0,
  });

  useEffect(()=>{
    console.log(fields)
  },[fields])

  const addField = (inputType, type) => {
  const newCount = counts[inputType] + 1;

    setCounts({ ...counts, [inputType]: newCount });

    setFields([
      ...fields,
      {
        inputType,
        type,
        id: `${inputType} ${newCount}`,
        label: ""
      },
    ]);
  };

  const handleDelete = (index) => {
    setFields(fields.filter((i) => i !== fields[index]));
  };

  const handleFieldChange = (index, field) => {
    const newFields = [...fields];
    newFields[index] = field;
    setFields(newFields);
  };

  return (
    <div className={styles.flowContainer}>
      <div className={styles.widgetContainer}>
        <h3 className={styles.title}>Bubbles</h3>
        <div className={styles.bubbles}>
          <button
            onClick={() => {
              addField("Text", "bubles");
            }}
          >
            {" "}
            <img src={text} alt="image" />
            &nbsp;&nbsp; Text
          </button>
          <button
            onClick={() => {
              addField("Image", "bubles");
            }}
          >
            <img src={image} alt="image" />
            &nbsp;&nbsp; Image
          </button>
          <button
            onClick={() => {
              addField("Video", "bubles");
            }}
          >
            <img src={video} alt="image" />
            &nbsp;&nbsp; Video
          </button>
          <button
            onClick={() => {
              addField("GIF", "bubles");
            }}
          >
            <img src={gif} alt="image" />
            &nbsp;&nbsp; GIF
          </button>
        </div>
        <br />
        <h3 className={styles.title}>Inputs</h3>
        <div className={styles.bubbles}>
          <button onClick={() => addField("TextInput", "inputs")}>
            <img src={textInput} alt="image" /> &nbsp;&nbsp; Text
          </button>
          <button onClick={() => addField("Number", "inputs")}>
            <img src={number} alt="image" />
            &nbsp;&nbsp; Number
          </button>
          <button onClick={() => addField("Email", "inputs")}>
            <img src={email} alt="image" />
            &nbsp;&nbsp; Email
          </button>
          <button onClick={() => addField("Phone", "inputs")}>
            <img src={phone} alt="image" />
            &nbsp;&nbsp; Phone
          </button>
          <button onClick={() => addField("Date", "inputs")}>
            <img src={date} alt="image" />
            &nbsp;&nbsp; Date
          </button>
          <button onClick={() => addField("Rating", "inputs")}>
            <img src={rating} alt="image" />
            &nbsp;&nbsp; Rating
          </button>
          <button onClick={() => addField("Button", "inputs")}>
            <img src={button} alt="image" />
            &nbsp;&nbsp; Button
          </button>
        </div>
      </div>
      <div className={styles.fieldsContainer}>
        <div className={styles.feildsDiv}>
          <div className={styles.startDiv}>
            <img src={flag} alt="flag" /> &nbsp;&nbsp;&nbsp; <h3>Start</h3>
          </div>
          {error.title && <p className={styles.errorMessage}>Enter title</p>}
          {error.fields && <p className={styles.errorMessage} >No fildes added</p>}
          {fields.map((field, index) => {
            if (field.type == "bubles") {
              return (
                <div className={styles.bubblesField} key={index}>
                  <h4>{field.id}</h4>
                  <input
                    type="text"
                    placeholder={`Click to add ${field.inputType}`}
                    value={field.label}
                    className={styles.input}
                    onChange={(e) =>
                      handleFieldChange(index, {
                        ...field,
                        label: e.target.value,
                      })
                    }
                  />
                  <div
                    className={styles.deleteIconDiv}
                    onClick={() => {
                      handleDelete(index);
                    }}
                  >
                    <img src={deleteIcon} alt="deleteIcon" />
                  </div>
                  {errorIdList.includes(index) && <p style={{color:"#FF4141"}}>Please enter the value</p>}
                </div>
              );
            }
            if (field.inputType == "Button") {
              return (
                <div className={styles.bubblesField} key={index}>
                  <h4>Input {field.id}</h4>
                  <input
                    type="text"
                    value={field.label}
                    className={styles.input}
                    onChange={(e) =>
                      handleFieldChange(index, {
                        ...field,
                        label: e.target.value,
                      })
                    }
                  />
                  <div
                    className={styles.deleteIconDiv}
                    onClick={() => {
                      handleDelete(index);
                    }}
                  >
                    <img src={deleteIcon} alt="deleteIcon" />
                  </div>
                  {errorIdList.includes(index) && <p style={{color:"#FF4141"}}>Please enter the value</p>}
                </div>
              );
            }
            return (
              <div className={styles.bubblesField} key={index}>
                <h4>Input {field.id}</h4>
                <p>
                  Hint : User will input a {field.inputType.toLowerCase()} on
                  his form
                </p>
                <div
                  className={styles.deleteIconDiv}
                  onClick={() => {
                    handleDelete(index);
                  }}
                >
                  <img src={deleteIcon} alt="deleteIcon" />
                </div>
                {errorIdList.includes(index) && <p style={{color:"#FF4141"}}>Please enter the value</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Flow;
