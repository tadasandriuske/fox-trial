document.addEventListener('DOMContentLoaded', function() {
  var copyrightElement = document.getElementById('copyright');
  var currentYear = new Date().getFullYear(); // Get current year
  var brandName = 'Fox on Duty'; // Set the brand name
  copyrightElement.textContent = `© ${currentYear} ${brandName}`;
});

// progress tracker start

function handlePCEventTracker() {
  if (window.innerWidth > 768) {
    const sections = document.querySelectorAll(".section");
    const menuItems = document.querySelectorAll(".menu li");
    const menu = document.querySelector(".menu");
  
// Function to update the active menu item based on scroll position
function updateActiveMenu() {
    const scrollY = window.scrollY;
    const screenHeight = window.innerHeight;
    const bottomOfScreenY = scrollY + screenHeight;
    const bottomOfDocumentY = document.documentElement.scrollHeight;
    const buffer = 50;

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollY; // Section top relative to the document
        const sectionHeight = rect.height; // Section height
        const sectionBottom = sectionTop + sectionHeight; // Section bottom relative to the document

        if (bottomOfScreenY >= bottomOfDocumentY) {
            // If at the bottom of the page, highlight the last menu item
            menuItems.forEach(item => item.classList.remove("current"));
            menuItems[menuItems.length - 1].classList.add("current");
        } else if (sectionHeight < screenHeight) {
            // If section height is smaller than screen height, change menu item when section is in the middle of the screen
            const sectionTopTrigger = sectionTop - ((screenHeight - sectionHeight) / 2) - buffer
            const sectionBottomTrigger = (sectionTop + sectionHeight) + ((screenHeight - sectionHeight) / 2) + buffer
            if (scrollY >= sectionTopTrigger && bottomOfScreenY <= sectionBottomTrigger) {
                menuItems.forEach(item => item.classList.remove("current"));
                menuItems[index].classList.add("current");
            }
        } else {
            // If section height is larger than screen height, change menu item when section top hits the top of the screen
            
            if (sections.length - 1 >= index) {
              nextSection = sections[index+1]
              const nextSectionRect = nextSection.getBoundingClientRect();
              const nextSectionTop = nextSectionRect.top + scrollY; // Section top relative to the document
              const nextSectionHeight = nextSectionRect.height; // Section height
              const nextSectionTopTrigger = nextSectionTop - ((screenHeight - nextSectionHeight) / 2) - buffer
              if (scrollY >= sectionTop - buffer && scrollY <= nextSectionTopTrigger && scrollY < sectionBottom) {
                menuItems.forEach(item => item.classList.remove("current"));
                menuItems[index].classList.add("current");

            }
            } else {
              if (scrollY >= sectionTop - buffer && scrollY < sectionBottom) {
                  menuItems.forEach(item => item.classList.remove("current"));
                  menuItems[index].classList.add("current");
            }
          }
        }
    });
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
  
        window.scrollTo({
            top: targetScrollPosition,
            behavior: "smooth"
        });
    }
  
    // Add event listeners for menu items
    menuItems.forEach((menuItem, index) => {
        menuItem.addEventListener("click", function (e) {
                handleMenuItemClick(index);
        });
    });
  
    // Update active menu on scroll
    window.addEventListener("scroll", updateActiveMenu);
      updateActiveMenu();
    }
}

document.addEventListener("DOMContentLoaded", handlePCEventTracker);
document.addEventListener("resize", handlePCEventTracker);
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
// mobile progress tracker end

document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".fade-in-left, .fade-in-right");

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.9; // Trigger when 80% of viewport height is scrolled

        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < triggerBottom) {
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

            // Force a re-evaluation of the scroll position after the scroll completes
            setTimeout(() => {
                handleIcons(tabsBox.scrollLeft);
            }, 300); // Match the duration of the smooth scroll
        };

        // Function to update the content window
        const updateContentWindow = (tabId) => {
            // Fade out the content window
            contentWindow.classList.add("fade-out");

            // Wait for the fade-out transition to complete
            setTimeout(() => {
                // Hide all tab contents
                tabContents.forEach(content => content.classList.remove("active"));

                // Show the selected tab content
                const selectedContent = document.getElementById(tabId);
                if (selectedContent) {
                    selectedContent.classList.add("active");
                }

                // Fade in the content window
                contentWindow.classList.remove("fade-out");
            }, 300); // Match the duration of the CSS transition
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
            let targetTab;

            if (direction === "left") {
                targetTab = activeTab.previousElementSibling;
            } else if (direction === "right") {
                targetTab = activeTab.nextElementSibling;
            }

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
                
                // Call handleIcons after a short delay to ensure the scroll position is updated
                setTimeout(() => {
                    handleIcons(tabsBox.scrollLeft);
                }, 300); // Match the duration of the smooth scroll
            });
        });

        // Dragging functionality
        const dragging = (e) => {
            if (!isDragging) return;
            tabsBox.classList.add("dragging");
            tabsBox.scrollLeft -= e.movementX;
            handleIcons(tabsBox.scrollLeft);
        };

        const dragStop = () => {
            isDragging = false;
            tabsBox.classList.remove("dragging");
        };

        tabsBox.addEventListener("mousedown", () => isDragging = true);  
        tabsBox.addEventListener("touchstart", () => isDragging = true); 
        tabsBox.addEventListener("mousemove", dragging);                 
        tabsBox.addEventListener("touchmove", dragging);            
        document.addEventListener("mouseup", dragStop);                
        document.addEventListener("touchend", dragStop);      

        // Initialize content window with the active tab's content
        updateContentWindow(tabsBox.querySelector(".active").dataset.tab);
        handleIcons(tabsBox.scrollLeft); // Initialize arrow icons visibility

// countries slider end


// instagram widget start

const posts = [
    {
      "image": "files/media/events/event-photo-1.jpg",
      "post-link": "https://www.instagram.com/p/DDtnWpltGrT/?utm_source=ig_web_copy_link",
      "description": "Summer vibes with the amazing decorators behind LRT’s new season shows.",
      "type": "multiple"
    },
    {
      "image": "files/media/events/event-photo-2.jpg",
      "post-link": "https://www.instagram.com/p/C9xVZBft9vC/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "See you at the winter party, guys!",
      "type": "multiple"
    },
    {
      "image": "files/media/events/event-photo-3.jpg",
      "post-link": "https://www.instagram.com/p/C9xVZBft9vC/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "See you at the winter party, guys!",
      "type": "multiple"
    },
    {
      "image": "files/media/events/event-photo-4.jpg",
      "post-link": "https://www.instagram.com/p/C9iFX8-NACA/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Another flashback to Ploom's unforgettable birthday celebration in Vilnius!",
      "type": "multiple"
    },
    {
      "image": "files/media/events/event-photo-5.jpg",
      "post-link": "https://www.instagram.com/p/C9iFX8-NACA/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Another flashback to Ploom's unforgettable birthday celebration in Vilnius!",
      "type": "multiple"
    },
    {
      "image": "files/media/events/event-photo-6.jpg",
      "post-link": "https://www.instagram.com/p/DC9CgdZt_IT/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Just a little sneak peek from yesterday’s private event at Marbella Club. Such a beautiful night with amazing vibes and attention to every detail. Thanks to all.",
      "type": "multiple"
    },
    {
      "image": "files/media/events/event-photo-7.jpg",
      "post-link": "https://www.instagram.com/p/C8j5laeK04Q/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Another day in the World of event magic✨ Big shoutout to the perfect clients who trust us with their visions! And to the incredible team behind the scenes – your dedication and hard work are the real magic wands. Together, we make every event a blast!",
      "type": "multiple"
    },
    {
      "image": "files/media/events/event-photo-8.jpg",
      "post-link": "https://www.instagram.com/p/DDt8se0t8IJ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "A wonderful evening celebrating the holiday season! For 8 years, we've been honored to create two events each season for this amazing client. Grateful for the trust and partnership!",
      "type": "multiple"
    },
    {
      "image": "files/media/events/event-photo-9.jpg",
      "post-link": "https://www.instagram.com/p/DDt8se0t8IJ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "A wonderful evening celebrating the holiday season! For 8 years, we've been honored to create two events each season for this amazing client. Grateful for the trust and partnership!",
      "type": "multiple"
    },
    {
      "image": "files/media/events/event-photo-10.jpg",
      "post-link": "https://www.instagram.com/p/DEIRdfONZyS/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Throwing it back to an unforgettable private event – an amazing performance that still feels like yesterday.",
      "type": "multiple"
    },
    {
      "image": "files/media/events/event-photo-11.jpg",
      "post-link": "https://www.instagram.com/p/C9iFX8-NACA/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Another flashback to Ploom's unforgettable birthday celebration in Vilnius!",
      "type": "multiple"
    },
    {
      "image": "files/media/events/event-photo-12.jpg",
      "post-link": "https://www.instagram.com/p/C9upVG0NHR-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Amazing time hosting our client's company summer party with families! The weather was perfect, and the moments were unforgettable. Our incredible team set up the entire venue in just 2 hours!",
      "type": "multiple"
    },
    {
      "image": "files/media/events/event-photo-13.jpg",
      "post-link": "https://www.instagram.com/p/C9wM8drNGEx/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Celebrating more highlights from our client's incredible summer party. Today we're shining a spotlight on the amazing individuals who made the event so memorable.",
      "type": "multiple"
    },
    {
      "image": "files/media/events/event-photo-14.jpg",
      "post-link": "https://www.instagram.com/p/DAwOGcfNdWq/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "A date with an OCTOPUS!",
      "type": "multiple"
    },
    {
      "image": "files/media/events/event-photo-15.jpg",
      "post-link": "https://www.instagram.com/p/DC9CgdZt_IT/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "description": "Just a little sneak peek from yesterday’s private event at Marbella Club. Such a beautiful night with amazing vibes and attention to every detail. Thanks to all.",
      "type": "multiple"
    },
    {
      "image": "files/media/events/event-photo-16.jpg",
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
    carouselInner.innerHTML = ""; // Clear the inner content each time we generate the carousel
  
    const columnsPerRow = getColumnsPerRow();
    const rowsPerSlide = columnsPerRow > 1 ? 2 : 1; // Use 2 rows for larger screens, 1 row for small screens
    const postsPerSlide = columnsPerRow * rowsPerSlide;
  
    const validImageCount = posts.length - (posts.length % postsPerSlide);
  
    for (let i = 0; i < validImageCount; i += postsPerSlide) {
      const slideBox = document.createElement("div");
      slideBox.classList.add("slide-box");
      slideBox.style.display = "flex";
      slideBox.style.flexDirection = "column"; // Stack rows vertically
  
      for (let row = 0; row < rowsPerSlide; row++) {
        const rowDiv = document.createElement("div");
        rowDiv.style.display = "flex";
        rowDiv.style.justifyContent = "center";
  
        for (let col = 0; col < columnsPerRow; col++) {
          const imgIndex = i + row * columnsPerRow + col;
          if (imgIndex >= posts.length) break; // Avoid overflow
  
          const imgContainer = document.createElement("div");
          imgContainer.classList.add("image-container");
  
          // Create the anchor tag and set the href to the post link
          const anchor = document.createElement("a");
          anchor.href = posts[imgIndex]["post-link"];
          anchor.target = "_blank"; // Open the link in a new tab
          anchor.style.position = "relative"; // Ensure anchor tag wraps everything
  
          const img = document.createElement("img");
          img.src = posts[imgIndex]["image"];
          img.alt = `Slide ${Math.floor(i / postsPerSlide) + 1}`;
  
          const description = document.createElement("div");
          description.classList.add("image-description");
          description.textContent = posts[imgIndex]["description"];
  
          // Add post type specific icon based on post "type"
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
            icon.innerHTML = `<svg viewBox="0 0 24 24">
                                <path d="M23.467,5.762c-0.118-0.045-0.232-0.068-0.342-0.068c-0.246,0-0.451,0.087-0.615,0.26l-3.76,3.217v5.766l3.76,3.578c0.164,0.173,0.369,0.26,0.615,0.26c0.109,0,0.223-0.023,0.342-0.068C23.822,18.552,24,18.284,24,17.901V6.57C24,6.186,23.822,5.917,23.467,5.762z"></path>
                                <path d="M16.33,4.412c-0.77-0.769-1.696-1.154-2.78-1.154H3.934c-1.084,0-2.01,0.385-2.78,1.154C0.385,5.182,0,6.108,0,7.192v9.616c0,1.084,0.385,2.01,1.154,2.78c0.77,0.77,1.696,1.154,2.78,1.154h9.616c1.084,0,2.01-0.385,2.78-1.154c0.77-0.77,1.154-1.696,1.154-2.78v-3.076v-3.478V7.192C17.484,6.108,17.099,5.182,16.33,4.412z M8.742,17.229c-2.888,0-5.229-2.341-5.229-5.229c0-2.888,2.341-5.229,5.229-5.229S13.971,9.112,13.971,12C13.971,14.888,11.63,17.229,8.742,17.229z"></path>
                                <circle cx="8.742" cy="12" r="3.5"></circle>
                              </svg>`;
            imgContainer.appendChild(icon);
          }
  
          // Append the image and description inside the anchor tag
          anchor.appendChild(img);
          anchor.appendChild(description);  // Description is now inside the anchor
  
          imgContainer.appendChild(anchor);  // imgContainer contains the anchor tag with both img and description
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
  }
  
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(generateCarousel, 200); // Wait for 200ms after resizing stops
  });
  
  document.addEventListener("DOMContentLoaded", generateCarousel, { passive: true });
  
  // instagram widget end