// Animation de la section À propos avec TypeScript
class AProposAnimations {
  private isAnimated = false;
  private observer: IntersectionObserver;

  constructor() {
    this.initObserver();
    this.initAnimations();
    this.initInteractions();
  }

  private initObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.isAnimated) {
            this.animateOnScroll();
            this.isAnimated = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    const aproposSection = document.getElementById("apropos");
    if (aproposSection) {
      this.observer.observe(aproposSection);
    }
  }

  private animateOnScroll(): void {
    // Animation du titre principal
    const mainTitle = document.querySelector("#apropos h2") as HTMLElement;
    if (mainTitle) {
      mainTitle.classList.add("animate-fadeInUp");
      setTimeout(() => {
        mainTitle.style.transform = "translateY(0)";
        mainTitle.style.opacity = "1";
      }, 100);
    }

    // Animation de la photo de profil avec rotation
    const profilePhoto = document.querySelector(
      "#apropos .relative.group"
    ) as HTMLElement;
    if (profilePhoto) {
      setTimeout(() => {
        profilePhoto.style.transform = "scale(1) rotate(0deg)";
        profilePhoto.style.opacity = "1";
      }, 300);
    }

    // Animation des cartes d'informations avec délai échelonné
    const infoCards = document.querySelectorAll(
      "#apropos .grid.grid-cols-2 > div"
    );
    infoCards.forEach((card, index) => {
      setTimeout(() => {
        (card as HTMLElement).style.transform = "translateY(0) scale(1)";
        (card as HTMLElement).style.opacity = "1";
      }, 500 + index * 150);
    });

    // Animation de la description personnelle
    const description = document.querySelector(
      "#apropos .bg-white\\/80.backdrop-blur-sm.rounded-3xl"
    ) as HTMLElement;
    if (description) {
      setTimeout(() => {
        description.style.transform = "translateX(0)";
        description.style.opacity = "1";
      }, 800);
    }

    // Animation de la timeline avec effet cascade
    const timelineItems = document.querySelectorAll(
      "#apropos .space-y-8 > div"
    );
    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        (item as HTMLElement).style.transform = "translateX(0)";
        (item as HTMLElement).style.opacity = "1";
      }, 1000 + index * 200);
    });

    // Animation des call-to-action
    const ctaButtons = document.querySelectorAll(
      "#apropos .inline-flex.items-center.space-x-6 a"
    );
    ctaButtons.forEach((button, index) => {
      setTimeout(() => {
        (button as HTMLElement).style.transform = "translateY(0) scale(1)";
        (button as HTMLElement).style.opacity = "1";
      }, 1500 + index * 100);
    });
  }

  private initAnimations(): void {
    // Styles initiaux pour les animations (utilisant Tailwind et styles inline)
    const elementsToAnimate = [
      { selector: "#apropos h2", initial: "translateY(30px)", opacity: "0" },
      {
        selector: "#apropos .relative.group",
        initial: "scale(0.8) rotate(-10deg)",
        opacity: "0",
      },
      {
        selector: "#apropos .grid.grid-cols-2 > div",
        initial: "translateY(40px) scale(0.9)",
        opacity: "0",
      },
      {
        selector: "#apropos .bg-white\\/80.backdrop-blur-sm.rounded-3xl",
        initial: "translateX(-50px)",
        opacity: "0",
      },
      {
        selector: "#apropos .space-y-8 > div",
        initial: "translateX(50px)",
        opacity: "0",
      },
      {
        selector: "#apropos .inline-flex.items-center.space-x-6 a",
        initial: "translateY(30px) scale(0.9)",
        opacity: "0",
      },
    ];

    elementsToAnimate.forEach(({ selector, initial, opacity }) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        (element as HTMLElement).style.transform = initial;
        (element as HTMLElement).style.opacity = opacity;
        (element as HTMLElement).style.transition =
          "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      });
    });
  }

  private initInteractions(): void {
    // Animation de hover pour la photo de profil
    const profileContainer = document.querySelector("#apropos .relative.group");
    if (profileContainer) {
      profileContainer.addEventListener("mouseenter", () => {
        const badge = profileContainer.querySelector(
          ".absolute.-bottom-4.-right-4"
        );
        if (badge) {
          (badge as HTMLElement).style.transform = "rotate(-5deg) scale(1.1)";
        }
      });

      profileContainer.addEventListener("mouseleave", () => {
        const badge = profileContainer.querySelector(
          ".absolute.-bottom-4.-right-4"
        );
        if (badge) {
          (badge as HTMLElement).style.transform = "rotate(12deg) scale(1)";
        }
      });
    }

    // Animation de pulsation pour les éléments décoratifs
    this.animateBackgroundElements();

    // Animation des icônes dans les cartes
    const iconContainers = document.querySelectorAll(
      "#apropos .w-12.h-12.bg-teal-100"
    );
    iconContainers.forEach((container) => {
      container.addEventListener("mouseenter", () => {
        const svg = container.querySelector("svg");
        if (svg) {
          svg.style.transform = "rotate(15deg) scale(1.2)";
          svg.style.transition = "transform 0.3s ease";
        }
      });

      container.addEventListener("mouseleave", () => {
        const svg = container.querySelector("svg");
        if (svg) {
          svg.style.transform = "rotate(0deg) scale(1)";
        }
      });
    });

    // Animation des éléments de timeline au hover
    const timelineElements = document.querySelectorAll(
      "#apropos .flex-shrink-0.w-16.h-16"
    );
    timelineElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        (element as HTMLElement).style.transform = "scale(1.15) rotate(5deg)";
        (element as HTMLElement).style.boxShadow =
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
      });

      element.addEventListener("mouseleave", () => {
        (element as HTMLElement).style.transform = "scale(1) rotate(0deg)";
        (element as HTMLElement).style.boxShadow =
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
      });
    });

    // Animation des boutons call-to-action
    this.initButtonAnimations();
  }

  private animateBackgroundElements(): void {
    const backgroundElements = document.querySelectorAll(
      "#apropos .absolute.rounded-full"
    );

    backgroundElements.forEach((element, index) => {
      const animateElement = () => {
        const randomX = (Math.random() - 0.5) * 20;
        const randomY = (Math.random() - 0.5) * 20;
        const randomScale = 0.9 + Math.random() * 0.2;

        (
          element as HTMLElement
        ).style.transform = `translate(${randomX}px, ${randomY}px) scale(${randomScale})`;
        (element as HTMLElement).style.transition = "transform 4s ease-in-out";

        setTimeout(animateElement, 4000 + Math.random() * 2000);
      };

      setTimeout(animateElement, index * 1000);
    });
  }

  private initButtonAnimations(): void {
    const buttons = document.querySelectorAll(
      "#apropos .inline-flex.items-center.space-x-6 a"
    );

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        const svg = button.querySelector("svg");
        if (svg) {
          svg.style.transform = "rotate(12deg) scale(1.1)";
          svg.style.transition = "transform 0.3s ease";
        }

        // Effet de brillance
        const span = button.querySelector("span");
        if (span) {
          span.style.position = "relative";
          span.style.overflow = "hidden";

          const shine = document.createElement("div");
          shine.style.position = "absolute";
          shine.style.top = "0";
          shine.style.left = "-100%";
          shine.style.width = "100%";
          shine.style.height = "100%";
          shine.style.background =
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)";
          shine.style.transition = "left 0.6s ease";
          shine.style.pointerEvents = "none";

          span.appendChild(shine);

          setTimeout(() => {
            shine.style.left = "100%";
          }, 50);

          setTimeout(() => {
            if (shine.parentNode) {
              shine.parentNode.removeChild(shine);
            }
          }, 650);
        }
      });

      button.addEventListener("mouseleave", () => {
        const svg = button.querySelector("svg");
        if (svg) {
          svg.style.transform = "rotate(0deg) scale(1)";
        }
      });
    });
  }

  // Animation de particules flottantes (effet wow)
  private createFloatingParticles(): void {
    const container = document.getElementById("apropos");
    if (!container) return;

    for (let i = 0; i < 5; i++) {
      const particle = document.createElement("div");
      particle.style.position = "absolute";
      particle.style.width = "4px";
      particle.style.height = "4px";
      particle.style.backgroundColor = "rgba(20, 184, 166, 0.3)";
      particle.style.borderRadius = "50%";
      particle.style.pointerEvents = "none";
      particle.style.zIndex = "1";

      const animateParticle = () => {
        const x = Math.random() * container.offsetWidth;
        const y = Math.random() * container.offsetHeight;

        particle.style.left = x + "px";
        particle.style.top = y + "px";
        particle.style.opacity = "0";
        particle.style.transform = "scale(0)";
        particle.style.transition = "all 3s ease-in-out";

        setTimeout(() => {
          particle.style.opacity = "1";
          particle.style.transform = "scale(1)";
        }, 100);

        setTimeout(() => {
          particle.style.opacity = "0";
          particle.style.transform = "scale(0) translateY(-20px)";
        }, 2000);

        setTimeout(animateParticle, 3000 + Math.random() * 2000);
      };

      container.appendChild(particle);
      setTimeout(animateParticle, i * 1000);
    }
  }

  public init(): void {
    // Initialisation des particules flottantes après un délai
    setTimeout(() => {
      this.createFloatingParticles();
    }, 2000);
  }
}

// Initialisation quand le DOM est chargé
document.addEventListener("DOMContentLoaded", () => {
  const aproposAnimations = new AProposAnimations();
  aproposAnimations.init();
});
