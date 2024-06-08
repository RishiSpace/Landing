const tabs = document.querySelectorAll('.tab');
const contentArea = document.querySelector('.content');
const iframe = document.querySelector('iframe');

tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
        const tabId = e.target.id;
        let url = '';

        switch (tabId) {
            case 'about-tab':
                url = 'about.html';
                break;
            case 'tech-stuff-tab':
                url = 'tech-stuff.html';
                break;
            default:
                console.error(`Unknown tab ID: ${tabId}`);
        }

        iframe.src = url;
    });
});

// Get the search input field
const searchInput = document.getElementById("search-input");

// Get the main container
const mainContainer = document.querySelector("main");

// Get the article cards
const articleCards = document.querySelectorAll(".card");

// Register the search input event listener
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  articleCards.forEach((card) => {
    const title = card.querySelector(".article-title").textContent.toLowerCase();
    const summary = card.querySelector(".article-summary").textContent.toLowerCase();
    const file = card.getAttribute("data-file");
    if (!title.includes(searchTerm) && !summary.includes(searchTerm)) {
      card.style.display = "none";
    } else {
      card.style.display = "block";
    }
  });
});

// Add event listener to the search input field
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    // Open modal popup with search results
    const searchResults = searchInput.value.toLowerCase();
    openModal(searchResults);
  }
});

// Function to open the modal popup
function openModal(searchResults) {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");
  const modalText = document.getElementById("modal-text");

  modal.style.display = "block";
  modalText.textContent = `Search Results: ${searchResults}`;

  // Close the modal popup when the user clicks the close button
  const closeButton = document.querySelector(".close");
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

function toggleSidebar() {
    var sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('sidebar-hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');

    cards.forEach(card => {
        card.addEventListener('click', function() {
            const file = this.getAttribute('data-file');
            loadContent(file);
            showModal();
        });
    });

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    function loadContent(file) {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                modalContent.innerHTML = data;
            })
            .catch(error => {
                console.error('Error fetching content:', error);
            });
    }

    function showModal() {
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
        modalContent.innerHTML = ''; // Clear modal content when closing
    }
});
