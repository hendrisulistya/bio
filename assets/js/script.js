// Cache loaded sections to avoid refetching
const sectionCache = {};
const sectionsToPreload = ["career", "interest", "project"];

// Utility function to set the active link
function setActiveLink(section) {
  document.querySelectorAll(".nav-items a").forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${section}`
    );
  });
}

// Function to load content into the #content div and update active link
async function loadContent(section) {
  const content = document.getElementById("content");
  setActiveLink(section);

  // Load from cache or fetch if not available
  if (sectionCache[section]) {
    content.innerHTML = sectionCache[section];
    if (section === "interest") loadInterestData();
    if (section === "career") loadCareerData(); // Load career data
  } else {
    try {
      const response = await fetch(`/section/${section}.html`);
      const data = await response.text();
      sectionCache[section] = data;
      content.innerHTML = data;
      if (section === "interest") loadInterestData();
      if (section === "career") loadCareerData(); // Load career data
    } catch (error) {
      content.innerHTML = `<p>Error loading content: ${error}</p>`;
    }
  }
}

// Function to dynamically generate and insert career items
function loadCareerData() {
  const workWrapper = document.getElementById("work-wrapper");

  // Clear any existing content before adding new career data
  workWrapper.innerHTML = "";

  careerData.forEach((job) => {
    const workItem = document.createElement("div");
    workItem.classList.add("work-item");

    workItem.innerHTML = `
      <div class="work-left-column">
        <div class="work-date">
          <span>${job.date}</span>
          <span>${job.company}</span>
          <span>${job.location}</span>
        </div>
      </div>
      <div class="work-right-column">
        <div class="work-info">
          <div class="work-position">${job.position}</div>
          <div class="work-company-name">${job.department}</div>
        </div>
        <div class="work-description">
          ${job.description}
        </div>
      </div>
    `;
    workWrapper.appendChild(workItem);
  });
}

// Load interest-related data
function loadInterestData() {
  loadBooks();
  loadPapers();
  loadVideos();
}

// Preload all sections
async function preloadSections() {
  await Promise.all(
    sectionsToPreload.map(async (section) => {
      try {
        const response = await fetch(`/section/${section}.html`);
        const data = await response.text();

        // Handle specific sections for additional data loading
        if (section === "interest") {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = data;
          loadBooks(tempDiv.querySelector("#book-list"));
          loadPapers(tempDiv.querySelector("#paper-list"));
          loadVideos(tempDiv.querySelector("#video-list"));
          sectionCache[section] = tempDiv.innerHTML;
        } else if (section === "career") {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = data;
          loadCareerData(); // Preload career data
          sectionCache[section] = tempDiv.innerHTML;
        } else {
          sectionCache[section] = data;
        }
      } catch (error) {
        console.error(`Error preloading section ${section}: ${error}`);
      }
    })
  );
}

// Load the initial content (defaults to "home")
function loadInitialContent() {
  loadContent("home");
  const fragment = window.location.hash.substring(1);
  if (fragment && fragment !== "home") loadContent(fragment);
  preloadSections();
}

// Function to load items (books, papers, or videos)
function loadItems(data, listId) {
  const list = document.getElementById(listId);
  if (list) {
    list.innerHTML = ""; // Clear existing items
    data.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <a href="${item.url}" target="_blank">${item.title}</a>
        <p>Author: ${item.author}</p>
        <p>${item.description}</p>
      `;
      list.appendChild(listItem);
    });
  }
}

// Load books, papers, and videos
const loadBooks = () => loadItems(bookData, "book-list");
const loadPapers = () => loadItems(paperData, "paper-list");
const loadVideos = () => loadItems(videoData, "video-list");

// Toggle display for the selected element and hide others
function toggleDisplay(elementId) {
  ["interest-book", "interest-paper", "interest-video"].forEach((id) => {
    const section = document.getElementById(id);
    if (section) section.style.display = id === elementId ? "block" : "none";
  });
}

// Event listener for window onload to load initial content
window.addEventListener("load", loadInitialContent);

// Set up navigation links
document.querySelectorAll(".nav-items a").forEach((link) => {
  link.addEventListener("click", function (event) {
    const section = this.getAttribute("href").substring(1);
    if (!this.classList.contains("active")) {
      loadContent(section);
    } else {
      event.preventDefault();
    }
  });
});
