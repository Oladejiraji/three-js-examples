"use client";

import { Box } from "@/components";
import { Canvas } from "@react-three/fiber";
import React from "react";

export default function Nesting() {
  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <Box position-x={-2}>
          <Box position-x={2}>
            <Box position-x={3} />
          </Box>
        </Box>
      </Canvas>
    </div>
  );
}
