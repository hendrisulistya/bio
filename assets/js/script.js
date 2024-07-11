function loadContent(section) {
  const content = document.getElementById("content");
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

// Event listener for window onload to load initial content
window.addEventListener("load", loadInitialContent);
