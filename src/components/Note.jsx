import React, { useState } from "react";
import styles from "./css/Note.module.css";

const axios = require("axios");

const Edit = ({ id, note, setShowEditBox, setDatam }) => {
  const [editedValue, setEditedValue] = useState(note);
  const handleSave = (e) => {
    e.preventDefault();
    if (editedValue.split(" ").length <= 100) {
      const latestDateTime = new Date();
      axios.patch("http://localhost:3001/notes/" + id, {
        note: editedValue,
        dateTime: latestDateTime.toLocaleString(),
      });

      axios
        .get("http://localhost:3001/notes")
        .then((res) => setDatam(res.data));

      setShowEditBox(false);
    } else {
      alert("Word limit : 100 words only");
    }
  };
  const handleCancel = () => {
    setShowEditBox(false);
  };

  return (
    <div className={styles.editBox}>
      <form onSubmit={handleSave} spellcheck="false">
        {/* <input type="text" value={note} /> */}
        <textarea
          name="editbox"
          id="edit_box"
          cols="30"
          rows="25"
          onChange={(e) => setEditedValue(e.target.value)}
          value={editedValue}
          autofocus
        ></textarea>

        <button onClick={handleCancel}>Cancel</button>
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

const Note = ({ id, username, note, dateTime, setDatam }) => {
  const [showEditBox, setShowEditBox] = useState(false);
  const handleEdit = () => {
    setShowEditBox(true);
  };
  const handleDelete = () => {
    axios.delete("http://localhost:3001/notes/" + id);
  };
  return showEditBox ? (
    <Edit
      note={note}
      id={id}
      setShowEditBox={setShowEditBox}
      setDatam={setDatam}
    />
  ) : (
    <div className={styles.box}>
      <h3>User : {username}</h3>
      <p>{note}</p>
      <h4>Last Updated : {dateTime}</h4>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Note;
