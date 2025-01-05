import React from "react";
import { useGLTF } from "@react-three/drei";
import * as Constants from "./Constants";
import Ball from "./Ball";
import Player from "./Player";
import useOctree from "./useOctree";

export function Game(props: any) {
  const { nodes, materials, scene } = useGLTF(
    "/models/scene-transformed.glb"
  ) as any;
  const octree = useOctree(scene);
  return (
    <>
      <group {...props} dispose={null}>
        <mesh
          geometry={nodes.Suzanne007.geometry}
          material={nodes.Suzanne007.material}
          position={[1.742, 1.044, 24.966]}
        />
      </group>
      {Constants.balls.map((ball, i) => (
        <Ball radius={Constants.radius} key={i} />
      ))}
      <Player octree={octree} />
    </>
  );
}

useGLTF.preload("/models/scene-transformed.glb");
