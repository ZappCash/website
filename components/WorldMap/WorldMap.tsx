"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
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

export function WorldMap({
  dots = [],
  lineColor = "#00FF88",
  mapColor = "#FFFFFF40",
  mapBgColor = "black",
}: WorldMapProps) {
  const svgMap = useMemo(() => {
    const map = new DottedMap({ height: 120, grid: "diagonal" });
    return map.getSVG({
      radius: 0.22,
      color: mapColor,
      shape: "circle",
      backgroundColor: mapBgColor,
    });
  }, [mapColor, mapBgColor]);

  return (
    <div className="relative w-full h-full">
      {/* Base Map */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="pointer-events-none w-full h-full object-contain select-none"
        alt="world map"
        draggable={false}
      />

      {/* Animated Connections */}
      <svg
        viewBox="0 0 800 400"
        className="pointer-events-none absolute inset-0 size-full select-none"
      >
        {/* Static base paths */}
        {dots.map((dot, i) => (
          <path
            key={`base-path-${i}`}
            d={createCurvedPath(dot)}
            fill="none"
            stroke={lineColor}
            strokeWidth="0.5"
            opacity="0.2"
          />
        ))}

        {/* Animated paths with gradient - pulsing effect */}
        {dots.map((dot, i) => (
          <g key={`path-group-${i}`}>
            {/* Main path with initial draw animation */}
            <motion.path
              d={createCurvedPath(dot)}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1],
                opacity: [0, 0.9, 0.6]
              }}
              transition={{
                duration: 2,
                delay: 0.3 * i,
                ease: "easeInOut",
              }}
            />

            {/* Pulsing glow effect that repeats */}
            <motion.path
              d={createCurvedPath(dot)}
              fill="none"
              stroke={lineColor}
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: 3,
                delay: 2 + i * 0.3,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
              }}
            />
          </g>
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

        {/* Traveling particles - multiple per path for continuous effect */}
        {dots.map((dot, i) => {
          const pathId = `motion-path-${i}`;
          return (
            <g key={`particles-${i}`}>
              <path id={pathId} d={createCurvedPath(dot)} fill="none" />

              {/* Multiple particles with different delays */}
              {[0, 0.33, 0.66].map((delayMultiplier, particleIndex) => (
                <circle
                  key={`particle-${i}-${particleIndex}`}
                  r="3"
                  fill="url(#particle-gradient)"
                  opacity="0.8"
                >
                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    begin={`${i * 0.3 + delayMultiplier * 3}s`}
                  >
                    <mpath href={`#${pathId}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;0.8;0.8;0"
                    dur="3s"
                    repeatCount="indefinite"
                    begin={`${i * 0.3 + delayMultiplier * 3}s`}
                  />
                </circle>
              ))}
            </g>
          );
        })}

        {/* Point markers with pulse animation */}
        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            {/* Start point */}
            <g key={`start-${i}`}>
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="2"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="2"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="8"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            {/* End point */}
            <g key={`end-${i}`}>
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="2"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="2"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="8"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
