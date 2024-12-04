// Define a color palette for the cards with brighter colors and higher transparency
const colorPalette = [
    //'rgba(100, 100, 100, 0.8)', // Light gray
    'rgba(150, 150, 150, 0.8)', // Lighter gray
    'rgba(200, 200, 200, 0.8)', // Very light gray
    'rgba(150, 150, 150, 0.8)', // Lighter gray
    'rgba(200, 200, 200, 0.8)', // Very light gray
    'rgba(100, 200, 100, 0.8)', // Light green-gray
    'rgba(100, 100, 150, 0.8)', // Light navy
    //'rgba(150, 100, 100, 0.8)', // Light maroon
];

// Function to create a card
function createCard(title, body, footer) {
    const cardContainer = document.getElementById('card-container');

    // Create card element
    const card = document.createElement('div');
    card.className = 'card';

    // Assign a random color from the palette
    const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    card.style.backgroundColor = randomColor; // Set the card's background color

    // Create card header
    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    cardHeader.innerText = title;

    // Create horizontal rule
    const cardHr = document.createElement('hr');
    cardHr.className = 'card-hr'; // Apply styling for horizontal rule

    // Create card body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.innerText = body;

    // Create card footer
    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer';
    cardFooter.innerText = footer;

    // Append elements to card
    card.appendChild(cardHeader);
    card.appendChild(cardHr); // Add the horizontal rule
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    cardContainer.appendChild(card);

    // Add click event to open modal
    card.onclick = function() {
        openModal(title, body);
    };
}

// Function to open modal
function openModal(title, body) {
    const modal = document.getElementById('myModal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    modalTitle.innerText = title;
    modalBody.innerText = body;
    modal.style.display = "block"; // Show the modal
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = "none"; // Hide the modal
}

// Event listener for closing the modal
document.querySelector('.close').onclick = closeModal;

// Event listener for clicking outside the modal to close it
window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
        closeModal();
    }
};

// Example usage: Adding cards
createCard("Card Title 1", "This is a preview of the card body content.", "Timestamp: 2023-10-01");
createCard("Card Title 2", "Another card body content preview goes here.", "Notes: Important!");
createCard("Card Title 3", "More details about this card can be found here.", "Timestamp: 2023-10-02"); 