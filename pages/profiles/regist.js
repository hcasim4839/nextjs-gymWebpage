import RegistForm from "../../components/registForm/RegistForm";
import { useRouter } from "next/router";
import Head from "next/head";
export default function Regist() {
  const ROUTER = useRouter();

  async function userRegistHandler(userAccount) {
    const RESPONSE = await fetch("/api/registAccount", {
      method: "POST",
      body: JSON.stringify(userAccount),
      header: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    ROUTER.push("/profiles");
  }
  return (
    <>
      <Head>
        <title>Register a new User</title>
        <meta
          name="description"
          content="Where you can add a new user to the App"
        />
      </Head>
      <RegistForm onRegister={userRegistHandler}></RegistForm>
    </>
  );
}
