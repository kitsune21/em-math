import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Game from "./game.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import UserProvider from "./context/userContext.tsx";

createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/game/:number/:difficulty/:type" element={<Game />} />
      </Routes>
    </BrowserRouter>
  </UserProvider>
);
