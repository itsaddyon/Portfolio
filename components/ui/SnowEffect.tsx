"use client";
import { useState, useEffect } from "react";
import Snowfall from "react-snowfall";

export function SnowEffect() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    // Return null on the server to prevent hydration mismatch
    if (!mounted) return null;
    return (
        <div
            style={{
                position: "fixed",
                width: "100vw",
                height: "100vh",
                top: 0,
                left: 0,
                pointerEvents: "none", // Critical: allows clicking links/buttons through the snow
                zIndex: 30,            // Adjust depending on where you want it layered
            }}
        >
            <Snowfall
                snowflakeCount={150}
                color="#f9f8f7ff"                // Your portfolio's exact theme gold
                radius={[1.8, 1.8]}            // Micro-sized particles (feels like lit dust/embers)
                speed={[0.4, 1.2]}             // Slow, deliberate descent
                wind={[-0.2, 0.4]}             // Very gentle ambient breeze
                changeFrequency={250}          // Smooth, non-jerky motion
                enable3DRotation={true}        // Subtle 3D depth flip
                style={{
                    opacity: 0.7,
                    filter: "blur(0.4px)",       // Soft cinematic optical blur
                }}
            />
        </div>
    );
}