"use client";
import useKeyboard from "@/hooks/useKeyboard";
import { useFrame } from "@react-three/fiber";
import React, { MutableRefObject, useMemo, useRef } from "react";
import { GridHelper, Mesh, Quaternion, Vector3 } from "three";

const Ball = ({ floor }: { floor: MutableRefObject<GridHelper> }) => {
  const ref = useRef<Mesh>(null!);
  const keyMap = useKeyboard();

  const v0 = useMemo(() => new Vector3(), []);
  const q = useMemo(() => new Quaternion(), []);
  const angularVelocity = useMemo(() => new Vector3(), []);

  useFrame((_, delta) => {
    keyMap["KeyW"] && (angularVelocity.x -= delta * 5);
    keyMap["KeyS"] && (angularVelocity.x += delta * 5);
    keyMap["KeyA"] && (angularVelocity.z += delta * 5);
    keyMap["KeyD"] && (angularVelocity.z -= delta * 5);

    q.setFromAxisAngle(angularVelocity, delta).normalize();
    ref.current.applyQuaternion(q);
    angularVelocity.lerp(v0, 0.01);

    floor.current.position.x += angularVelocity.z * delta;
    floor.current.position.z -= angularVelocity.x * delta;

    floor.current.position.x = floor.current.position.x % 10;
    floor.current.position.z = floor.current.position.z % 10;
  });

  return (
    <mesh position-y={1.0} ref={ref}>
      <sphereGeometry />
      <meshBasicMaterial wireframe />
    </mesh>
  );
};

export default Ball;
