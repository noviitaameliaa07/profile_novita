
document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // 1. LOADING SCREEN
    // =========================================

    const loader = document.querySelector(".page-loader");

    window.addEventListener("load", () => {
        if (loader) {
            setTimeout(() => {
                loader.classList.add("hide");
            }, 700);
        }
    });


    // =========================================
    // 2. TYPING ANIMATION
    // =========================================

    const typingText = document.getElementById("typingText");

    if (typingText) {
        const words = [
            "Web Developer",
            "RPL Student",
            "Creative Learner",
            "Tech Enthusiast"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (deleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            typingText.textContent = currentWord.substring(0, charIndex);

            let speed = deleting ? 55 : 100;

            if (!deleting && charIndex === currentWord.length) {
                speed = 1500;
                deleting = true;
            } else if (deleting && charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                speed = 400;
            }

            setTimeout(typeEffect, speed);
        }

        typeEffect();
    }


    // =========================================
    // 3. FLOATING PARTICLES
    // =========================================

    const particles = document.getElementById("particles");

    const particleSymbols = ["✦", "♡", "✧", "·"];

    if (
        particles &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        function createParticle() {
            const particle = document.createElement("span");

            particle.classList.add("particle");

            particle.textContent =
                particleSymbols[
                    Math.floor(Math.random() * particleSymbols.length)
                ];

            particle.style.left = Math.random() * 100 + "%";
            particle.style.fontSize = (Math.random() * 13 + 8) + "px";
            particle.style.animationDuration = (Math.random() * 10 + 9) + "s";
            particle.style.animationDelay = Math.random() * 3 + "s";

            particles.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 20000);
        }

        for (let i = 0; i < 18; i++) {
            setTimeout(createParticle, i * 250);
        }

        setInterval(createParticle, 650);
    }


    // =========================================
    // 4. MOBILE NAVIGATION
    // =========================================

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("open");
            menuToggle.classList.toggle("active");
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                menuToggle.classList.remove("active");
            });
        });
    }


    // =========================================
    // 5. SCROLL REVEAL ANIMATION
    // =========================================

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }


    // =========================================
    // 6. SKILL BAR ANIMATION
    // =========================================

    const skillBoxes = document.querySelectorAll(".skill-box");

    if ("IntersectionObserver" in window) {
        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        skillBoxes.forEach(box => {
            skillObserver.observe(box);
        });
    } else {
        skillBoxes.forEach(box => {
            box.classList.add("visible");
        });
    }


    // =========================================
    // 7. PROJECT CAROUSEL
    // =========================================

    const projectViewport = document.getElementById("projectViewport");
    const projectTrack = document.getElementById("projectTrack");

    const projectPrev = document.getElementById("projectPrev");
    const projectNext = document.getElementById("projectNext");

    const projectCounter = document.getElementById("projectCounter");

    if (
        projectViewport &&
        projectTrack &&
        projectPrev &&
        projectNext
    ) {
        const projectCards = Array.from(
            projectTrack.querySelectorAll(".project-card")
        );

        let currentPosition = 0;

        // Atur jumlah kartu yang terlihat
        function setupProjectCards() {
            const isMobile = window.innerWidth <= 700;

            const gap = isMobile ? 15 : 25;

            projectTrack.style.display = "flex";
            projectTrack.style.gap = gap + "px";
            projectTrack.style.width = "max-content";
            projectTrack.style.transition = "transform 0.5s ease";

            projectCards.forEach(card => {
                card.style.flex = isMobile
                    ? "0 0 " + projectViewport.clientWidth + "px"
                    : "0 0 " + ((projectViewport.clientWidth - gap) / 2) + "px";

                card.style.minWidth = "0";
            });
        }

        // Maksimal posisi carousel
        function getMaxPosition() {
            const isMobile = window.innerWidth <= 700;
            const visibleCards = isMobile ? 1 : 2;

            return Math.max(
                0,
                projectCards.length - visibleCards
            );
        }

        // Perbarui tampilan carousel
        function updateProjectCarousel() {
            if (projectCards.length === 0) return;

            const maxPosition = getMaxPosition();

            currentPosition = Math.max(
                0,
                Math.min(currentPosition, maxPosition)
            );

            const targetCard = projectCards[currentPosition];

            if (targetCard) {
                projectTrack.style.transform =
                    `translateX(-${targetCard.offsetLeft}px)`;
            }

            // Status tombol
            projectPrev.disabled = currentPosition === 0;

            projectNext.disabled =
                currentPosition >= maxPosition;

            // Penghitung project
            if (projectCounter) {
                const current = String(currentPosition + 1).padStart(2, "0");
                const total = String(maxPosition + 1).padStart(2, "0");

                projectCounter.textContent = `${current} / ${total}`;
            }
        }

        // Tombol project sebelumnya
        projectPrev.addEventListener("click", () => {
            if (currentPosition > 0) {
                currentPosition--;
                updateProjectCarousel();
            }
        });

        // Tombol project berikutnya
        projectNext.addEventListener("click", () => {
            if (currentPosition < getMaxPosition()) {
                currentPosition++;
                updateProjectCarousel();
            }
        });

        // Sesuaikan ketika ukuran layar berubah
        function refreshCarousel() {
            setupProjectCards();
            updateProjectCarousel();
        }

        window.addEventListener("resize", refreshCarousel);

        // Jalankan pertama kali
        refreshCarousel();
    }


    // =========================================
    // 8. ACTIVE NAVIGATION
    // =========================================

    const sections = document.querySelectorAll("main section[id]");

    function updateActiveNav() {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }
        });
    }


    // =========================================
    // 9. BACK TO TOP
    // =========================================

    const backToTop = document.getElementById("backToTop");

    function handleScroll() {
        updateActiveNav();

        if (backToTop) {
            if (window.scrollY > 400) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        }
    }

    window.addEventListener("scroll", handleScroll, {
        passive: true
    });

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    // =========================================
    // 10. NAVBAR SCROLL EFFECT
    // =========================================

    const navbar = document.querySelector(".navbar");

    function updateNavbar() {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.style.boxShadow =
                "0 8px 35px rgba(255, 79, 154, 0.3)";
        } else {
            navbar.style.boxShadow =
                "0 8px 35px rgba(255, 79, 154, 0.18)";
        }
    }

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();
    handleScroll();

});
