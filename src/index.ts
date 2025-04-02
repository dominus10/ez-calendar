type ButtonMode = "input" | "button";

// function to handle different dev environment
const handleEnvironment = (svgFile: string) => {
  if (typeof import.meta !== "undefined" && import.meta.url) {
    // When running in a module system (like Vite or Webpack)
    return new URL(svgFile, import.meta.url).href;
  } else {
    return svgFile;
  }
};

const DateSelectorFactory = (() => {
  class DateSelector extends HTMLElement {
    shadow: ShadowRoot;
    selectedDate: Date;
    yearSelect: HTMLSelectElement;
    monthSelect: HTMLSelectElement;
    calendarGrid: HTMLDivElement;
    previousMonthButton: HTMLButtonElement;
    nextMonthButton: HTMLButtonElement;
    selectedDay: number | null = null;

    constructor() {
      super();

      this.shadow = this.attachShadow({ mode: "open" });
      this.selectedDate = new Date();

      // Container styling
      const container = document.createElement("div");
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.padding = "1rem 3rem 3rem 3rem";
      container.style.borderRadius = "1rem";
      container.style.fontFamily = "Arial, sans-serif";

      // testing date output
      const dates = document.createElement("div");
      dates.textContent = this.selectedDate.toString();
      container.appendChild(dates);

      // Month and Year selection
      const header = document.createElement("div");
      header.style.display = "flex";
      header.style.justifyContent = "center";
      header.style.gap = "0.5rem";
      header.style.marginBottom = "0.5rem";

      this.yearSelect = document.createElement("select");
      this.yearSelect.style.width = "50%";
      this.yearSelect.style.height = "32px";
      this.yearSelect.style.border = "none";
      this.yearSelect.style.borderBottom = "1px solid #ccc";
      // this.yearSelect.style.padding = "1rem";

      this.monthSelect = document.createElement("select");
      this.monthSelect.style.width = "50%";
      this.monthSelect.style.height = "32px";
      this.monthSelect.style.border = "none";
      this.monthSelect.style.borderBottom = "1px solid #ccc";
      // this.monthSelect.style.padding = "1rem";

      for (let year = 1970; year <= new Date().getFullYear() + 10; year++) {
        const option = document.createElement("option");
        option.value = year.toString();
        option.textContent = year.toString();
        this.yearSelect.appendChild(option);
      }

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
      for (let i = 0; i < 12; i++) {
        const option = document.createElement("option");
        option.value = i.toString();
        option.textContent = monthNames[i];
        this.monthSelect.appendChild(option);
      }

      this.yearSelect.addEventListener("change", () => this.updateCalendar());
      this.monthSelect.addEventListener("change", () => this.updateCalendar());

      header.appendChild(this.yearSelect);
      header.appendChild(this.monthSelect);
      container.appendChild(header);

      // Weekday headers
      const weekdays = document.createElement("div");
      weekdays.style.display = "grid";
      weekdays.style.gridTemplateColumns = "repeat(7, 1fr)";
      weekdays.style.gap = "2px";
      weekdays.style.textAlign = "center";
      weekdays.style.fontWeight = "bold";
      weekdays.style.padding = "2rem 1rem 0 1rem";

      ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach((day) => {
        const dayElem = document.createElement("div");
        dayElem.textContent = day;
        weekdays.appendChild(dayElem);
      });

      container.appendChild(weekdays);

      // Calendar Grid
      this.calendarGrid = document.createElement("div");
      this.calendarGrid.style.display = "grid";
      this.calendarGrid.style.gridTemplateColumns = "repeat(7, 1fr)";
      this.calendarGrid.style.gap = "4px";
      this.calendarGrid.style.textAlign = "center";
      this.calendarGrid.style.paddingTop = "1rem";
      this.calendarGrid.style.paddingBottom = "2rem";
      this.calendarGrid.style.paddingLeft = "1rem";
      this.calendarGrid.style.paddingRight = "1rem";

      container.appendChild(this.calendarGrid);

      // Previous month button
      this.previousMonthButton = document.createElement("button");
      this.previousMonthButton.style.position = "absolute";
      this.previousMonthButton.style.left = "1rem";
      this.previousMonthButton.style.top = "0";
      this.previousMonthButton.style.transform = "translateY(50%)";
      this.previousMonthButton.style.height = "50%";
      this.previousMonthButton.style.width = "2rem";
      this.previousMonthButton.style.border = "0";
      this.previousMonthButton.style.background = "transparent";

      fetch(handleEnvironment("./left.svg"))
        .then((response) => response.text())
        .then((svgContent) => {
          const svgElement = new DOMParser().parseFromString(
            svgContent,
            "image/svg+xml",
          ).documentElement;
          svgElement.setAttribute("height", "18");
          svgElement.setAttribute("width", "18");
          this.previousMonthButton.appendChild(svgElement);
        })
        .catch(console.error);
      this.previousMonthButton.addEventListener("click", () => {
        this.updateCalendar(-1);
      });
      container.appendChild(this.previousMonthButton);

      // Next month button
      this.nextMonthButton = document.createElement("button");
      this.nextMonthButton.style.position = "absolute";
      this.nextMonthButton.style.right = "1rem";
      this.nextMonthButton.style.top = "0";
      this.nextMonthButton.style.transform = "translateY(50%)";
      this.nextMonthButton.style.height = "50%";
      this.nextMonthButton.style.width = "2rem";
      this.nextMonthButton.style.border = "0";
      this.nextMonthButton.style.background = "transparent";
      fetch(handleEnvironment("./right.svg"))
        .then((response) => response.text())
        .then((svgContent) => {
          const svgElement = new DOMParser().parseFromString(
            svgContent,
            "image/svg+xml",
          ).documentElement;
          svgElement.setAttribute("height", "18");
          svgElement.setAttribute("width", "18");
          this.nextMonthButton.appendChild(svgElement);
        })
        .catch(console.error);
      this.nextMonthButton.addEventListener("click", () => {
        this.updateCalendar(1);
      });
      container.appendChild(this.nextMonthButton);

      // Confirm Button
      const confirmButton = document.createElement("button");
      confirmButton.textContent = "Confirm";
      confirmButton.style.position = "absolute";
      confirmButton.style.bottom = "1rem";
      confirmButton.style.right = "1rem";
      confirmButton.style.padding = "1rem";
      confirmButton.style.cursor = "pointer";
      confirmButton.style.width = "fit-content";
      confirmButton.style.border = "none";
      confirmButton.style.background = "#007bff";
      confirmButton.style.borderRadius = "8px";
      confirmButton.style.color = "#fff";
      confirmButton.style.textTransform = "uppercase";
      confirmButton.addEventListener("click", () => this.confirmDate());
      container.appendChild(confirmButton);

      this.shadow.appendChild(container);

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

      // Fill in previous month's days
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      for (let i = startDay - 1; i >= 0; i--) {
        const dayElem = document.createElement("div");
        dayElem.textContent = (prevMonthLastDay - i).toString();
        dayElem.style.color = "#ccc";
        dayElem.style.pointerEvents = "none";
        dayElem.style.padding = "0.5rem";
        this.calendarGrid.appendChild(dayElem);
      }

      // Fill in current month's days
      for (let day = 1; day <= totalDays; day++) {
        const dayElem = document.createElement("div");
        dayElem.textContent = day.toString();
        dayElem.style.padding = "0.5rem";
        dayElem.style.display = "flex";
        dayElem.style.flexDirection = "column";
        dayElem.style.justifyContent = "center";
        dayElem.style.cursor = "pointer";
        dayElem.style.borderRadius = "50%";
        dayElem.style.width = "1.15rem";
        dayElem.style.height = "1.15rem";

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
  }

  // Define the custom element
  customElements.define("date-selector", DateSelector);

  return () => document.createElement("date-selector") as DateSelector;
})();

class Calendar extends HTMLElement {
  type: ButtonMode = "button"; // Default value
  modalState: boolean = false;

  constructor() {
    super();

    // Read attributes from HTML
    this.type = (this.getAttribute("type") as ButtonMode) || "button";

    // Date Selector
    this.dateSelector = document.createElement("div");
    this.dateSelector.style.display = "flex";
    this.dateSelector.style.position = "absolute";
    this.dateSelector.style.top = "50%";
    this.dateSelector.style.left = "50%";
    this.dateSelector.style.paddingTop = "3rem";
    this.dateSelector.style.width = "fit-content";
    this.dateSelector.style.height = "fit-content";
    this.dateSelector.style.background = "#fff";
    this.dateSelector.style.justifyContent = "center";
    this.dateSelector.style.alignItems = "center";
    this.dateSelector.style.borderRadius = "1rem";
    this.dateSelector.style.transform = "translate(-50%, -50%)";

    const dateSelectorElement = DateSelectorFactory();
    dateSelectorElement.addEventListener("date-change", (event) => {
      const selectedDate = new Date((event.target as HTMLInputElement).value);
      this.emitDateChange(selectedDate);
    });
    this.dateSelector.addEventListener("close-modal", (e) => {
      this.toggleModal(e);
    });
    this.dateSelector.appendChild(dateSelectorElement);

    // Button
    this.button.style.width = "48px";
    this.button.style.height = "48px";
    this.button.style.border = "none";
    this.button.style.cursor = "pointer";
    let dataClass = this.getAttribute("data-buttonClass");
    if (dataClass) {
      this.button.className = dataClass!;
    }

    // Modal (Popup)
    this.modal.style.display = "none";
    this.modal.style.position = "absolute";
    this.modal.style.top = "0";
    this.modal.style.left = "0";
    this.modal.style.width = "100dvw";
    this.modal.style.height = "100dvh";
    this.modal.style.background = "#000000cc";
    this.modal.style.justifyContent = "center";
    this.modal.style.alignItems = "center";
    this.modal.addEventListener("click", (event) => this.toggleModal(event));
    this.modal.appendChild(this.dateSelector);

    // Close Button inside Modal
    const closeButton = document.createElement("button");
    fetch(handleEnvironment("./close.svg"))
      .then((response) => response.text())
      .then((svgContent) => {
        const svgElement = new DOMParser().parseFromString(
          svgContent,
          "image/svg+xml",
        ).documentElement;
        svgElement.setAttribute("height", "18");
        svgElement.setAttribute("width", "18");
        closeButton.appendChild(svgElement);
      })
      .catch(console.error);
    closeButton.style.cssText = this.button.style.cssText;
    closeButton.className = this.button.className;
    closeButton.style.display = "flex";
    closeButton.style.justifyContent = "center";
    closeButton.style.alignItems = "center";
    closeButton.style.position = "absolute";
    closeButton.style.top = "0.5rem";
    closeButton.style.right = "0.5rem";
    closeButton.style.borderRadius = "50%";
    closeButton.style.background = "transparent";
    closeButton.addEventListener("click", (event) => this.toggleModal(event));
    this.dateSelector.appendChild(closeButton);
    this.dateSelector.addEventListener("click", (event) =>
      event.stopPropagation(),
    );

    // Event Listener for Button Click
    this.button.addEventListener("click", (event) => {
      event.stopPropagation();
      this.toggleModal(event);
    });

    // Fetch and insert SVG
    if (this.type === "button") {
      fetch(handleEnvironment("./calendar.svg"))
        .then((response) => response.text())
        .then((svgContent) => {
          const svgElement = new DOMParser().parseFromString(
            svgContent,
            "image/svg+xml",
          ).documentElement;
          svgElement.setAttribute("height", "24");
          svgElement.setAttribute("width", "24");
          this.button.appendChild(svgElement);
        })
        .catch(console.error);

      this.baseContainer.appendChild(this.button);
      this.baseContainer.appendChild(this.modal);
    }
  }

  connectedCallback() {
    this.appendChild(this.baseContainer);
    let buttonClassList = this.getAttribute("data-buttonClass");
    if(buttonClassList) {
      this.button.className = buttonClassList;
    }
  }

  createRenderRoot() {
    return this;
  }

  baseContainer = document.createElement("div");
  button = document.createElement("button");
  modal = document.createElement("div");
  dateSelector = document.createElement("div");

  // Function to toggle modal
  toggleModal(
    e: { preventDefault: () => void; stopPropagation: () => void } | undefined,
  ) {
    e!.preventDefault();
    e!.stopPropagation();
    this.modalState = !this.modalState;
    this.modal.style.display = this.modalState ? "flex" : "none";
  }

  // Event emitter
  emitDateChange(date: Date) {
    const formattedDate = date.toISOString().split("T")[0]; // Convert date to a string
    const event = new CustomEvent("date-change", {
      detail: { date: formattedDate },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

// Register the custom element
if (!customElements.get("ez-calendar")) {
  customElements.define("ez-calendar", Calendar);
}
