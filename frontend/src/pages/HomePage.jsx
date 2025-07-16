import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/hal.png"; // ✅ Make sure logo file exists

export default function HomePage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/background.jpeg')" }} // ✅ Place image in public/
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-xl w-[90%] max-w-md text-center">
        <img src={logo} alt="Logo" className="w-24 h-24 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Internship Attendance System
        </h1>

        <div className="flex flex-col gap-4">
          {/* ✅ Redirect directly to attendance form */}
          <Link to="/user">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              👤 Fill Attendance
            </button>
          </Link>

          <Link to="/admin-login">
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              🔐 Admin Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
