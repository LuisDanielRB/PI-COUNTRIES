import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CountryDetail from "./components/CountryDetail";
import ActivityCreate from "./components/ActivityCreate";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/country/:id" component={CountryDetail} />
      <Route exact path="/activity/create" component={ActivityCreate} />
    </Switch>
  );
}

export default App;
