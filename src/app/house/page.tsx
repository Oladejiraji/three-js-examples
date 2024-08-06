"use client";

import { Annotations, Box, House, Loader } from "@/components";
import TWEEN from "@tweenjs/tween.js";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useRef } from "react";

export default function Home() {
  const ref = useRef<any>(null!);
  function Tween() {
    useFrame(() => {
      TWEEN.update();
    });
  }

  return (
    <div className="w-screen h-screen">
      <Canvas shadows camera={{ position: [8, 2, 12] }}>
        <OrbitControls ref={ref} target={[8, 2, 3]} />
        <Suspense fallback={<Loader />}>
          <Environment files="/images/venice_sunrise_4k.hdr" />
          <House />
          <Tween />
          <Annotations controls={ref} />
        </Suspense>
      </Canvas>
    </div>
  );
}
