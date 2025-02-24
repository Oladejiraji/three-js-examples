"use client";
import {
  Environment,
  OrbitControls,
  Scroll,
  ScrollControls,
  useScroll,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { Mesh } from "three";

const BallSpin = () => {
  return (
    <div className="w-screen h-screen">
      <Canvas>
        <ScrollControls damping={0.25} pages={3}>
          <Experience />
        </ScrollControls>
        <ambientLight />
        <Environment files="/images/venice_sunrise_4k.hdr" />
      </Canvas>
    </div>
  );
};

const Experience = () => {
  const scroll = useScroll();
  const ref = useRef<Mesh>(null);
  useFrame(() => {
    if (!ref?.current) return;
    console.log(scroll.offset);
    ref.current.rotation.y = scroll.offset * 2 * Math.PI;
  });
  return (
    <>
      {/* <group>
        {new Array(20).fill(0).map((_, i) => (
          <mesh ref={ref} key={i}>
            <sphereGeometry />
            <meshPhongMaterial wireframe />
          </mesh>
        ))}
      </group> */}
      <mesh ref={ref}>
        <sphereGeometry />
        <meshPhongMaterial wireframe />
      </mesh>
    </>
  );
};

export default BallSpin;
