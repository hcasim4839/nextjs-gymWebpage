import Card from "../../../components/ui/Card";
import Link from "next/link";
import Table from "../../../components/table/Table";
import { useRouter } from "next/router";
import Head from "next/head";
import classes from "../../../styles/userWorkouts.module.css";

export async function getServerSideProps(context) {
  const mssql = require("mssql/msnodesqlv8");
  const sqlConfig = new mssql.ConnectionPool({
    database: "NextjsGym",
    server: "DESKTOP-HC\\SQLEXPRESS",
    driver: "msnodesqlv8",
    options: {
      trustedConnection: true,
    },
  });
  let conn = await sqlConfig.connect();

  const userId = context.params.userWorkouts;

  let queryCmd = "Select * from UserExercises where UserId ='" + userId + "'";

  let sqlResultsJson = await sqlConfig.request().query(queryCmd);

  const AMT_OF_RECORDS = sqlResultsJson.recordsets[0].length;
  sqlResultsJson = sqlResultsJson.recordsets[0];

  conn.close();
  return {
    props: { sqlResultsJson, AMT_OF_RECORDS },
  };
}

function userWorkouts({ sqlResultsJson, AMT_OF_RECORDS }) {
  let listOfWorkouts = [];
  let workoutSchedule = [];
  const ROUTER = useRouter();
  const ID = ROUTER.query.userWorkouts;

  for (let workOutEntry = 0; workOutEntry < AMT_OF_RECORDS; workOutEntry++) {
    const EXERCISE = sqlResultsJson[workOutEntry].ExerciseName;
    const SETS = sqlResultsJson[workOutEntry].Sets;
    const REPS = sqlResultsJson[workOutEntry].Reps;
    const EXERCISE_WEEKDAYS = sqlResultsJson[workOutEntry].WeekdaysOfExercise;

    const ID = ROUTER.query.userWorkouts;
    const newExerciseEntry = (
      <div className={classes.flexItem}>
        <Card>
          <button className={classes.exerciseButton}>
            <label>{EXERCISE}</label>
          </button>

          <label className={classes.label}> Sets: {REPS}</label>
          <label className={classes.label}> Reps: {SETS}</label>
        </Card>
      </div>
    );

    const newScheduleEntry = {
      exerciseName: EXERCISE,
      exerciseWeekdays: EXERCISE_WEEKDAYS,
    };

    listOfWorkouts = [...listOfWorkouts, newExerciseEntry];
    workoutSchedule = [...workoutSchedule, newScheduleEntry];
  }
  return <>
    <Head>
      <title>User Workouts</title>
      <meta
        name="description"
        content="Your Weekly Schedule and list of workouts."
      />
    </Head>
    <h1 className={classes.title}>Workout Routine</h1>
    <h2 className={classes.details}>
      Workouts and their days in which to perform them!
    </h2>
    <Link href="/" prefetch={false} legacyBehavior>
      <button className={classes.leftButton}>
        <a>Back home</a>
      </button>
    </Link>
    <Link href={"/profiles/userWorkouts/manageExercises/" + ID} legacyBehavior>
      <button>
        <a>Manage Exercises</a>
      </button>
    </Link>
    <div className={classes.gridContainer}>
      <div className={classes.flexContainer}>
        <ul>{listOfWorkouts}</ul>
      </div>
      <Table
        exerciseInfo={workoutSchedule}
        exerciseAmt={workoutSchedule.length}
      />
    </div>
  </>;
}

export default userWorkouts;
