import React from "react";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Router from "routes/router";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Router />
    </BrowserRouter>
  );
};

export default App;
