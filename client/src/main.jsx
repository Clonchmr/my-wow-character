import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "tailwindcss";
import { BrowserRouter } from "react-router-dom";
import { CharacterProvider } from "./context/CharacterContext.js";

createRoot(document.getElementById("root")).render(
  <CharacterProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CharacterProvider>
);
