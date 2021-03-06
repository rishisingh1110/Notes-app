import React from "react";
import styles from "./css/Form.module.css";

const axios = require("axios");

const Form = ({ usernam, setDatam, setUsername, setLogin }) => {
  const [editedValue, setEditedValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editedValue.split(" ").length <= 100) {
      const latestDateTime = new Date();
      axios.post("https://notes-app-json-server-rishi.herokuapp.com/notes", {
        username: usernam,
        note: editedValue,
        dateTime: latestDateTime.toLocaleString(),
      });

      axios
        .get("https://notes-app-json-server-rishi.herokuapp.com/notes")
        .then((res) => setDatam(res.data));

      setEditedValue("");
    } else {
      alert("Word limit : 100 words only");
    }
  };
  return (
    <div className={styles.formBox}>
      <form action="" onSubmit={handleSubmit}>
        <textarea
          name=""
          id=""
          cols="30"
          rows="5"
          placeholder="Write a note"
          autofocus
          onChange={(e) => setEditedValue(e.target.value)}
          value={editedValue}
        ></textarea>
        <input type="submit" />
        <button
          onClick={() => {
            setUsername("");
            setLogin(false);
          }}
        >
          Log Out
        </button>
      </form>
    </div>
  );
};

export default Form;
