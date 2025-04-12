"use client";

import {
  OrbitControls,
  Point,
  PointMaterial,
  Points,
  Stats,
} from "@react-three/drei";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  CanvasTexture,
  LinearFilter,
  LinearMipMapLinearFilter,
  MathUtils,
} from "three";
import { useControls } from "leva";
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

const TextSampler = () => {
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
    // const textCanvas = textCanvasRef.current;
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

  const { x, y, z } = useControls({ x: 0, y: 0, z: 50 });

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
        camera={{ position: [0, 0, 50] }}
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

export default TextSampler;

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

  const [ready, setReady] = useState(false);
  const [particleState, setParticleState] = useState<THREE.Points | null>(null);

  function refreshText() {
    textureCoordinates = textureCoordinates.map((c) => {
      return { x: c.x * fontScaleFactor, y: c.y * fontScaleFactor };
    });
    const maxX = textureCoordinates.map((v) => v.x).sort((a, b) => b - a)[0];
    const maxY = textureCoordinates.map((v) => v.y).sort((a, b) => b - a)[0];
    stringBox.wScene = maxX;
    stringBox.hScene = maxY;

    createParticles();
  }

  function createParticles() {
    const geometry = new THREE.SphereGeometry(1, 36, 36);
    const material = new THREE.PointsMaterial({
      color: "#ffffff",
      size: 0.4,
      sizeAttenuation: true,
    });

    const vertices = [];
    for (let i = 0; i < textureCoordinates.length; i++) {
      // vertices.push(
      //   Math.random() * (35 - 25) + 25,
      //   Math.random() * (8 - 0) + 0,
      //   4 * Math.random()
      // );
      vertices.push(
        textureCoordinates[i].x,
        stringBox.hScene - textureCoordinates[i].y,
        2 * Math.random()
      );
    }
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    const particles = new THREE.Points(geometry, material);
    setParticleState(particles);
    scene.add(particles);

    particles.position.x = -0.5 * stringBox.wScene;
    particles.position.y = -0.5 * stringBox.hScene;
  }

  useFrame((_, delta) => {
    if (!ready) return;
    if (!particleState) return;

    for (let i = 0; i < textureCoordinates.length; i++) {
      const i3 = i * 3;
      const positions = particleState.geometry.attributes.position.array;
      // easing.damp3(positions[i3], 2, 0.3, delta)
      // positions[i3] += 3;
      // positions[i3 + 1] += 3;
      // positions[i3 + 2] += 3;

      // vertices.push(
      //   textureCoordinates[i].x,
      //   stringBox.hScene - textureCoordinates[i].y,
      //   2 * Math.random()
      // );
    }
    particleState.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <>
      <mesh></mesh>
    </>
  );
};
