import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import FrontDesk from "./pages/FrontDesk";
import Reservations from "./pages/Reservations";
import Properties from "./pages/Properties";
import Coupons from "./pages/Coupons";
import Master from "./pages/Master";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Dashboard>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/frontdesk" element={<FrontDesk />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/master" element={<Master />} />
        </Routes>
      </Dashboard>
    </Router>
  );
}

export default App;
