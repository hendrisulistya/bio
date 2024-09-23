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
    if (section === "home") loadProfileData(); // Load profile data
  } else {
    try {
      const response = await fetch(`/section/${section}.html`);
      const data = await response.text();
      sectionCache[section] = data;
      content.innerHTML = data;
      if (section === "interest") loadInterestData();
      if (section === "career") loadCareerData(); // Load career data
      if (section === "home") loadProfileData(); // Load profile data
    } catch (error) {
      content.innerHTML = `<p>Error loading content: ${error}</p>`;
    }
  }
}

// Function to load profile data
function loadProfileData() {
  document.getElementById("cv-link").href = profileData.cvLink;
  document.getElementById("profile-image").src = profileData.imageSrc;
  document.getElementById("profile-name").textContent = profileData.name;

  document.getElementById("company-link").href = profileData.company.url;
  document.getElementById("company-link").textContent =
    profileData.company.name;

  document.getElementById("researcher-link").href = profileData.researcher.url;
  document.getElementById("researcher-link").textContent =
    profileData.researcher.name;

  document.getElementById("email-link").textContent = profileData.email;

  document.getElementById("website-link").href = profileData.website.url;
  document.getElementById("website-link").textContent = profileData.website.url;

  document.getElementById("blog-link").href = profileData.website.blogUrl;
  document.getElementById("blog-link").textContent =
    profileData.website.blogUrl;

  document.getElementById("linkedin-link").href = profileData.social.linkedin;
  document.getElementById("linkedin-link").textContent = "LinkedIn";

  document.getElementById("github-link").href = profileData.social.github;
  document.getElementById("github-link").textContent = "Github";

  document.getElementById("x-link").href = profileData.social.x;
  document.getElementById("x-link").textContent = "X";

  document.getElementById("eth-link").href = profileData.social.eth;
  document.getElementById("eth-link").textContent = "juragan.eth";

  document.getElementById("profile-quote").textContent = profileData.quote;
}

// Load career data function
function loadCareerData() {
  // Function to create a work item element
  const createWorkItem = (job) => {
    const workItem = document.createElement("div");
    workItem.classList.add("work-item");

    const workLeftColumn = document.createElement("div");
    workLeftColumn.classList.add("work-left-column");

    const workDate = document.createElement("div");
    workDate.classList.add("work-date");

    const date = document.createElement("span");
    date.textContent = job.date;

    const company = document.createElement("span");
    company.textContent = job.company;

    const location = document.createElement("span");
    location.textContent = job.location;

    workDate.append(date, company, location);
    workLeftColumn.appendChild(workDate);

    const workRightColumn = document.createElement("div");
    workRightColumn.classList.add("work-right-column");

    const workInfo = document.createElement("div");
    workInfo.classList.add("work-info");

    const position = document.createElement("div");
    position.classList.add("work-position");
    position.textContent = job.position;

    const department = document.createElement("div");
    department.classList.add("work-company-name");
    department.textContent = job.department;

    workInfo.append(position, department);
    workRightColumn.append(workInfo);

    const workDescription = document.createElement("div");
    workDescription.classList.add("work-description");
    workDescription.textContent = job.description;

    workRightColumn.append(workDescription);
    workItem.append(workLeftColumn, workRightColumn);

    return workItem;
  };

  // Rendering Professional Work
  const proWorkWrapper = document.getElementById("pro-work-wrapper");
  proWorkWrapper.innerHTML = ""; // Clear previous content
  careerData.proWork.forEach((job) => {
    proWorkWrapper.appendChild(createWorkItem(job));
  });

  // Rendering Informal Work
  const informalWorkWrapper = document.getElementById("informal-work-wrapper");
  informalWorkWrapper.innerHTML = ""; // Clear previous content
  careerData.informalWork.forEach((job) => {
    informalWorkWrapper.appendChild(createWorkItem(job));
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
        sectionCache[section] = data;

        // Cache specific section data but do NOT insert it into the DOM
        if (section === "interest") {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = data;
          loadBooks(tempDiv.querySelector("#book-list"));
          loadPapers(tempDiv.querySelector("#paper-list"));
          loadVideos(tempDiv.querySelector("#video-list"));
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
