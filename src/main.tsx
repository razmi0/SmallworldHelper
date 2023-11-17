import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@Styles";
import { IntermediateProvider, ThemeProvider } from "@Hooks";
import { StrictMode } from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <IntermediateProvider>
        <App />
      </IntermediateProvider>
    </ThemeProvider>
  </StrictMode>
);
