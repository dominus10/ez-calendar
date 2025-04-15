export const dateSelectorFactoryConfirmButton = () => {
  const element = document.createElement("button");

  element.textContent = "Confirm";
  element.style.position = "absolute";
  element.style.bottom = "1rem";
  element.style.right = "1rem";
  element.style.padding = "1rem";
  element.style.cursor = "pointer";
  element.style.width = "fit-content";
  element.style.border = "none";
  element.style.background = "#007bff";
  element.style.borderRadius = "8px";
  element.style.color = "#fff";
  element.style.textTransform = "uppercase";

  return element
};
