import Link from "next/link";
import classes from "../ui/MainNavigation.module.css";
import Image from "next/image";
import LoginForm from "../../components/form/LoginForm.js";
import { Fragment, useState } from "react";
import { getCookie, hasCookie } from "cookies-next";

export default function MainNavigation() {
  const LOGIN_FORM_CLASSES = [classes.formDisplayed, classes.formHidden];
  const NAV_ITEMS = [
    {
      link: "/profiles",
      text: "User's Profiles",
      position: 1,
    },
    {
      link: "",
      text: "Login",
      position: 2,
    },
    {
      link: "/profiles/regist",
      text: "Register Account",
      position: 3,
    },
  ];
  const [formClass, setFormClass] = useState(classes.formHidden);

  function loginHandler() {
    if (formClass === LOGIN_FORM_CLASSES[0]) {
      setFormClass(LOGIN_FORM_CLASSES[1]);
    } else {
      setFormClass(LOGIN_FORM_CLASSES[0]);
    }
  }
  let nav_Items_Section = NAV_ITEMS.map((entry) => {
    if (entry.text === "Login") {
      return (
        <li tabIndex={entry.position + 1} key={entry.position + 1}>
          <LoginForm />
        </li>
      );
    } else {
      return (
        <li tabIndex={entry.position + 1} key={entry.position + 1}>
          <Link href={entry.link} prefetch={false} legacyBehavior>
            {entry.text}
          </Link>
        </li>
      );
    }
  });
  function submitHandler() {}
  const loginForm = (
    <Fragment>
      <label>User Name: </label>
      <input type="text"></input>
      <button type="submit" onClick={submitHandler}>
        Submit
      </button>
    </Fragment>
  );
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.container}>
          <Link href="/" tabIndex="1" prefetch={false} legacyBehavior>
            <Image
              src="/dumbbell.svg"
              alt="logo"
              width={80}
              height={80}
            ></Image>
          </Link>
          {nav_Items_Section}
        </ul>
      </nav>
    </header>
  );
}
