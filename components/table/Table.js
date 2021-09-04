import { CheckSquareOutlined } from "@ant-design/icons";
import classes from "./Table.module.css";
const DAYS_OF_THE_WEEK = [
  "Sun.",
  "Mon.",
  "Tue.",
  "Wed.",
  "Thu.",
  "Fri.",
  "Sat.",
];
const WEEK_SCHEDULE_TABLE_HEADERS = DAYS_OF_THE_WEEK.map((weekday) => (
  <th>{weekday}</th>
));

function Table(props) {
  let tableRecords = [];

  for (
    let currentExercise = 0;
    currentExercise < props.exerciseAmt;
    currentExercise++
  ) {
    const EXERCISE_NAME = props.exerciseInfo[currentExercise].exerciseName;
    const CHECK_MARK = "";
    let weekday = " " + props.exerciseInfo[currentExercise].exerciseWeekdays;
    weekday = weekday.trim();
    const WEEKDAY_LENGTH = weekday.length;

    const newRecord = (
      <tr className={classes.row}>
        <td key={EXERCISE_NAME} className={classes.exerciseColumn}>
          {EXERCISE_NAME}
        </td>
        <td className={classes.td} key={EXERCISE_NAME + DAYS_OF_THE_WEEK[0]}>
          {weekday.charAt(0) === "1" ? <CheckSquareOutlined /> : ""}
        </td>
        <td className={classes.td} key={EXERCISE_NAME + DAYS_OF_THE_WEEK[1]}>
          {weekday.charAt(1) === "1" ? <CheckSquareOutlined /> : ""}
        </td>
        <td className={classes.td} key={EXERCISE_NAME + DAYS_OF_THE_WEEK[2]}>
          {" "}
          {weekday.charAt(2) === "1" ? <CheckSquareOutlined /> : ""}
        </td>
        <td className={classes.td} key={EXERCISE_NAME + DAYS_OF_THE_WEEK[3]}>
          {weekday.charAt(3) === "1" ? <CheckSquareOutlined /> : ""}
        </td>
        <td className={classes.td} key={EXERCISE_NAME + DAYS_OF_THE_WEEK[4]}>
          {weekday.charAt(4) === "1" ? <CheckSquareOutlined /> : ""}
        </td>
        <td className={classes.td} key={EXERCISE_NAME + DAYS_OF_THE_WEEK[5]}>
          {weekday.charAt(5) === "1" ? <CheckSquareOutlined /> : ""}
        </td>
        <td className={classes.td} key={EXERCISE_NAME + DAYS_OF_THE_WEEK[6]}>
          {weekday.charAt(6) === "1" ? <CheckSquareOutlined /> : ""}
        </td>
      </tr>
    );

    tableRecords = [...tableRecords, newRecord];
  }
  return (
    <div className={classes.flexContainer}>
      <table className={classes.wrapper}>
        <caption className={classes.caption}>Weekly Schedule</caption>
        <thead>
          <tr>
            <th>Exercise</th>
            {WEEK_SCHEDULE_TABLE_HEADERS}
          </tr>
        </thead>
        <tbody>{tableRecords}</tbody>
      </table>
    </div>
  );
}

export default Table;
