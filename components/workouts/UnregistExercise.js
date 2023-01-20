import { useState } from "react";
import Card from "../ui/Card";
import classes from "./UnregistExercise.module.css";
function Exercise(props) {
  const [disabled, setDisabled] = useState(false);

  return (
    <li key={"unregistExercise" + props.exerciseName}>
      <Card>
        <div className={classes.container}>
          <input
            className={classes.button}
            type="button"
            onClick={() => {
              props.userExerciseHandler(props.exerciseName);
              setDisabled(true);
            }}
            disabled={disabled}
            value={props.buttonValue}
          />
          <label className={classes.exerciseLabel}>{props.exerciseName}</label>

          <label className={classes.exerciseDetails}>Sets:</label>
          <label>{props.sets}</label>

          <label className={classes.exerciseDetails}> Reps: </label>
          <label>{props.reps}</label>
        </div>
      </Card>
    </li>
  );
}
export default Exercise;
