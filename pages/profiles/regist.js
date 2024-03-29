import { useRouter } from "next/router";
import Head from "next/head";
import GeneralForm from "../../components/form/GeneralForm";
import { setCookie } from "cookies-next";

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

    if (RESPONSE.status === 201) {
      //set the userAccount module and sessions here
      setCookie("account", userAccount);

      ROUTER.push("/profiles");
    } else {
      window.alert("User was not registered");
    }
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
      <GeneralForm isRegistForm={true} onSubmitFunction={userRegistHandler} />
    </>
  );
}
//<GeneralForm isRegistForm={true} onSubmitFunction={userRegistHandler} />
