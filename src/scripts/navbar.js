// Portfolio Navbar - Version Tailwind CSS uniquement
// Ce fichier gère la barre de navigation du portfolio avec des animations

// Attendre que le DOM soit complètement chargé avant d'exécuter le code
document.addEventListener("DOMContentLoaded", function () {
  // ===== RÉCUPÉRATION DES ÉLÉMENTS HTML =====
  // On récupère tous les éléments de la navbar par leur ID
  const portfolioNavbar = document.getElementById("portfolio-navbar"); // La barre de navigation principale
  const portfolioMenuBtn = document.getElementById("portfolio-menu-btn"); // Le bouton hamburger pour mobile
  const portfolioMobileMenu = document.getElementById("portfolio-mobile-menu"); // Le menu mobile
  const portfolioMenuLines = document.querySelectorAll(
    "#portfolio-menu-btn .portfolio-menu-line" // Les 3 lignes du bouton hamburger
  );
  const portfolioMobileLinks = document.querySelectorAll(
    "#portfolio-mobile-menu .portfolio-mobile-link" // Les liens du menu mobile
  );
  const portfolioNavLinks = document.querySelectorAll(
    "#portfolio-navbar .portfolio-nav-link" // Les liens de navigation desktop
  );

  // ===== VARIABLES GLOBALES =====
  let isPortfolioMenuOpen = false; // État du menu (ouvert/fermé)
  let lastScrollPosition = 0; // Position de scroll précédente
  let isScrolling = false; // Pour éviter trop d'appels pendant le scroll

  // ===== VÉRIFICATION DE SÉCURITÉ =====
  // S'assurer que tous les éléments nécessaires existent
  if (!portfolioNavbar || !portfolioMenuBtn || !portfolioMobileMenu) {
    console.error("Éléments de navigation portfolio manquants");
    return; // Arrêter l'exécution si des éléments manquent
  }

  // Afficher dans la console pour débugger
  console.log("Portfolio navbar elements found:", {
    navbar: !!portfolioNavbar,
    menuBtn: !!portfolioMenuBtn,
    mobileMenu: !!portfolioMobileMenu,
    menuLines: portfolioMenuLines.length,
    mobileLinks: portfolioMobileLinks.length,
    navLinks: portfolioNavLinks.length,
  });

  // ===== ANIMATION D'ENTRÉE DE LA NAVBAR =====
  // Commencer avec la navbar cachée (hors écran)
  portfolioNavbar.classList.add("transform", "-translate-y-full", "opacity-0");

  // Après 500ms, faire apparaître la navbar avec une animation
  setTimeout(() => {
    portfolioNavbar.classList.remove(
      "transform",
      "-translate-y-full",
      "opacity-0"
    );
    portfolioNavbar.classList.add("transition-all", "duration-700", "ease-out");
  }, 500);

  // ===== GESTION DU SCROLL =====
  // Fonction qui s'exécute à chaque scroll
  function handlePortfolioScroll() {
    const currentScroll = window.pageYOffset; // Position actuelle du scroll

    // Auto-hide : cacher la navbar quand on scroll vers le bas
    if (
      currentScroll > lastScrollPosition && // Scroll vers le bas
      currentScroll > 150 && // Seulement après 150px
      !isPortfolioMenuOpen // Pas si le menu mobile est ouvert
    ) {
      portfolioNavbar.classList.add("transform", "-translate-y-full");
    } else {
      portfolioNavbar.classList.remove("transform", "-translate-y-full");
    }

    // Sauvegarder la position pour la prochaine comparaison
    lastScrollPosition = currentScroll;
    isScrolling = false;
  }

  // Optimisation des performances : éviter trop d'appels
  function requestPortfolioScrollFrame() {
    if (!isScrolling) {
      requestAnimationFrame(handlePortfolioScroll);
      isScrolling = true;
    }
  }

  // Écouter l'événement scroll avec l'option passive pour de meilleures performances
  window.addEventListener("scroll", requestPortfolioScrollFrame, {
    passive: true,
  });

  // ===== TOGGLE DU MENU MOBILE =====
  // Fonction pour ouvrir/fermer le menu mobile
  function togglePortfolioMenu() {
    isPortfolioMenuOpen = !isPortfolioMenuOpen; // Inverser l'état
    console.log("Toggle portfolio menu, isOpen:", isPortfolioMenuOpen);

    // Mettre à jour l'attribut d'accessibilité
    portfolioMenuBtn.setAttribute("aria-expanded", isPortfolioMenuOpen);

    if (isPortfolioMenuOpen) {
      // ===== OUVERTURE DU MENU =====
      // Afficher le menu mobile
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

      // ===== ANIMATION DU BOUTON HAMBURGER VERS X =====
      if (portfolioMenuLines.length >= 3) {
        // Ligne 1 : descendre et tourner de 45°
        portfolioMenuLines[0].classList.add(
          "transform",
          "translate-y-2",
          "rotate-45"
        );
        // Ligne 2 : disparaître
        portfolioMenuLines[1].classList.add("opacity-0", "scale-0");
        // Ligne 3 : monter et tourner de -45°
        portfolioMenuLines[2].classList.add(
          "transform",
          "-translate-y-2",
          "-rotate-45"
        );
      }

      // ===== ANIMATION STAGGERED DES LIENS =====
      // Faire apparaître les liens un par un avec un délai
      portfolioMobileLinks.forEach((link, index) => {
        // Commencer caché
        link.classList.add("transform", "-translate-x-8", "opacity-0");

        // Faire apparaître avec un délai différent pour chaque lien
        setTimeout(() => {
          link.classList.remove("transform", "-translate-x-8", "opacity-0");
          link.classList.add("transform", "translate-x-0", "opacity-100");
        }, index * 100); // 100ms de délai entre chaque lien
      });

      // Bloquer le scroll de la page quand le menu est ouvert
      document.body.classList.add("overflow-hidden");
    } else {
      // ===== FERMETURE DU MENU =====
      // Cacher le menu mobile
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

      // ===== ANIMATION DU X VERS HAMBURGER =====
      if (portfolioMenuLines.length >= 3) {
        // Remettre les lignes dans leur position originale
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

      // ===== RÉINITIALISER LES LIENS =====
      // Remettre tous les liens en position cachée
      portfolioMobileLinks.forEach((link) => {
        link.classList.add("transform", "-translate-x-8", "opacity-0");
        link.classList.remove("transform", "translate-x-0", "opacity-100");
      });

      // Restaurer le scroll de la page
      document.body.classList.remove("overflow-hidden");

      // Masquer complètement le menu après l'animation
      setTimeout(() => {
        if (!isPortfolioMenuOpen) {
          portfolioMobileMenu.classList.add("hidden");
        }
      }, 500);
    }
  }

  // ===== ÉVÉNEMENTS (EVENT LISTENERS) =====
  // Clic sur le bouton hamburger
  portfolioMenuBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Empêcher le comportement par défaut
    e.stopPropagation(); // Empêcher la propagation de l'événement
    togglePortfolioMenu(); // Basculer l'état du menu
  });

  // Fermer le menu quand on clique sur un lien mobile
  portfolioMobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (isPortfolioMenuOpen) {
        togglePortfolioMenu(); // Fermer le menu
      }
    });
  });

  // Fermer le menu en cliquant à l'extérieur
  document.addEventListener("click", (e) => {
    if (
      isPortfolioMenuOpen && // Si le menu est ouvert
      !portfolioMobileMenu.contains(e.target) && // Et qu'on ne clique pas dans le menu
      !portfolioMenuBtn.contains(e.target) // Et qu'on ne clique pas sur le bouton
    ) {
      togglePortfolioMenu(); // Fermer le menu
    }
  });

  // ===== SCROLL SMOOTH =====
  // Fonction pour faire un scroll fluide vers une section
  function portfolioSmoothScroll(target) {
    const targetElement = document.querySelector(target); // Trouver l'élément cible
    if (targetElement) {
      const navbarHeight = portfolioNavbar.offsetHeight; // Hauteur de la navbar
      const targetPosition = targetElement.offsetTop - navbarHeight - 30; // Position calculée

      // Scroll fluide vers la position calculée
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }

  // ===== GESTION DES LIENS DE NAVIGATION =====
  // Combiner tous les liens (desktop + mobile)
  const allPortfolioLinks = [...portfolioNavLinks, ...portfolioMobileLinks];
  allPortfolioLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Empêcher le comportement par défaut
      const href = link.getAttribute("href"); // Récupérer l'attribut href
      if (href && href.startsWith("#")) {
        // Si c'est un lien interne (commence par #)
        portfolioSmoothScroll(href); // Faire un scroll fluide
      }
    });
  });

  // ===== ANIMATIONS DES LIENS DESKTOP =====
  // Effet hover sur les liens de navigation desktop
  portfolioNavLinks.forEach((link) => {
    // Au survol de la souris
    link.addEventListener("mouseenter", function () {
      this.classList.add("transform", "-translate-y-1", "scale-105"); // Monter et agrandir légèrement
    });

    // Quand la souris quitte
    link.addEventListener("mouseleave", function () {
      this.classList.remove("transform", "-translate-y-1", "scale-105"); // Remettre à la normale
    });
  });

  // ===== GESTION DU RESPONSIVE =====
  // Fermer le menu mobile si on redimensionne vers desktop
  function handlePortfolioResize() {
    if (window.innerWidth >= 1024 && isPortfolioMenuOpen) {
      // Si écran >= 1024px et menu ouvert
      togglePortfolioMenu(); // Fermer le menu
    }
  }

  // Écouter les changements de taille d'écran
  window.addEventListener("resize", handlePortfolioResize);

  // ===== ANIMATION D'APPARITION DES ÉLÉMENTS =====
  // Faire apparaître les éléments de navigation avec un délai
  const portfolioNavElements = document.querySelectorAll(
    "#portfolio-navbar .portfolio-nav-link, #portfolio-navbar .portfolio-logo"
  );
  portfolioNavElements.forEach((element, index) => {
    // Commencer caché
    element.classList.add("opacity-0", "transform", "-translate-y-8");

    // Faire apparaître avec un délai différent pour chaque élément
    setTimeout(() => {
      element.classList.remove("opacity-0", "transform", "-translate-y-8");
      element.classList.add("transition-all", "duration-700", "ease-out");
    }, index * 150 + 800); // 150ms entre chaque élément + 800ms de base
  });

  // Message de confirmation dans la console
  console.log("🚀 Portfolio Navbar initialisée avec Tailwind CSS uniquement !");
});
