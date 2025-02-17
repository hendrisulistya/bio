// Menu configuration with integrated page paths
const menuItems = [
  { id: "home", label: "Home", path: "/pages/home.html" },
  { id: "career", label: "Career", path: "/pages/career.html" },
  { id: "interest", label: "Interest", path: "/pages/interest.html" },
  { id: "project", label: "Project", path: "/pages/project.html" },
];

// Cache for loaded pages
const pageCache = new Map();
let currentPage = "home";

// Generate navigation menu
function generateNavigation() {
  const navContainer = document.getElementById("main-nav");
  const fragment = document.createDocumentFragment();
  const menuWrapper = document.createElement("div");
  menuWrapper.className = "inline-flex rounded-lg p-1 space-x-1";
  menuWrapper.id = "menu-wrapper";

  menuItems.forEach((item) => {
    const button = document.createElement("button");
    button.dataset.page = item.id;
    button.className =
      "nav-link px-4 py-2 rounded-md text-sm font-medium text-black dark:text-white hover:bg-gray-800 hover:text-white dark:hover:bg-gray-100 dark:hover:text-black transition-colors duration-150 border border-gray-400";
    button.textContent = item.label;
    menuWrapper.appendChild(button);
  });

  fragment.appendChild(menuWrapper);
  navContainer.appendChild(fragment);

  // Event delegation for hover effects
  menuWrapper.addEventListener("mouseenter", handleMenuHover, true);
  menuWrapper.addEventListener("mouseleave", handleMenuLeave, true);
}

function handleMenuHover(e) {
  if (e.target.classList.contains("nav-link")) {
    document.querySelectorAll(".nav-link").forEach((btn) => {
      if (btn !== e.target && btn.dataset.page !== currentPage) {
        btn.classList.remove("bg-gray-800", "text-white", "border-black");
        btn.classList.add("text-black", "border-gray-400");
      }
    });
  }
}

function handleMenuLeave(e) {
  if (e.target.classList.contains("nav-link")) {
    document.querySelectorAll(".nav-link").forEach((btn) => {
      if (btn.dataset.page !== currentPage) {
        btn.classList.remove("bg-gray-800", "text-white", "border-black");
        btn.classList.add("text-black", "border-gray-400");
      }
    });
  }
}

function updateActiveState(pageId) {
  if (pageId === currentPage) return;
  currentPage = pageId;

  document.querySelectorAll(".nav-link").forEach((link) => {
    const isActive = link.dataset.page === pageId;
    // Fix: Split classes into separate toggle calls
    link.classList.toggle("bg-gray-800", isActive);
    link.classList.toggle("text-white", isActive);
    link.classList.toggle("border-black", isActive);
    link.classList.toggle("active", isActive);
    link.classList.toggle("text-black", !isActive);
    link.classList.toggle("border-gray-400", !isActive);
  });
}

function showLoadingState(mainContent) {
  const loader = document.createElement("div");
  loader.className = "flex items-center justify-center p-4";
  loader.innerHTML = `<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>`;
  mainContent.innerHTML = "";
  mainContent.appendChild(loader);
}

async function router(pageId) {
  const mainContent = document.getElementById("main-content");
  if (!mainContent) {
    console.error("Main content element not found");
    return;
  }

  try {
    const page = menuItems.find((item) => item.id === pageId) || menuItems[0];

    mainContent.classList.add("opacity-50");
    showLoadingState(mainContent);

    let content;
    if (pageCache.has(pageId)) {
      content = pageCache.get(pageId);
    } else {
      const response = await fetch(page.path);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      content = await response.text();
      pageCache.set(pageId, content);
    }

    await new Promise((resolve) => setTimeout(resolve, 150));

    // Parse and inject content
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    
    // Clear existing content
    mainContent.innerHTML = '';
    
    // Create a temporary fragment
    const fragment = document.createDocumentFragment();
    
    // Append non-script elements first
    Array.from(doc.body.children).forEach(node => {
      if (node.tagName !== 'SCRIPT') {
        fragment.appendChild(node.cloneNode(true));
      }
    });
    
    // Append fragment to main content
    mainContent.appendChild(fragment);
    
    // Execute scripts with eval to ensure proper context
    const scripts = Array.from(doc.getElementsByTagName('script'));
    scripts.forEach(script => {
      try {
        if (script.src) {
          const newScript = document.createElement('script');
          newScript.src = script.src;
          document.body.appendChild(newScript);
        } else {
          eval(script.textContent);
        }
      } catch (err) {
        console.error('Error executing script:', err);
      }
    });

    mainContent.classList.remove("opacity-50");
    updateActiveState(pageId);
    window.location.hash = pageId;
  } catch (error) {
    console.error("Error loading page:", error);
    mainContent.innerHTML = '';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'text-center p-4 text-red-600';
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Error loading content. Please try again.';
    errorDiv.appendChild(errorMessage);
    mainContent.appendChild(errorDiv);
  }
}

// Handle browser back/forward buttons
window.addEventListener("hashchange", () => {
  const pageId = window.location.hash.slice(1) || "home";
  router(pageId);
});

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  generateNavigation();

  document.getElementById("main-nav").addEventListener("click", (e) => {
    if (e.target.classList.contains("nav-link")) {
      e.preventDefault();
      router(e.target.dataset.page);
    }
  });

  // Initialize with hash route or default to home
  const initialPage = window.location.hash.slice(1) || "home";
  router(initialPage);
});
