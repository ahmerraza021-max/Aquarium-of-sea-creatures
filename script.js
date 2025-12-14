// Navbar scroll shadow
window.addEventListener('scroll', () => {
  const header = document.querySelector('.main-header');
  if(window.scrollY > 50){
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Hamburger toggle
const hamburger = document.getElementById('hamburger-icon');
const navMenu = document.getElementById('nav-menu');
const closeBtn = document.getElementById('close-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});

closeBtn.addEventListener('click', () => {
  navMenu.classList.remove('active');
  hamburger.classList.remove('active');
});

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Utility Functions ---
    const goToStep = (stepNumber) => {
        const tabElement = document.getElementById(`step-${stepNumber}-tab`);
        if (tabElement) {
            new bootstrap.Tab(tabElement).show();
        }
    };
    
    const validateField = (inputElement) => {
        if (inputElement.checkValidity() && inputElement.value.trim() !== '') {
            inputElement.classList.add('is-valid');
            inputElement.classList.remove('is-invalid');
            return true;
        } else {
            inputElement.classList.add('is-invalid');
            inputElement.classList.remove('is-valid');
            return false;
        }
    };
    
    // --- Real-time Input Validation Listener ---
    document.querySelectorAll('.form-validated').forEach(input => {
        input.addEventListener('input', () => {
            validateField(input);
        });
    });

    // --- Conditional Logic: Group Warning ---
    const guestsInput = document.getElementById('res-guests-ultimate');
    const groupWarning = document.getElementById('group-warning');
    guestsInput.addEventListener('input', () => {
        if (parseInt(guestsInput.value) >= 8) {
            groupWarning.classList.remove('d-none');
        } else {
            groupWarning.classList.add('d-none');
        }
        validateField(guestsInput);
    });

    // --- Step 1 Navigation ---
    document.getElementById('next-step-1-ultimate').addEventListener('click', () => {
        const inputs = [
            document.getElementById('res-date-ultimate'),
            document.getElementById('res-time-ultimate'),
            document.getElementById('res-guests-ultimate')
        ];
        
        const allValid = inputs.every(validateField);

        if (allValid) {
            document.getElementById('step-2-tab').removeAttribute('disabled');
            goToStep(2);
        } else {
            // Optional: Show a subtle error message instead of an alert
        }
    });

    // --- Step 2 Navigation ---
    document.getElementById('next-step-2-ultimate').addEventListener('click', () => {
        const inputs = [
            document.getElementById('res-name-ultimate'),
            document.getElementById('res-phone-ultimate')
        ];
        
        const allValid = inputs.every(validateField);

        if (allValid) {
            // --- Data Transfer to Review Step (Essential for Advanced UX) ---
            const date = document.getElementById('res-date-ultimate').value;
            const time = document.getElementById('res-time-ultimate').value;
            const guests = document.getElementById('res-guests-ultimate').value;
            const seating = document.querySelector('input[name="seating"]:checked').value;
            const name = document.getElementById('res-name-ultimate').value;
            const requests = document.getElementById('res-requests-ultimate').value || 'None';

            document.getElementById('review-date-time').innerText = `${date} at ${time}`;
            document.getElementById('review-guests-count').innerText = guests;
            document.getElementById('review-seating').innerText = seating;
            document.getElementById('review-name-contact').innerText = name;
            document.getElementById('review-requests-note').innerText = requests;

            document.getElementById('step-3-tab').removeAttribute('disabled');
            goToStep(3);
        }
    });

    // --- Back Buttons ---
    document.getElementById('prev-step-2-ultimate').addEventListener('click', () => goToStep(1));
    document.getElementById('prev-step-3-ultimate').addEventListener('click', () => goToStep(2));

    // --- Final Submission ---
    document.getElementById('ultimate-reservation-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!document.getElementById('confirm-terms-ultimate').checked) {
            alert('Please agree to the Booking Policy.');
            return;
        }

        // --- Confirmation Logic ---
        document.getElementById('modal-confirmation-details').innerText = 
            `Your table is booked for ${document.getElementById('review-guests-count').innerText} guests on ${document.getElementById('review-date-time').innerText.split(' at ')[0]} at ${document.getElementById('review-seating').innerText} area.`;
            
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
        
        // Resetting for next user
        this.reset();
        document.querySelectorAll('.form-validated').forEach(input => {
             input.classList.remove('is-valid');
             input.classList.remove('is-invalid');
        });
        document.getElementById('step-2-tab').setAttribute('disabled', 'true');
        document.getElementById('step-3-tab').setAttribute('disabled', 'true');
        goToStep(1); 
    });
});
// Contact form submission
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function(e) {
  e.preventDefault();

  // Simple validation
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name && email && subject && message) {
    formMessage.style.color = "green";
    formMessage.textContent = "Thank you! Your message has been sent.";
    contactForm.reset();
  } else {
    formMessage.style.color = "red";
    formMessage.textContent = "Please fill in all fields.";
  }
});
