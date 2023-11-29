import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { NotificationProvider, IntermediateProvider, ThemeProvider } from "@Hooks";
import App from "./App.tsx";
import "@Styles";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <NotificationProvider>
        <IntermediateProvider>
          <App />
        </IntermediateProvider>
      </NotificationProvider>
    </ThemeProvider>
  </StrictMode>
);
