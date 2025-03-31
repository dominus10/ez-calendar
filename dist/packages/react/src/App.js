"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@ez-calendar/core");
const react_1 = require("react");
const DatePicker = ({ value, onDateChange }) => {
    const datePickerRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
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
    (0, react_1.useEffect)(() => {
        const datePicker = datePickerRef.current;
        if (datePicker && value) {
            datePicker.value = value;
        }
    }, [value]);
    return (React.createElement("div", null,
        React.createElement(EZDatepicker, { ref: datePickerRef })));
};
exports.default = DatePicker;
