/**
 * Particles configuration for tsParticles
 * Optimized for performance with minimal particle count and reduced FPS
 */
export const particlesOptions = {
  background: {
    color: {
      value: "transparent",
    },
  },
  fpsLimit: 30,
  interactivity: {
    events: {
      onClick: {
        enable: false,
      },
      onHover: {
        enable: false,
      },
      resize: {
        enable: true,
      } as any,
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#00FF88",
      distance: 120,
      enable: true,
      opacity: 0.25,
      width: 0.8,
    },
    move: {
      enable: true,
      random: false,
      speed: 0.2,
      direction: "none" as const,
      outModes: {
        default: "out" as const,
      },
      straight: false,
    },
    number: {
      density: {
        enable: true,
      } as any,
      value: 30,
    },
    opacity: {
      value: 0.4,
    },
    size: {
      value: 1.5,
    },
  },
  detectRetina: true,
  smooth: true,
};
