// Hero Section Animations - Version Élégante
document.addEventListener("DOMContentLoaded", function () {
  console.log("✨ Hero script élégant loaded");

  // Animation d'apparition des éléments élégante
  const animatedElements = document.querySelectorAll(".hero-content > *");
  animatedElements.forEach((element, index) => {
    element.classList.add("opacity-0", "transform", "-translate-y-8");

    setTimeout(() => {
      element.classList.remove("opacity-0", "transform", "-translate-y-8");
      element.classList.add(
        "opacity-100",
        "transform",
        "translate-y-0",
        "transition-all",
        "duration-800",
        "ease-out"
      );
    }, index * 200);
  });

  // Animation des statistiques avec compteur élégant
  const statItems = document.querySelectorAll(
    "#hero-stat-1, #hero-stat-2, #hero-stat-3"
  );
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector("div");
        const finalValue = parseInt(statNumber.textContent);
        animateCounter(statNumber, 0, finalValue, 2000);
      }
    });
  }, observerOptions);

  statItems.forEach((item) => {
    observer.observe(item);

    // Forcer l'affichage après un délai si l'observer ne fonctionne pas
    setTimeout(() => {
      if (item.classList.contains("opacity-0")) {
        item.classList.remove("opacity-0", "transform", "-translate-y-5");
        item.classList.add("opacity-100", "transform", "translate-y-0");
      }
    }, 2000);
  });

  // Fonction d'animation de compteur élégante
  function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const startValue = start;
    const change = end - start;

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentValue = Math.floor(startValue + change * progress);
      element.textContent = currentValue + "+";

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // Animation de la bulle de profil
  const profileBubble = document.querySelector(".group");
  if (profileBubble) {
    setInterval(() => {
      profileBubble.classList.add("scale-105");
      setTimeout(() => {
        profileBubble.classList.remove("scale-105");
      }, 1000);
    }, 4000);
  }

  // Animation du titre au hover
  const titleSpans = document.querySelectorAll("#hero-main-title span");
  titleSpans.forEach((span) => {
    span.addEventListener("mouseenter", function () {
      this.classList.add("scale-110", "transition-transform", "duration-300");
    });

    span.addEventListener("mouseleave", function () {
      this.classList.remove("scale-110");
    });
  });

  // Animation des boutons
  const heroButtons = document.querySelectorAll(
    "#hero-projects-btn, #hero-contact-btn"
  );
  heroButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.classList.add("scale-110", "shadow-2xl");
    });

    button.addEventListener("mouseleave", function () {
      this.classList.remove("scale-110", "shadow-2xl");
    });
  });

  console.log("🎨 Hero animations élégantes initialisées !");
});
