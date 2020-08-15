import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

export function Page() {
  let history = useHistory();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?10";
    script.setAttribute("async", true);
    script.setAttribute("data-telegram-login", "igorvotingmachine_bot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    script.setAttribute("id", "telegram_script");
    const place = document.getElementById("button_login");
    place.appendChild(script);
    window.onTelegramAuth = (user) => {
      console.log("logined", user);
      localStorage.setItem("account_id", user.id);
      history.push("/account");
      script.remove();
    };

    //document.body.appendChild(script);

    return () => {
      script.remove();
      //document.body.removeChild(script);
    };
  }, []);
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Button variant="contained" color="primary" id="button_login"></Button>
        <Typography variant="h4" component="h1" gutterBottom>
          login page
        </Typography>
      </Box>
    </Container>
  );
}
