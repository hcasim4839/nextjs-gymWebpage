import { useState, useRef } from "react";
import { nanoid } from "nanoid";
import Card from "../ui/Card";
import classes from "./RegistForm.module.css";
export default function RegistForm(props) {
  const FIRST_NAME_INPUT_REF = useRef();
  const LAST_NAME_INPUT_REF = useRef();
  const [isDisabled, setIsDisabled] = useState(false);

  function submitHandler(e) {
    e.preventDefault();
    setIsDisabled(true);
    const ENTERED_FIRST_NAME = FIRST_NAME_INPUT_REF.current.value;
    const ENTERED_LAST_NAME = LAST_NAME_INPUT_REF.current.value;
    const ENTERED_ID = nanoid();

    const USER_ACCOUNT = {
      firstName: ENTERED_FIRST_NAME,
      lastName: ENTERED_LAST_NAME,
      userId: ENTERED_ID,
    };
    props.onRegister(USER_ACCOUNT);
  }
  return (
    <form onSubmit={submitHandler} className={classes.container}>
      <div>
        <h1>Welcome to the Registration Screen</h1>
        <Card>
          <h3 className={classes.container}>Enter the following information</h3>
          <div className={classes.container}>
            <label htmlFor="firstName" className={classes.label}>
              First Name:{" "}
            </label>
            <input
              type="text"
              id="firstName"
              required
              ref={FIRST_NAME_INPUT_REF}
              className={classes.textField}
            ></input>
          </div>
          <div className={classes.container}>
            <label htmlFor="lastName" className={classes.label}>
              Last Name:{" "}
            </label>
            <input
              type="text"
              id="lastName"
              required
              ref={LAST_NAME_INPUT_REF}
              className={classes.textField}
            ></input>
          </div>
          <div className={classes.submitButton}>
            <button disabled={isDisabled}>Submit</button>
          </div>
        </Card>
      </div>
    </form>
  );
}
