"use client";
import { Instructions } from "@/components";
import { Game } from "@/components/Fps/Game";
import {
  Environment,
  OrbitControls,
  PointerLockControls,
  Stats,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

const Fps = () => {
  return (
    <div className="w-screen h-screen">
      <Canvas shadows>
        <directionalLight
          intensity={1}
          castShadow={true}
          shadow-bias={-0.00015}
          shadow-radius={4}
          shadow-blur={10}
          shadow-mapSize={[2048, 2048]}
          position={[85.0, 80.0, 70.0]}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
        />
        <Environment files="/images/rustig_koppie_puresky_1k.hdr" background />
        <PointerLockControls />
        <Game />
        <Stats />
      </Canvas>
      <Instructions />
    </div>
  );
};

export default Fps;
