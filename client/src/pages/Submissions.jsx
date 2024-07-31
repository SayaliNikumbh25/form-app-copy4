import React, { useState, useEffect } from "react";
import { getFormSubmissions } from "../services/api";
import styles from "./Submissions.module.css";

const Submissions = ({ id, fields }) => {
  const [submissions, setSubmissions] = useState([]);
  const [starts, setStarts] = useState(0);
  const [completionRate, setCompletionRate] = useState(0);
  const [views, setViews] = useState(0);
  const token = localStorage.getItem("token")
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await getFormSubmissions(id,token);
        setSubmissions(res.data.responses);
        setViews(res.data.visits);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching submissions:", error.response.data);
      }
    };
    fetchSubmissions();
  }, [id]);

  let totalFileds = fields.filter((field) => field.type != "bubles");
  useEffect(() => {
    const calculate = () => {
      let start_count = 0;
      let completion_count = 0;
      const totalFieldsCount = totalFileds.length;

      submissions.forEach((submission) => {
        if (submission.name) {
          start_count += 1;
        }

        if (submission.answers.length === totalFieldsCount) {
          completion_count += 1;
        }
      });

      const completionRate =
        start_count > 0
          ? Math.round((completion_count / start_count) * 100)
          : 0;

      setStarts(start_count);
      setCompletionRate(completionRate);
      console.log(starts, completionRate);
    };

    calculate();
  }, [submissions, totalFileds]);

  if (submissions.length === 0) return <div className={styles.noResponseDiv}>No Response yet collected</div>;

  let headers = [];

  fields.map((field, index) => {
    if (field.type == "inputs") {
      headers.push(field.id);
    }
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return (
      date.toLocaleDateString("en-US", options) +
      " " +
      date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    );
  };

  console.log(formatDate(29 - 7 - 2024));

  return (
    <div className={styles.Container}>
      <div className={styles.countContainer}>
        <div className={styles.countDiv}>
          <h3 className={styles.countHeading}>Views</h3>
          <span className={styles.count}>{views}</span>
        </div>
        <div className={styles.countDiv}>
          <h3 className={styles.countHeading}>Starts</h3>
          <span className={styles.count}>{starts}</span>
        </div>
        <div className={styles.countDiv}>
          <h3 className={styles.countHeading}>Completion rate</h3>
          <span className={styles.count}>{completionRate}%</span>
        </div>
      </div>
      <div className={styles.tableDiv}>
        <table>
          <thead>
            <tr>
              <th className={styles.data}></th>
              <th>🗓️ Submitted At</th>
              <th>Name</th>
              <th>Email</th>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => {
              const answersWithEmptyCells = Array.from(
                { length: headers.length },
                (_, i) => submission.answers[i] || ""
              );

              return (
                <tr key={index}>
                  <td className={styles.data}>{index + 1}</td>
                  <td>{formatDate(submission.submittedAt).trim()}</td>
                  <td>{submission.name}</td>
                  <td>{submission.email}</td>
                  {answersWithEmptyCells.map((ans, i) => (
                    <td key={i}>{ans}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Submissions;
