document.addEventListener('DOMContentLoaded', function() {
  var copyrightElement = document.getElementById('copyright');
  var currentYear = new Date().getFullYear(); // Get current year
  var brandName = 'Fox on Duty'; // Set the brand name
  copyrightElement.textContent = `© ${currentYear} ${brandName}`;
});

// progress tracker start

function scaleMenu() {
  const baseHeight = 692; // your design height
  const vh = window.innerHeight;

  // Scale based on height only (taller screen = larger scale)
  const scaleRatio = vh / baseHeight;

  if (scaleRatio <= 1) return;

  const menu = document.querySelector('.menu');
  if (menu) {
    menu.style.transform = `translate(-50%, -50%) scale(${scaleRatio})`;
    menu.style.transformOrigin = 'center right';
  }
}

window.addEventListener('resize', scaleMenu);
window.addEventListener('load', scaleMenu);

function handlePCEventTracker() {
    const sections = document.querySelectorAll(".section");
    const menuItems = document.querySelectorAll(".menu li");
    const menu = document.querySelector(".menu");
    let isMenuOpen = false; 
  
// Function to update the active menu item based on scroll position
function updateActiveMenu() {
  const scrollY = window.scrollY;
  const screenHeight = window.innerHeight;
  const viewportMiddle = scrollY + (screenHeight / 2); // Middle of the viewport
  let activeLink = null;
  let closestDistance = Infinity;

  sections.forEach((section, index) => {
      const sectionTop = section.offsetTop; // Section top relative to the document
      const sectionBottom = sectionTop + section.offsetHeight; // Section bottom relative to the document

      // Check if the middle of the viewport is inside this section
      if (sectionTop <= viewportMiddle && sectionBottom >= viewportMiddle) {
          // Middle of the viewport is inside this section, mark it as active
          activeLink = menuItems[index];
          closestDistance = 0; // No need to check further, this section is active
      } else {
          // If the middle is not inside this section, calculate the distance to the closest edge
          const distanceTop = Math.abs(sectionTop - viewportMiddle);
          const distanceBottom = Math.abs(sectionBottom - viewportMiddle);
          const minDistance = Math.min(distanceTop, distanceBottom);

          // If this section's edge is closer than the previous closest, update the active link
          if (minDistance < closestDistance) {
              closestDistance = minDistance;
              activeLink = menuItems[index];
          }
      }
  });

  // Remove the active class from all menu items
  menuItems.forEach(item => item.classList.remove("current"));

  // Add the active class to the closest or active menu item
  if (activeLink) {
      activeLink.classList.add("current");
  }
}
  
    // Function to handle menu item clicks
    function handleMenuItemClick(index) {
        const section = sections[index];
        const rect = section.getBoundingClientRect();
        const screenHeight = window.innerHeight;
        const sectionTop = rect.top + scrollY; // Section top relative to the document
        const sectionHeight = rect.height; // Section height

        let targetScrollPosition;

        if (sectionHeight < screenHeight) {
          targetScrollPosition = sectionTop - ((screenHeight - sectionHeight) / 2)
        } else {
          targetScrollPosition = sectionTop
        }

        if (navigator.maxTouchPoints > 0 && isMenuOpen) {
          toggleMenuTextVisibility();
        }
  
        window.scrollTo({
            top: targetScrollPosition,
            behavior: "smooth"
        });
    }

    function toggleMenuTextVisibility() {
      isMenuOpen = !isMenuOpen;
      menuItems.forEach(item => {
          item.classList.toggle("active", isMenuOpen);
      });
  }
  
    // Add event listeners for menu items
    menuItems.forEach((menuItem, index) => {
        menuItem.addEventListener("click", function (e) {
          if (navigator.maxTouchPoints > 0) { // Check if it's a mobile device
            if (isMenuOpen) {
                handleMenuItemClick(index);
            } else {
                toggleMenuTextVisibility();
            }
        } else {
            handleMenuItemClick(index);
        }
    });
    });

      // Close the menu when clicking outside on mobile
        document.addEventListener("click", function (e) {
          if (navigator.maxTouchPoints > 0 && isMenuOpen && !e.target.closest(".menu")) {
              toggleMenuTextVisibility();
          }
      });

      // Add a class to the menu on mobile to disable hover effects
        function checkTouchscreen() {
          if (navigator.maxTouchPoints > 0) {
              menu.classList.add("touchscreen");
          } else {
              menu.classList.remove("touchscreen");
          }
      }
    
      // Check on load and resize
      window.addEventListener("resize", checkTouchscreen);
      checkTouchscreen();
  
    // Update active menu on scroll
    window.addEventListener("scroll", updateActiveMenu);
      updateActiveMenu();
}

document.addEventListener("DOMContentLoaded", handlePCEventTracker);
document.addEventListener("resize", handlePCEventTracker);

document.addEventListener('scroll', function() {
  const heroSplitSection = document.getElementById('hero-split');
  const menuItems = document.querySelectorAll('.menu li');

  const heroSplitRect = heroSplitSection.getBoundingClientRect();
  const heroSplitTop = heroSplitRect.top + window.scrollY; // Absolute top of #hero-split
  const heroSplitBottom = heroSplitRect.bottom + window.scrollY; // Absolute bottom of #hero-split

  menuItems.forEach(item => {
      const circle = item.querySelector('.circle-o');
      const itemRect = item.getBoundingClientRect();
      const itemCenterY = itemRect.top + window.scrollY + itemRect.height / 2; // Center of the dot

      // Check if the center of the dot is within the #hero-split section
      if (itemCenterY >= heroSplitTop && itemCenterY < heroSplitBottom) {
          circle.classList.add('inside-hero');
          circle.classList.remove('outside-hero');
      } else {
          circle.classList.add('outside-hero');
          circle.classList.remove('inside-hero');
      }
  });
});

// progress tracker end


// mobile progress tracker start
document.addEventListener("DOMContentLoaded", function () {
  let progressWrap = document.querySelector(".progress-wrap");
  let progressPath = document.querySelector(".progress-bar");
  let pathLength = progressPath.getTotalLength();
  let scrollTimeout;
  let mobileSectionMenu = document.getElementById("mobileSectionMenu");
  let menuBtn = document.getElementById("menu-btn-mobile");
  const progressTrackerTimeout = 2000;
  let allowCloseMenu = false; // Add this flag

  progressPath.style.strokeDasharray = pathLength;
  progressPath.style.strokeDashoffset = pathLength;

  let updateProgress = function () {
      let scroll = window.scrollY;
      let height = document.documentElement.scrollHeight - window.innerHeight;
      let progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = Math.max(progress, 0);

      // Show the progress bar when scrolling
      if (!progressWrap.classList.contains("active-progress")) {
          progressWrap.classList.add("active-progress");
      }

      // Clear existing timeout and set a new one
      clearTimeout(scrollTimeout);

      if (!mobileSectionMenu.classList.contains("active")) {
      // Hide progress bar after 2 seconds of inactivity
      scrollTimeout = setTimeout(function () {
          progressWrap.classList.remove("active-progress");
      }, progressTrackerTimeout); // 2000ms (2 seconds) of inactivity
    }
  };

  window.addEventListener("scroll", updateProgress);

  function mobileProgressTrackerVisibility() {
    if (window.scrollY > 100) {
        progressWrap.classList.add("active-progress");
    } else {
        if (menuBtn.dataset.state === "x") {
          toggleMenuBtn();
        }
        progressWrap.classList.remove("active-progress");
        if (mobileSectionMenu.classList.contains("active")) {
          mobileSectionMenu.classList.remove("active");
        }
    }
  }

  window.addEventListener("scroll", mobileProgressTrackerVisibility);

  // Toggle menu button state
  function toggleMenuBtn() {
      let state = menuBtn.dataset.state;
      menuBtn.dataset.state = 
          (!state || state === "hamburger") ? "x" : "hamburger";
      mobileSectionMenu.classList.toggle("active");

      // Allow closing the menu after a short delay
      if (mobileSectionMenu.classList.contains("active")) {
          setTimeout(() => {
              allowCloseMenu = true;
          }, 100); // 100ms delay
      } else {
          allowCloseMenu = false;
      }
  }

  function toggleProgressTrackerTimout() {
      if (menuBtn.dataset.state === "x") {
          clearTimeout(scrollTimeout);
      } else {
        updateProgress();
      }
  }

  // Click event for progress tracker to toggle menu
  progressWrap.addEventListener("click", function (e) {
      e.preventDefault();
      toggleMenuBtn();
      toggleProgressTrackerTimout();
  });

  // Scroll to section when a menu item is clicked
  document.querySelectorAll(".mobile-section-menu a").forEach(function(link) {
      link.addEventListener("click", function(e) {
          e.preventDefault();
          let targetId = this.getAttribute("href");
          let targetSection = document.querySelector(targetId);
          const rectMobile = targetSection.getBoundingClientRect();
          const screenHeightMobile = window.innerHeight;
          const sectionTopMobile = rectMobile.top + scrollY; // Section top relative to the document
          const sectionHeightMobile = rectMobile.height; // Section height
  
          let targetScrollPositionMobile;
  
          if (sectionHeightMobile < screenHeightMobile) {
            targetScrollPositionMobile = sectionTopMobile  - ((screenHeightMobile - sectionHeightMobile) / 2)
          } else {
            targetScrollPositionMobile = sectionTopMobile;
          }


          window.scrollTo({
            top: targetScrollPositionMobile,
            behavior: "smooth"
        });
          mobileSectionMenu.classList.remove("active");
          menuBtn.dataset.state = "hamburger";
          mobileProgressTrackerVisibility();
      });
  });

  function highlightCurrentSection() {
    let fromTop = window.scrollY;
    let windowHeight = window.innerHeight;
    let viewportMiddle = fromTop + windowHeight / 2; // Middle of the visible screen
    let activeLink = null;
    let closestDistance = Infinity;

    document.querySelectorAll(".mobile-section-menu a").forEach(link => {
        let sectionMobile = document.querySelector(link.getAttribute("href"));
        let sectionTop = sectionMobile.offsetTop;
        let sectionBottom = sectionTop + sectionMobile.offsetHeight;

        // Check if the middle of the screen is inside this section
        if (sectionTop <= viewportMiddle && sectionBottom >= viewportMiddle) {
            // Middle of the screen is inside this section, mark it as active
            activeLink = link;
            closestDistance = 0; // No need to check further, this section is active
        } else {
            // If the middle is not inside this section, calculate the distance to the closest edge
            let distanceTop = Math.abs(sectionTop - viewportMiddle);
            let distanceBottom = Math.abs(sectionBottom - viewportMiddle);
            let minDistance = Math.min(distanceTop, distanceBottom);

            // If this section's edge is closer than the previous closest, update the active link
            if (minDistance < closestDistance) {
                closestDistance = minDistance;
                activeLink = link;
            }
        }

        // Remove the active class from all links
        link.classList.remove("active");
    });

    // Add the active class to the active link
    if (activeLink) {
        activeLink.classList.add("active");
    }
}

  window.addEventListener("scroll", highlightCurrentSection);

  // Close mobile menu when clicking outside
  document.addEventListener("click", function(event) {
      if (allowCloseMenu && !mobileSectionMenu.contains(event.target) && !menuBtn.contains(event.target)) {
          mobileSectionMenu.classList.remove("active");
          menuBtn.dataset.state = "hamburger";
          allowCloseMenu = false;
          updateProgress();
      }
  });
});

document.addEventListener('scroll', function() {
  const heroSplitSection = document.getElementById('hero-split');
  const progressBar = document.getElementById('progress-bar');
  const menuBtn = document.getElementById('menu-btn-mobile');
  const progressBg = document.querySelector('.progress-bg');

  if (!heroSplitSection || !progressBar || !menuBtn || !progressBg) return; // Ensure elements exist

  const heroSplitRect = heroSplitSection.getBoundingClientRect();
  const heroSplitTop = heroSplitRect.top + window.scrollY;
  const heroSplitBottom = heroSplitRect.bottom + window.scrollY;

  function updateClass(element) {
    const rect = element.getBoundingClientRect();
    const centerY = rect.top + window.scrollY + rect.height / 2;

    if (centerY >= heroSplitTop && centerY < heroSplitBottom) {
      element.classList.add('inside-hero');
      element.classList.remove('outside-hero');
    } else {
      element.classList.add('outside-hero');
      element.classList.remove('inside-hero');
    }
  }

  updateClass(progressBar);
  updateClass(menuBtn);
  updateClass(progressBg);
});



// mobile progress tracker end

document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".fade-in-left, .fade-in-right");

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.9; // Trigger when 80% of viewport height is scrolled

        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (window.innerWidth <= 768) {
              el.classList.add("mobile-screen");
            }
            else if (rect.top < triggerBottom) {
                el.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Run on page load
});


function scrollToContactSection() {
    document.getElementById("contact-section").scrollIntoView({
      behavior: "smooth"
    });
  }

  function redirectToLapesVestuves() {
    window.open("https://lapesvestuves.lt/", "_blank");
  }

// countries slider start

const tabsBox = document.querySelector(".tabs-box");
const allTabs = tabsBox.querySelectorAll(".tab");
const arrowIcons = document.querySelectorAll(".icon i");
const contentWindow = document.querySelector(".content-window");
const tabContents = document.querySelectorAll(".tab-content");

let isDragging = false;
let touchStartX = 0;

// Function to center the selected tab
const centerSelectedTab = (tab) => {
    const tabRect = tab.getBoundingClientRect();
    const tabsBoxRect = tabsBox.getBoundingClientRect();
    const scrollLeft = tabsBox.scrollLeft;
    const offset = tabRect.left - tabsBoxRect.left + scrollLeft - (tabsBoxRect.width / 2) + (tabRect.width / 2);
    
    tabsBox.scrollTo({
        left: offset,
        behavior: "smooth"
    });

    setTimeout(() => {
        handleIcons(tabsBox.scrollLeft);
    }, 300);
};

// Function to update the content window
const updateContentWindow = (tabId) => {
    contentWindow.classList.add("fade-out");

    setTimeout(() => {
        tabContents.forEach(content => content.classList.remove("active"));
        const selectedContent = document.getElementById(tabId);
        if (selectedContent) {
            selectedContent.classList.add("active");
        }

        contentWindow.classList.remove("fade-out");
    }, 300);
};

// Handle arrow icons visibility
const handleIcons = (scrollVal) => {
    let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
    arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";
    arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
};

// Function to move to the next or previous tab
const moveTab = (direction) => {
    const activeTab = tabsBox.querySelector(".active");
    let targetTab = direction === "left" ? activeTab.previousElementSibling : activeTab.nextElementSibling;

    if (targetTab) {
        activeTab.classList.remove("active");
        targetTab.classList.add("active");
        centerSelectedTab(targetTab);
        updateContentWindow(targetTab.dataset.tab);
    }
};

// Event listeners for arrow icons
arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        moveTab(icon.id);
        handleIcons(tabsBox.scrollLeft);
    });
});

// Event listeners for tabs
allTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabsBox.querySelector(".active").classList.remove("active");
        tab.classList.add("active");
        centerSelectedTab(tab);
        updateContentWindow(tab.dataset.tab);
        
        setTimeout(() => {
            handleIcons(tabsBox.scrollLeft);
        }, 300);
    });
});

// Dragging functionality (mouse and touch)
const dragging = (e) => {
    if (!isDragging) return;
    tabsBox.classList.add("dragging");

    let movementX;
    if (e.type === "mousemove") {
        movementX = e.movementX;
    } else if (e.type === "touchmove") {
        movementX = e.touches[0].clientX - touchStartX;
        touchStartX = e.touches[0].clientX;
    }

    tabsBox.scrollLeft -= movementX;
    handleIcons(tabsBox.scrollLeft);
};

const dragStop = () => {
    isDragging = false;
    tabsBox.classList.remove("dragging");
};

// Mouse events
tabsBox.addEventListener("mousedown", () => isDragging = true);
tabsBox.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

// Touch events
tabsBox.addEventListener("touchstart", (e) => {
    isDragging = true;
    touchStartX = e.touches[0].clientX;
}, { passive: true });

tabsBox.addEventListener("touchmove", dragging, { passive: false });
document.addEventListener("touchend", dragStop);

// Initialize content window with the active tab's content
updateContentWindow(tabsBox.querySelector(".active").dataset.tab);
handleIcons(tabsBox.scrollLeft);


// countries slider end


// instagram widget start

const posts = [
    {
      "image": "files/media/insta/event-photo-10.jpg",
      "post-link": "https://www.instagram.com/p/DEIRdfONZyS/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Throwing it back to an unforgettable private event – an amazing performance that still feels like yesterday.",
      "type": "multiple"
    },
    {
      "image": "files/media/insta/event-photo-23.jpg",
      "post-link": "https://www.instagram.com/p/DG0Ivratpe3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Still buzzing from an unforgettable night! ✨ Huge thanks to everyone who made this event so special!",
      "type": "multiple"
    },
    {
      "image": "files/media/insta/event-photo-22.jpg",
      "post-link": "https://www.instagram.com/p/DG0Ivratpe3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Still buzzing from an unforgettable night! ✨ Huge thanks to everyone who made this event so special!",
      "type": "multiple"
    },
    {
      "image": "files/media/insta/event-photo-17.jpg",
      "post-link": "https://www.instagram.com/reel/DGsO_MctqEn/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Cheers to 40 years, GVG! This was party to remember!",
      "type": "video"
    },
    {
      "image": "files/media/insta/event-photo-21.jpg",
      "post-link": "https://www.instagram.com/p/DG0Ivratpe3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Still buzzing from an unforgettable night! ✨ Huge thanks to everyone who made this event so special!",
      "type": "multiple"
    },
    {
      "image": "files/media/insta/event-photo-20.jpg",
      "post-link": "https://www.instagram.com/p/DG54r0_NYKn/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Party to remember. GVG forever!",
      "type": "multiple"
    },
    {
      "image": "files/media/insta/event-photo-19.jpg",
      "post-link": "https://www.instagram.com/p/DIl4ahlsEBj/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "ĮMONĖS RENGINIO DEKORAS 🤍",
      "type": "multiple"
    },
    {
      "image": "files/media/insta/event-photo-24.jpg",
      "post-link": "https://www.instagram.com/p/DG0Ivratpe3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Still buzzing from an unforgettable night! ✨ Huge thanks to everyone who made this event so special!",
      "type": "multiple"
    },
    {
      "image": "files/media/insta/event-photo-18.jpg",
      "post-link": "https://www.instagram.com/p/DJs7tVXI7fa/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Client didn’t want ordinary. We listened. So we dipped everything in pink — with a help from the master, @flowercouturebymp_official. We flipped one of Vilnius’ trendiest spots and turned it into all-pink-everything, with a touch of silver. It was fun. And one to remember.",
      "type": "multiple"
    },
    {
      "image": "files/media/insta/event-photo-1.jpg",
      "post-link": "https://www.instagram.com/p/DDtnWpltGrT/?utm_source=ig_web_copy_link",
      "description": "Summer vibes with the amazing decorators behind LRT’s new season shows.",
      "type": "multiple"
    },
    {
      "image": "files/media/insta/event-photo-2.jpg",
      "post-link": "https://www.instagram.com/p/C9xVZBft9vC/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "See you at the winter party, guys!",
      "type": "multiple"
    },
    {
      "image": "files/media/insta/event-photo-3.jpg",
      "post-link": "https://www.instagram.com/p/C9xVZBft9vC/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "See you at the winter party, guys!",
      "type": "multiple"
    },
    {
      "image": "files/media/insta/event-photo-4.jpg",
      "post-link": "https://www.instagram.com/p/C9iFX8-NACA/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Another flashback to Ploom's unforgettable birthday celebration in Vilnius!",
      "type": "multiple"
    },
    {
      "image": "files/media/insta/event-photo-5.jpg",
      "post-link": "https://www.instagram.com/p/C9iFX8-NACA/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Another flashback to Ploom's unforgettable birthday celebration in Vilnius!",
      "type": "multiple"
    },
    {
      "image": "files/media/insta/event-photo-6.jpg",
      "post-link": "https://www.instagram.com/p/DC9CgdZt_IT/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Just a little sneak peek from yesterday’s private event at Marbella Club. Such a beautiful night with amazing vibes and attention to every detail. Thanks to all.",
      "type": "multiple"
    },
    {
      "image": "files/media/insta/event-photo-7.jpg",
      "post-link": "https://www.instagram.com/p/C8j5laeK04Q/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Another day in the World of event magic✨ Big shoutout to the perfect clients who trust us with their visions! And to the incredible team behind the scenes – your dedication and hard work are the real magic wands. Together, we make every event a blast!",
      "type": "multiple"
    },
    {
      "image": "files/media/insta/event-photo-8.jpg",
      "post-link": "https://www.instagram.com/p/DDt8se0t8IJ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "A wonderful evening celebrating the holiday season! For 8 years, we've been honored to create two events each season for this amazing client. Grateful for the trust and partnership!",
      "type": "multiple"
    },
    {
      "image": "files/media/insta/event-photo-9.jpg",
      "post-link": "https://www.instagram.com/p/DDt8se0t8IJ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "A wonderful evening celebrating the holiday season! For 8 years, we've been honored to create two events each season for this amazing client. Grateful for the trust and partnership!",
      "type": "multiple"
    },
    {
      "image": "files/media/insta/event-photo-11.jpg",
      "post-link": "https://www.instagram.com/p/C9iFX8-NACA/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Another flashback to Ploom's unforgettable birthday celebration in Vilnius!",
      "type": "multiple"
    },
    {
      "image": "files/media/insta/event-photo-12.jpg",
      "post-link": "https://www.instagram.com/p/C9upVG0NHR-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Amazing time hosting our client's company summer party with families! The weather was perfect, and the moments were unforgettable. Our incredible team set up the entire venue in just 2 hours!",
      "type": "multiple"
    },
    {
      "image": "files/media/insta/event-photo-13.jpg",
      "post-link": "https://www.instagram.com/p/C9wM8drNGEx/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Celebrating more highlights from our client's incredible summer party. Today we're shining a spotlight on the amazing individuals who made the event so memorable.",
      "type": "multiple"
    },
    {
      "image": "files/media/insta/event-photo-14.jpg",
      "post-link": "https://www.instagram.com/p/DAwOGcfNdWq/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "A date with an OCTOPUS!",
      "type": "multiple"
    },
    {
      "image": "files/media/insta/event-photo-15.jpg",
      "post-link": "https://www.instagram.com/p/DC9CgdZt_IT/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Just a little sneak peek from yesterday’s private event at Marbella Club. Such a beautiful night with amazing vibes and attention to every detail. Thanks to all.",
      "type": "multiple"
    },
    {
      "image": "files/media/insta/event-photo-16.jpg",
      "post-link": "https://www.instagram.com/p/C9iFX8-NACA/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Another flashback to Ploom's unforgettable birthday celebration in Vilnius!",
      "type": "multiple"
    },
  ];
  
  function getColumnsPerRow() {
    if (window.innerWidth >= 992) return 4; // Large screens: 4 columns
    if (window.innerWidth >= 768) return 3; // Medium screens: 3 columns
    if (window.innerWidth >= 576) return 2; // Small screens: 2 columns
    return 1; // Phones: 1 column
  }
  
  function generateCarousel() {
    const carouselInner = document.querySelector(".instagram-carousel-inner");
    const gapBetweenPhotos = '10px';
    carouselInner.innerHTML = "";
    const columnsPerRow = getColumnsPerRow();
    const rowsPerSlide = columnsPerRow > 1 ? 2 : 1;
    const postsPerSlide = columnsPerRow * rowsPerSlide;
  
    const validImageCount = posts.length - (posts.length % postsPerSlide);
  
    for (let i = 0; i < validImageCount; i += postsPerSlide) {
      const slideBox = document.createElement("div");
      slideBox.classList.add("slide-box");
      slideBox.style.display = "flex";
      slideBox.style.flexDirection = "column";
      slideBox.style.gap = gapBetweenPhotos; // Gap between rows
  
      for (let row = 0; row < rowsPerSlide; row++) {
        const rowDiv = document.createElement("div");
        rowDiv.style.display = "flex";
        rowDiv.style.justifyContent = "center";
        rowDiv.style.gap = gapBetweenPhotos; // Gap between photos in a row
  
        for (let col = 0; col < columnsPerRow; col++) {
          const imgIndex = i + row * columnsPerRow + col;
          if (imgIndex >= posts.length) break;
  
          const imgContainer = document.createElement("div");
          imgContainer.classList.add("image-container");
          imgContainer.style.flex = "1"; // Ensure images take up equal space
  
          // Remove margin from the first and last image in each row
          if (col === 0) {
            imgContainer.style.marginLeft = "0";
          }
          if (col === columnsPerRow - 1) {
            imgContainer.style.marginRight = "0";
          }
  
          const anchor = document.createElement("a");
          anchor.href = posts[imgIndex]["post-link"];
          anchor.target = "_blank";
          anchor.style.position = "relative";
  
          const img = document.createElement("img");
          img.src = posts[imgIndex]["image"];
          img.alt = `Slide ${Math.floor(i / postsPerSlide) + 1}`;
  
          const description = document.createElement("div");
          description.classList.add("image-description");
          description.textContent = posts[imgIndex]["description"];
  
          if (posts[imgIndex]["type"] === "multiple") {
            const icon = document.createElement("span");
            icon.classList.add("instagram-posts-item-image-icon-multiple");
            icon.innerHTML = `<svg viewBox="0 0 45.964 45.964">
                                <path d="M32.399,40.565H11.113v1.297c0,2.24,1.838,4.051,4.076,4.051h26.733c2.239,0,4.042-1.811,4.042-4.051V15.13c0-2.237-1.803-4.068-4.042-4.068h-1.415v21.395C40.507,36.904,36.845,40.566,32.399,40.565z"></path>
                                <path d="M0,4.102l0,28.355c0,2.241,1.814,4.067,4.051,4.067h28.365c2.237,0,4.066-1.826,4.066-4.067l0-28.356c0-2.238-1.828-4.051-4.066-4.051H4.051C1.814,0.05,0,1.862,0,4.102z"></path>
                              </svg>`;
            imgContainer.appendChild(icon);
          } else if (posts[imgIndex]["type"] === "video") {
            const icon = document.createElement("span");
            icon.classList.add("instagram-posts-item-image-icon-video");
            icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                              <path d="M13.34 4.13L20.26 16H4v-1C4 9.48 8.05 4.92 13.34 4.13zM33.26 16L22.57 16 15.57 4 26.26 4zM46 15v1H35.57l-7-12H35C41.08 4 46 8.92 46 15zM4 18v17c0 6.08 4.92 11 11 11h20c6.08 0 11-4.92 11-11V18H4zM31 32.19l-7.99 4.54C21.68 37.49 20 36.55 20 35.04v-9.08c0-1.51 1.68-2.45 3.01-1.69L31 28.81C32.33 29.56 32.33 31.44 31 32.19z"></path>
                              </svg>`;
            imgContainer.appendChild(icon);
          }

          
  
          anchor.appendChild(img);
          anchor.appendChild(description);
          imgContainer.appendChild(anchor);
          rowDiv.appendChild(imgContainer);
        }
        slideBox.appendChild(rowDiv);
      }
  
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      if (i === 0) carouselItem.classList.add("active");
      carouselItem.appendChild(slideBox);
  
      carouselInner.appendChild(carouselItem);
    }
  
    // Reinitialize the carousel after generating new slides
    const carousel = new bootstrap.Carousel(document.getElementById("instagram-carousel"));
}
  
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
  
  if (window.innerWidth > 768) {
    window.addEventListener("resize", debounce(generateCarousel, 100));
  }
  document.addEventListener("DOMContentLoaded", generateCarousel, { passive: true });
  
  // instagram widget end

  // specialized service image height regulator start

  document.addEventListener("DOMContentLoaded", function () {
    const containers = document.querySelectorAll(".specialised-service-image-container");

    if (containers.length === 0) return;

    let minHeight = Infinity;

    // Find the smallest container height
    containers.forEach(container => {
        minHeight = Math.min(minHeight, container.clientHeight);
    });

    // Apply the smallest height to all containers
    containers.forEach(container => {
        container.style.height = minHeight + "px";
    });
});


  // specialized service image height regulator end