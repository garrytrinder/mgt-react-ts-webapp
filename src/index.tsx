import * as React from "react";
import * as ReactDOM from "react-dom";
import { MsalProvider, Providers } from "@microsoft/mgt";
import App from "./App";

Providers.globalProvider = new MsalProvider({
  clientId: process.env.CLIENTID,
  scopes: [
    "calendars.read",
    "user.read",
    "openid",
    "profile",
    "people.read",
    "user.readbasic.all",
  ],
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
