import ReactDOM from "react-dom/client";
// import { StrictMode } from "react";
import { NotificationProvider, IntermediateProvider, ThemeProvider } from "@Hooks";
import App from "./App.tsx";
import "@Css";
import { WindowEvents } from "./components/utils/WindowEvents.tsx";
import { AppContext } from "./components/AppContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <WindowEvents />
    <ThemeProvider>
      <NotificationProvider>
        <IntermediateProvider>
          <AppContext.Provider
            value={{ portalTarget: document.getElementById("portal-target") as HTMLDivElement }}
          >
            <App />
          </AppContext.Provider>
        </IntermediateProvider>
      </NotificationProvider>
    </ThemeProvider>
  </>
);
