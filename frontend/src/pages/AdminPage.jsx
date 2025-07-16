import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

export default function AdminPage() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/submissions");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching submissions:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/submissions/${id}`);
      fetchData();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = (entry) => {
    setEditId(entry._id);
    setEditForm({ ...entry });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/submissions/${editId}`, editForm);
      setEditId(null);
      fetchData();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const exportToExcel = () => {
    if (data.length === 0) {
      alert("No data available to export.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      data.map((entry) => ({
        Name: entry.name,
        "HAL Pass Number": entry.usn,
        "College Name": entry.collegeName,
        "College Address": entry.collegeAddress,
        "User Address": entry.userAddress,
        "Project Title": entry.projectTitle,
        "Mobile Number": entry.mobile,
        Present: entry.present ? "Yes" : "No",
        "Submit Date": entry.date,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    XLSX.writeFile(workbook, "Attendance.xlsx");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      <button
        onClick={exportToExcel}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
      >
        Export to Excel
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">HAL Pass Number</th>
              <th className="px-4 py-2 border">College Name</th>
              <th className="px-4 py-2 border">College Address</th>
              <th className="px-4 py-2 border">User Address</th>
              <th className="px-4 py-2 border">Project Title</th>
              <th className="px-4 py-2 border">Mobile Number</th>
              <th className="px-4 py-2 border">Present</th>
              <th className="px-4 py-2 border">Submit Date</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">
                  {editId === entry._id ? (
                    <input
                      name="name"
                      value={editForm.name || ""}
                      onChange={handleEditChange}
                      className="border rounded px-2"
                    />
                  ) : (
                    entry.name
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {editId === entry._id ? (
                    <input
                      name="usn"
                      value={editForm.usn || ""}
                      onChange={handleEditChange}
                      className="border rounded px-2"
                    />
                  ) : (
                    entry.usn
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {editId === entry._id ? (
                    <input
                      name="collegeName"
                      value={editForm.collegeName || ""}
                      onChange={handleEditChange}
                      className="border rounded px-2"
                    />
                  ) : (
                    entry.collegeName
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {editId === entry._id ? (
                    <input
                      name="collegeAddress"
                      value={editForm.collegeAddress || ""}
                      onChange={handleEditChange}
                      className="border rounded px-2"
                    />
                  ) : (
                    entry.collegeAddress || ""
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {editId === entry._id ? (
                    <input
                      name="userAddress"
                      value={editForm.userAddress || ""}
                      onChange={handleEditChange}
                      className="border rounded px-2"
                    />
                  ) : (
                    entry.userAddress || ""
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {editId === entry._id ? (
                    <input
                      name="projectTitle"
                      value={editForm.projectTitle || ""}
                      onChange={handleEditChange}
                      className="border rounded px-2"
                    />
                  ) : (
                    entry.projectTitle
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {editId === entry._id ? (
                    <input
                      name="mobile"
                      value={editForm.mobile || ""}
                      onChange={handleEditChange}
                      className="border rounded px-2"
                    />
                  ) : (
                    entry.mobile || ""
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {editId === entry._id ? (
                    <input
                      type="checkbox"
                      name="present"
                      checked={editForm.present || false}
                      onChange={handleEditChange}
                    />
                  ) : (
                    entry.present ? "Yes" : "No"
                  )}
                </td>
                <td className="px-4 py-2 border">{entry.date}</td>
                <td className="px-4 py-2 border">
                  {editId === entry._id ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-yellow-400 text-white px-2 py-1 rounded mr-2"
                        onClick={() => handleEdit(entry)}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(entry._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
