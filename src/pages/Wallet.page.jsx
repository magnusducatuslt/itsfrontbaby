import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";

export function Page() {
  useEffect(() => {}, []);
  const [isLogin, showLogin] = useState(false);
  return (
    <div>
      {" "}
      <Button
        variant="contained"
        color="primary"
        id="button_login"
        onClick={() => showLogin(true)}
      >
        войти
      </Button>
      <Button variant="contained" color="primary" id="button_login">
        создать кошелек
      </Button>
    </div>
  );
}
