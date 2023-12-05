import ReactDOM from "react-dom/client";
// import { StrictMode } from "react";
import { IntermediateProvider } from "@Context/useMid";
import { NotificationProvider } from "@Context/useNotif.tsx";
import { ThemeProvider } from "@Context/theme/useTheme.tsx";
import App from "./App.tsx";
import "@Css";
import { WindowEvents } from "@Components/WindowEvents.tsx";

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
