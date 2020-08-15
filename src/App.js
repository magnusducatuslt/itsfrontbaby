import React from "react";

import { Switch, Route, Link } from "react-router-dom";
import { Login, Home, Account, Voting, CreateWallet } from "./pages";
import Navbar from "./components/navbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import "./App.css";
function App() {
  return (
    <div>
      <Navbar />
      <CssBaseline />
      <Container fixed>
        <Switch>
          <Route path="/create*">
            <CreateWallet.Page />
          </Route>
          <Route path="/account">
            <Account.Page />
          </Route>
          <Route path="/login">
            <Login.Page />
          </Route>
          <Route path="/">
            <Home.Page />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
