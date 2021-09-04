import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

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
          <h1>Welcome to your one stop for your fitness routine needs</h1>
        </div>
      </main>
      <h3>
        <Link href="/profiles">
          <a>Proceed to Profiles</a>
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
      </footer>
    </div>
  );
}
