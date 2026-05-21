import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastProvider } from "./components/Toast";
import { AchievementProvider } from "./components/AchievementPopup";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <AchievementProvider>
          <App />
        </AchievementProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>
);
