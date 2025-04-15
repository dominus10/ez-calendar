export const dateSelectorFactoryCalendarGrid = () => {
  const element = document.createElement("div");
  element.style.display = "grid";
  element.style.gridTemplateColumns = "repeat(7, 1fr)";
  element.style.gap = "4px";
  element.style.textAlign = "center";
  element.style.paddingTop = "1rem";
  element.style.paddingBottom = "2rem";
  element.style.paddingLeft = "1rem";
  element.style.paddingRight = "1rem";

  return element;
};
