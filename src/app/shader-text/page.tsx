// "use client";

// import { OrbitControls, Stats } from "@react-three/drei";
// import { Canvas, useFrame } from "@react-three/fiber";
// import React, { useMemo, useRef } from "react";
// import * as THREE from "three";
// import vertexShader from "!!raw-loader!../../shaders/shader-text/vertex.glsl";
// import fragmentShader from "!!raw-loader!../../shaders/shader-text/fragment.glsl";

// const fontScaleFactor = 0.5;

// const ShaderText = () => {
//   return (
//     <Canvas
//       camera={{ position: [2.0, 2.0, 2.0] }}
//       style={{ backgroundColor: "#000" }}
//     >
//       <ambientLight intensity={0.5} />
//       <CustomGeometryParticles count={4000} />
//       <OrbitControls />
//     </Canvas>
//   );
// };

// export default ShaderText;

// const CustomGeometryParticles = (props: { count: number }) => {
//   const { count } = props;
//   const radius = 2;

//   // This reference gives us direct access to our points
//   const points = useRef<THREE.Points>(null);

//   // Generate our positions attributes array
//   const particlesPosition = useMemo(() => {
//     const positions = new Float32Array(count * 3);

//     for (let i = 0; i < count; i++) {
//       const distance = Math.sqrt(Math.random()) * radius;
//       const theta = THREE.MathUtils.randFloatSpread(360);
//       const phi = THREE.MathUtils.randFloatSpread(360);

//       let x = distance * Math.sin(theta) * Math.cos(phi);
//       let y = distance * Math.sin(theta) * Math.sin(phi);
//       let z = distance * Math.cos(theta);

//       positions.set([x, y, z], i * 3);
//     }

//     return positions;
//   }, [count]);

//   const uniforms = useMemo(
//     () => ({
//       uTime: {
//         value: 0.0,
//       },
//       uRadius: {
//         value: radius,
//       },
//     }),
//     []
//   );

//   useFrame((state) => {
//     const { clock } = state;

//     points.current.material.uniforms.uTime.value = clock.elapsedTime;
//   });

//   return (
//     <points ref={points}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={particlesPosition.length / 3}
//           array={particlesPosition}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <shaderMaterial
//         depthWrite={false}
//         fragmentShader={fragmentShader}
//         vertexShader={vertexShader}
//         uniforms={uniforms}
//       />
//     </points>
//   );
// };

import React from "react";

const Page = () => {
  return <div>Page</div>;
};

export default Page;
