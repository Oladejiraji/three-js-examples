"use client";
import CurvedPlane from "@/components/Loop/CurvedPlane";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";

const Test = () => {
  return (
    <Canvas shadows camera={{ position: [4, 3, 9], fov: 60 }}>
      <Experience />
      <OrbitControls />
    </Canvas>
  );
};

const Experience = () => {
  return (
    <CurvedPlane width={5} height={5} radius={100}>
      <meshStandardMaterial
        side={THREE.DoubleSide}
        opacity={0.9}
        transparent
        toneMapped={true}
      />
    </CurvedPlane>
  );
};

export default Test;
