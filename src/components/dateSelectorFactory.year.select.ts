interface DateSelectorFactoryYearSelectProps {
  min?: number;
  max?: number;
}

/**
 * ---
 * By default, the year select will start from 1970 and go up to the current year + 10.
 *
 * You can pass min and max values to the factory function to customize the range.
 *
 * @param {string} className - Optional class name for the select element.
 * @param {DateSelectorFactoryYearSelectProps} options - Optional configuration object.
 *   @param {number} options.min - Minimum year (default: 1970).
 *   @param {number} options.max - Maximum year (default: current year + 10).
 */
export const dateSelectorFactoryYearSelect = (
  className: string | undefined | null = undefined,
  {
    min = 1970,
    max = new Date().getFullYear() + 10,
  }: DateSelectorFactoryYearSelectProps = {},
) => {
  // Create a select element for year selection
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

  // Populate the select element with years
  for (let year = min; year <= max; year++) {
    const option = document.createElement("option");
    option.value = year.toString();
    option.textContent = year.toString();
    element.appendChild(option);
  }

  return element;
};
