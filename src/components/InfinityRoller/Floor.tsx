import React from "react";

const Floor = () => {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -0.5, 0]}>
      <planeGeometry args={[30, 40]} />
      <meshBasicMaterial wireframe />
    </mesh>
  );
};

export default Floor;
