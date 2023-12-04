import ReactDOM from "react-dom/client";
// import { StrictMode } from "react";
import { NotificationProvider, IntermediateProvider, ThemeProvider } from "@Hooks";
import App from "./App.tsx";
import "@Css";
import { WindowEvents } from "./components/utils/WindowEvents.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <WindowEvents />
    <ThemeProvider>
      <NotificationProvider>
        <IntermediateProvider>
          <App />
        </IntermediateProvider>
      </NotificationProvider>
    </ThemeProvider>
  </>
);
