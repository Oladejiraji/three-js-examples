/* eslint-disable jsx-a11y/alt-text */
import * as THREE from "three";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useCursor,
  MeshReflectorMaterial,
  Image,
  Text,
  Environment,
  OrbitControls,
  Loader,
  useTexture,
} from "@react-three/drei";
import { easing } from "maath";
import getUuid from "uuid-by-string";

const GOLDENRATIO = 1.61803398875;

interface ImageProps {
  url: string;
  position: THREE.Vector3;
  rotation: any;
}

interface FramesProps {
  images: ImageProps[];
  q?: THREE.Quaternion;
  p?: THREE.Vector3;
}

export const GalleryCanvas = ({ images }: { images: ImageProps[] }) => (
  <>
    <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
      <Suspense fallback={null}>
        <color attach="background" args={["#191920"]} />
        <fog attach="fog" args={["#191920", 0, 15]} />
        <group position={[0, -0.5, 0]}>
          <Frames images={images} />
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              mirror={0}
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={80}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#050505"
              metalness={0.5}
            />
          </mesh>
        </group>
        <Environment preset="city" />
      </Suspense>
    </Canvas>
    <Loader />
  </>
);

function Frames({
  images,
  q = new THREE.Quaternion(),
  p = new THREE.Vector3(0, 0, 5.5),
}: FramesProps) {
  const ref = useRef<THREE.Group>();
  const clicked = useRef<THREE.Object3D>();
  const [curr, setCurr] = useState<string | null>(null);

  useEffect(() => {
    clicked.current = ref.current?.getObjectByName(curr as string);
    p.set(0, 0, 0);
    if (clicked?.current) {
      p.set(0, 0, 0);
      q.identity();

      clicked.current.parent!.updateWorldMatrix(true, true);
      clicked.current.parent!.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25));
      clicked.current.parent!.updateMatrixWorld(true);
      clicked.current.parent!.getWorldQuaternion(q);
    } else {
      p.set(0, 0, 5.5);
      q.identity();
    }
  }, [curr]);

  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt);
    easing.dampQ(state.camera.quaternion, q, 0.4, dt);
  });

  return (
    <group
      ref={ref as any}
      onClick={(e) => {
        e.stopPropagation();
        setCurr(clicked.current === e.object ? null : e.object.name);
      }}
      onPointerMissed={() => {
        setCurr(null);
      }}
    >
      {images.map((props) => (
        <Frame key={props.url} {...props} />
      ))}
    </group>
  );
}

function Frame({ url, ...props }: ImageProps) {
  const image = useRef<any>(null);
  const frame = useRef<any>(null);
  const [hovered, setHovered] = useState(false);
  const [rnd] = useState(() => Math.random());
  const name = getUuid(url);

  useCursor(hovered);

  // useFrame((state, dt) => {
  //   if (image.current) {
  //     image.current.material.zoom =
  //       2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2;
  //     easing.damp3(
  //       image.current.scale,
  //       [0.85 * (hovered ? 0.85 : 1), 0.9 * (hovered ? 0.905 : 1), 1],
  //       0.1,
  //       dt
  //     );
  //   }

  //   if (frame.current) {
  //     easing.dampC(
  //       frame.current.material.color,
  //       hovered ? "orange" : "white",
  //       0.1,
  //       dt
  //     );
  //   }
  // });
  const texture = useTexture(url);

  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
        onPointerOut={() => setHovered(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="#151515"
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />
        <mesh
          ref={frame}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} map={texture} />
        </mesh>
        {/* <Image
          raycast={() => null}
          ref={image}
          scale={[1, 1]}
          position={[0, 0, 0.7]}
          url={url}
        /> */}
      </mesh>
    </group>
  );
}
