document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const bookBtns = document.querySelectorAll('.book-btn');
    const modal = document.getElementById('booking-modal');
    const closeBtn = document.querySelector('.close');
    const bookingForm = document.getElementById('booking-form');
    const selectedRoomInput = document.getElementById('selected-room');
    const navbar = document.getElementById('navbar');
    const navLinksAnchors = document.querySelectorAll('.nav-links a');
    const scrollIcon = document.getElementById('scroll-down'); 

    // Toggle menu burger
    burgerMenu.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            burgerMenu.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                setTimeout(() => {
                    navLinks.style.display = 'none';
                }, 300); // Match the duration of the CSS transition
            } else {
                navLinks.style.display = 'flex';
                setTimeout(() => {
                    navLinks.classList.add('active');
                }, 10); // A small delay to ensure the display change happens before the transition
            }
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            // Reset styles for desktop view
            navLinks.style.display = 'flex';
            navLinks.classList.remove('active');
        } else {
            // Hide menu initially in mobile view
            navLinks.style.display = 'none';
            burgerMenu.classList.remove('active');
        }
    });

    bookBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const roomCard = e.target.closest('.room-card');
            if (roomCard) {
                const roomName = roomCard.querySelector('h3').textContent;
                selectedRoomInput.value = roomName;

                // Clear previous inputs
                const modalContent = modal.querySelector('.modal-content');
                modalContent.querySelector('#booking-reason').value = ''; 

                modal.style.display = 'block';
            }
        });
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle form submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Pemesanan berhasil!');
        modal.style.display = 'none';
        bookingForm.reset();
    });

    // Smooth scroll
    navLinksAnchors.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;

                window.scrollTo({
                    top: targetSection.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Change navbar color on scroll
    const changeNavbarColor = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-active');
        } else {
            navbar.classList.remove('nav-active');
        }
    };

    window.addEventListener('scroll', changeNavbarColor);
    changeNavbarColor(); 

    // Animasi fade-in saat scroll
    const sections = document.querySelectorAll('section');
    const fadeElems = document.querySelectorAll('.fade-in');

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    });

    sections.forEach(section => {
        section.classList.add('section-fade');
        sectionObserver.observe(section);
    });

    const checkFade = () => {
        fadeElems.forEach(elem => {
            const elemTop = elem.getBoundingClientRect().top;
            const elemBottom = elem.getBoundingClientRect().bottom;

            if (elemTop < window.innerHeight && elemBottom > 0) {
                elem.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', checkFade);
    checkFade(); 

    // Toggle room list visibility and animate icon
    document.querySelectorAll('.building-header').forEach(header => {
        header.addEventListener('click', () => {
            const roomList = header.nextElementSibling;
            if (roomList) {
                const scrollIcon = header.querySelector('.scroll-icon');
                if (roomList.style.display === 'block') {
                    roomList.style.display = 'none';
                    scrollIcon.classList.remove('rotate');
                } else {
                    roomList.style.display = 'block';
                    scrollIcon.classList.add('rotate');
                }
            }
        });
    });

    // Scroll Down Functionality
    if (scrollIcon) {
        scrollIcon.addEventListener('click', () => {
            const targetSection = document.querySelector('#booking'); 
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;

                window.scrollTo({
                    top: targetSection.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    }
});
