import { useEffect } from "react";
import "./App.css";
import { ApplicationViews } from "./ApplicationViews";

function App() {
  useEffect(() => {
    const stored = localStorage.getItem("character");
    if (stored) {
      const character = JSON.parse(stored);
      const faction = character.faction?.toLowerCase();
      if (faction === "horde" || faction === "alliance") {
        document.documentElement.setAttribute("data-theme", faction);
      }
    }
  }, []);
  return <ApplicationViews />;
}

export default App;
