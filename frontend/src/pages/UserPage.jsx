import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/hal.png";

export default function UserPage() {
  const [form, setForm] = useState({
    name: "",
    usn: "", // HAL Pass Number
    collegeName: "",
    collegeAddress: "",
    userAddress: "",
    projectTitle: "",
    mobile: "",
    present: false,
  });

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const {
      name,
      usn,
      collegeName,
      collegeAddress,
      userAddress,
      projectTitle,
      mobile,
      present,
    } = form;

    // ✅ Validation
    if (
      !name ||
      !usn ||
      !collegeName ||
      !collegeAddress ||
      !userAddress ||
      !projectTitle ||
      !mobile ||
      mobile.length !== 10 ||
      !present
    ) {
      alert("❌ Please fill all fields, ensure mobile number is 10 digits, and tick present.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/submit", {
        ...form,
        date: today,
      });

      alert("✅ Attendance submitted successfully!");

      // Reset form
      setForm({
        name: "",
        usn: "",
        collegeName: "",
        collegeAddress: "",
        userAddress: "",
        projectTitle: "",
        mobile: "",
        present: false,
      });
    } catch (err) {
      console.error("❌ Submission error:", err);
      alert("❌ Failed to submit attendance. Check server or console.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/background.jpeg')" }}
    >
      <div className="bg-white bg-opacity-95 p-8 rounded-xl shadow-xl w-[90%] max-w-lg text-center">
        <img src={logo} alt="Logo" className="h-20 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-6">Internship Attendance</h1>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="text"
            name="usn"
            placeholder="Enter HAL Pass No"
            value={form.usn}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="text"
            name="collegeName"
            placeholder="College Name"
            value={form.collegeName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="text"
            name="collegeAddress"
            placeholder="College Address"
            value={form.collegeAddress}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="text"
            name="userAddress"
            placeholder="User Address"
            value={form.userAddress}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="text"
            name="projectTitle"
            placeholder="Project Title"
            value={form.projectTitle}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number (10 digits)"
            value={form.mobile}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,10}$/.test(value)) {
                setForm((prev) => ({ ...prev, mobile: value }));
              }
            }}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="flex items-center justify-center mt-4">
          <input
            type="checkbox"
            id="present"
            name="present"
            checked={form.present}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="present" className="text-lg">
            I am present today ({today})
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          Submit Attendance
        </button>
      </div>
    </div>
  );
}
