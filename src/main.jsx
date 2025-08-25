import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { StarContexterProvider } from "./contexts/StarContexter.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StarContexterProvider>
      <App />
    </StarContexterProvider>
  </BrowserRouter>
);
