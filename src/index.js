import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "theme-ui";
import { useColorMode } from 'theme-ui'
import theme from "./theme";
import Main from "./Main";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <useColorMode />
      <Main />
    </ThemeProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
