"use client";
import React, {
  useRef,
  Ref,
  forwardRef,
  MutableRefObject,
  ForwardedRef,
} from "react";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";

const Model = forwardRef(function Model(_, ref: ForwardedRef<Group>) {
  const { nodes, materials } = useGLTF("/models/rug.glb");
  return (
    <group
      dispose={null}
      ref={ref}
      rotation-y={Math.PI / 2}
      position={[0, -0.5, -1.2]}
      scale={[2, 2, 2]}
    >
      <mesh
        geometry={nodes["Modern_rug_Plane004-Mesh"].geometry}
        material={materials["78909C"]}
      />
      <mesh
        geometry={nodes["Modern_rug_Plane004-Mesh_1"].geometry}
        material={materials["455A64"]}
      />
    </group>
  );
});

export default Model;

useGLTF.preload("/models/rug.glb");
