document.addEventListener("DOMContentLoaded", function () {
  if (navigator.userAgent.includes("FB_IAB") || navigator.userAgent.includes("FBAV")) {
    var pageRow = document.getElementById("page-row");
    if (pageRow) {
      pageRow.classList.add("messenger-browser");
    }
  }
});

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
  }, 1000); // Delay before restarting auto movement

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


window.addEventListener('resize', () => {
  track.dataset.percentage = "0";
  track.style.transition = "none"; // Remove transition for instant reset
  track.style.transform = "translate(0%, -50%)";

  // Restart auto movement to ensure consistency
  clearInterval(autoMoveInterval);
  autoMoveInterval = setInterval(moveAutomatically, 3000);
  
  updateArrowsVisibility2(0);
});



//image-track2

const track2 = document.getElementById("image-track2");
const leftArrow2 = document.getElementById("left-arrow2");
const rightArrow2 = document.getElementById("right-arrow2");

let autoMoveDirection2 = 1;  // 1 for forward, -1 for backward
let autoMoveInterval2;
let isUserInteracting2 = false;  // To track2 if the user is interacting

if (!track2.dataset.percentage) {
  track2.dataset.percentage = "0";
}

const handleOnDown2 = (e) => {
  // Check if the event is from the track2 and if the user isn't already interacting
  if (!isUserInteracting2 && (e.target === track2 || e.target.closest('#image-track2'))) { 
    isUserInteracting2 = true;  // Disable further automatic movement once the user interacts
    clearInterval(autoMoveInterval2);  // Stop automatic movement
  }

  track2.dataset.prevPercentage = track2.dataset.percentage || "0";  // Store previous percentage
  // Use clientX for mouse or touchstart for touch
  track2.dataset.mouseDownAt = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;  
};

const handleOnUp2 = () => {
  setTimeout(() => {
    isUserInteracting2 = false;
    clearInterval(autoMoveInterval2); // Ensure no duplicate intervals
    autoMoveInterval2 = setInterval(moveAutomatically2, 3000); // Restart auto movement
  }, 1000); // Delay before restarting auto movement

  track2.dataset.mouseDownAt = "0";
  track2.dataset.prevPercentage = track2.dataset.percentage;
};


const handleOnMove2 = e => {
  if (track2.dataset.mouseDownAt === "0" || !track2.dataset.mouseDownAt) return;

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

  const mouseDelta = parseFloat(track2.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / speedModifier;
  const percentage = (mouseDelta / maxDelta) * minLimit;
  const prevPercentage = parseFloat(track2.dataset.prevPercentage) || 0;
  let nextPercentage = Math.max(Math.min(prevPercentage + percentage, 0), minLimit);

  // Snap to the nearest step
  nextPercentage = Math.round(nextPercentage / step) * step;

  track2.dataset.percentage = nextPercentage;
  usablePercentage = nextPercentage / (minLimit * -1) * 100;

  track2.style.transition = "transform 0.3s ease-out"; // Smooth movement
  track2.style.transform = `translate(${nextPercentage}%, -50%)`;

  for (const image of track2.getElementsByClassName("image")) {
    image.style.objectPosition = `${100 + usablePercentage}% center`;
  }

  updateArrowsVisibility2(nextPercentage);
};

const moveAutomatically2 = () => {
  if (isUserInteracting2) return; // Disable automatic movement once the user interacts
  
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

  const currentPercentage = parseFloat(track2.dataset.percentage) || 0;
  
  let nextPercentage = currentPercentage + (autoMoveDirection2 * step);
  
  if (nextPercentage > maxLimit) {
    nextPercentage = maxLimit;
    autoMoveDirection2 = -1;  // Move backward
  } else if (nextPercentage < minLimit) {
    nextPercentage = minLimit;
    autoMoveDirection2 = 1;  // Move forward
  }
  
  track2.dataset.percentage = nextPercentage;

  // Update arrow visibility based on current position
  updateArrowsVisibility2(nextPercentage);

  usablePercentage = nextPercentage / (minLimit*-1) * 100;


  // Apply transition with ease-in-out
  track2.style.transition = "transform 1.2s ease-in-out"; 
  track2.style.transform = `translate(${nextPercentage}%, -50%)`;

  // Apply transition for images as well
  for (const image of track2.getElementsByClassName("image")) {
    image.style.transition = "object-position 1.2s ease-in-out";
    image.style.objectPosition = `${100 + usablePercentage}% center`;
  }

  updateArrowsVisibility2(nextPercentage);
};

// Function to show or hide arrows based on position
const updateArrowsVisibility2 = (currentPercentage) => {
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
    leftArrow2.style.display = 'none';  // Hide left arrow at max limit
  } else {
    leftArrow2.style.display = 'block';  // Show left arrow when not at max limit
  }
  
  if (currentPercentage <= minLimit) {
    rightArrow2.style.display = 'none';  // Hide right arrow at min limit
  } else {
    rightArrow2.style.display = 'block';  // Show right arrow when not at min limit
  }
};

// Initialize the move
moveAutomatically2();
// Set interval for automatic movement
autoMoveInterval2 = setInterval(moveAutomatically2, 3000); // Move every 3 seconds

// Event listeners for touch and mouse
track.onmousedown = e => handleOnDown(e);
track.ontouchstart = e => handleOnDown(e.touches[0]);
track.onmouseup = e => handleOnUp(e);
track.ontouchend = e => handleOnUp(e.touches[0]);
track.onmousemove = e => handleOnMove(e);
track.ontouchmove = e => handleOnMove(e.touches[0]);

// Event listeners for touch and mouse
track2.onmousedown = e => handleOnDown2(e);
track2.ontouchstart = e => handleOnDown2(e.touches[0]);
track2.onmouseup = e => handleOnUp2(e);
track2.ontouchend = e => handleOnUp2(e.touches[0]);
track2.onmousemove = e => handleOnMove2(e);
track2.ontouchmove = e => handleOnMove2(e.touches[0]);




window.addEventListener('resize', () => {
  track2.dataset.percentage = "0";
  track2.style.transition = "none"; // Remove transition for instant reset
  track2.style.transform = "translate(0%, -50%)";

  // Restart auto movement to ensure consistency
  clearInterval(autoMoveInterval2);
  autoMoveInterval2 = setInterval(moveAutomatically2, 3000);
  
  updateArrowsVisibility2(0);
});



document.addEventListener('DOMContentLoaded', function() {
  var copyrightElement = document.getElementById('copyright');
  var currentYear = new Date().getFullYear(); // Get current year
  var brandName = 'Fox on Duty'; // Set the brand name
  copyrightElement.textContent = `© ${currentYear} ${brandName}`;
});
