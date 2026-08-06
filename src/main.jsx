// ============================================================
// main.jsx
// The entry point of the React application.
// This is where React mounts the app onto the HTML page.
//
// KEY RULE: <BrowserRouter> lives HERE — only one place in the
// entire app. App.jsx uses <Routes> directly without wrapping
// in another <Router>, which would cause the error:
//   "You cannot render a <Router> inside another <Router>"
// ============================================================

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ← Router lives here ONLY
import App from "./App.jsx";
import "./index.css";

// Mount the React app inside the <div id="root"> in index.html
// BrowserRouter wraps App so all routing hooks (useNavigate, NavLink etc.)
// work in every component throughout the app.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* App.jsx contains <Routes> and <AuthProvider> — no second <Router> inside */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
