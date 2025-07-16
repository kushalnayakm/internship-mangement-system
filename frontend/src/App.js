import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminLogin from "./pages/AdminLogin";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";

function App() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route
          path="/admin-login"
          element={<AdminLogin onLogin={() => setAdminLoggedIn(true)} />}
        />
        <Route
          path="/admin"
          element={
            adminLoggedIn ? <AdminPage /> : <div className="p-10 text-center text-red-600">Access Denied</div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
