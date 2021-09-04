import styles from "./Profiles_Layout.module.css";

export default function Layout(props) {
  return <div className={styles.container}>{props.children}</div>;
}
