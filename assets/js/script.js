// Function to load content into the #content div and update active link
function loadContent(section) {
  const content = document.getElementById("content");
  const links = document.querySelectorAll(".nav-items a");

  // Disable all links
  links.forEach((link) => link.classList.remove("active"));

  // Enable clicked link
  const activeLink = document.querySelector(`.nav-items a[href="#${section}"]`);
  activeLink.classList.add("active");

  fetch(`/section/${section}.html`)
    .then((response) => response.text())
    .then((data) => {
      content.innerHTML = data;
    })
    .catch((error) => {
      content.innerHTML = `<p>Error loading content: ${error}</p>`;
    });
}

// Function to load initial content
function loadInitialContent() {
  loadContent("home"); // Load the default content
}

// Toggle display for the selected element and hide others
function toggleDisplay(elementId) {
  const sections = [
    "interest-article",
    "interest-book",
    "interest-paper",
    "interest-video",
  ];

  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (section) {
      section.style.display = id === elementId ? "block" : "none";
    }
  });
}

// Event listener for window onload to load initial content
window.addEventListener("load", loadInitialContent);

// Add event listeners to navigation links
document.querySelectorAll(".nav-items a").forEach((link) => {
  link.addEventListener("click", function (event) {
    // Prevent the default action if the link is active
    if (this.classList.contains("active")) {
      event.preventDefault();
    }
  });
});
