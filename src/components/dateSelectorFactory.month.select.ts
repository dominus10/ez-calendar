interface DateSelectorFactoryMonthSelectProps {
  monthNames?: string[];
}

const defaultMonthNames: DateSelectorFactoryMonthSelectProps["monthNames"] = [
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

/**
 * ---
 * By default uses EN(English) locale for month names.
 *
 * You can pass an array of month names to the factory function to use custom month names.
 *
 * @param {string} className - Optional class name for the select element.
 * @param {string[]} monthNames - Array of month names to use in the select element.
 */
export const dateSelectorFactoryMonthSelect = (
  className: string | undefined | null = undefined,
  { monthNames = defaultMonthNames }: DateSelectorFactoryMonthSelectProps = {},
) => {
  const element = document.createElement("select");
  // Default styling
  element.style.width = "50%";
  element.style.height = "32px";
  element.style.border = "none";
  element.style.borderBottom = "1px solid #ccc";

  // Element styling with class
  if (className) {
    element.className = className;
  }

  // Populate the select element with month names and set the value to the month index (0-11)
  for (let i = 0; i < 12; i++) {
    const option = document.createElement("option");
    option.value = i.toString();
    option.textContent = monthNames[i];
    element.appendChild(option);
  }

  return element;
};
