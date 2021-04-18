import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { PeoplePage } from "./components/views/PeoplePage";
import { FrontPage } from "./components/views/FrontPage";

//Debounce --> Undgå throttling i API
//

function App(): JSX.Element {
  return (
    <Switch>
      <Route>
        <FrontPage />
      </Route>
    </Switch>
  );
}

export default observer(App);
