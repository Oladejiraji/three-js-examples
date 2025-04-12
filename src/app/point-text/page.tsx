"use client";

import { OrbitControls, Stats } from "@react-three/drei";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CanvasTexture, LinearFilter, LinearMipMapLinearFilter } from "three";
import { easing } from "maath";

interface TextureCoordinates {
  x: number;
  y: number;
}

interface IStringBox {
  wTexture: number;
  wScene: number;
  hTexture: number;
  hScene: number;
}

const fontScaleFactor = 0.5;

const PointText = () => {
  const [textureCoordinates, setTextureCoordinates] = useState<
    TextureCoordinates[]
  >([]);
  const [stringBox, setStringBox] = useState({
    wTexture: 0,
    wScene: 0,
    hTexture: 0,
    hScene: 0,
  });
  // Settings
  const fontName = "Verdana";
  const textureFontSize = 30;

  // String to show
  const string = "Three Js";

  const textCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!textCanvasRef) return;
    const textCanvasUse = document.getElementById(
      "design_page_canvas"
    ) as HTMLCanvasElement;
    const textCtxUse = textCanvasUse?.getContext("2d");

    if (!textCtxUse) return;
    sampleCoordinates(textCanvasUse, textCtxUse);
  }, []);

  const sampleCoordinates = (
    textCanvas: HTMLCanvasElement,
    textCtx: CanvasRenderingContext2D
  ) => {
    // Parse text
    const lines = string.split(`\n`);
    const linesMaxLength = [...lines].sort((a, b) => b.length - a.length)[0]
      .length;
    const wTexture = textureFontSize * 0.7 * linesMaxLength;
    const hTexture = lines.length * textureFontSize;

    // Draw text
    const linesNumber = lines.length;
    textCanvas.width = wTexture;
    textCanvas.height = hTexture;
    textCtx.font = "100 " + textureFontSize + "px " + fontName;
    textCtx.fillStyle = "#2a9d8f";
    textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
    for (let i = 0; i < linesNumber; i++) {
      textCtx.fillText(lines[i], 0, ((i + 0.8) * hTexture) / linesNumber);
    }

    // Sample coordinates
    if (wTexture > 0) {
      const imageData = textCtx.getImageData(
        0,
        0,
        textCanvas.width,
        textCanvas.height
      );
      for (let i = 0; i < textCanvas.height; i++) {
        for (let j = 0; j < textCanvas.width; j++) {
          if (imageData.data[(j + i * textCanvas.width) * 4] > 0) {
            setTextureCoordinates((prev) => [
              ...prev,
              {
                x: j,
                y: i,
              },
            ]);
          }
        }
      }
    }
  };

  return (
    <>
      <div className="hidden">
        <canvas
          id="design_page_canvas"
          ref={textCanvasRef}
          className="border border-gray-200"
        ></canvas>
      </div>
      <Canvas
        camera={{ position: [0, 0, 130] }}
        style={{ backgroundColor: "#000" }}
      >
        <Stats />
        <OrbitControls />
        <ambientLight intensity={10} />
        <Experience
          textureCoordinates={textureCoordinates}
          stringBox={stringBox}
          setStringBox={setStringBox}
        />
      </Canvas>
    </>
  );
};

export default PointText;

interface IProps {
  textureCoordinates: TextureCoordinates[];
  stringBox: IStringBox;
  setStringBox: Dispatch<SetStateAction<IStringBox>>;
}

const Experience = ({
  textureCoordinates,
  stringBox,
  setStringBox,
}: IProps) => {
  const { scene } = useThree();
  const textCanvas = document.getElementById(
    "design_page_canvas"
  ) as HTMLCanvasElement | null;
  const textCtx = textCanvas?.getContext("2d");
  const texture = new CanvasTexture(textCtx?.canvas as HTMLCanvasElement);
  texture.minFilter = LinearMipMapLinearFilter;
  texture.magFilter = LinearFilter;
  useFrame(() => {
    texture.needsUpdate = true;
  });
  useEffect(() => {
    refreshText();
  }, []);

  function refreshText() {
    textureCoordinates = textureCoordinates.map((c) => {
      return { x: c.x * fontScaleFactor, y: c.y * fontScaleFactor };
    });
    const maxX = textureCoordinates.map((v) => v.x).sort((a, b) => b - a)[0];
    const maxY = textureCoordinates.map((v) => v.y).sort((a, b) => b - a)[0];
    stringBox.wScene = maxX;
    stringBox.hScene = maxY;
  }

  const points = useRef<THREE.Points>(null);
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(textureCoordinates.length * 3);

    for (let i = 0; i < textureCoordinates.length; i++) {
      //   let x = textureCoordinates[i].x;
      //   let y = stringBox.hScene - textureCoordinates[i].y;
      //   let z = 2 * Math.random();

      let x = Math.random() * (35 - 25) + 25;
      let y = Math.random() * (8 - 0) + 0;
      let z = 4 * Math.random();

      positions.set([x, y, z], i * 3);
    }

    return positions;
  }, [textureCoordinates.length]);

  useFrame((_, delta) => {
    const particlePositions =
      points.current?.geometry.attributes.position.array;

    if (!particlePositions || particlePositions?.length === 0) return;

    for (let i = 0; i < textureCoordinates.length; i++) {
      const i3 = i * 3;

      const currentPosition = new THREE.Vector3(
        particlePositions[i3],
        particlePositions[i3 + 1],
        particlePositions[i3 + 2]
      );

      const targetPosition = new THREE.Vector3(
        textureCoordinates[i].x,
        stringBox.hScene - textureCoordinates[i].y,
        2 * Math.random()
      );

      easing.damp3(currentPosition, targetPosition, 0.05, delta * 0.2);

      particlePositions[i3] = currentPosition.x;
      particlePositions[i3 + 1] = currentPosition.y;
      particlePositions[i3 + 2] = currentPosition.z;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group position={[-50, 0, 0]}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#ffffff"
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
};
