import React from "react";
import Button from "@material-ui/core/Button";
import { Switch, Route, Link } from "react-router-dom";
import { Login, Home, Account, Voting } from "./pages";
import "./App.css";
function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/voting">
          <Voting.Page />
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
    </div>
  );
}
// function Home() {
//   return <h2>Home</h2>;
// }
function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
export default App;
