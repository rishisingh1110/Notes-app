import "./App.css";
import Form from "./components/Form";
import Note from "./components/Note";
import React from "react";
import Login from "./components/Login";

const axios = require("axios");

function App() {
  const [datam, setDatam] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [login, setLogin] = React.useState(false);
  const [username, setUsername] = React.useState("");

  React.useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:3001/notes")
      .then((res) => setDatam(res.data))
      .catch((err) => console.log(err));

    setLoading(false);
  }, [datam]);

  if (loading) return <p>Loading...</p>;
  else {
    if (login) {
      return (
        <div className="App">
          <Form
            usernam={username}
            setUsername={setUsername}
            setLogin={setLogin}
            setDatam={setDatam}
          />

          {datam
            .sort((a, b) => {
              return new Date(b.dateTime) - new Date(a.dateTime);
            })
            .map((el) => {
              return (
                <Note
                  key={el.id}
                  id={el.id}
                  username={el.username}
                  note={el.note}
                  dateTime={el.dateTime}
                  setDatam={setDatam}
                />
              );
            })}
        </div>
      );
    } else {
      return <Login setLogin={setLogin} setUsername={setUsername} />;
    }
  }
}

export default App;
