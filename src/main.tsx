import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@Styles";
import { IntermediateProvider, ThemeProvider } from "@Hooks";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <IntermediateProvider>
      <App />
    </IntermediateProvider>
  </ThemeProvider>
);
