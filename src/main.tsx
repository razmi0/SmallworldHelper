import ReactDOM from "react-dom/client";
import { StorageProvider } from "@Context/useStorage";
import { NotificationProvider } from "@Context/useNotif.tsx";
import { MouseToolTipContext } from "@Context/MouseToolTipContext.tsx";
import App from "./App.tsx";
import "@Css";

// import { ThemeProvider } from "@Context/theme/useTheme.tsx";
// </ThemeProvider>
// <ThemeProvider>

// import { useWindowEvents } from "@/hooks/useWindowEvents.ts";
// import { isProdEnv } from "./utils/utils.ts";
// useWindowEvents(isProdEnv());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NotificationProvider>
    <StorageProvider>
      <MouseToolTipContext.Provider
        value={{ portalTarget: document.getElementById("portal-target") as HTMLDivElement }}
      >
        <App />
      </MouseToolTipContext.Provider>
    </StorageProvider>
  </NotificationProvider>
);
