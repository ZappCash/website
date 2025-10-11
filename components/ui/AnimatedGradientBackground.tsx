"use client";

import { useEffect, useRef } from "react";

export function AnimatedGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    let animationFrameId: number;
    let time = 0;

    // Generar ruido/textura para efecto orgánico
    const generateNoise = () => {
      const noiseCanvas = document.createElement('canvas');
      noiseCanvas.width = canvas.width;
      noiseCanvas.height = canvas.height;
      const noiseCtx = noiseCanvas.getContext('2d');
      if (!noiseCtx) return noiseCanvas;

      const imageData = noiseCtx.createImageData(noiseCanvas.width, noiseCanvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255;
        data[i] = noise;
        data[i + 1] = noise;
        data[i + 2] = noise;
        data[i + 3] = 15; // Muy sutil
      }

      noiseCtx.putImageData(imageData, 0, 0);
      return noiseCanvas;
    };

    const noiseTexture = generateNoise();

    const animate = () => {
      time += 0.008; // Animación más lenta y sutil

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ===== PASO 1: Gradiente base vertical (más oscuro arriba) =====
      const baseGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      baseGradient.addColorStop(0, "#000000");    // ⬆️ Negro absoluto arriba
      baseGradient.addColorStop(0.2, "#0a0a0a");
      baseGradient.addColorStop(0.4, "#0d100d");
      baseGradient.addColorStop(0.6, "#0f130f");
      baseGradient.addColorStop(0.75, "#111811"); // ⬇️ Transición más gradual
      baseGradient.addColorStop(0.88, "#142014");
      baseGradient.addColorStop(1, "#1a2e1a");    // Verde oscuro en el fondo

      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const bottomY = canvas.height * 0.85; // ⬆️ Núcleo ajustado

      // Pulsación más dramática para efecto Exodus
      const pulse = Math.sin(time * 0.5) * 0.12 + 0.92; // 0.80 - 1.04

      // ===== PASO 2: GLOW MASIVO - Capa 1 (Atmósfera GIGANTE) =====
      // Cubre TODA la pantalla con glow elíptico (más ancho que alto)
      const hugeGlow = ctx.createRadialGradient(
        centerX,
        bottomY,
        0,
        centerX,
        bottomY,
        canvas.height * 1.5 // EXPANSIÓN MÁXIMA para cubrir más área
      );

      hugeGlow.addColorStop(0, `rgba(0, 255, 136, ${0.95 * pulse})`); // ⬆️ +0.10
      hugeGlow.addColorStop(0.08, `rgba(0, 255, 136, ${0.85 * pulse})`); // ⬆️ +0.10
      hugeGlow.addColorStop(0.15, `rgba(0, 230, 115, ${0.75 * pulse})`); // ⬆️ +0.10
      hugeGlow.addColorStop(0.25, `rgba(0, 204, 102, ${0.6 * pulse})`); // ⬆️ +0.10
      hugeGlow.addColorStop(0.35, `rgba(0, 180, 90, ${0.48 * pulse})`); // ⬆️ +0.10
      hugeGlow.addColorStop(0.45, `rgba(0, 153, 77, ${0.38 * pulse})`); // ⬆️ +0.10
      hugeGlow.addColorStop(0.58, `rgba(0, 120, 60, ${0.25 * pulse})`); // ⬆️ +0.07
      hugeGlow.addColorStop(0.72, `rgba(0, 90, 45, ${0.12 * pulse})`); // ⬆️ +0.04
      hugeGlow.addColorStop(1, "transparent");

      ctx.filter = "blur(140px)"; // Blur GIGANTE
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = hugeGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ===== PASO 3: GLOW MASIVO - Capa 2 (Intensidad alta) =====
      const largeGlow = ctx.createRadialGradient(
        centerX,
        bottomY,
        0,
        centerX,
        bottomY,
        canvas.height * 1.0 // Mayor radio
      );

      largeGlow.addColorStop(0, `rgba(0, 255, 136, 1.0)`); // ⬆️ MÁXIMO
      largeGlow.addColorStop(0.1, `rgba(0, 255, 136, ${0.95 * pulse})`); // ⬆️ +0.07
      largeGlow.addColorStop(0.2, `rgba(50, 255, 150, ${0.85 * pulse})`); // ⬆️ +0.10
      largeGlow.addColorStop(0.32, `rgba(0, 230, 115, ${0.72 * pulse})`); // ⬆️ +0.12
      largeGlow.addColorStop(0.48, `rgba(0, 204, 102, ${0.55 * pulse})`); // ⬆️ +0.13
      largeGlow.addColorStop(0.65, `rgba(0, 153, 77, ${0.35 * pulse})`); // ⬆️ +0.10
      largeGlow.addColorStop(0.82, "transparent");

      ctx.filter = "blur(100px)";
      ctx.fillStyle = largeGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ===== PASO 4: GLOW INTENSO - Capa 3 (Más concentrado) =====
      const mediumGlow = ctx.createRadialGradient(
        centerX,
        bottomY,
        0,
        centerX,
        bottomY,
        canvas.height * 0.55
      );

      mediumGlow.addColorStop(0, `rgba(100, 255, 170, ${1.0 * pulse})`);
      mediumGlow.addColorStop(0.12, `rgba(50, 255, 150, ${0.92 * pulse})`);
      mediumGlow.addColorStop(0.25, `rgba(0, 255, 136, ${0.8 * pulse})`);
      mediumGlow.addColorStop(0.4, `rgba(0, 230, 115, ${0.65 * pulse})`);
      mediumGlow.addColorStop(0.58, `rgba(0, 204, 102, ${0.45 * pulse})`);
      mediumGlow.addColorStop(0.78, "transparent");

      ctx.filter = "blur(70px)";
      ctx.fillStyle = mediumGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ===== PASO 5: NÚCLEO BRILLANTE (reducido - más verde que blanco) =====
      const brightCore = ctx.createRadialGradient(
        centerX,
        bottomY,
        0,
        centerX,
        bottomY,
        canvas.height * 0.35
      );

      // Colores más verdes, menos blanco
      brightCore.addColorStop(0, `rgba(180, 255, 210, ${0.9 * pulse})`); // Verde claro en vez de blanco
      brightCore.addColorStop(0.12, `rgba(140, 255, 190, ${0.8 * pulse})`);
      brightCore.addColorStop(0.25, `rgba(80, 255, 160, ${0.7 * pulse})`);
      brightCore.addColorStop(0.4, `rgba(0, 255, 136, ${0.6 * pulse})`);
      brightCore.addColorStop(0.6, `rgba(0, 230, 115, ${0.4 * pulse})`);
      brightCore.addColorStop(0.85, "transparent");

      ctx.filter = "blur(50px)";
      ctx.fillStyle = brightCore;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ===== PASO 6: NÚCLEO CENTRAL (más sutil) =====
      const superCore = ctx.createRadialGradient(
        centerX,
        bottomY,
        0,
        centerX,
        bottomY,
        canvas.height * 0.18
      );

      superCore.addColorStop(0, `rgba(200, 255, 220, ${0.85 * pulse})`); // Verde muy claro pero no blanco
      superCore.addColorStop(0.15, `rgba(140, 255, 190, ${0.75 * pulse})`);
      superCore.addColorStop(0.35, `rgba(80, 255, 160, ${0.6 * pulse})`);
      superCore.addColorStop(0.6, `rgba(0, 255, 136, ${0.45 * pulse})`);
      superCore.addColorStop(0.85, "transparent");

      ctx.filter = "blur(30px)";
      ctx.fillStyle = superCore;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ===== PASO 7: Textura/Ruido para efecto orgánico =====
      ctx.globalCompositeOperation = "overlay";
      ctx.globalAlpha = 0.15;
      ctx.filter = "none";
      ctx.drawImage(noiseTexture, 0, 0);
      ctx.globalAlpha = 1.0;

      // Reset
      ctx.globalCompositeOperation = "source-over";
      ctx.filter = "none";

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
