// JavaScript File

// References to elements
const slider = document.querySelector('.container .slider');
const dots = document.querySelectorAll('.dot');

let deleteInterval;
function findImageInFirstPosition() {
    // Get the first slider item
    const firstSliderItem = document.querySelector('.slider-item:first-child');

    // Get the image element within the first slider item
    const imageInFirstPosition = firstSliderItem.querySelector('img');

    // Get the id of the image element
    const imageId = imageInFirstPosition.id;
    
    return imageId;
}

function updateDots(currentDot) {
    // Remove active class from all dots
    dots.forEach(dot => dot.classList.remove('active'));
    // Add active class to the clicked dot
    currentDot.classList.add('active');
}
// Auto Sliding
function autoupdateDots() {
    let currentImageId = findImageInFirstPosition();
    let autodot = document.querySelector(`.dot[attr='${currentImageId}']`);
    if (autodot) {
        dots.forEach(dot => dot.classList.remove('active'));
        autodot.classList.add("active");
    } else {
        console.log("Dot element not found with attr value:", currentImageId);
    }
}



function autoSlide() {
    deleteInterval = setInterval(() => {
        nextSlide();
        autoupdateDots();
    }, 4000); // 4000 ms = 4 sec
}

// Clear and reset auto-slide
function resetAutoSlide() {
    clearInterval(deleteInterval);
    autoSlide();
}

function deleteAutoSliding() {
    clearInterval(deleteInterval);
}

// Event Listeners for stopping and resuming auto sliding
slider.addEventListener('mouseover', deleteAutoSliding);
slider.addEventListener('mouseout', resetAutoSlide);


// Move to the next slide
function nextSlide() {
    slider.appendChild(slider.firstElementChild);
    //updateDots();
}

// Move to the previous slide
function prevSlide() {
    slider.prepend(slider.lastElementChild);
    //updateDots();
    //resetAutoSlide(); // Commented out since auto-slide functions are disabled
}




function switchImage(currentDot) {
    // Get the index of the clicked dot
    const dotIndex = parseInt(currentDot.getAttribute('attr'));
    //console.log(dotIndex);
    // Get the index of the current image in the first position
    const currentIndex = parseInt(findImageInFirstPosition());
    //console.log(currentIndex);
    if (dotIndex === currentIndex) {
        console.log("Already in the correct position");
        return;
    }

    // Calculate the number of slides to move
    let slideDifference = dotIndex - currentIndex;
    console.log(slideDifference);
    // Move slides forward or backward based on the dot index
    while (slideDifference !== 0) {
        if (slideDifference > 0) {
            nextSlide();
            slideDifference--;
        } else {
            prevSlide();
            slideDifference++;
        }
    }
    //indicators();
}

// Update the active class on dots


// Event Listeners for dots
dots.forEach((dot, index) => {
    dot.setAttribute('data-index', index); // Set a custom attribute to store the index

    // Remove any existing event listener
    dot.removeEventListener('click', () => switchImage(dot));

    // Add the event listener and stop propagation
    dot.addEventListener('click', (event) => {
        event.stopPropagation(); // Stop event propagation // Add logging to help debug
        switchImage(dot);
        updateDots(dot); // Pass the dot element to updateDots
    });
});

// Initialize auto sliding
autoSlide();
//container3

function changeImage(newSrc, clickedButton) {
            // Change the image source
            document.getElementById('imgswitch').src = newSrc;

            // Get all buttons and set their class to 'deactive'
            var buttons = document.querySelectorAll('.btnsforimg button');
            buttons.forEach(function(button) {
                button.id = 'deactive';
            });
            console.log(clickedButton)
            // Set the clicked button's class to 'active'
            clickedButton.id = 'active';
}
// Get references to elements
const openContactFormButton = document.getElementById('but');
const contactFormContainer = document.getElementById('contactFormContainer');
const closeContactFormButton = document.getElementById('closeContactForm');

// Show the contact form when the button is clicked
openContactFormButton.addEventListener('click', function() {
    console.log("clicked");
    contactFormContainer.style.display = 'block';
});

// Close the contact form when the close button is clicked
closeContactFormButton.addEventListener('click', function() {
    contactFormContainer.style.display = 'none';
    document.getElementById('error-container').style.display = 'none';
});

// Form submission validation
document.getElementById('contactForm').addEventListener('submit', function (event) {
      let valid = true;

      // Clear previous error messages
      document.getElementById('emailError').textContent = '';
      document.getElementById('firstNameError').textContent = '';
      document.getElementById('lastNameError').textContent = '';
      document.getElementById('checkboxError').textContent = '';

      // Validate email
      const email = document.getElementById('work-email');
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!email.value) {
        document.getElementById('emailError').textContent = 'Work email is required';
        valid = false;
      } else if (!emailPattern.test(email.value)) {
        document.getElementById('emailError').textContent = 'Invalid email format';
        valid = false;
      }

      // Validate first name
      const firstName = document.getElementById('first-name');
      if (!firstName.value) {
        document.getElementById('firstNameError').textContent = 'First name is required';
        valid = false;
      }

      // Validate last name
      const lastName = document.getElementById('last-name');
      if (!lastName.value) {
        document.getElementById('lastNameError').textContent = 'Last name is required';
        valid = false;
      }

      // Validate checkbox
      const checkbox = document.getElementById('signupCheck');
      if (!checkbox.checked) {
        console.log("hello");
        document.getElementById('checkboxError').textContent = 'You must agree to the terms and conditions';
        document.getElementById('error-container').style.display = 'block';
        valid = false;
      }else{
        document.getElementById('error-container').style.display = 'none';
      }

      if (!valid) {
        event.preventDefault();
      }
    });
