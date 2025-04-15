import { handleEnvironment } from "./handleEnvironment.js";

export const dateSelectorFactoryPreviousMonthButton = () => {
  const element = document.createElement("button");

  // Default styling
  element.style.position = "absolute";
  element.style.left = "1rem";
  element.style.top = "0";
  element.style.transform = "translateY(50%)";
  element.style.height = "50%";
  element.style.width = "2rem";
  element.style.border = "0";
  element.style.background = "transparent";

  // Fetch the SVG icon and append it to the button
  fetch(handleEnvironment("./left.svg"))
    .then((response) => response.text())
    .then((svgContent) => {
      const svgElement = new DOMParser().parseFromString(
        svgContent,
        "image/svg+xml",
      ).documentElement;
      svgElement.setAttribute("height", "18");
      svgElement.setAttribute("width", "18");
      element.appendChild(svgElement);
    })
    .catch(console.error);

  return element;
};
