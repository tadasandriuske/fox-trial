const track = document.getElementById("image-track");
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

let autoMoveDirection = 1;  // 1 for forward, -1 for backward
let isUserInteracting = false;  // To track if the user is interacting

if (!track.dataset.percentage) {
  track.dataset.percentage = "0";
}

const handleOnDown = (e) => {
  // Check if the event is from the track and if the user isn't already interacting
  if (!isUserInteracting && (e.target === track || e.target.closest('#image-track'))) { 
    isUserInteracting = true;  // Disable further automatic movement once the user interacts
    clearInterval(autoMoveInterval);  // Stop automatic movement
  }

  track.dataset.prevPercentage = track.dataset.percentage || "0";  // Store previous percentage
  // Use clientX for mouse or touchstart for touch
  track.dataset.mouseDownAt = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;  
};

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = e => {

  let minLimit;
  let speedModifier
  if (window.innerWidth <= 576) {
    minLimit = -87.5;
    speedModifier = 0.4;
  } else if (window.innerWidth <= 992) {
    minLimit = -75;
    speedModifier = 0.8;
  } else if (window.innerWidth <= 1400) {
    minLimit = -62.5;
    speedModifier = 1.5;
  } else {
    minLimit = -50;
    speedModifier = 2;
  }


  if (track.dataset.mouseDownAt === "0" || !track.dataset.mouseDownAt) return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / speedModifier;
  
  const percentage = (mouseDelta / maxDelta) * minLimit;
  const prevPercentage = parseFloat(track.dataset.prevPercentage) || 0;
  const nextPercentage = Math.max(Math.min(prevPercentage + percentage, 0), minLimit);

  track.dataset.percentage = nextPercentage;
  
  track.style.transition = "transform 0.6s ease-out"; // Ensure smooth movement
  track.style.transform = `translate(${nextPercentage}%, -50%)`;

  for (const image of track.getElementsByClassName("image")) {
    image.style.objectPosition = `${100 + nextPercentage}% center`;
  }

  updateArrowsVisibility(nextPercentage);
};

const moveAutomatically = () => {
  if (isUserInteracting) return; // Disable automatic movement once the user interacts
  
  const maxLimit = 0;
  let minLimit;

  if (window.innerWidth <= 576) {
    minLimit = -87.5;
  } else if (window.innerWidth <= 992) {
    minLimit = -75;
  } else if (window.innerWidth <= 1400) {
    minLimit = -62.5;
  } else {
    minLimit = -50;
  }

  const step = 12.5;  // Set the movement step to 12.6vw
  const currentPercentage = parseFloat(track.dataset.percentage) || 0;
  
  let nextPercentage = currentPercentage + (autoMoveDirection * step);
  
  if (nextPercentage > maxLimit) {
    nextPercentage = maxLimit;
    autoMoveDirection = -1;  // Move backward
  } else if (nextPercentage < minLimit) {
    nextPercentage = minLimit;
    autoMoveDirection = 1;  // Move forward
  }
  
  track.dataset.percentage = nextPercentage;

  // Update arrow visibility based on current position
  updateArrowsVisibility(nextPercentage);

  // Apply transition with ease-in-out
  track.style.transition = "transform 1.2s ease-in-out"; 
  track.style.transform = `translate(${nextPercentage}%, -50%)`;

  // Apply transition for images as well
  for (const image of track.getElementsByClassName("image")) {
    image.style.transition = "object-position 1.2s ease-in-out";
    image.style.objectPosition = `${100 + nextPercentage}% center`;
  }

  updateArrowsVisibility(nextPercentage);
};

// Function to show or hide arrows based on position
const updateArrowsVisibility = (currentPercentage) => {
  const maxLimit = 0;
  let minLimit;

  if (window.innerWidth <= 576) {
    minLimit = -87.5;
  } else if (window.innerWidth <= 992) {
    minLimit = -75;
  } else if (window.innerWidth <= 1400) {
    minLimit = -62.5;
  } else {
    minLimit = -50;
  }

  if (currentPercentage >= maxLimit) {
    leftArrow.style.display = 'none';  // Hide left arrow at max limit
  } else {
    leftArrow.style.display = 'block';  // Show left arrow when not at max limit
  }
  
  if (currentPercentage <= minLimit) {
    rightArrow.style.display = 'none';  // Hide right arrow at min limit
  } else {
    rightArrow.style.display = 'block';  // Show right arrow when not at min limit
  }
};

// Initialize the move
moveAutomatically();
// Set interval for automatic movement
const autoMoveInterval = setInterval(moveAutomatically, 3000); // Move every 3 seconds

// Event listeners for touch and mouse
track.onmousedown = e => handleOnDown(e);
track.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);


document.addEventListener('DOMContentLoaded', function() {
  var copyrightElement = document.getElementById('copyright');
  var currentYear = new Date().getFullYear(); // Get current year
  var brandName = 'Fox on Duty'; // Set the brand name
  copyrightElement.textContent = `© ${currentYear} ${brandName}`;
});

