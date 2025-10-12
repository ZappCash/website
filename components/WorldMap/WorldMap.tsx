"use client";

import { motion } from "framer-motion";
import { memo, useState, useEffect, useMemo, useRef } from "react";
// @ts-ignore - dotted-map doesn't have types
import DottedMap from "dotted-map";
import { Connection } from "./types";

interface WorldMapProps {
  dots?: Connection[];
  lineColor?: string;
  mapColor?: string;
  mapBgColor?: string;
}

function projectPoint(lat: number, lng: number) {
  // Proyección Miller Cylindrical - balance entre Mercator y Equirectangular
  // Similar a lo que usa dotted-map por defecto
  const mapWidth = 800;
  const mapHeight = 400;

  // Convertir longitud (-180 a 180) a coordenada X (0 a 800)
  let x = ((lng + 180) / 360) * mapWidth;

  // Proyección Miller para latitud (mejor representación visual que Mercator puro)
  const latRad = (lat * Math.PI) / 180;

  // Fórmula de proyección Miller Cylindrical
  const millerY = (5 / 4) * Math.log(Math.tan(Math.PI / 4 + (2 * latRad) / 5));

  // Normalizar al rango del mapa
  // Miller tiene límites aproximados de ±2.3 en su rango
  const millerMax = 2.303412543;
  let y = (mapHeight / 2) - (millerY / millerMax) * (mapHeight / 2);

  // Ajuste fino para hemisferio sur (bajar puntos del sur)
  if (lat < -25 && lng > 110 && lng < 160) {
    // Oceanía (Australia): ajuste específico para centrar en el continente
    const adjustment = Math.abs(lat + 25) * 1.5 + 50; // +50px adicionales
    y += adjustment;
  } else if (lat < -15) {
    // Para latitudes en Sudamérica, ajustar hacia abajo
    const adjustment = Math.abs(lat + 15) * 1.3;
    y += adjustment;
  }

  // Ajuste para Centroamérica (Costa Rica, etc)
  if (lat > 5 && lat < 15 && lng > -90 && lng < -75) {
    y += 18; // Bajar más Centroamérica
    x -= 8;  // Mover a la izquierda
  }

  return { x, y };
}

function createCurvedPath(dot: Connection) {
  const start = projectPoint(dot.start.lat, dot.start.lng);
  const end = projectPoint(dot.end.lat, dot.end.lng);

  // Calcular distancia y ajustar la curvatura basado en la distancia
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  const midX = (start.x + end.x) / 2;

  // Detectar si es una conexión que cruza hemisferios (N-S)
  const crossesEquator = (dot.start.lat > 0 && dot.end.lat < 0) ||
                          (dot.start.lat < 0 && dot.end.lat > 0);

  // Detectar conexiones entre América Latina y otros continentes
  const involvesLatinAmerica = (dot.start.lat < 15 && dot.start.lng < -30) ||
                                (dot.end.lat < 15 && dot.end.lng < -30);

  // Para conexiones transoceánicas largas, curvar hacia el norte (arriba)
  // Para conexiones cortas, curvar ligeramente
  let curvature;

  if (distance > 450) {
    // Conexiones extremadamente largas
    curvature = distance * 0.50;
    if (crossesEquator && involvesLatinAmerica) {
      // Conexiones a América del Sur: curva ultra agresiva
      curvature = distance * 0.58;
    }
  } else if (distance > 350) {
    // Conexiones ultra largas (ej: SF-São Paulo, NY-Tokio)
    curvature = distance * 0.45;
    if (crossesEquator && involvesLatinAmerica) {
      // Conexiones a América del Sur: curva muy agresiva
      curvature = distance * 0.52;
    }
  } else if (distance > 250) {
    // Conexiones muy largas (intercontinentales)
    curvature = distance * 0.38;
    if (crossesEquator) {
      curvature = distance * 0.45;
    }
  } else if (distance > 180) {
    // Conexiones largas (transoceánicas): curvar fuertemente hacia arriba
    curvature = distance * 0.30;
  } else if (distance > 120) {
    // Conexiones medianas: curvar moderadamente
    curvature = distance * 0.18;
  } else {
    // Conexiones cortas: curvar ligeramente (Europa, etc)
    curvature = distance * 0.12;
  }

  // Limitar curvatura máxima
  curvature = Math.min(curvature, 250);

  // Siempre curvar hacia arriba (norte) restando de la Y más pequeña
  const midY = Math.min(start.y, end.y) - curvature;

  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
}

const WorldMapComponent = ({
  dots = [],
  lineColor = "#00FF88",
  mapColor = "#FFFFFF40",
  mapBgColor = "black",
}: WorldMapProps) => {
  const [svgMap, setSvgMap] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pre-calculate all paths and points (memoized)
  const curvedPaths = useMemo(() => {
    return dots.map((dot) => createCurvedPath(dot));
  }, [dots]);

  const projectedPoints = useMemo(() => {
    return dots.map((dot) => ({
      start: projectPoint(dot.start.lat, dot.start.lng),
      end: projectPoint(dot.end.lat, dot.end.lng),
    }));
  }, [dots]);

  // Only defer the heavy DottedMap generation
  useEffect(() => {
    let cancelled = false;

    setTimeout(() => {
      if (cancelled) return;
      const map = new DottedMap({ height: 120, grid: "diagonal" });
      const svg = map.getSVG({
        radius: 0.22,
        color: mapColor,
        shape: "circle",
        backgroundColor: mapBgColor,
      });
      setSvgMap(svg);
    }, 0);

    return () => {
      cancelled = true;
    };
  }, [mapColor, mapBgColor]);

  // Detect when map enters viewport to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <div ref={containerRef} className="relative w-full h-full" style={{ willChange: 'transform' }}>
      {/* Base Map */}
      {svgMap && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          className="pointer-events-none w-full h-full object-contain select-none"
          alt="world map"
          draggable={false}
          style={{
            opacity: svgMap ? 1 : 0,
            transition: 'opacity 0.3s',
            willChange: 'opacity'
          }}
        />
      )}

      {/* Animated Connections */}
      <svg
        viewBox="0 0 800 400"
        className="pointer-events-none absolute inset-0 size-full select-none"
        style={{ willChange: 'transform' }}
      >
        {/* Static base paths */}
        {curvedPaths.map((path, i) => (
          <path
            key={`base-path-${i}`}
            d={path}
            fill="none"
            stroke={lineColor}
            strokeWidth="0.5"
            opacity="0.2"
          />
        ))}

        {/* Animated paths with gradient - simplified animation */}
        {curvedPaths.map((path, i) => (
          <motion.path
            key={`path-${i}`}
            d={path}
            fill="none"
            stroke="url(#path-gradient)"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isVisible ? {
              pathLength: 1,
              opacity: 0.7
            } : { pathLength: 0, opacity: 0 }}
            transition={{
              duration: 1.5,
              delay: 0.05 * i,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="particle-gradient">
            <stop offset="0%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Traveling particles - 2 per path for better visibility */}
        {isVisible && curvedPaths.map((path, i) => {
          const pathId = `motion-path-${i}`;
          return (
            <g key={`particles-${i}`}>
              <path id={pathId} d={path} fill="none" />

              {/* Two particles with staggered delays */}
              {[0, 0.5].map((delayMultiplier, particleIndex) => (
                <circle
                  key={`particle-${i}-${particleIndex}`}
                  r="2.5"
                  fill="url(#particle-gradient)"
                  opacity="0.8"
                >
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    begin={`${i * 0.05 + delayMultiplier * 2}s`}
                  >
                    <mpath href={`#${pathId}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;0.9;0.9;0"
                    dur="2s"
                    repeatCount="indefinite"
                    begin={`${i * 0.05 + delayMultiplier * 2}s`}
                  />
                </circle>
              ))}
            </g>
          );
        })}

        {/* Point markers - simplified, only show on major connection points */}
        {projectedPoints
          .filter((_, i) => i % 2 === 0) // Show only every other point to reduce render load
          .map((points, i) => (
          <g key={`points-group-${i}`}>
            {/* Start point - static, no animation */}
            <circle
              cx={points.start.x}
              cy={points.start.y}
              r="2.5"
              fill={lineColor}
              opacity="0.8"
            />
            {/* End point - static, no animation */}
            <circle
              cx={points.end.x}
              cy={points.end.y}
              r="2.5"
              fill={lineColor}
              opacity="0.8"
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders
export const WorldMap = memo(WorldMapComponent);
