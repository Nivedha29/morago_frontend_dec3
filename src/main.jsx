import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import './index.css'
import App from "./App.jsx";
import { CallProvider } from "./context/CallProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CallProvider>
        <App />
      </CallProvider>
    </BrowserRouter>
  </StrictMode>
);