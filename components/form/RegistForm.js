import { useState, useRef } from "react";
import { nanoid } from "nanoid";
import classes from "./GeneralForm.module.css";

export default function RegistForm(props) {
  const USER_NAME_INPUT_REF = useRef();

  const [isDisabled, setIsDisabled] = useState(false);

  function submitHandler(e) {
    e.preventDefault();
    setIsDisabled(true);
    const ENTERED_USER_NAME = USER_NAME_INPUT_REF.current.value;
    const ENTERED_ID = nanoid();

    const USER_ACCOUNT = {
      userName: ENTERED_USER_NAME,
      userId: ENTERED_ID,
    };
    props.onRegister(USER_ACCOUNT);
  }
  return (
    <form onSubmit={submitHandler} className={classes.container}>
      <div className={classes.form}>
        <h1 className={classes.title}>Welcome to the Registration Screen</h1>
        <div className={classes.LoginGroup}>
          <h3 className={`${classes.container} ${classes.details}`}>
            Enter the following information
          </h3>
          <div className={classes.container}>
            <label htmlFor="user_Name" className={classes.label}>
              User Name:{" "}
            </label>
            <input
              type="text"
              id="user_Name"
              required
              ref={USER_NAME_INPUT_REF}
              className={classes.textField}
            ></input>
          </div>

          <div className={classes.submitButton}>
            <button disabled={isDisabled}>Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
}
