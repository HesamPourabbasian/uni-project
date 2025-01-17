import React, { useState } from "react";

const RecordForm = ({ addRecord }) => {
  const [record, setRecord] = useState({ id: "", name: "", key: "" });
  const [error, setError] = useState("");
  const [idError, setIdError] = useState("");
  const [keyError, setKeyError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const containsEnglishDigits = /[0-9]/.test(record.id);
    if (containsEnglishDigits) {
      setIdError("نمره باید با اعداد فارسی درج شود");
      return;
    }

    // Convert Persian digits to English digits for validation
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

    const idInEnglish = record.id.replace(
      /[۰-۹]/g,
      (persianDigit) => persianToEnglishMap[persianDigit]
    );

    if (
      isNaN(idInEnglish) ||
      idInEnglish.trim() === "" ||
      idInEnglish.length !== 14
    ) {
      setError("شماره دانشجویی باید حداکثر 14 عدد داشته باشد");
      return;
    }

    if (!isValidKey(record.key)) {
      setKeyError("معدل باید بین ۰ تا ۲۰ باشد");
      return;
    }

    setError("");
    setIdError("");
    setKeyError("");
    addRecord({ ...record, id: parseInt(idInEnglish, 10) });
    setRecord({ id: "", name: "", key: "" });
  };

  const isValidKey = (key) => {
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

    const keyInEnglish = key.replace(
      /[۰-۹]/g,
      (persianDigit) => persianToEnglishMap[persianDigit]
    );
    const numericKey = parseFloat(keyInEnglish); // تغییر به parseFloat برای پشتیبانی از اعشار
    return numericKey >= 0 && numericKey <= 20 && !isNaN(numericKey);
  };

  const convertToPersianDigits = (text) => {
    const englishToPersianMap = {
      0: "۰",
      1: "۱",
      2: "۲",
      3: "۳",
      4: "۴",
      5: "۵",
      6: "۶",
      7: "۷",
      8: "۸",
      9: "۹",
    };
    return text.replace(
      /[0-9]/g,
      (englishDigit) => englishToPersianMap[englishDigit] || englishDigit
    );
  };

  return (
    <form className="mb-6 grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
      <div>
        <input
          dir="rtl"
          type="text"
          className={`border bg-white rounded-lg w-full p-2 ${
            error || idError ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="شماره دانشجویی (حداکثر ۱۴ رقم)"
          value={record.id}
          maxLength="14"
          onChange={(e) => {
            const value = e.target.value;

            const englishToPersianMap = {
              0: "۰",
              1: "۱",
              2: "۲",
              3: "۳",
              4: "۴",
              5: "۵",
              6: "۶",
              7: "۷",
              8: "۸",
              9: "۹",
            };

            const convertedValue = value.replace(
              /[0-9]/g,
              (englishDigit) =>
                englishToPersianMap[englishDigit] || englishDigit
            );

            if (/^[\u06F0-\u06F9]{0,14}$/.test(convertedValue)) {
              setRecord({ ...record, id: convertedValue });
            }
          }}
          required
        />
        {idError && <p className="text-red-500 text-sm mt-1">{idError}</p>}
        {error && !idError && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
      </div>
      <div>
        <input
          dir="rtl"
          type="text"
          className="border bg-white border-gray-300 rounded-lg w-full p-2"
          placeholder="نام و نام خانوادگی (به حروف فارسی نوشته شود)"
          value={record.name}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[\u0600-\u06FF\s]*$/.test(value)) {
              setRecord({ ...record, name: value });
            }
          }}
          required
        />
      </div>
      <div>
        <input
          dir="rtl"
          type="text"
          className={`border bg-white border-gray-300 rounded-lg w-full p-2 ${
            keyError ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="معدل"
          value={record.key}
          onChange={(e) => {
            const value = e.target.value;
            const convertedValue = convertToPersianDigits(value);

            // Allow only Persian digits or an empty string
            if (/^[\u06F0-\u06F9]*\.?[\u06F0-\u06F9]*$/.test(convertedValue)) {
              setRecord({ ...record, key: convertedValue });
            }
          }}
          required
        />
        {keyError && <p className="text-red-500 text-sm mt-1">{keyError}</p>}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600"
      >
        اضافه کنید
      </button>
    </form>
  );
};

export default RecordForm;
