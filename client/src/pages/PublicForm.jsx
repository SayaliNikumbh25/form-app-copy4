import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPublicForm, submitForm } from "../services/api";
import styles from "./PublicForm.module.css";
import profile from "../assets/profile.png";
import send from "../assets/send.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PublicForm = () => {
  const [form, setForm] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState([]);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [fieldDisabled, setFieldDisabled] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [backGroundColor, setBackgroundColor] = useState("lightTheme");

  const { id } = useParams();
  let rating = 0;
  let inputText = "";
  let inputEmail = "";
  let inputPhone = "";
  let inputDate = "";
  let inputNumber = 0;

  useEffect(() => {
    fetchForm();
  }, [id]);

  const fetchForm = async () => {
    try {
      const res = await getPublicForm(id);
      console.log(res.data);
      setForm(res.data);
      setFieldDisabled(new Array(res.data.fields.length).fill(false));
      setBackgroundColor(res.data.background);
    } catch (error) {
      console.error("Error fetching form:", error.response.data);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = async (index, value) => {
    setAnswers([...answers, value]);

    if (!name) {
      toast.error("Name is required.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email address.");
      return;
    }

    try {
      if (value) {
        console.log(value);
        const res = await submitForm(id, {
          name,
          email,
          answers: [...answers, value],
        });
        console.log(res);
        handleNextField(index);
      }
    } catch (error) {
      console.error("Error saving response:", error.response.data);
    }
  };

  const handleNextField = (index) => {
    const newFieldDisabled = [...fieldDisabled];
    newFieldDisabled[index] = true;
    setFieldDisabled(newFieldDisabled);

    if (currentFieldIndex < form.fields.length - 1) {
      setTimeout(() => {
        setCurrentFieldIndex(currentFieldIndex + 1);
      }, 2000);
    } else {
      // Display confirmation message when form is successfully submitted
      toast.success("Form submitted successfully!");
    }
  };

  const validateInput = (value, type) => {
    if (!value) {
      return false;
    }
    switch (type) {
      case "Email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "Number":
        return !isNaN(value);
      case "TextInput":
      case "Phone":
      case "Date":
        return true; // Assuming other types are always valid if not empty
      default:
        return false;
    }
  };

  const renderField = (field, index) => {
    const disabled = fieldDisabled[index];
    switch (field.inputType) {
      case "TextInput":
        return (
          <div className={styles.inputDiv} key={index}>
            <input
              type="text"
              placeholder="Enter your text"
              className={`${styles.inputes} ${disabled ? styles.disabledInput : ""}`}
              onBlur={(e) => (inputText = e.target.value)}
              disabled={disabled}
              required
            />
            <button
              type="button"
              className={`${styles.buttons} ${disabled ? styles.disabledButton : ""}`}
              onClick={() => {
                if (validateInput(inputText, field.inputType)) {
                  handleInputChange(index, inputText);
                } else {
                  toast.error("Please enter valid text.");
                }
              }}
              disabled={disabled}
            >
              <img className={styles.buttonImage} src={send} alt="send" />
            </button>
          </div>
        );

      case "Email":
        return (
          <div className={styles.inputDiv} key={index}>
            <input
              type="email"
              placeholder="Enter your email"
              className={`${styles.inputes} ${disabled ? styles.disabledInput : ""}`}
              onBlur={(e) => (inputEmail = e.target.value)}
              disabled={disabled}
              required
            />
            <button
              type="button"
              className={`${styles.buttons} ${disabled ? styles.disabledButton : ""}`}
              onClick={() => {
                if (validateInput(inputEmail, field.inputType)) {
                  handleInputChange(index, inputEmail);
                } else {
                  toast.error("Please enter a valid email address.");
                }
              }}
              disabled={disabled}
            >
              <img className={styles.buttonImage} src={send} alt="send" />
            </button>
          </div>
        );

      case "Phone":
        return (
          <div className={styles.inputDiv} key={index}>
            <input
              type="tel"
              placeholder="Enter your phone"
              className={`${styles.inputes} ${disabled ? styles.disabledInput : ""}`}
              onBlur={(e) => (inputPhone = e.target.value)}
              disabled={disabled}
              required
            />
            <button
              type="button"
              className={`${styles.buttons} ${disabled ? styles.disabledButton : ""}`}
              onClick={() => {
                if (validateInput(inputPhone, field.inputType)) {
                  handleInputChange(index, inputPhone);
                } else {
                  toast.error("Please enter a valid phone number.");
                }
              }}
              disabled={disabled}
            >
              <img className={styles.buttonImage} src={send} alt="send" />
            </button>
          </div>
        );

      case "Number":
        return (
          <div className={styles.inputDiv} key={index}>
            <input
              type="number"
              placeholder="Enter a number"
              className={`${styles.inputes} ${disabled ? styles.disabledInput : ""}`}
              onBlur={(e) => (inputNumber = e.target.value)}
              disabled={disabled}
              required
            />
            <button
              type="button"
              className={`${styles.buttons} ${disabled ? styles.disabledButton : ""}`}
              onClick={() => {
                if (validateInput(inputNumber, field.inputType)) {
                  handleInputChange(index, inputNumber);
                } else {
                  toast.error("Please enter a valid number.");
                }
              }}
              disabled={disabled}
            >
              <img className={styles.buttonImage} src={send} alt="send" />
            </button>
          </div>
        );

      case "Rating":
        return (
          <div className={styles.inputDiv} key={index}>
            <div
              className={`${styles.inputes} ${styles.inputesRating} ${disabled ? styles.disabledInput : ""}`}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <input
                  key={value}
                  type="button"
                  value={value}
                  className={`${styles.ratingButtons} ${selectedRating === value ? styles.selectedRating : ""}`}
                  onClick={(e) => setSelectedRating(Number(e.target.value))}
                  disabled={disabled}
                />
              ))}
            </div>
            <div>
              <button
                type="button"
                className={`${styles.buttons} ${disabled ? styles.disabledButton : ""}`}
                onClick={() => handleInputChange(index, selectedRating)}
                disabled={disabled}
              >
                <img className={styles.buttonImage} src={send} alt="send" />
              </button>
            </div>
          </div>
        );

      case "Date":
        return (
          <div className={styles.inputDiv} key={index}>
            <input
              type="date"
              id="date"
              placeholder="Select a date"
              className={`${styles.inputes} ${disabled ? styles.disabledInput : ""}`}
              onBlur={(e) => (inputDate = e.target.value)}
              disabled={disabled}
              required
            />
            <button
              type="button"
              className={`${styles.buttons} ${disabled ? styles.disabledButton : ""}`}
              onClick={() => handleInputChange(index, inputDate)}
              disabled={disabled}
            >
              <img className={styles.buttonImage} src={send} alt="send" />
            </button>
          </div>
        );

      case "Image":
        return (
          <div className={styles.bubblesDiv} key={index}>
            <img
              src={field.label}
              alt={field.id}
              className={styles.bubbleImage}
              onLoad={() => handleNextField(index)}
            />
          </div>
        );

      case "Video":
        return (
          <div className={styles.bubblesDiv} key={index}>
            <video
              className={styles.bubbleImage}
              onEnded={() => handleNextField(index)}
              controls
            >
              <source src={field.label} />
              Your browser does not support the video tag.
            </video>
          </div>
        );

      case "GIF":
        return (
          <div className={styles.bubblesDiv} key={index}>
            <img
              src={field.label}
              alt={field.id}
              className={styles.bubbleImage}
              onLoad={() => handleNextField(index)}
            />
          </div>
        );

      case "Button":
        return (
          <div className={styles.inputDiv} key={index}>
            <button
              type="button"
              className={`${styles.inputButton} ${disabled ? styles.disabledInputButton : ""}`}
              onClick={() => handleInputChange(index, field.label)}
              disabled={fieldDisabled[index]}
            >
              {field.label}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`${styles.container} ${styles[backGroundColor]}`}>
      <div className={styles.formContainer}>
        <form>
          <div className={styles.inputDiv}>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              className={styles.inputes}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputDiv}>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              className={styles.inputes}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {name && email && form.fields
            .slice(0, currentFieldIndex + 1)
            .map((field, index) => {
              if (field.type === "inputs") {
                return renderField(field, index);
              } else if (field.type === "bubles") {
                if (field.inputType === "Text") {
                  if (currentFieldIndex < form.fields.length - 1) {
                    setTimeout(() => {
                      if (form.fields[currentFieldIndex].type === "bubles") {
                        setCurrentFieldIndex(currentFieldIndex + 1);
                      }
                    }, 2000);
                  }
                  return (
                    <div className={styles.inputLabel} key={index}>
                      <div className={styles.profileImagediv}>
                        <img
                          className={styles.profileImage}
                          src={profile}
                          alt="profileImage"
                        />
                      </div>
                      <label className={styles.text}>{field.label}</label>
                    </div>
                  );
                }
                return renderField(field, index);
              }
            })}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PublicForm;
