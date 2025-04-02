## EZCalendar

EZCalendar is a lightweight, customizable date picker fully typed in Typescript component that works seamlessly with plain HTML as well as modern libraries and frameworks like React, Vue, Svelte, and more.

### Status

    Core feature : ✅
    Plain JS for HTML release : ✅
    Gzip release : ✅
    Class styling (Tailwind etc.) :
    - Plain CSS ✅
    - SCSS 🚧
    - POSTCSS 🚧
    - Tailwind ✅
    - Bootstrap 🚧
    - Bulma 🚧
    React wrapper : ✅
    Vue wrapper: ❌ (not implemented yet)
    Svelte wrapper: ❌ (not implemented yet)

### Features

    🌐 Cross-framework compatibility (HTML, React, Vue, Svelte, etc.)
    🔥 Lightweight and fast
    📅 Customizable date display and formatting
    💡 Built-in event handling for easy integration

## Usage

💻 HTML

Simply include the minified JavaScript file in your HTML document:

```
<head>
  ...
  <script src="/index.min.js" defer></script>
</head>
```

To use EZCalendar with plain HTML, follow these steps:

1. Add the component to your HTML body.
2. Attach an event listener to detect value changes.

Example

```
<head>
  <script src="/index.min.js" defer></script>
</head>
<body>
  <ez-datepicker id="calendar"></ez-datepicker>
  <p id="date"></p>

  <script>
    const calendar = document.getElementById("calendar");
    calendar.addEventListener("date-change", (event) => {
      document.getElementById("date").textContent = event.detail;
    });
  </script>
</body>
```

## ⚛️ React

Integrate EZCalendar into your React application with the following steps:

1. Create a DatePicker component that wraps the EZCalendar.
2. Handle the date changes using a callback function.

### React Component Example

```
import React, { useState } from "react";
import DatePicker from "./DatePicker";

const App = () => {
  const [selectedDate, setSelectedDate] = useState("2025-03-30");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h1>React Date Picker</h1>
      <DatePicker value={selectedDate} onDateChange={handleDateChange} />
      <p>Selected Date: {selectedDate || "None"}</p>
    </div>
  );
};

export default App;
```

## Event Handling

The date-change event is emitted whenever the selected date changes. You can listen to this event and retrieve the new date from event.detail.

### Event Example

```
calendar.addEventListener("date-change", (event) => {
console.log("New date selected:", event.detail);
});
```

## Customization

You can customize the appearance and behavior of EZCalendar by using CSS and passing attributes directly to the <ez-datepicker> element.

### Custom Styling Example

```
<style>
  ez-datepicker {
    --primary-color: #007bff;
    --background-color: #fff;
    --text-color: #333;
  }
</style>
```

## Browser Compatibility

EZCalendar works on all modern browsers. For older browsers, make sure to include necessary polyfills if needed.
License

This project is licensed under the MIT License. Feel free to use it for personal and commercial projects.
