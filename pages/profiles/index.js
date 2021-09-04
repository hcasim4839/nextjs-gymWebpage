import Head from "next/head";
import Link from "next/link";
import UserProfile from "../../components/userProfile/UserProfile";
import { UserOutlined } from "@ant-design/icons";
import ProfileLayout from "../../components/ui/Profiles_Layout";
import classes from "../../styles/profiles.module.css";
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
  const QUERY_CMD = "SELECT * FROM Users";
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

  return (
    <ProfileLayout>
      <Head>
        <title>Profiles</title>
        <meta name="description" content="The list of accounts in use" />
      </Head>
      <h1 className={classes.textCentered}>Which is your profile?</h1>
      <UserOutlined style={{ fontSize: "40px" }}></UserOutlined>
      <h2 className={classes.textCentered}>
        <Link href="/profiles/regist">
          <button className={classes.newUserBtn}>New User</button>
        </Link>
      </h2>
      <div>{listOfUserProfiles}</div>
    </ProfileLayout>
  );
}
