
        // Mobile Menu Toggle
        document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
            document.querySelector('nav').classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });

        // Schedule Tabs
        const scheduleTabs = document.querySelectorAll('.schedule-tab');
        const scheduleContents = document.querySelectorAll('.schedule-content');

        scheduleTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const day = tab.getAttribute('data-day');
                
                // Remove active class from all tabs and contents
                scheduleTabs.forEach(t => t.classList.remove('active'));
                scheduleContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                document.getElementById(day).classList.add('active');
            });
        });

        // Smooth Scrolling for Navigation Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    document.querySelector('nav').classList.remove('active');
                    document.querySelector('.mobile-menu-btn i').classList.add('fa-bars');
                    document.querySelector('.mobile-menu-btn i').classList.remove('fa-times');
                }
            });
        });

        // Form Submission
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would handle form submission here
            // For demo purposes, we'll just show a success message
            const form = this;
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                form.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });


   // --- Contact Form Submission and Pop-up Logic ---
    const contactForm = document.getElementById('contactForm');
    const confirmationModal = document.getElementById('confirmationModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const closeButtons = document.querySelectorAll('.close-button, .modal-close-btn');

    // ONLY initialize form/modal listeners if the form elements actually exist on THIS page
    if (contactForm && confirmationModal && modalTitle && modalMessage && closeButtons.length > 0) {

        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevent default form submission (page reload)

            const formData = new FormData(contactForm);
            
            // ⭐⭐⭐ PASTE YOUR FORMSPREE ENDPOINT URL HERE ⭐⭐⭐
            // Example: 'https://formspree.io/f/xqabjlzg'
            const formspreeUrl = 'https://formspree.io/f/xqabjlzg'; // <-- Replace with YOUR Formspree URL

            // Disable button and show loading state (optional)
            const submitButton = contactForm.querySelector('.form-submit-btn');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                // Add a loading spinner or animation if you have one
            }

            try {
                const response = await fetch(formspreeUrl, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json' // Essential for Formspree's JSON response
                    }
                });

                if (response.ok) { // Check if the response status is 2xx (e.g., 200 OK)
                    modalTitle.textContent = "Message Sent Successfully!";
                    modalMessage.textContent = "Thank you for reaching out. We will get back to you soon.";
                    contactForm.reset(); // Clear the form fields
                } else {
                    // Try to get a more specific error message from Formspree's response
                    const errorData = await response.json();
                    const errorMessage = errorData.error || "An unexpected error occurred.";

                    modalTitle.textContent = "Submission Failed!";
                    modalMessage.textContent = `Oops! There was an error sending your message: ${errorMessage}. Please try again or contact us directly.`;
                    console.error('Formspree error:', errorData);
                }
            } catch (error) {
                // Handle network errors (e.g., no internet, CORS issues)
                console.error('Network or JavaScript error during form submission:', error);
                modalTitle.textContent = "Network Error!";
                modalMessage.textContent = "Could not connect to the server. Please check your internet connection and try again.";
            } finally {
                // Re-enable button and reset text
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                }
                confirmationModal.style.display = 'flex'; // Show the modal
            }
        });

        // Close modal functions
        function closeModal() {
            confirmationModal.style.display = 'none';
        }

        // Event listeners for closing the modal
        closeButtons.forEach(button => {
            button.addEventListener('click', closeModal);
        });

        // Close modal if user clicks outside of it
        window.addEventListener('click', function(event) {
            if (event.target === confirmationModal) {
                closeModal();
            }
        });

    } else {
        // This warning will now only show if contact form/modal elements are genuinely missing
        // on a page where this main.js is loaded, which is correct behavior.
        // console.warn("Contact form or modal elements not found on this page. Pop-up functionality might not be active.");
    }
