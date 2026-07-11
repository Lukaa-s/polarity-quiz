import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { LocaleProvider } from "./i18n/LocaleContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* LocaleProvider en dehors du garde-fou : ce dernier lit le contexte de
        langue (via contextType) pour ses libellés par défaut. */}
    <LocaleProvider>
      {/* Garde-fou global : évite l'écran blanc si une erreur remonte jusqu'ici. */}
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </LocaleProvider>
  </React.StrictMode>
);