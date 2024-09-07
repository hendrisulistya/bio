document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const lightTheme = "assets/css/style.css";
  const darkTheme = "assets/css/dark.css";
  const linkElement = document.createElement("link");

  linkElement.rel = "stylesheet";
  linkElement.id = "theme-stylesheet";
  const savedTheme = localStorage.getItem("theme") || "light";
  linkElement.href = savedTheme === "dark" ? darkTheme : lightTheme;
  document.head.appendChild(linkElement);

  themeToggle.checked = savedTheme === "dark";

  themeToggle.addEventListener("change", () => {
    const newTheme = themeToggle.checked ? darkTheme : lightTheme;
    linkElement.href = newTheme;
    localStorage.setItem("theme", themeToggle.checked ? "dark" : "light");
  });
});
