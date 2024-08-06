import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { Color, MathUtils, Mesh } from "three";

const Box = (props: any) => {
  const ref = useRef<Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [rotate, setRotate] = useState(false);
  const color = new Color();

  useFrame((_, delta) => {
    if (rotate) {
      ref.current.rotation.x += 1 * delta;
    }
    ref.current.scale.y = ref.current.scale.z = MathUtils.lerp(
      ref.current.scale.y,
      hovered ? 1.2 : 1,
      0.1
    );
    ref.current.material.color.lerp(
      color.set(hovered ? 0xff0000 : 0x00ff00),
      0.1
    );
  });

  return (
    <mesh
      {...props}
      ref={ref}
      onPointerDown={(e) => {
        e.stopPropagation();
        setRotate(!rotate);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      <boxGeometry />
      <meshBasicMaterial wireframe />
      {props.children}
    </mesh>
  );
};

export default Box;
