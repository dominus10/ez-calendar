import { dateSelectorFactory } from "./components/base.dateSelectorFactory.js";
import { handleEnvironment } from "./components/handleEnvironment.js";

type ButtonMode = "input" | "button";

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

    const dateSelectorElement = dateSelectorFactory();
    dateSelectorElement.addEventListener("date-change", (event) => {
      const selectedDate = new Date((event.target as HTMLInputElement).value);
      this.emitDateChange(selectedDate);
    });
    this.dateSelector.addEventListener("close-modal", (e) => {
      this.toggleModal(e);
    });
    let yearClass = this.getAttribute("data-yearDropdownClass");
    console.log(yearClass);
    if (yearClass) {
      dateSelectorElement.setAttribute("data-yearDropdownClass", yearClass);
    }
    this.dateSelector.appendChild(dateSelectorElement);

    // Button
    this.button.style.width = "48px";
    this.button.style.height = "48px";
    this.button.style.border = "none";
    this.button.style.display = "flex";
    this.button.style.justifyContent = "center";
    this.button.style.alignItems = "center";
    this.button.style.alignContent = "center";
    this.button.style.backgroundColor = "#ccc";
    this.button.style.cursor = "pointer";
    let dataClass = this.getAttribute("data-buttonClass");
    if (dataClass) {
      this.button.removeAttribute("style");
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
    closeButton.style.display = "flex";
    closeButton.style.justifyContent = "center";
    closeButton.style.alignItems = "center";
    closeButton.style.position = "absolute";
    closeButton.style.top = "0.5rem";
    closeButton.style.right = "0.5rem";
    closeButton.style.borderRadius = "50%";
    closeButton.style.background = "transparent";
    closeButton.style.top = "1rem";
    closeButton.style.right = "1rem";
    closeButton.style.cursor = "pointer";
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
    let yearClass = this.getAttribute("data-yearDropdownClass");
    if (yearClass) {
      this.dateSelector.setAttribute("data-yearDropdownClass", yearClass);
    }
    if (buttonClassList) {
      this.button.removeAttribute("style");
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
