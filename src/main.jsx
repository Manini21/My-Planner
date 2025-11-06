import React from "react";
import ReactDOM from "react-dom/client";
/*import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";*/
import App from "./App.jsx"; // your planner
import LandingPage from "./components/LandingPage.jsx"; // 👈 new landing page8
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
