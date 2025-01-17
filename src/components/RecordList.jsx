import React, { useState } from "react";

// Utility function to convert English numbers to Persian digits
const convertToPersianDigits = (number) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return number
    .toString()
    .split("")
    .map((digit) => persianDigits[parseInt(digit)] || digit)
    .join("");
};

const RecordList = ({ records, deleteRecord, updateRecord, sortRecords }) => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [recordToDelete, setRecordToDelete] = useState(null); // State to store the record to delete

  const handleDeleteClick = (id) => {
    setRecordToDelete(id); // Set the record to delete
    setShowModal(true); // Show the modal
  };

  const confirmDelete = () => {
    if (recordToDelete !== null) {
      deleteRecord(recordToDelete); // Delete the record
      setShowModal(false); // Close the modal
      setRecordToDelete(null); // Reset the record to delete
    }
  };

  const cancelDelete = () => {
    setShowModal(false); // Close the modal without deleting
    setRecordToDelete(null); // Reset the record to delete
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end mb-4 flex-wrap">
        <select
          dir="rtl"
          className="bg-green-500 text-white py-2 px-[10px] rounded-lg hover:bg-green-600 mb-2 sm:mb-0 sm:mr-2"
          onChange={(e) => sortRecords(e.target.value)}
        >
          <option value="id">مرتب سازی براساس شماره دانشجویی</option>
          <option value="name">مرتب سازی براساس نام</option>
          <option value="key">مرتب سازی براساس معدل</option>
        </select>
      </div>

      <table
        dir="rtl"
        className="table-auto w-full border-collapse border border-gray-200"
      >
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">شماره دانشجویی</th>
            <th className="border border-gray-300 p-2">نام و نام خانوادگی</th>
            <th className="border border-gray-300 p-2">معدل</th>
            <th className="border border-gray-300 p-2">دسترسی ها</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">
                {/* Convert ID to Persian digits before displaying */}
                {convertToPersianDigits(record.id)}
              </td>
              <td className="border border-gray-300 p-2">{record.name}</td>
              <td className="border border-gray-300 p-2">{record.key}</td>
              <td className="border border-gray-300 p-2 space-x-2">
                <button
                  className="m-[5px] bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                  onClick={() => handleDeleteClick(record.id)}
                >
                  حذف
                </button>
                <button
                  className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                  onClick={() => {
                    const newName = prompt(
                      "نام و نام خانوادگی جدید را وارد نمایید : "
                    );
                    if (newName !== null && newName.trim() !== "") {
                      // Only update if user provides a valid name
                      updateRecord({ ...record, name: newName });
                    }
                  }}
                >
                  ویرایش
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-400 p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-lg text-right font-semibold mb-4">
              آیا از حذف این رکورد اطمینان دارید؟
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                onClick={confirmDelete}
              >
                بله، حذف کن
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                onClick={cancelDelete}
              >
                خیر، انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordList;
