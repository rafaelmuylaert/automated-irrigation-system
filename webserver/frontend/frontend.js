import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider} from "theme-ui";
import theme from "./theme";
import Main from "./Main";

exports.App = async () => {
  return (
    <ThemeProvider theme={theme}>
      <ColorMode />
      <Main />
    </ThemeProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
