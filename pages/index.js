import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image_Caruosel from "../components/imageCaruosel/Image_Caruosel";
import classes from "../styles/userWorkouts.module.css";

const IMAGE_LIST = [
  {
    title: "Profile Screen",
    image: "/images/profiles.png",
    caption:
      "Create multiple profiles for different goals in mind. From trying to increase your" +
      " strength, hypertrophy, to endurance. Heard about a new workout from a friend or celebrity? Create a profile to have the " +
      "exercises all in one place.",
  },
  {
    title: "Registration Screen",
    image: "/images/regist.png",
    caption:
      "Creating an account is two steps away! Its simple and no hassle involve.",
  },
  {
    title: "Schedule Screen",
    image: "/images/schedule.png",
    caption:
      "Have your profile's condensed information in one place. Wondering " +
      "what exercises to do? Check here for your weekly schedule",
  },
];
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next JS Workout Routines</title>
        <meta
          name="description"
          content="The site to organize your gym needs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="main-heading">
          <h1 className={classes.title}>
            {/*Welcome to your one stop for your fitness routine needs*/}
            The One Place For Your Workouts Needs
          </h1>
          <p>
            Tired of wondering what type of exercises are out there? What
            muscles are targeted? When should you perform them? Or how to keep
            it all organized? Our site is here to help.
          </p>
        </div>
        <div>
          <Image_Caruosel imageList={IMAGE_LIST}></Image_Caruosel>
        </div>
      </main>

      <h3>
        <Link href="/profiles" className={classes.details}>
          Proceed to Profiles
        </Link>
      </h3>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
        <a href="https://www.vecteezy.com/free-vector/web">
          Web Vectors by Vecteezy
        </a>
      </footer>
    </div>
  );
}
