"use client";

import { Ball, DirtyBall, Floor, Instructions, Rug } from "@/components";
import { Environment, OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useRef } from "react";
import { GridHelper, Group } from "three";

export default function Infinity() {
  const ref = useRef<GridHelper>(null!);
  const rugRef = useRef<Group>(null!);
  return (
    <div className="w-screen h-screen">
      <Canvas
        camera={{ position: [0, 2.5, 2.5] }}
        onCreated={({ camera }) => camera.lookAt(0, 1, 0)}
      >
        <ambientLight />
        <Environment files="/images/venice_sunrise_4k.hdr" />
        <DirtyBall rugRef={rugRef} />
        <Rug ref={rugRef} />
      </Canvas>
      <Instructions />
    </div>
  );
}
