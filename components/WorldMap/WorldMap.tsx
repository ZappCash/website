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
  const mapWidth = 800;
  const mapHeight = 400;

  let x = ((lng + 180) / 360) * mapWidth;

  const latRad = (lat * Math.PI) / 180;
  const millerY = (5 / 4) * Math.log(Math.tan(Math.PI / 4 + (2 * latRad) / 5));
  const millerMax = 2.303412543;
  let y = (mapHeight / 2) - (millerY / millerMax) * (mapHeight / 2);

  // Adjust southern hemisphere positioning
  if (lat < -25 && lng > 110 && lng < 160) {
    // Oceania adjustment
    const adjustment = Math.abs(lat + 25) * 1.5 + 50;
    y += adjustment;
  } else if (lat < -15) {
    // South America adjustment
    const adjustment = Math.abs(lat + 15) * 1.3;
    y += adjustment;
  }

  // Central America adjustment
  if (lat > 5 && lat < 15 && lng > -90 && lng < -75) {
    y += 18;
    x -= 8;
  }

  return { x, y };
}

function createCurvedPath(dot: Connection) {
  const start = projectPoint(dot.start.lat, dot.start.lng);
  const end = projectPoint(dot.end.lat, dot.end.lng);

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  const midX = (start.x + end.x) / 2;

  const crossesEquator = (dot.start.lat > 0 && dot.end.lat < 0) ||
                          (dot.start.lat < 0 && dot.end.lat > 0);

  const involvesLatinAmerica = (dot.start.lat < 15 && dot.start.lng < -30) ||
                                (dot.end.lat < 15 && dot.end.lng < -30);

  let curvature;

  if (distance > 450) {
    curvature = distance * 0.50;
    if (crossesEquator && involvesLatinAmerica) {
      curvature = distance * 0.58;
    }
  } else if (distance > 350) {
    curvature = distance * 0.45;
    if (crossesEquator && involvesLatinAmerica) {
      curvature = distance * 0.52;
    }
  } else if (distance > 250) {
    curvature = distance * 0.38;
    if (crossesEquator) {
      curvature = distance * 0.45;
    }
  } else if (distance > 180) {
    curvature = distance * 0.30;
  } else if (distance > 120) {
    curvature = distance * 0.18;
  } else {
    curvature = distance * 0.12;
  }

  curvature = Math.min(curvature, 250);

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

  const curvedPaths = useMemo(() => {
    return dots.map((dot) => createCurvedPath(dot));
  }, [dots]);

  const projectedPoints = useMemo(() => {
    return dots.map((dot) => ({
      start: projectPoint(dot.start.lat, dot.start.lng),
      end: projectPoint(dot.end.lat, dot.end.lng),
    }));
  }, [dots]);

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
        threshold: 0.1,
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

        {isVisible && curvedPaths.map((path, i) => {
          const pathId = `motion-path-${i}`;
          return (
            <g key={`particles-${i}`}>
              <path id={pathId} d={path} fill="none" />

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

        {projectedPoints
          .filter((_, i) => i % 2 === 0)
          .map((points, i) => (
          <g key={`points-group-${i}`}>
            <circle
              cx={points.start.x}
              cy={points.start.y}
              r="2.5"
              fill={lineColor}
              opacity="0.8"
            />
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

export const WorldMap = memo(WorldMapComponent);
