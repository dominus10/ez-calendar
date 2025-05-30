import { dateSelectorFactoryCalendarGrid } from "./dateSelectorFactory.calendarGrid.js";
import { dateSelectorFactorNextMonthButton } from "./dateSelectorFactory.nextMonth.button.js";
import { dateSelectorFactoryPreviousMonthButton } from "./dateSelectorFactory.previousMonth.button.js";
import { dateSelectorFactoryConfirmButton } from "./dateSelectorFactory.confirmButton.button.js";
import { dateSelectorFactoryContainer } from "./dateSelectorFactory.container.js";
import { dateSelectorFactoryHeader } from "./dateSelectorFactory.header.js";
import { dateSelectorFactoryMonthSelect } from "./dateSelectorFactory.month.select.js";
import { dateSelectorFactoryWeekdayHeader } from "./dateSelectorFactory.weekday.header.js";
import { dateSelectorFactoryYearSelect } from "./dateSelectorFactory.year.select.js";

export const dateSelectorFactory = (() => {
  class DateSelector extends HTMLElement {
    selectedDate: Date;
    selectedDay: number | null = null;

    container = dateSelectorFactoryContainer();
    header = dateSelectorFactoryHeader();
    yearSelect = dateSelectorFactoryYearSelect(
      this.getAttribute("data-yearDropdownClass"),
    );
    monthSelect = dateSelectorFactoryMonthSelect();
    weekdayHeader = dateSelectorFactoryWeekdayHeader();
    calendarGrid = dateSelectorFactoryCalendarGrid();
    previousMonthButton = dateSelectorFactoryPreviousMonthButton();
    nextMonthButton = dateSelectorFactorNextMonthButton();
    confirmButton = dateSelectorFactoryConfirmButton();

    constructor() {
      super();
      this.selectedDate = new Date();

      // Refactor TODO: Move to a separate function
      this.yearSelect.addEventListener("change", () => this.updateCalendar());
      this.monthSelect.addEventListener("change", () => this.updateCalendar());

      this.header.appendChild(this.yearSelect);
      this.header.appendChild(this.monthSelect);
      this.container.appendChild(this.header);
      this.container.appendChild(this.weekdayHeader);
      this.container.appendChild(this.calendarGrid);
      this.previousMonthButton.addEventListener("click", () => {
        this.updateCalendar(-1);
      });
      this.container.appendChild(this.previousMonthButton);
      this.nextMonthButton.addEventListener("click", () => {
        this.updateCalendar(1);
      });
      this.container.appendChild(this.nextMonthButton);
      this.confirmButton.addEventListener("click", () => this.confirmDate());
      this.container.appendChild(this.confirmButton);

      // Set initial values
      this.yearSelect.value = this.selectedDate.getFullYear().toString();
      this.monthSelect.value = this.selectedDate.getMonth().toString();
      this.updateCalendar();
    }

    updateCalendar(monthOffset: number = 0): void {
      this.calendarGrid.innerHTML = "";

      let year = parseInt(this.yearSelect.value, 10);
      let month = parseInt(this.monthSelect.value, 10) + monthOffset;

      // Adjust the year and month if month goes out of bounds
      if (month < 0) {
        month = 11;
        year -= 1;
      } else if (month > 11) {
        month = 0;
        year += 1;
      }

      // Update the select values to reflect the new month and year
      this.monthSelect.value = month.toString();
      this.yearSelect.value = year.toString();

      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);

      const startDay = firstDayOfMonth.getDay();
      const totalDays = lastDayOfMonth.getDate();

      const isMobile = window.innerWidth < 600;
      const size = isMobile ? "10vw" : "40px";

      // Fill in previous month's days
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      for (let i = startDay - 1; i >= 0; i--) {
        const dayElem = document.createElement("div");
        dayElem.textContent = (prevMonthLastDay - i).toString();
        dayElem.style.color = "#ccc";
        dayElem.style.pointerEvents = "none";
        dayElem.style.padding = "0.5rem";
        dayElem.style.marginLeft = "0.35rem";
        dayElem.style.width = size;
        dayElem.style.height = size;
        this.calendarGrid.appendChild(dayElem);
      }

      // Fill in current month's days
      for (let day = 1; day <= totalDays; day++) {
        const dayElem = document.createElement("div");
        dayElem.textContent = day.toString();
        dayElem.style.padding = "0.5rem";
        dayElem.style.marginLeft = "0.35rem";
        dayElem.style.display = "flex";
        dayElem.style.flexDirection = "column";
        dayElem.style.justifyContent = "center";
        dayElem.style.cursor = "pointer";
        dayElem.style.borderRadius = "50%";
        dayElem.style.width = size;
        dayElem.style.height = size;

        if (
          this.selectedDay === day &&
          parseInt(this.monthSelect.value) === this.selectedDate.getMonth() &&
          parseInt(this.yearSelect.value) === this.selectedDate.getFullYear()
        ) {
          dayElem.style.background = "#007bff";
          dayElem.style.color = "#fff";
        }

        dayElem.addEventListener("click", () => {
          this.selectedDay = day;
          this.updateCalendar();
        });

        this.calendarGrid.appendChild(dayElem);
      }

      // Fill in next month's days to complete the grid
      const remainingDays = 42 - (startDay + totalDays);
      for (let i = 1; i <= remainingDays; i++) {
        const dayElem = document.createElement("div");
        dayElem.textContent = i.toString();
        dayElem.style.color = "#ccc";
        dayElem.style.pointerEvents = "none";
        dayElem.style.padding = "0.5rem";
        this.calendarGrid.appendChild(dayElem);
      }
    }

    confirmDate() {
      if (this.selectedDay !== null) {
        this.selectedDate.setDate(this.selectedDay);
        this.selectedDate.setFullYear(parseInt(this.yearSelect.value));
        this.selectedDate.setMonth(parseInt(this.monthSelect.value));

        // Dispatch the date-change event with the correct value
        this.dispatchEvent(
          new CustomEvent("date-change", {
            detail: this.value,
            bubbles: true,
            composed: true,
          }),
        );

        // Close the modal
        this.dispatchEvent(
          new CustomEvent("close-modal", {
            bubbles: true,
            composed: true,
          }),
        );
      }
    }

    get value(): string {
      return this.selectedDay
        ? `${this.yearSelect.value}-${String(
            parseInt(this.monthSelect.value) + 1,
          ).padStart(2, "0")}-${String(this.selectedDay).padStart(2, "0")}`
        : "";
    }

    set value(newValue: string) {
      const [year, month, day] = newValue.split("-").map(Number);
      this.yearSelect.value = year.toString();
      this.monthSelect.value = (month - 1).toString();
      this.selectedDay = day;
      this.updateCalendar();
    }

    connectedCallback() {
      this.appendChild(this.container);
      let yearDropdownClass = this.getAttribute("data-yeardropdownclass");
      if (yearDropdownClass) {
        console.log("!");
        this.yearSelect.removeAttribute("style");
        this.yearSelect.className = yearDropdownClass;
      }
    }

    createRenderRoot() {
      return this;
    }
  }

  // Define the custom element
  customElements.define("date-selector", DateSelector);

  return () => document.createElement("date-selector") as DateSelector;
})();
