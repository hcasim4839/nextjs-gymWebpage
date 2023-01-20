import Head from "next/head";
import Card from "../../../../components/ui/Card";
import { useRouter } from "next/router";
import UnregistExercise from "../../../../components/workouts/UnregistExercise";
import ExerciseEntry from "../../../../components/workouts/ExerciseEntry";
import classes from "../../../../styles/manageExercise.module.css";
import Link from "next/link";
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
  let userId = context.params.manageExercise;

  let queryCmd = "Select * from UserExercises where UserId ='" + userId + "'";
  let userWorkoutsSqlResult = await sqlConfig.request().query(queryCmd);
  const AMT_OF_USER_WORKOUTS = userWorkoutsSqlResult.recordsets[0].length;
  userWorkoutsSqlResult = userWorkoutsSqlResult.recordsets[0];

  queryCmd =
    "SELECT * FROM Exercise WHERE ExerciseName NOT IN (" +
    "Select ExerciseName from UserExercises where UserId ='" +
    userId +
    "') ";
  let exerciseSqlResult = await sqlConfig.request().query(queryCmd);
  const AMT_OF_UNUSED_WORKOUTS = exerciseSqlResult.recordsets[0].length;
  exerciseSqlResult = exerciseSqlResult.recordsets[0];

  conn.close();

  return {
    props: {
      userWorkoutsSqlResult,
      AMT_OF_USER_WORKOUTS,
      exerciseSqlResult,
      AMT_OF_UNUSED_WORKOUTS,
    },
  };
}

function ManageExercise({
  userWorkoutsSqlResult,
  AMT_OF_USER_WORKOUTS,
  exerciseSqlResult,
  AMT_OF_UNUSED_WORKOUTS,
}) {
  const ROUTER = useRouter();
  const ID = ROUTER.query.manageExercise;

  let listOfUserWorkouts = [];
  let apiRemoveExercisesList = [];

  function removeUserExercisesHandler(exercise) {
    const newEntry = {
      exerciseName: exercise,
      userId: ID,
    };
    apiRemoveExercisesList = [...apiRemoveExercisesList, newEntry];
  }
  for (
    let currentExercise = 0;
    currentExercise < AMT_OF_USER_WORKOUTS;
    currentExercise++
  ) {
    let exercise = userWorkoutsSqlResult[currentExercise].ExerciseName;
    const REPS = userWorkoutsSqlResult[currentExercise].Reps;
    const SETS = userWorkoutsSqlResult[currentExercise].Sets;
    listOfUserWorkouts = [
      ...listOfUserWorkouts,

      <UnregistExercise
        buttonValue="Remove"
        exerciseName={exercise}
        sets={SETS}
        reps={REPS}
        userExerciseHandler={removeUserExercisesHandler}
        key={"user " + exercise}
      />,
    ];
  }

  let listOfUnregistWorkouts = [];
  let apiAddExerciseList = [];

  function addUserExercisesHandler(EXERCISE_OBJ) {
    apiAddExerciseList = [
      ...apiAddExerciseList,
      {
        exerciseName: EXERCISE_OBJ.exerciseName,
        userId: ID,
        reps: EXERCISE_OBJ.reps,
        sets: EXERCISE_OBJ.sets,
        weekdaysOfExercise: EXERCISE_OBJ.weekdaysForExercise,
      },
    ];
  }

  function resetExercise(exerciseName) {
    console.log(apiAddExerciseList);
    apiAddExerciseList = apiAddExerciseList.filter((exerciseEntry) => {
      const exerciseEntryName = exerciseEntry.exerciseName;
      if (exerciseName !== exerciseEntryName) {
        return exerciseEntry;
      }
    });
  }
  for (
    let currentExercise = 0;
    currentExercise < AMT_OF_UNUSED_WORKOUTS;
    currentExercise++
  ) {
    let exercise = exerciseSqlResult[currentExercise].ExerciseName;
    const DESCRIPTION =
      "Exercise Description: " + exerciseSqlResult[currentExercise].Description;

    listOfUnregistWorkouts = [
      ...listOfUnregistWorkouts,

      <ExerciseEntry
        userExerciseHandler={addUserExercisesHandler}
        resetExerciseHandler={resetExercise}
        exerciseName={exercise}
        buttonValue="Add"
        key={"unregist " + exercise}
        description={DESCRIPTION}
      />,
    ];
  }

  async function removeExerciseApi() {
    const RESPONSE = await fetch("/api/removeUserExercises", {
      method: "POST",
      body: JSON.stringify(apiRemoveExercisesList),
      header: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    listOfUserWorkouts = [];
    listOfUnregistWorkouts = [];
  }
  function addExercisesApi() {
    const RESPONSE = fetch("/api/addUserExercises", {
      method: "POST",
      body: JSON.stringify(apiAddExerciseList),
      header: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    listOfUserWorkouts = [];
    listOfUnregistWorkouts = [];
  }

  async function userWorkoutChangesHandler(e) {
    e.preventDefault();
    await addExercisesApi();
    await removeExerciseApi();

    ROUTER.reload();
  }

  const LIST_OF_USER_WORKOUT_SECTION =
    listOfUserWorkouts.length > 0 ? (
      <ul>{listOfUserWorkouts}</ul>
    ) : (
      <h3 className={classes.text}>
        You have no workouts, make sure to add some{" "}
      </h3>
    );

  const LIST_OF_UNREGIST_WORKOUT_SECTION =
    listOfUnregistWorkouts.length > 0 ? (
      <ul>{listOfUnregistWorkouts}</ul>
    ) : (
      <h3 className={classes.text}>Seems you got all the exercises...</h3>
    );

  return <>
    <Head>
      <title>Manage your Exercises</title>
      <meta
        name="description"
        content="Change what exercise you want on your routine as well as input the sets and reps and chose the days you want to perform them in."
      />
    </Head>
    <form onSubmit={userWorkoutChangesHandler}>
      <h3 className={classes.text}>Remove Exercise</h3>
      <h4 className={classes.text}>
        Delete any of these exercise from your workout routine
      </h4>

      <Card>{LIST_OF_USER_WORKOUT_SECTION}</Card>

      <br />
      <h3 className={classes.text}>Add exercise</h3>
      <h4 className={classes.text}>
        Insert any of these exercises to your workout routine
      </h4>

      <h5 className={classes.text}>
        Make sure to read the description to be well informed if the exercise
        is right for you
      </h5>
      <Card>{LIST_OF_UNREGIST_WORKOUT_SECTION}</Card>
      <input
        type="submit"
        value="Submit all data"
        className={classes.inputButton}
      />
      <Link href={"/profiles/userWorkouts/" + ID} legacyBehavior>
        <button>
          <a>Go to my Exercise List</a>
        </button>
      </Link>
    </form>
  </>;
}
/*

you have to make it so the insert all changes button is unable to be pressed until there
is a button for any of the add or remove exercises is clicked

*/
export default ManageExercise;
