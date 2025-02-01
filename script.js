const track = document.getElementById("image-track");
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

let autoMoveDirection = 1;  // 1 for forward, -1 for backward
let autoMoveInterval;
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
  setTimeout(() => {
    isUserInteracting = false;
    clearInterval(autoMoveInterval); // Ensure no duplicate intervals
    autoMoveInterval = setInterval(moveAutomatically, 3000); // Restart auto movement
  }, 2000); // Delay before restarting auto movement

  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};


const handleOnMove = e => {
  if (track.dataset.mouseDownAt === "0" || !track.dataset.mouseDownAt) return;

  let minLimit, step, speedModifier;
  if (window.innerWidth <= 576) {
    minLimit = -714;
    step = 102;
    speedModifier = 0.3;
  } else if (window.innerWidth <= 992) {
    minLimit = -306;
    step = 51;
    speedModifier = 0.8;
  } else if (window.innerWidth <= 1400) {
    minLimit = -170;
    step = 34;
    speedModifier = 1;
  } else {
    minLimit = -102;
    step = 25.5;
    speedModifier = 1.5;
  }

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / speedModifier;
  const percentage = (mouseDelta / maxDelta) * minLimit;
  const prevPercentage = parseFloat(track.dataset.prevPercentage) || 0;
  let nextPercentage = Math.max(Math.min(prevPercentage + percentage, 0), minLimit);

  // Snap to the nearest step
  nextPercentage = Math.round(nextPercentage / step) * step;

  track.dataset.percentage = nextPercentage;
  usablePercentage = nextPercentage / (minLimit * -1) * 100;

  track.style.transition = "transform 0.3s ease-out"; // Smooth movement
  track.style.transform = `translate(${nextPercentage}%, -50%)`;

  for (const image of track.getElementsByClassName("image")) {
    image.style.objectPosition = `${100 + usablePercentage}% center`;
  }

  updateArrowsVisibility(nextPercentage);
};

const moveAutomatically = () => {
  if (isUserInteracting) return; // Disable automatic movement once the user interacts
  
  const maxLimit = 0;
  let minLimit;
  let step;

  if (window.innerWidth <= 576) {
    step = 102;
    minLimit = -714;
  } else if (window.innerWidth <= 992) {
    minLimit = -306;
    step = 51;
  } else if (window.innerWidth <= 1400) {
    minLimit = -170;
    step = 34;
  } else {
    minLimit = -102;
    step = 25.5;
  }

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

  usablePercentage = nextPercentage / (minLimit*-1) * 100;


  // Apply transition with ease-in-out
  track.style.transition = "transform 1.2s ease-in-out"; 
  track.style.transform = `translate(${nextPercentage}%, -50%)`;

  // Apply transition for images as well
  for (const image of track.getElementsByClassName("image")) {
    image.style.transition = "object-position 1.2s ease-in-out";
    image.style.objectPosition = `${100 + usablePercentage}% center`;
  }

  updateArrowsVisibility(nextPercentage);
};

// Function to show or hide arrows based on position
const updateArrowsVisibility = (currentPercentage) => {
  const maxLimit = 0;
  let minLimit;

  if (window.innerWidth <= 576) {
    minLimit = -714;
  } else if (window.innerWidth <= 992) {
    minLimit = -306;
  } else if (window.innerWidth <= 1400) {
    minLimit = -170;
  } else {
    minLimit = -102;
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
autoMoveInterval = setInterval(moveAutomatically, 3000); // Move every 3 seconds

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

