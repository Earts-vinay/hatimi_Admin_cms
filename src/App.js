import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import FrontDesk from "./pages/FrontDesk";
import Reservations from "./pages/Reservations";
import Properties from "./pages/Properties";
import Coupons from "./pages/Coupons";
import Master from "./pages/Master";
import Login from "./pages/Login";

import Sidenav from "./components/Sidenav";
import HeaderLayout from "./components/HeaderLayout";

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

function Layout() {
  const [open, setOpen] = useState(true); // State for toggling the sidebar
  const location = useLocation();
  const isLoginPage = location.pathname === "/"; // Check if the current path is the login page

  const toggleDrawer = () => {
    setOpen((prev) => !prev); // Toggle the sidebar state
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Show Sidenav only if not on the login page */}
      {!isLoginPage && <Sidenav open={open} toggleDrawer={toggleDrawer} />}

      {/* Adjust HeaderLayout width and margin based on the sidebar's presence */}
      <div
        style={{
          flex: 1,
          marginLeft: !isLoginPage && open ? "0px" : "0px", // Sidebar width adjustment
          transition: "margin-left 0.3s ease", // Smooth transition for sidebar
        }}
      >
        {/* Main Routes */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/frontdesk" element={<FrontDesk />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/master" element={<Master />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
