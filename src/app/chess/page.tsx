"use client";

import { Chess } from "@/components/Chess";
import { Environment, OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

export default function ChessPage() {
  return (
    <div className="w-screen h-screen">
      <Canvas
        camera={{ position: [0, 0.5, 0.5] }}
        onCreated={({ camera }) => camera.lookAt(0, 1, 0)}
      >
        <ambientLight />
        <Environment files="/images/venice_sunrise_4k.hdr" />
        <Chess />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
