import ReactDOM from "react-dom/client";
import { StorageProvider } from "@Context/useStorage";
import { NotificationProvider } from "@Context/useNotif.tsx";
import { ThemeProvider } from "@Context/theme/useTheme.tsx";
import { MouseToolTipContext } from "@Context/MouseToolTipContext.tsx";
import { useWindowEvents } from "@/hooks/useWindowEvents.ts";
import App from "./App.tsx";
import "@Css";
import { isProdEnv } from "./utils/utils.ts";

const Main = () => {
  useWindowEvents(isProdEnv());
  return (
    <>
      <ThemeProvider>
        <NotificationProvider>
          <StorageProvider>
            <MouseToolTipContext.Provider
              value={{ portalTarget: document.getElementById("portal-target") as HTMLDivElement }}
            >
              <App />
            </MouseToolTipContext.Provider>
          </StorageProvider>
        </NotificationProvider>
      </ThemeProvider>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Main />
  </>
);
