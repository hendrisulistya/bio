// Cache loaded sections to avoid refetching
const sectionCache = {};

// Utility function to set the active link
function setActiveLink(section) {
  const links = document.querySelectorAll(".nav-items a");
  links.forEach((link) => link.classList.remove("active"));

  const activeLink = document.querySelector(`.nav-items a[href="#${section}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  }
}

// Function to load content into the #content div and update active link
function loadContent(section) {
  const content = document.getElementById("content");

  // Set active link for the navigation
  setActiveLink(section);

  // Check if section content is cached
  if (sectionCache[section]) {
    content.innerHTML = sectionCache[section];

    // Special case: load books when "interest" is loaded
    if (section === "interest") {
      loadBooks();
    }
    return;
  }

  // Fetch and load the content from the server if not cached
  fetch(`/section/${section}.html`)
    .then((response) => response.text())
    .then((data) => {
      sectionCache[section] = data; // Cache the content
      content.innerHTML = data;

      // Special case: load books when "interest" is loaded
      if (section === "interest") {
        loadBooks();
      }
    })
    .catch((error) => {
      content.innerHTML = `<p>Error loading content: ${error}</p>`;
    });
}

// Function to load initial content
function loadInitialContent() {
  loadContent("home"); // Load default content
}

// Function to load books data (from bookData)
function loadBooks() {
  const bookList = document.getElementById("book-list");

  // Load books only if not already populated
  if (bookList && !bookList.hasChildNodes()) {
    bookData.forEach((book) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <a href="${book.url}" target="_blank">${book.title}</a>
        <p>Author: ${book.author}</p>
        <p>${book.description}</p>
      `;
      bookList.appendChild(listItem);
    });
  }
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

// Add event listeners to navigation links dynamically
function setupNavigationLinks() {
  document.querySelectorAll(".nav-items a").forEach((link) => {
    link.addEventListener("click", function (event) {
      const section = this.getAttribute("href").substring(1); // Get section name from href

      // Prevent the default action if the link is already active
      if (this.classList.contains("active")) {
        event.preventDefault();
      } else {
        loadContent(section); // Load the new section
      }
    });
  });
}

setupNavigationLinks(); // Set up the event listeners
