import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { EZCalendar } from "./EZCalendar.tsx";
import "./index.css";
createRoot(document.getElementById("root")).render(React.createElement(StrictMode, null,
    React.createElement(EZCalendar, { "data-buttonClass": "bg-teal-300", className: "bg-teal-50 w-[150px] h-[150px] block" })));
