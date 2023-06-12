// Get the modal element
const modal = document.getElementById("modal");

// Function to open the modal
function openModal() {
  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
}

// Function to handle the vote button click
function vote() {
  // Implement your vote logic here
  console.log("Vote button clicked!");
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
  if (event.target === modal) {
    closeModal();
  }
};
