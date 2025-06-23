import { useState, useRef } from "react";
import contact from "../../assets/banner-contact.jpeg";
import Select from "react-select";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";

function ContactSection() {
  const form = useRef();

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    startDate: "",
    service: null,
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  // Options for the service dropdown
  const serviceOptions = [
    { value: "visa", label: "Visa" },
    { value: "limited-stay-permit", label: "Limited Stay Permit" },
    { value: "legal-services", label: "Legal Services" },
    { value: "company-set-up", label: "Company Set Up" },
  ];

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS configuration - Replace with your actual values
      const serviceId = "service_zoew3p8";
      const templateId = "template_y8giy8n";
      const publicKey = "UHZ2tBnnsGIwtNsMs";

      // Prepare template parameters
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone,
        start_date: formData.startDate,
        service: formData.service?.label || "",
        message: `Name: ${formData.firstName} ${formData.lastName}\nEmail: ${
          formData.email
        }\nPhone: ${formData.phone}\nStart Date: ${
          formData.startDate
        }\nService: ${formData.service?.label || "Not specified"}`,
        to_name: "Infinity Legal",
      };

      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log("Email sent successfully:", result);
      setSubmitStatus("success");

      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        startDate: "",
        service: null,
      });
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Custom styles for react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "none",
      borderBottom: "1px solid #d1d5db",
      borderRadius: 0,
      boxShadow: "none",
      backgroundColor: "transparent",
      minHeight: "40px",
      cursor: "pointer",
      "&:hover": {
        borderColor: "#0891b2",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af",
      fontSize: "1.125rem",
    }),
    input: (provided) => ({
      ...provided,
      color: "#6b7280",
      fontSize: "1.125rem",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#6b7280",
      fontSize: "1.125rem",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "8px 0",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.375rem",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#0891b2"
        : state.isFocused
        ? "#e0f2fe"
        : null,
      color: state.isSelected ? "white" : "#374151",
      cursor: "pointer",
    }),
  };

  return (
    <section className="py-16">
      <h2 className="text-3xl font-semibold text-center text-black mb-12">
        Need a Help ?
      </h2>
      <div className="flex gap-12 px-16 pb-16 max-w-7xl mx-auto bg-white max-md:flex-col max-md:p-10 max-sm:p-5">
        <div className="flex flex-col gap-8 flex-1">
          <Link to={"/contact"}>
            <h2 className="text-7xl font-extrabold text-black max-sm:text-5xl">
              Contact us
            </h2>
          </Link>
          <p className="text-base text-black max-w-xl">
            You can also fill out the form below, and we will respond within 1
            business day.
          </p>

          {/* Success/Error Messages */}
          {submitStatus === "success" && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded max-w-md">
              Thank you! Your message has been sent successfully. We'll get back
              to you within 1 business day.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
              Sorry, there was an error sending your message. Please try again
              or contact us directly.
            </div>
          )}

          <form
            ref={form}
            onSubmit={handleSubmit}
            className="flex flex-col gap-7 mt-4 max-w-md"
          >
            <FormField
              placeholder="First Name"
              required={true}
              value={formData.firstName}
              onChange={(value) => handleInputChange("firstName", value)}
            />
            <FormField
              placeholder="Last Name"
              required={true}
              value={formData.lastName}
              onChange={(value) => handleInputChange("lastName", value)}
            />
            <FormField
              placeholder="Email"
              // required={true}
              type="email"
              value={formData.email}
              onChange={(value) => handleInputChange("email", value)}
            />
            <FormField
              placeholder="Phone Number"
              required={true}
              type="tel"
              value={formData.phone}
              onChange={(value) => handleInputChange("phone", value)}
            />

            {/* Date Picker */}
            {/* <DatePickerField
              placeholder="When do you want to start a business?"
              required={true}
              value={formData.startDate}
              onChange={(value) => handleInputChange("startDate", value)}
            /> */}

            {/* React Select component for services */}
            <div className="relative">
              <Select
                options={serviceOptions}
                styles={customStyles}
                value={formData.service}
                onChange={(value) => handleInputChange("service", value)}
                placeholder="What services are you looking for?"
                className="react-select-container"
                classNamePrefix="react-select"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-4 py-3 px-8 rounded-md font-medium self-start transition-colors ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-cyan-600 hover:bg-cyan-700"
              } text-white`}
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
        <div className="flex-1 max-md:hidden">
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

function FormField({ placeholder, required, type = "text", value, onChange }) {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={`${placeholder}${required ? " *" : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-2 pb-1.5 bg-transparent border-b border-gray-300 focus:border-cyan-600 focus:outline-none text-lg text-black placeholder-gray-400"
        required={required}
      />
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
