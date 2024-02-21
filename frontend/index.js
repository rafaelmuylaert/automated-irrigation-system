/** @jsxImportSource theme-ui */
import React from "react";
import ReactDOM from "react-dom";
import { ThemeUIProvider  } from "theme-ui";
import theme from "./theme";
import Main from "./Main";

function App() {
  return (
    <ThemeUIProvider theme={theme}>
      <Main />
    </ThemeUIProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
