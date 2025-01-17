import React, { useState, useEffect } from "react";
import RecordForm from "./components/RecordForm";
import RecordList from "./components/RecordList";
import Navbar from "./components/navbar";
import AverageKeyComponent from "./components/average"; // Import the new AverageKeyComponent
import Footer from "./components/footer";
import About from "./components/about";
import Open from "./components/open";

// Utility function to convert English numbers to Persian digits
const convertToPersianDigits = (number) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return number
    .toString()
    .split("")
    .map((digit) => persianDigits[parseInt(digit)] || digit)
    .join("");
};

const App = () => {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchId, setSearchId] = useState("");
  const [showMessage, setShowMessage] = useState(true); // State for controlling the welcome message visibility

  // Automatically hide the message after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 5000);

    return () => clearTimeout(timer); // Clear the timer when the component unmounts
  }, []);

  const addRecord = (newRecord) => {
    // Check if the ID already exists
    if (records.some((record) => record.id === newRecord.id)) {
      alert("شماره دانشجویی باید منحصر به فرد باشد");
      return;
    }

    // Add record if ID is unique
    setRecords((prevRecords) => [...prevRecords, newRecord]);
  };

  const deleteRecord = (id) => {
    setRecords(records.filter((record) => record.id !== id));
  };

  const updateRecord = (updatedRecord) => {
    setRecords(
      records.map((record) =>
        record.id === updatedRecord.id ? updatedRecord : record
      )
    );
  };

  const sortRecords = (key) => {
    const sorted = [...records].sort((a, b) => (a[key] > b[key] ? 1 : -1));
    setRecords(sorted);
  };

  // Convert searchId to Persian digits
  const persianSearchId = convertToPersianDigits(searchId);

  const filteredRecords = records.filter((record) => {
    const nameMatches = record.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const idMatches = convertToPersianDigits(record.id.toString()).includes(
      persianSearchId
    ); // Search by ID in Persian digits
    return nameMatches && idMatches;
  });

  return (
    <>
    
      <Navbar />
      <Open />
      <div className="min-h-screen bg-gray-400 text-gray-800">
        <div className="container md:w-[50%] mx-auto p-4">
          <h1 className="text-4xl font-bold font-lalezar text-center mb-6 text-blue-600">
            مدیریت معدل ها
          </h1>

          {/* Welcome Message */}
          {showMessage && (
            <div className="chat  chat-end fixed bottom-4 right-4 transition-opacity duration-500 opacity-100">
              <div className="chat-bubble  bg-white">
                <p className="text-black">خوش آمدید</p>
              </div>
            </div>
          )}

          <div className="shadow-md bg-blue-300 rounded-lg p-6">
            <RecordForm addRecord={addRecord} />

            <div className="my-4 flex flex-wrap gap-4">
              <input
                dir="rtl"
                type="text"
                className="flex-1 min-w-[200px] border rounded-lg p-2 bg-white"
                placeholder="جست و جو براساس نام دانشجو..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <input
                dir="rtl"
                type="text"
                className="flex-1 min-w-[200px] border rounded-lg p-2 bg-white"
                placeholder="جست و جو براساس شماره دانشجویی..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </div>

            <div className="container mx-auto p-6">
              <AverageKeyComponent records={records} />
            </div>

            <RecordList
              records={filteredRecords}
              deleteRecord={deleteRecord}
              updateRecord={updateRecord}
              sortRecords={sortRecords}
            />
          </div>
        </div>
      </div>
      <About />
      <Footer />
    </>
  );
};

export default App;
