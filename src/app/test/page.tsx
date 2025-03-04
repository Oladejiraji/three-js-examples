"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";

const Test = () => {
  return (
    <div className="relative">
      <div className="">
        <div className="grid grid-cols-4 gap-3">
          {new Array(100).fill(0).map((_, i) => (
            <div key={i} className="relative h-[10rem]">
              <Image src="/images/grid/grid11.jpg" alt="Grid images" fill />
            </div>
          ))}
        </div>
      </div>

      <Canvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          // zIndex: 10000,
          width: "100vw",
          height: "100vh",
        }}
        camera={{
          position: [0, 0, 30],
        }}
      >
        <OrbitControls />
        <Experience />
      </Canvas>
    </div>
  );
};

const Experience = () => {
  return (
    <mesh>
      <meshBasicMaterial color="#000000" />
      <planeGeometry args={[10, 10]} />
    </mesh>
  );
};

export default Test;
