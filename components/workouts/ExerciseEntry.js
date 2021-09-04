import { useState } from "react";
import Card from "../ui/Card";
import { useRef } from "react";
import classes from "./ExerciseEntry.module.css";
const DAYS_OF_THE_WEEK = [
  "Sun.",
  "Mon.",
  "Tue.",
  "Wed.",
  "Thu.",
  "Fri.",
  "Sat.",
];

function Exercise(props) {
  const [addBtndisabled, setaddBtndisabled] = useState(false);
  const [userInputDisabled, setInputDisabled] = useState(false);
  const REPS_REFS = useRef();
  const SETS_REFS = useRef();
  const [weekdaysForExercise, setWeekdaysForExercise] = useState("0000000");

  function updateExerciseSched(weekdayIndex) {
    const first = weekdaysForExercise.substring(0, weekdayIndex);
    const second = weekdaysForExercise.substring(weekdayIndex + 1);

    const replacementValue = weekdaysForExercise.charAt(weekdayIndex);
    const updatedValue = replacementValue === "0" ? "1" : "0";
    setWeekdaysForExercise(first + updatedValue + second);
  }
  let LIST_OF_CHECKBOXES = [];

  LIST_OF_CHECKBOXES = DAYS_OF_THE_WEEK.map((weekday) => {
    const WEEKDAY_INDEX = DAYS_OF_THE_WEEK.indexOf(weekday);
    const [isChecked, setIsChecked] = useState(false);

    return (
      <div className={classes.checkboxContainer}>
        <label htmlFor={weekday + " checkbox"}>{weekday}</label>
        <input
          className={
            userInputDisabled ? classes.checkboxDisabled : classes.checkbox
          }
          type="checkbox"
          id={weekday + " checkbox"}
          onClick={() => {
            updateExerciseSched(WEEKDAY_INDEX);
            setIsChecked(!isChecked);
          }}
          disabled={userInputDisabled}
        ></input>
      </div>
    );
  });
  function submitToExerciseHandler() {
    const EXERCISE_OBJ = {
      exerciseName: props.exerciseName,
      reps: REPS_REFS.current.value,
      sets: SETS_REFS.current.value,
      weekdaysForExercise: weekdaysForExercise,
    };

    props.userExerciseHandler(EXERCISE_OBJ);
  }

  const DESCRIPTION =
    props.description === null ? <></> : <label>{props.description}</label>;
  return (
    <li key={"exerciseEntry" + props.exerciseName}>
      <Card>
        <form>
          <div className={classes.container}>
            <label className={classes.item}>{props.exerciseName}</label>
            <input
              className={classes.button}
              type="button"
              onClick={() => {
                submitToExerciseHandler();
                setaddBtndisabled(true);
                setInputDisabled(true);
              }}
              disabled={addBtndisabled}
              value={props.buttonValue}
            />

            <input
              className={classes.button}
              type="reset"
              value="Reset"
              onClick={() => {
                props.resetExerciseHandler(props.exerciseName);
                setInputDisabled(false);
                setaddBtndisabled(false);
              }}
            />
          </div>

          <h3 className={classes.checkboxTitle}>Weekdays for the exercise</h3>
          <div className={classes.container}>{LIST_OF_CHECKBOXES}</div>
          <label htmlFor="sets">Sets: </label>
          <input
            type="number"
            min="1"
            max="99"
            id="sets"
            ref={SETS_REFS}
            className={classes.cmb}
            disabled={userInputDisabled}
          ></input>
          <label> Reps: </label>
          <input
            type="number"
            min="1"
            max="99"
            ref={REPS_REFS}
            className={classes.cmb}
            disabled={userInputDisabled}
          ></input>
          {DESCRIPTION}
        </form>
      </Card>
    </li>
  );
}
export default Exercise;
