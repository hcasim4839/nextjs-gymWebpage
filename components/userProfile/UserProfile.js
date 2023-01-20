import classes from "./userProfile.module.css";
import Card from "../ui/Card";
import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserOutlined } from "@ant-design/icons";

export default function UserProfile(props) {
  const ROUTER = useRouter();

  async function deleteUserApi(userId) {
    await fetch("/api/deleteAccount", {
      method: "POST",
      body: JSON.stringify({ userId: userId }),
      header: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    ROUTER.reload();
  }
  return (
    <Fragment>
      <Card key={props.userId} className={classes.card}>
        <div className={classes.container}>
          <UserOutlined style={{ fontSize: "40px" }}></UserOutlined>

          <Link href={props.userWorkoutPath} legacyBehavior>

            <button className={classes.buttons}>
              {props.entryName}'s Schedule
            </button>

          </Link>
        </div>
      </Card>
      <div className={classes.container}>
        <Link href={props.manageExercisePath} legacyBehavior>
          <button className={classes.buttons}>
            Edit {props.entryName} List of Workouts
          </button>
        </Link>
        <button
          onClick={() => {
            deleteUserApi(props.id);
          }}
          className={classes.buttons}
        >
          Delete {props.entryName}
        </button>
      </div>
    </Fragment>
  );
}
