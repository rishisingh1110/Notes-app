import React from "react";
import styles from "./css/Login.module.css";

const Login = ({ setLogin, setUsername }) => {
  const [val, setVal] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const regEx = /^[0-9a-zA-Z]+$/;
    if (val.match(regEx)) {
      setUsername(val);
      setLogin(true);
    } else {
      alert("Please enter letters and numbers only.");
    }
  };
  return (
    <div className={styles.loginBox}>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
