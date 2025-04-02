import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { EZCalendar } from "./EZCalendar.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EZCalendar data-buttonClass="bg-teal-300 ring-1 ring-green-500 flex justify-center items-center rounded-[50%]" />
  </StrictMode>,
);
