import { useState } from "react";
import contact from "../../assets/banner-contact.jpeg";

function ContactSection() {
  const [startDate, setStartDate] = useState("");

  return (
    <section className="py-16">
      <h2 className="text-3xl font-semibold text-center text-black mb-12">
        Need a Help ?
      </h2>
      <div className="flex gap-12 px-16 pb-16 max-w-7xl mx-auto bg-white max-md:flex-col max-md:p-10 max-sm:p-5">
        <div className="flex flex-col gap-8 flex-1">
          <h2 className="text-7xl font-extrabold text-black max-sm:text-5xl">
            Contact us
          </h2>
          <p className="text-base text-black max-w-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            tincidunt sit amet lorem quis dignissim. Vivamus facilisis venenatis
            eros, id fringilla dolor iaculis quis. Donec quis purus leo.
          </p>
          <form className="flex flex-col gap-7 mt-4 max-w-md">
            <FormField placeholder="Nama Depan" required={true} />
            <FormField placeholder="Nama Belakang" required={true} />
            <FormField placeholder="Email" required={true} type="email" />
            <FormField placeholder="Nomor Telepon" required={true} type="tel" />

            {/* Date Picker instead of dropdown */}
            <DatePickerField
              placeholder="Kapan Anda ingin memulai bisnis?"
              required={true}
              value={startDate}
              onChange={setStartDate}
            />

            <FormField
              placeholder="Layanan apa yang Anda cari?"
              required={true}
              isDropdown={true}
            />
            {/* <button
              type="submit"
              className="mt-4 bg-cyan-600 text-white py-3 px-8 rounded-md font-medium self-start hover:bg-cyan-700 transition-colors"
            >
              Submit
            </button> */}
          </form>
        </div>
        <div className="flex-1">
          <img
            src={contact}
            className="w-full h-full object-cover max-h-[700px] pl-24"
            alt="Person's hand reaching out of the water"
          />
        </div>
      </div>
    </section>
  );
}

function FormField({
  placeholder,
  required,
  type = "text",
  isDropdown = false,
}) {
  return (
    <div className="relative">
      {isDropdown ? (
        <div className="relative">
          <select
            className="w-full py-2 pb-1.5 bg-transparent border-b border-gray-300 focus:border-cyan-600 focus:outline-none appearance-none pr-8 text-gray-400 text-lg"
            required={required}
          >
            <option value="" disabled selected>
              {placeholder} {required && "*"}
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      ) : (
        <input
          type={type}
          placeholder={`${placeholder}${required ? " *" : ""}`}
          className="w-full py-2 pb-1.5 bg-transparent border-b border-gray-300 focus:border-cyan-600 focus:outline-none text-lg text-gray-400 placeholder-gray-400"
          required={required}
        />
      )}
    </div>
  );
}

function DatePickerField({ placeholder, required, value, onChange }) {
  const [showCalendar, setShowCalendar] = useState(false);

  // Get current month and year for the calendar
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Generate days in month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week for first day of month (0 = Sunday, 1 = Monday, etc)
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // Navigate to previous month
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Navigate to next month
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  };

  // Select a date
  const handleDateSelect = (day) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    onChange(selectedDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
    setShowCalendar(false);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Create calendar grid
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

    // Adjust for starting week on Monday (0 = Monday, ... 6 = Sunday)
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    const days = [];

    // Add empty cells for days before the first day of month
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = value === date.toISOString().split("T")[0];

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateSelect(day)}
          className={`h-8 w-8 rounded-full flex items-center justify-center text-sm
            ${isToday ? "bg-gray-200" : ""}
            ${isSelected ? "bg-cyan-600 text-white" : "hover:bg-gray-100"}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="relative">
      <div className="relative" onClick={() => setShowCalendar(!showCalendar)}>
        <input
          type="text"
          readOnly
          placeholder={`${placeholder}${required ? " *" : ""}`}
          value={value ? formatDate(value) : ""}
          className="w-full py-2 pb-1.5 bg-transparent border-b border-gray-300 focus:border-cyan-600 focus:outline-none text-lg text-gray-400 placeholder-gray-400 cursor-pointer"
          required={required}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
      </div>

      {/* Calendar Dropdown */}
      {showCalendar && (
        <div className="absolute z-10 mt-1 bg-white shadow-lg rounded-lg p-3 border border-gray-200 w-64">
          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-2">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="font-medium">
              {monthNames[currentMonth]} {currentYear}
            </div>
            <button
              type="button"
              onClick={nextMonth}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div
                key={day}
                className="h-8 w-8 flex items-center justify-center text-xs text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>

          {/* Today Button */}
          <div className="mt-2 text-right">
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                setCurrentMonth(today.getMonth());
                setCurrentYear(today.getFullYear());
                handleDateSelect(today.getDate());
              }}
              className="text-sm text-cyan-600 hover:text-cyan-800"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactSection;
