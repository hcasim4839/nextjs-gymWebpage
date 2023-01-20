import Head from "next/head";
import UserProfile from "../../components/userProfile/UserProfile";
import { UserOutlined } from "@ant-design/icons";
import ProfileLayout from "../../components/ui/Profiles_Layout";
import classes from "../../styles/profiles.module.css";
import Card from "../../components/ui/Card";
import { useState } from "react";

export async function getServerSideProps() {
  const mssql = require("mssql/msnodesqlv8");
  const sqlConfig = new mssql.ConnectionPool({
    database: "NextjsGym",
    server: "DESKTOP-HC\\SQLEXPRESS",
    driver: "msnodesqlv8",
    options: {
      trustedConnection: true,
    },
  });
  const CONN = await sqlConfig.connect();
  const QUERY_CMD = "SELECT * FROM Accounts";
  let sqlResultsJson = await sqlConfig.request().query(QUERY_CMD);

  const AMT_OF_RECORDS = sqlResultsJson.recordsets[0].length;
  sqlResultsJson = sqlResultsJson.recordsets[0];

  CONN.close();
  return {
    props: { sqlResultsJson, AMT_OF_RECORDS },
  };
}

export default function Profiles({ sqlResultsJson, AMT_OF_RECORDS }) {
  let listOfUserProfiles = [];

  function handleForm(e) {
    e.preventDefault();
  }
  const [popUpMenuClass, setpopUpMenuClass] = useState(
    classes.popUpMenuInvisible
  );
  for (let i = 0; i < AMT_OF_RECORDS; i++) {
    let entryName = sqlResultsJson[i].FirstName;
    let userId = sqlResultsJson[i].UserId;
    let userWorkoutsPath = "/profiles/userWorkouts/" + userId;
    let ManageExercisePath = "/profiles/userWorkouts/manageExercises/" + userId;

    const NEW_ENTRY = (
      <UserProfile
        id={userId}
        userWorkoutPath={userWorkoutsPath}
        entryName={entryName}
        manageExercisePath={ManageExercisePath}
        key={userId}
      ></UserProfile>
    );
    listOfUserProfiles = [...listOfUserProfiles, NEW_ENTRY];
  }

  const POP_UP_MENU = (
    <div className={popUpMenuClass}>
      <Card>
        <form onClick={handleForm}>
          <label>Profile Name: </label>
          <input type="text" className={classes.userInput} required></input>
          <button onClick={() => setpopUpMenuClass(classes.popUpMenuInvisible)}>
            Submit
          </button>
          <button onClick={() => setpopUpMenuClass(classes.popUpMenuInvisible)}>
            Exit
          </button>
        </form>
      </Card>
    </div>
  );
  return (
    <ProfileLayout>
      <Head>
        <title>Profiles</title>
        <meta name="description" content="The list of accounts in use" />
      </Head>

      {POP_UP_MENU}
      <h1 className={classes.title}>User Profiles</h1>
      <div className={classes.newUserSection}>
        <UserOutlined style={{ fontSize: "40px" }}></UserOutlined>
        <h2>
          <button
            className={classes.newUserBtn}
            onClick={() => {
              setpopUpMenuClass(classes.popUpMenuVisible);
            }}
          >
            New User
          </button>
        </h2>
      </div>

      <div>{listOfUserProfiles}</div>
    </ProfileLayout>
  );
}
