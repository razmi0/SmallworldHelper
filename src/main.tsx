import ReactDOM from "react-dom/client";
// import { StrictMode } from "react";
import { NotificationProvider, IntermediateProvider, ThemeProvider } from "@Hooks";
import App from "./App.tsx";
import "@Css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <NotificationProvider>
      <IntermediateProvider>
        <App />
      </IntermediateProvider>
    </NotificationProvider>
  </ThemeProvider>
);
