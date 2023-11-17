import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./hooks/context/theme/useTheme.tsx";
import { IntermediateProvider } from "./hooks/context/useIntermediateState.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <IntermediateProvider>
      <App />
    </IntermediateProvider>
  </ThemeProvider>
);
