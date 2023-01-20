import MainNavigation from "./MainNavigation";
import { Fragment } from "react";
export default function Layout(props) {
  return (
    <Fragment>
      <MainNavigation />
      <div>{props.children}</div>
    </Fragment>
  );
}
