import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./Store/auth-context";
 

ReactDOM.render(
  <AuthContextProvider>
    {" "}
    <App />{" "}
  </AuthContextProvider>,
  document.getElementById("root")
);
