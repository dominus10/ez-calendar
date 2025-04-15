// function to handle different dev environment
export const handleEnvironment = (svgFile: string) => {
  if (typeof import.meta !== "undefined" && import.meta.url) {
    // When running in a module system (like Vite or Webpack)
    return new URL(svgFile, import.meta.url).href;
  } else {
    return svgFile;
  }
};
