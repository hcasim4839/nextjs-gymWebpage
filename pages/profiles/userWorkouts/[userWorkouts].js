import Card from "../../../components/ui/Card";
import Link from "next/link";
import Table from "../../../components/table/Table";
import { useRouter } from "next/router";
import Head from "next/head";
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
      <Card key={EXERCISE}>
        <img href="https://static.toiimg.com/photo/msid-67586673/67586673.jpg?3918697"></img>
        <label>{EXERCISE}</label>
        <label>Sets: {REPS}</label>
        <label>Reps: {SETS}</label>
      </Card>
    );

    const newScheduleEntry = {
      exerciseName: EXERCISE,
      exerciseWeekdays: EXERCISE_WEEKDAYS,
    };

    listOfWorkouts = [...listOfWorkouts, newExerciseEntry];
    workoutSchedule = [...workoutSchedule, newScheduleEntry];
  }
  return (
    <>
      <Head>
        <title>User Workouts</title>
        <meta
          name="description"
          content="Your Weekly Schedule and list of workouts."
        />
      </Head>
      <h1>Workout Routine</h1>
      <h2>Workouts and their days in which to perform them!</h2>
      <div className="exercise-group">
        <ul>{listOfWorkouts}</ul>
      </div>
      <Table
        exerciseInfo={workoutSchedule}
        exerciseAmt={workoutSchedule.length}
      />
      <Link href="/">
        <button>
          <a>Back home</a>
        </button>
      </Link>
      <Link href={"/profiles/userWorkouts/manageExercises/" + ID}>
        <button>
          <a>Manage Exercises</a>
        </button>
      </Link>
    </>
  );
}

export default userWorkouts;
