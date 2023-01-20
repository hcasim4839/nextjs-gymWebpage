import { useRef, useState } from "react";
import { nanoid } from "nanoid";
import styles from "./GeneralForm.module.css";

export default function GeneralForm({ onSubmitFunction, isRegistForm }) {
  const USER_NAME_INPUT_REF = useRef();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  function onSubmitHandler(e) {
    e.preventDefault();
    setIsSubmitDisabled(true);

    const USER_ACCOUNT = {
      userName: USER_NAME_INPUT_REF.current.value,
    };
    if (isRegistForm == true) {
      const ID = nanoid();
      USER_ACCOUNT["userId"] = ID;
    }

    onSubmitFunction(USER_ACCOUNT);
  }
  console.log("The form is the reg: " + isRegistForm);
  return (
    <form onSubmit={onSubmitHandler} className={styles.form}>
      <div className={styles.LoginGroup}>
        <h3 className={`${styles.container} ${styles.details}`}>
          Enter the following information
        </h3>
        <div className={styles.container}>
          <label htmlFor="user_Name" className={styles.label}>
            User Name:{" "}
          </label>
          <input
            type="text"
            id="user_Name"
            required
            ref={USER_NAME_INPUT_REF}
            className={styles.textField}
          ></input>
        </div>

        <div className={styles.submitButton}>
          <button disabled={isSubmitDisabled}>Submit</button>
        </div>
      </div>
    </form>
  );
}
