import Link from "next/link";
import classes from "../ui/MainNavigation.module.css";
import Image from "next/image";
import { HomeTwoTone } from "@ant-design/icons";
export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.container}>
          <Link href="/">
            <a>
              <HomeTwoTone
                twoToneColor="lightblue"
                style={{ fontSize: "40px" }}
              />
            </a>
          </Link>

          <li>
            <Link href="/profiles">
              <a>Go to profiles</a>
            </Link>
          </li>
          <li>
            <Link href="/profiles/regist">
              <a>Register a New User</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
