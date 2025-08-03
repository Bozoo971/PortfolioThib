// Portfolio Navbar - Version Tailwind CSS uniquement
document.addEventListener("DOMContentLoaded", function () {
  // Éléments avec IDs uniques
  const portfolioNavbar = document.getElementById("portfolio-navbar");
  const portfolioMenuBtn = document.getElementById("portfolio-menu-btn");
  const portfolioMobileMenu = document.getElementById("portfolio-mobile-menu");
  const portfolioMenuLines = document.querySelectorAll(
    "#portfolio-menu-btn .portfolio-menu-line"
  );
  const portfolioMobileLinks = document.querySelectorAll(
    "#portfolio-mobile-menu .portfolio-mobile-link"
  );
  const portfolioNavLinks = document.querySelectorAll(
    "#portfolio-navbar .portfolio-nav-link"
  );

  let isPortfolioMenuOpen = false;
  let lastScrollPosition = 0;
  let isScrolling = false;

  // Vérification des éléments
  if (!portfolioNavbar || !portfolioMenuBtn || !portfolioMobileMenu) {
    console.error("Éléments de navigation portfolio manquants");
    return;
  }

  console.log("Portfolio navbar elements found:", {
    navbar: !!portfolioNavbar,
    menuBtn: !!portfolioMenuBtn,
    mobileMenu: !!portfolioMobileMenu,
    menuLines: portfolioMenuLines.length,
    mobileLinks: portfolioMobileLinks.length,
    navLinks: portfolioNavLinks.length,
  });

  // Animation d'entrée de la navbar
  portfolioNavbar.classList.add("transform", "-translate-y-full", "opacity-0");

  setTimeout(() => {
    portfolioNavbar.classList.remove(
      "transform",
      "-translate-y-full",
      "opacity-0"
    );
    portfolioNavbar.classList.add("transition-all", "duration-700", "ease-out");
  }, 500);

  // Gestion du scroll avec performance optimisée
  function handlePortfolioScroll() {
    const currentScroll = window.pageYOffset;
    const navbarBg = portfolioNavbar.querySelector(".absolute");

    if (currentScroll > 100) {
      navbarBg.classList.add("bg-white/95", "shadow-2xl");
      navbarBg.classList.remove("bg-gradient-to-r", "shadow-lg");
      portfolioNavbar.classList.add("portfolio-navbar-scrolled");
    } else {
      navbarBg.classList.remove("bg-white/95", "shadow-2xl");
      navbarBg.classList.add("bg-gradient-to-r", "shadow-lg");
      portfolioNavbar.classList.remove("portfolio-navbar-scrolled");
    }

    // Auto-hide en scroll down
    if (
      currentScroll > lastScrollPosition &&
      currentScroll > 150 &&
      !isPortfolioMenuOpen
    ) {
      portfolioNavbar.classList.add("transform", "-translate-y-full");
    } else {
      portfolioNavbar.classList.remove("transform", "-translate-y-full");
    }

    lastScrollPosition = currentScroll;
    isScrolling = false;
  }

  function requestPortfolioScrollFrame() {
    if (!isScrolling) {
      requestAnimationFrame(handlePortfolioScroll);
      isScrolling = true;
    }
  }

  window.addEventListener("scroll", requestPortfolioScrollFrame, {
    passive: true,
  });

  // Toggle menu portfolio avec animations Tailwind
  function togglePortfolioMenu() {
    isPortfolioMenuOpen = !isPortfolioMenuOpen;
    console.log("Toggle portfolio menu, isOpen:", isPortfolioMenuOpen);

    portfolioMenuBtn.setAttribute("aria-expanded", isPortfolioMenuOpen);

    if (isPortfolioMenuOpen) {
      // Ouvrir le menu
      portfolioMobileMenu.classList.remove("hidden");
      portfolioMobileMenu.classList.remove(
        "transform",
        "-translate-y-full",
        "opacity-0"
      );
      portfolioMobileMenu.classList.add(
        "transform",
        "translate-y-0",
        "opacity-100"
      );

      // Animation hamburger -> X
      if (portfolioMenuLines.length >= 3) {
        portfolioMenuLines[0].classList.add(
          "transform",
          "translate-y-2",
          "rotate-45"
        );
        portfolioMenuLines[1].classList.add("opacity-0", "scale-0");
        portfolioMenuLines[2].classList.add(
          "transform",
          "-translate-y-2",
          "-rotate-45"
        );
      }

      // Animation staggered des liens
      portfolioMobileLinks.forEach((link, index) => {
        link.classList.add("transform", "-translate-x-8", "opacity-0");

        setTimeout(() => {
          link.classList.remove("transform", "-translate-x-8", "opacity-0");
          link.classList.add("transform", "translate-x-0", "opacity-100");
        }, index * 100);
      });

      // Bloquer le scroll
      document.body.classList.add("overflow-hidden");
    } else {
      // Fermer le menu
      portfolioMobileMenu.classList.add(
        "transform",
        "-translate-y-full",
        "opacity-0"
      );
      portfolioMobileMenu.classList.remove(
        "transform",
        "translate-y-0",
        "opacity-100"
      );

      // Animation X -> hamburger
      if (portfolioMenuLines.length >= 3) {
        portfolioMenuLines[0].classList.remove(
          "transform",
          "translate-y-2",
          "rotate-45"
        );
        portfolioMenuLines[1].classList.remove("opacity-0", "scale-0");
        portfolioMenuLines[2].classList.remove(
          "transform",
          "-translate-y-2",
          "-rotate-45"
        );
      }

      // Réinitialiser les liens
      portfolioMobileLinks.forEach((link) => {
        link.classList.add("transform", "-translate-x-8", "opacity-0");
        link.classList.remove("transform", "translate-x-0", "opacity-100");
      });

      // Restaurer le scroll
      document.body.classList.remove("overflow-hidden");

      // Masquer le menu après l'animation
      setTimeout(() => {
        if (!isPortfolioMenuOpen) {
          portfolioMobileMenu.classList.add("hidden");
        }
      }, 500);
    }
  }

  // Event listeners
  portfolioMenuBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    togglePortfolioMenu();
  });

  // Fermer le menu en cliquant sur un lien
  portfolioMobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (isPortfolioMenuOpen) {
        togglePortfolioMenu();
      }
    });
  });

  // Fermer le menu en cliquant à l'extérieur
  document.addEventListener("click", (e) => {
    if (
      isPortfolioMenuOpen &&
      !portfolioMobileMenu.contains(e.target) &&
      !portfolioMenuBtn.contains(e.target)
    ) {
      togglePortfolioMenu();
    }
  });

  // Navigation smooth scroll pour tous les liens
  function portfolioSmoothScroll(target) {
    const targetElement = document.querySelector(target);
    if (targetElement) {
      const navbarHeight = portfolioNavbar.offsetHeight;
      const targetPosition = targetElement.offsetTop - navbarHeight - 30;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }

  // Event listeners pour tous les liens
  const allPortfolioLinks = [...portfolioNavLinks, ...portfolioMobileLinks];
  allPortfolioLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        portfolioSmoothScroll(href);
      }
    });
  });

  // Animations des liens desktop
  portfolioNavLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.classList.add("transform", "-translate-y-1", "scale-105");
    });

    link.addEventListener("mouseleave", function () {
      this.classList.remove("transform", "-translate-y-1", "scale-105");
    });
  });

  // Gestion du responsive
  function handlePortfolioResize() {
    if (window.innerWidth >= 1024 && isPortfolioMenuOpen) {
      togglePortfolioMenu();
    }
  }

  window.addEventListener("resize", handlePortfolioResize);

  // Animation d'apparition des éléments de navigation
  const portfolioNavElements = document.querySelectorAll(
    "#portfolio-navbar .portfolio-nav-link, #portfolio-navbar .portfolio-logo"
  );
  portfolioNavElements.forEach((element, index) => {
    element.classList.add("opacity-0", "transform", "-translate-y-8");

    setTimeout(() => {
      element.classList.remove("opacity-0", "transform", "-translate-y-8");
      element.classList.add("transition-all", "duration-700", "ease-out");
    }, index * 150 + 800);
  });

  console.log("🚀 Portfolio Navbar initialisée avec Tailwind CSS uniquement !");
});
