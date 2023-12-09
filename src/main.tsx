import ReactDOM from "react-dom/client";
import { IntermediateProvider } from "@Context/useMid";
import { NotificationProvider } from "@Context/useNotif.tsx";
import { ThemeProvider } from "@Context/theme/useTheme.tsx";
import { useWindowEvents } from "@/hooks/useWindowEvents.ts";
import App from "./App.tsx";
import "@Css";
import { MouseToolTipContext } from "@Context/MouseToolTipContext.tsx";

const Main = () => {
  useWindowEvents();
  return (
    <>
      <ThemeProvider>
        <NotificationProvider>
          <IntermediateProvider>
            <MouseToolTipContext.Provider
              value={{ portalTarget: document.getElementById("portal-target") as HTMLDivElement }}
            >
              <App />
            </MouseToolTipContext.Provider>
          </IntermediateProvider>
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
