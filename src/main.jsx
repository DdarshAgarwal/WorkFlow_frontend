import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

import "@fontsource/inter";

import { Toaster } from "react-hot-toast";

import {
  ThemeProvider,
} from "./context/ThemeContext";

createRoot(
  document.getElementById("root")
).render(

  <StrictMode>

    <ThemeProvider>

      <App />

      <Toaster
        position="top-right"
      />

    </ThemeProvider>

  </StrictMode>

);