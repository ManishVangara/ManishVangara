import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const ScrollProgressWavyLine = ({ containerRef }) => {
    const svgRef = useRef(null);
    const [svgHeight, setSvgHeight] = useState(0);

    // measure height
    useEffect(() => {
        if (containerRef.current) {
            const updateHeight = () => {
                setSvgHeight(containerRef.current.offsetHeight);
            };

            updateHeight();
            window.addEventListener("resize", updateHeight);
            return () => window.removeEventListener("resize", updateHeight);
        }
    }, [containerRef]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const pathLength = useSpring(scrollYProgress, {
        stiffness: 500,
        damping: 90,
    });

    // Construct a wavy path string
    // Amplitude: 10, Frequency: every 100px?
    // M {center} 0 Q {center+amp} {step/2} {center} {step} T {center} {step*2} ...
    // This constructs a path down the center.

    const width = 40;
    const center = width / 2;
    const amplitude = 10;
    const step = 60; // vertical distance for one half-wave

    let pathD = `M ${center} 0`;
    const cycles = Math.ceil(svgHeight / step);

    for (let i = 0; i < cycles; i++) {
        // SVG Cubic Bezier or Quadratic? Quadratic `Q` is easier for simple sine
        // M x y Q controlX controlY endX endY
        // But T is smooth continuation
        // Start M 20 0
        // Q 30 30 20 60
        // T 20 120

        // actually let's just make it a simple sine wave approximation
        const yStart = i * step;
        // simple ZigZag with curves
        // Q control point, End point
        // We want to go from (center, y) to (center, y+step)
        // Control point at (center + direction * amp, y + step/2)

        // Alternating direction
        const direction = i % 2 === 0 ? 1 : -1;

        // This is "Q" command relative? Absolute is easier
        // Path: 
        // M 20 0
        // Q 30 30 20 60
        // T 20 120 (reflects control point)

        if (i === 0) {
            pathD += ` Q ${center + amplitude} ${step / 2} ${center} ${step}`;
        } else {
            pathD += ` T ${center} ${(i + 1) * step}`;
        }
    }

    return (
        <div className="absolute left-1/2 top-0 h-full w-[40px] -translate-x-1/2 pointer-events-none hidden md:block">
            <svg
                ref={svgRef}
                width={width}
                height={svgHeight}
                viewBox={`0 0 ${width} ${svgHeight}`}
                fill="none"
                className="h-full w-full"
            >
                {/* Background Grey Path */}
                <path
                    d={pathD}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-200 dark:text-white/10"
                    fill="none"
                />

                {/* Animated Gradient Path */}
                <motion.path
                    d={pathD}
                    stroke="url(#gradient-line)"
                    strokeWidth="2"
                    fill="none"
                    style={{ pathLength }}
                />

                <defs>
                    <linearGradient id="gradient-line" x1="0" x2="0" y1="0" y2="1">
                        <stop stopColor="#3b82f6" stopOpacity="1" />
                        <stop offset="1" stopColor="#a855f7" stopOpacity="1" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};
