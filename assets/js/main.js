!(function($) { // Self-invoking anonymous function using jQuery shorthand '$'
    "use strict"; // Enforces strict mode to catch common errors

    // Nav Menu
    $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) { // Adds a click event listener to menu links
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) { // Checks if the clicked link's path and host match the current page
            var hash = this.hash; // Gets the hash value (anchor link)
            var target = $(hash); // Selects the target element based on the hash
            if (target.length) { // If the target element exists
                e.preventDefault(); // Prevents the default anchor behavior (page jump)
                if ($(this).parents('.nav-menu, .mobile-nav').length) { // If the clicked link is within the nav menu or mobile nav
                    $('.nav-menu .active, .mobile-nav .active').removeClass('active'); // Removes the 'active' class from all currently active menu items
                    $(this).closest('li').addClass('active'); // Adds 'active' class to the clicked menu item's parent
                }
                if (hash == '#header') { // If the clicked link is the header link
                    $('#header').removeClass('header-top'); // Removes the 'header-top' class from the header
                    $("section").removeClass('section-show'); // Hides all sections
                    if ($('body').hasClass('mobile-nav-active')) { // If the mobile nav is active
                        $('body').removeClass('mobile-nav-active'); // Deactivates the mobile nav
                        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close'); // Toggles mobile nav icon
                        $('.mobile-nav-overly').fadeOut(); // Fades out the overlay
                    }
                    return; // Stops execution
                }
                if (!$('#header').hasClass('header-top')) { // If the header does not have 'header-top' class
                    $('#header').addClass('header-top'); // Adds 'header-top' to the header
                    setTimeout(function() { // Delays the next action
                        $("section").removeClass('section-show'); // Hides all sections
                        $(hash).addClass('section-show'); // Shows the target section
                    }, 350); // Delays by 350 milliseconds
                } else {
                    $("section").removeClass('section-show'); // Hides all sections
                    $(hash).addClass('section-show'); // Shows the target section
                }
                $('html, body').animate({ // Scrolls to the top of the page
                    scrollTop: 0
                }, 350); // Animates the scroll with a delay of 350 milliseconds
                if ($('body').hasClass('mobile-nav-active')) { // If the mobile nav is active
                    $('body').removeClass('mobile-nav-active'); // Deactivates the mobile nav
                    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close'); // Toggles the mobile nav icon
                    $('.mobile-nav-overly').fadeOut(); // Fades out the overlay
                }
                return false; // Prevents default link behavior
            }
        }
    });

    // Activate/show sections on load with hash links
    if (window.location.hash) { // If the URL contains a hash
        var initial_nav = window.location.hash; // Stores the hash
        if ($(initial_nav).length) { // If the element with the hash exists
            $('#header').addClass('header-top'); // Adds 'header-top' to the header
            $('.nav-menu .active, .mobile-nav .active').removeClass('active'); // Removes 'active' class from the current menu items
            $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active'); // Adds 'active' class to the corresponding menu item
            setTimeout(function() { // Delays the next action
                $("section").removeClass('section-show'); // Hides all sections
                $(initial_nav).addClass('section-show'); // Shows the target section
            }, 350); // Delay of 350 milliseconds
        }
    }

    // Mobile Navigation
    if ($('.nav-menu').length) { // If the navigation menu exists
        var $mobile_nav = $('.nav-menu').clone().prop({ // Clones the nav menu and adds properties
            class: 'mobile-nav d-lg-none' // Sets class for mobile nav
        });
        $('body').append($mobile_nav); // Appends the mobile nav to the body
        $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>'); // Adds a button for mobile nav toggle
        $('body').append('<div class="mobile-nav-overly"></div>'); // Adds an overlay for mobile navigation
        $(document).on('click', '.mobile-nav-toggle', function(e) { // Event listener for mobile nav toggle button
            $('body').toggleClass('mobile-nav-active'); // Toggles mobile nav activation
            $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close'); // Toggles mobile nav icon
            $('.mobile-nav-overly').toggle(); // Toggles the overlay visibility
        });
        $(document).click(function(e) { // Event listener for clicks on the document
            var container = $(".mobile-nav, .mobile-nav-toggle"); // Selects mobile nav and toggle button
            if (!container.is(e.target) && container.has(e.target).length === 0) { // If the click is outside the mobile nav
                if ($('body').hasClass('mobile-nav-active')) { // If the mobile nav is active
                    $('body').removeClass('mobile-nav-active'); // Deactivates the mobile nav
                    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close'); // Toggles the icon
                    $('.mobile-nav-overly').fadeOut(); // Fades out the overlay
                }
            }
        });
    } else if ($(".mobile-nav, .mobile-nav-toggle").length) { // If no nav menu but mobile nav or toggle exists
        $(".mobile-nav, .mobile-nav-toggle").hide(); // Hides mobile nav and toggle button
    }

    // jQuery counterUp
    $('[data-toggle="counter-up"]').counterUp({ // Initializes the counterUp plugin
        delay: 10, // Delay between number increments
        time: 1000 // Total duration of the counter animation
    });

    // Skills section
    $('.skills-content').waypoint(function() { // Initializes the waypoint plugin for scrolling animations
        $('.progress .progress-bar').each(function() { // Iterates through each progress bar
            $(this).css("width", $(this).attr("aria-valuenow") + '%'); // Sets the width of the progress bar based on its value
        });
    }, {
        offset: '80%' // The animation triggers when 80% of the section is visible
    });

    // Testimonials carousel (uses the Owl Carousel library)
    $(".testimonials-carousel").owlCarousel({ // Initializes the Owl Carousel plugin for testimonials
        autoplay: true, // Enables autoplay
        dots: true, // Shows navigation dots
        loop: true, // Enables infinite loop
        responsive: { // Configures responsive settings
            0: {
                items: 1 // 1 item for small screens
            },
            768: {
                items: 2 // 2 items for medium screens
            },
            900: {
                items: 3 // 3 items for larger screens
            }
        }
    });

    // Portfolio isotope and filter
    $(window).on('load', function() { // Executes after the page has fully loaded
        var portfolioIsotope = $('.portfolio-container').isotope({ // Initializes Isotope for portfolio filtering
            itemSelector: '.portfolio-item', // Sets the items to be filtered
            layoutMode: 'fitRows' // Sets the layout mode to "fitRows"
        });
        $('#portfolio-flters li').on('click', function() { // Adds click event listener to filter buttons
            $("#portfolio-flters li").removeClass('filter-active'); // Removes active class from other filters
            $(this).addClass('filter-active'); // Adds active class to the clicked filter
            portfolioIsotope.isotope({ // Filters the portfolio items
                filter: $(this).data('filter') // Filters based on the data-filter attribute
            });
        });
    });

    // Initiate venobox (lightbox feature used in portfolio)
    $(document).ready(function() { // Executes when the DOM is fully loaded
        $('.venobox').venobox({ // Initializes the venobox plugin for lightbox functionality
            'share': false // Disables the share button in the lightbox
        });
    });

    // Portfolio details carousel
    $(".portfolio-details-carousel").owlCarousel({ // Initializes Owl Carousel for portfolio details
        autoplay: true, // Enables autoplay
        dots: true, // Shows navigation dots
        loop: true, // Enables infinite loop
        items: 1 // Displays one item at a time
    });

    var birthdate = new Date("1997-08-07"); // Sets the birthdate (replace with actual birthdate)
    var ageDifMs = Date.now() - birthdate.getTime(); // Calculates the difference in milliseconds between now and birthdate
    var ageDate = new Date(ageDifMs); // Converts the difference into a Date object
    var age = Math.abs(ageDate.getUTCFullYear() - 1970); // Extracts the age from the year difference
    document.getElementById("age").innerHTML = +age; // Displays the calculated age in the element with ID "age"

})(jQuery); // Passes jQuery into the function

// JavaScript to open and close modals
const modalBtns = document.querySelectorAll('.read-more-btn'); // Selects all buttons that open modals
const modals = document.querySelectorAll('.modal'); // Selects all modal elements
modalBtns.forEach((btn, index) => { // Loops through each modal button
    btn.addEventListener('click', () => { // Adds click event listener to each button
        modals[index].style.display = 'block'; // Displays the corresponding modal
    });
});
modals.forEach((modal) => { // Loops through each modal
    const closeModalBtn = modal.querySelector('.close-modal'); // Selects the close button within each modal
    closeModalBtn.addEventListener('click', () => { // Adds click event listener to the close button
        modal.style.display = 'none'; // Hides the modal when the close button is clicked
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const name = document.getElementById("name"); // Get the name element
    // Create the canvas for the background
    const canvas = document.createElement("canvas");
    canvas.id = "backgroundCanvas";
    document.body.appendChild(canvas); // Append the canvas to the body

    const ctx = canvas.getContext("2d");

    // Set canvas size to cover the entire screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const spheres = [];
    const numSpheres = 0; // Number of spheres

    // Create multiple spheres with different properties
    for (let i = 0; i < numSpheres; i++) {
        spheres.push({
            angle: Math.random() * 2 * Math.PI,
            radius: 100 + Math.random() * 50, // Randomize radius
            centerX: Math.random() * canvas.width,
            centerY: Math.random() * canvas.height,
            speed: 0.01 + Math.random() * 0.02, // Randomize speed
            originalCenterX: Math.random() * canvas.width,
            originalCenterY: Math.random() * canvas.height
        });
    }

    function drawBackground() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw each sphere
        spheres.forEach(sphere => {
            const x = sphere.centerX + sphere.radius * Math.cos(sphere.angle);
            const y = sphere.centerY + sphere.radius * Math.sin(sphere.angle);

            drawSphere(x, y);

            sphere.angle += sphere.speed;
            if (sphere.angle >= 2 * Math.PI) {
                sphere.angle = 0;
            }
        });

        requestAnimationFrame(drawBackground);
    }

    function drawSphere(x, y) {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 50);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(1, 'rgba(0, 0, 255, 0)');

        ctx.beginPath();
        ctx.arc(x, y, 50, 0, Math.PI * 2, false);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
    }

    drawBackground();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    console.log('DOM fully loaded and parsed');
});

function scrollLeft() {
    document.querySelector('.project-cards').scrollBy({
        left: -300, // Adjust scrolling distance
        behavior: 'smooth'
    });
}

function scrollRight() {
    document.querySelector('.project-cards').scrollBy({
        left: 300, // Adjust scrolling distance
        behavior: 'smooth'
    });
}


function flipCard(cardId) {
    const card = document.getElementById(cardId);
    card.classList.add('flipped');
}

function flipCardBack(cardId) {
    const card = document.getElementById(cardId);
    card.classList.remove('flipped');
}
