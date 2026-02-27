import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider
        theme={{
          colorScheme: "dark",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div className="bg-zinc-900 min-h-screen text-white">
          <App />
        </div>
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>,
);
