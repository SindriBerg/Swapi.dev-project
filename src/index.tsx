import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

const starWarsYellows = {
  100: "#ffe919",
};

const theme = extendTheme({
  colors: {
    starWarsYellow: starWarsYellows,
  },
});

const Index = observer(function Index() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  );
});

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
