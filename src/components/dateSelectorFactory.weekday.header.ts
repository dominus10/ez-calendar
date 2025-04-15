interface DateSelectorFactoryWeekdayHeaderProps {
  weekdayName?: string[];
}

const defaultMonthNames: DateSelectorFactoryWeekdayHeaderProps["weekdayName"] =
  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * ---
 * By default uses EN(English) locale for weekday names.
 * You can pass an array of weekday names to the factory function to use custom weekday names.
 *
 * @param {string} className - Optional class name for the select element.
 * @param {string[]} weekdayName - Array of weekday names to use in the select element.
 */
export const dateSelectorFactoryWeekdayHeader = (
  className: string | undefined | null = undefined,
  {
    weekdayName = defaultMonthNames,
  }: DateSelectorFactoryWeekdayHeaderProps = {},
) => {
  const element = document.createElement("div");
  // Default styling
  element.style.display = "grid";
  element.style.gridTemplateColumns = "repeat(7, 1fr)";
  element.style.gap = "2px";
  element.style.textAlign = "center";
  element.style.fontWeight = "bold";
  element.style.padding = "2rem 1rem 0 1rem";

  // Element styling with class
  if (className) {
    element.className = className;
  }

  weekdayName.forEach((day) => {
    const dayElem = document.createElement("div");
    dayElem.textContent = day;
    element.appendChild(dayElem);
  });

  return element;
};
