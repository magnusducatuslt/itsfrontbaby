import React from "react";
import { useHistory } from "react-router-dom";

export function Page() {
  let history = useHistory();
  function Login() {
    history.push("/account");
  }

  return (
    <div>
      create wallet <button onClick={Login}>Login</button>
    </div>
  );
}
