import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Msal2Provider, Providers } from "@microsoft/mgt";

const clientId: string = process.env.CLIENTID ? process.env.CLIENTID : "";

Providers.globalProvider = new Msal2Provider({
  clientId: clientId,
  scopes: ["user.read"]
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
