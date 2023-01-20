import { getCookie, hasCookie } from "cookies-next";

export default function LoginForm() {
  let descriptor;
  console.log(hasCookie("account"));
  if (hasCookie("account")) {
    descriptor = getCookie("account");
  } else {
    descriptor = "Login";
  }

  console.log(descriptor);

  return (
    <button>
      <a>{descriptor}</a>
    </button>
  );
}
