import React, { useState } from "react";

// Function to convert Persian digits to English digits for calculation
const convertToEnglishDigits = (text) => {
  const persianToEnglishMap = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
  };
  return text.replace(
    /[۰-۹]/g,
    (persianDigit) => persianToEnglishMap[persianDigit]
  );
};

const AverageKeyComponent = ({ records }) => {
  // Calculate the average of 'key' values in records
  const calculateAverage = () => {
    const total = records.reduce((sum, record) => {
      const keyInEnglish = convertToEnglishDigits(record.key);
      const numericKey = parseFloat(keyInEnglish);
      return sum + (isNaN(numericKey) ? 0 : numericKey);
    }, 0);

    const average = total / records.length;
    return isNaN(average) ? 0 : average;
  };

  const averageKey = calculateAverage();

  return (
    <div className="mt-4 p-[5px] text-center bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">میانگین معدل‌ها</h3>
      <p className="text-lg">{averageKey.toFixed(2)} / 20</p>
    </div>
  );
};

export default AverageKeyComponent;
