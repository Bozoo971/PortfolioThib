// Fond animé Three.js - Thème Teal Pastel
class FondAnime {
  constructor() {
    this.container = document.getElementById("three-container");
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.particles = [];
    this.animationId = null;

    this.init();
    this.createParticles();
    this.animate();
    this.handleResize();
  }

  init() {
    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);

    // Responsive
    window.addEventListener("resize", () => this.handleResize());
  }

  createParticles() {
    const particleCount = 150;

    // Créer des sphères teal pastel plus visibles
    for (let i = 0; i < particleCount; i++) {
      const geometry = new THREE.SphereGeometry(
        Math.random() * 0.15 + 0.08,
        12,
        12
      );

      // Couleurs teal pastel plus vives
      const tealColors = [
        0x20b2aa, // Light sea green
        0x48d1cc, // Medium turquoise
        0x40e0d0, // Turquoise
        0x7fffd4, // Aquamarine
        0x66cdaa, // Medium aquamarine
        0x98fb98, // Pale green
        0x90ee90, // Light green
        0x00ced1, // Dark turquoise
        0x00bfff, // Deep sky blue
        0x00ffff, // Cyan
        0x40e0d0, // Turquoise
      ];

      const color = tealColors[Math.floor(Math.random() * tealColors.length)];
      const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      });

      const sphere = new THREE.Mesh(geometry, material);

      // Positions aléatoires plus étendues
      sphere.position.x = (Math.random() - 0.5) * 50;
      sphere.position.y = (Math.random() - 0.5) * 50;
      sphere.position.z = (Math.random() - 0.5) * 50;

      this.particles.push(sphere);
      this.scene.add(sphere);
    }
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());

    const time = Date.now() * 0.0008;

    // Animation des sphères teal plus visible
    this.particles.forEach((sphere, index) => {
      // Rotation douce
      sphere.rotation.x += 0.008;
      sphere.rotation.y += 0.008;

      // Mouvement flottant plus visible
      sphere.position.y += Math.sin(time + index * 0.1) * 0.02;
      sphere.position.x += Math.cos(time + index * 0.1) * 0.01;
      sphere.position.z += Math.sin(time * 0.5 + index * 0.05) * 0.015;

      // Pulsation plus marquée
      const scale = 1 + Math.sin(time * 1.5 + index) * 0.2;
      sphere.scale.set(scale, scale, scale);
    });

    this.renderer.render(this.scene, this.camera);
  }

  handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}

// Initialisation quand le DOM est chargé
document.addEventListener("DOMContentLoaded", () => {
  new FondAnime();
});
