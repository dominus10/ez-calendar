import "@ez-calendar/core";
import { useEffect, useRef } from "react";

const DatePicker = ({ value, onDateChange }) => {
  const datePickerRef = useRef(null);

  useEffect(() => {
    const handleDateChange = (event) => {
      const newDate = event.detail.date;
      if (onDateChange) {
        onDateChange(newDate); // Call the callback with the new date
      }
    };

    const datePicker = datePickerRef.current;
    if (datePicker) {
      datePicker.addEventListener("date-change", handleDateChange);
    }

    return () => {
      if (datePicker) {
        datePicker.removeEventListener("date-change", handleDateChange);
      }
    };
  }, [onDateChange]);

  // Update the date picker when the value prop changes
  useEffect(() => {
    const datePicker = datePickerRef.current;
    if (datePicker && value) {
      datePicker.value = value;
    }
  }, [value]);

  return (
    <div>
      <EZDatepicker ref={datePickerRef}></EZDatepicker>
    </div>
  );
};

export default DatePicker;
