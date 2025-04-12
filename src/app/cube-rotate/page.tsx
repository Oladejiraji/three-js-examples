"use client";

import { ScrollControls, useScroll, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { Mesh, Vector3 } from "three";

const CubeRotate = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen">
        <div className="flex items-center justify-center h-full">
          <div className="bg-black flex-1 h-full flex justify-center items-center">
            <h1 className="text-white rotate-[-90deg] text-center text-[12rem] origin-center font-bric bricolage-grotesque-main">
              RNDR
            </h1>
          </div>
          <div className="bg-white flex-1 h-full flex items-center justify-center">
            <h1 className="text-black rotate-[90deg] text-center text-[12rem] origin-center bricolage-grotesque-main">
              REALM
            </h1>
          </div>
        </div>
      </div>
      <Canvas
        orthographic
        camera={{
          position: [0, 0, 8],
          left: -8,
          right: 8,
          top: 8,
          bottom: -8,
          zoom: 100,
        }}
      >
        <ScrollControls pages={2} infinite>
          <Experience />
        </ScrollControls>
      </Canvas>
    </>
  );
};

export default CubeRotate;

const Experience = () => {
  const imagesArray1 = [
    "/images/cube/crop1.png",
    "/images/cube/crop2.jpg",
    "/images/cube/crop3.png",
    "/images/cube/crop4.png",
    "/images/cube/crop5.jpg",
    "/images/cube/crop6.jpg",
  ];
  const imagesArray2 = [
    "/images/cube/crop3.png",
    "/images/cube/crop1.png",
    "/images/cube/crop6.jpg",
    "/images/cube/crop5.jpg",
    "/images/cube/crop4.png",
    "/images/cube/crop2.jpg",
  ];

  return (
    <group position={[0, 0, 0]}>
      <Box
        multiplier={1}
        imageArray={imagesArray1}
        position={new Vector3(-1.5, 0, 0)}
      />
      <Box
        multiplier={-1}
        imageArray={imagesArray2}
        position={new Vector3(1.5, 0, 0)}
      />
    </group>
  );
};

interface IBox {
  position: Vector3;
  multiplier: number;
  imageArray: string[];
}

const Box = (props: IBox) => {
  const { position, multiplier, imageArray } = props;

  const textureArray = useTexture(imageArray);
  textureArray[5].flipY = false;

  const ref = useRef<Mesh>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.x = scroll.offset * Math.PI * 2 * multiplier;
  });

  return (
    <mesh position={position} ref={ref}>
      {textureArray.map((texture, i) => (
        <meshBasicMaterial map={texture} key={i} attach={`material-${i}`} />
      ))}
      <boxGeometry args={[3, 3, 3]} />
    </mesh>
  );
};
