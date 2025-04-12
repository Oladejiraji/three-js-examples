/* eslint-disable jsx-a11y/alt-text */
"use client";

import { applyCurve } from "@/utils/three-utils";
import * as THREE from "three";
import {
  Environment,
  Scroll,
  ScrollControls,
  shaderMaterial,
  Stats,
  useScroll,
  useTexture,
} from "@react-three/drei";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Group, Mesh } from "three";
import { motion } from "framer-motion-3d";
import { easing } from "maath";

const Grid = () => {
  const [activeImage, setActiveImage] = useState<null | string>(null);

  return (
    <div className="w-screen h-screen relative">
      {activeImage ? (
        <button
          className="absolute top-5 right-5 z-[10000]"
          onClick={() => setActiveImage(null)}
        >
          [close]
        </button>
      ) : null}
      <Canvas
        camera={{
          position: [0, 0, 8],
        }}
      >
        <Stats />
        <ScrollControls
          damping={0.05}
          pages={2}
          infinite
          enabled={!!activeImage === false}
        >
          <Scroll>
            <Page activeImage={activeImage} setActiveImage={setActiveImage} />
          </Scroll>
        </ScrollControls>
        <ambientLight />
        <Environment files="/images/venice_sunrise_4k.hdr" />
      </Canvas>
    </div>
  );
};

interface IPageProps {
  activeImage: null | string;
  setActiveImage: Dispatch<SetStateAction<null | string>>;
}

const Page = ({ activeImage, setActiveImage }: IPageProps) => {
  const { viewport } = useThree();
  const IMAGE_HEIGHT = viewport.height / 6;
  const width1 = viewport.width / 8;
  const width2 = viewport.width / 9;
  const width3 = viewport.width / 10;
  const width4 = viewport.width / 12;
  const width5 = viewport.width / 6;
  const TOP_LEFT = [
    -viewport.width / 2 + width1 / 2,
    viewport.height / 2 - IMAGE_HEIGHT / 2,
  ];

  const SMALL_GAP = 0.1;

  // Row 1 data
  const row1_minus_gap = width1 * 2 + width4 * 3;
  const row1_total_gap = viewport.width - row1_minus_gap - SMALL_GAP;
  const gap1 = 0.2 * row1_total_gap;
  const gap2 = 0.4 * row1_total_gap;
  const gap3 = 0.4 * row1_total_gap;

  const row1Data = [
    [
      {
        width: width1,
        positionX: TOP_LEFT[0],
      },
    ],
    [
      {
        width: width1,
        positionX: TOP_LEFT[0] + width1 + SMALL_GAP,
      },
    ],
    [
      {
        positionX: TOP_LEFT[0] + width1 + SMALL_GAP + width1 + gap1,
        width: width4,
      },
    ],
    [
      {
        positionX:
          TOP_LEFT[0] + width1 + SMALL_GAP + width1 + gap1 + width4 + gap2,
        width: width4,
      },
    ],
    [
      {
        positionX:
          TOP_LEFT[0] +
          width1 +
          SMALL_GAP +
          width1 +
          gap1 +
          width4 +
          gap2 +
          width4 +
          gap3,
        width: width4,
      },
    ],
  ];

  // Row 2 data
  const row2_minus_gap = width5 + width1 * 4 + width2;
  const row2_total_gap = viewport.width - row2_minus_gap - SMALL_GAP * 2;
  const row2gap1 = 0.4 * row2_total_gap;
  const row2gap2 = 0.4 * row2_total_gap;
  const row2gap3 = 0.2 * row2_total_gap;

  const row2Data = [
    [
      {
        width: width5,
        positionX: TOP_LEFT[0],
      },
    ],
    [
      {
        width: width1,
        positionX: TOP_LEFT[0] + width5 + SMALL_GAP,
      },
    ],
    [
      {
        positionX: TOP_LEFT[0] + width5 + SMALL_GAP + width1 + row2gap1,
        width: width2,
      },
    ],
    [
      {
        positionX:
          TOP_LEFT[0] +
          width5 +
          SMALL_GAP +
          width1 +
          row2gap1 +
          width2 +
          row2gap2,
        width: width1,
      },
    ],
    [
      {
        positionX:
          TOP_LEFT[0] +
          width5 +
          SMALL_GAP +
          width1 +
          row2gap1 +
          width2 +
          row2gap2 +
          width1 +
          SMALL_GAP,
        width: width1,
      },
    ],
    [
      {
        positionX:
          TOP_LEFT[0] +
          width5 +
          SMALL_GAP +
          width1 +
          row2gap1 +
          width2 +
          row2gap2 +
          width1 +
          SMALL_GAP +
          width1 +
          row2gap3,
        width: width1,
      },
    ],
  ];

  // Row 3 data
  const row3_minus_gap = width4 * 2 + width2 * 2;
  const row3_total_gap = viewport.width - row3_minus_gap;
  const row3gap1 = 0.5 * row3_total_gap;
  const row3gap2 = 0.3 * row3_total_gap;
  const row3gap3 = 0.2 * row3_total_gap;

  const row3Data = [
    [
      {
        width: width2,
        positionX: TOP_LEFT[0],
      },
    ],
    [
      {
        width: width4,
        positionX: TOP_LEFT[0] + width2 + row3gap1,
      },
    ],
    [
      {
        positionX: TOP_LEFT[0] + width2 + row3gap1 + width4 + row3gap2,
        width: width4,
      },
    ],
    [
      {
        positionX:
          TOP_LEFT[0] +
          width2 +
          row3gap1 +
          width4 +
          row3gap2 +
          width4 +
          row3gap3,
        width: width2,
      },
    ],
  ];

  const gridData = [
    { rows: row1Data },
    { rows: row2Data },
    { rows: row3Data },

    { rows: row1Data },
    { rows: row2Data },
    { rows: row3Data },
  ];

  const groupRef = useRef<Group>(null);

  return (
    <group>
      {gridData.map((row, i) => {
        return (
          <group key={i} ref={groupRef}>
            {row.rows.map((group, j) => {
              return (
                <ImageItem
                  key={`${i}${j}`}
                  item={group[0]}
                  TOP_LEFT={TOP_LEFT}
                  index={i}
                  rowIndex={j}
                  itemIndex={`${i}${j}`}
                  activeImage={activeImage}
                  setActiveImage={setActiveImage}
                />
              );
            })}
          </group>
        );
      })}
    </group>
  );
};

interface IImageItemProps {
  item: {
    width: number;
    positionX: number;
  };
  TOP_LEFT: number[];
  index: number;
  rowIndex: number;
  activeImage: null | string;
  setActiveImage: Dispatch<SetStateAction<null | string>>;
  itemIndex: string;
}

const ImageItem = ({
  item,
  TOP_LEFT,
  index,
  rowIndex,
  activeImage,
  setActiveImage,
  itemIndex,
}: IImageItemProps) => {
  const scroll = useScroll();

  const { viewport } = useThree();
  const IMAGE_HEIGHT = viewport.height / 6;
  const initial_height = TOP_LEFT[1] - index * 2 * IMAGE_HEIGHT;

  const shaderRef = useRef<any>(null);

  const [hovered, setHover] = useState(false);

  const loadedImg = `/images/grid/grid${(index % 3) + 1}${rowIndex + 1}.jpg`;
  const [texture1, texture2, dispTexture] = useTexture([
    loadedImg,
    loadedImg,
    "/images/grid/displacement.jpg",
  ]);

  useFrame((_, delta) => {
    if (!shaderRef.current) null;
    easing.damp(
      shaderRef.current,
      "uCurvature",
      scroll.delta * -25,
      0.2,
      delta
    );
    easing.damp(
      shaderRef.current,
      "uScreenWidth",
      viewport.width - scroll.delta * 200,
      0.2,
      delta
    );
  });

  const centerPosition = item.positionX + item.width / 2;
  const offScreenPosition =
    centerPosition < 0
      ? { x: -15, y: initial_height, z: 0 }
      : { x: 15, y: initial_height, z: 0 };

  const zero_y = -(scroll.offset * viewport.height);
  const zeroPosition = { x: 0, y: zero_y, z: 0.1 };
  const originalPosition = { x: item.positionX, y: initial_height, z: 0 };
  const translateValue = !!activeImage
    ? activeImage === itemIndex
      ? zeroPosition
      : offScreenPosition
    : originalPosition;

  const isActive = !!activeImage === true && activeImage === itemIndex;
  const itemScale = isActive ? { x: 5, y: 4 } : { x: 1, y: 1 };

  return (
    <motion.mesh
      position={[item.positionX, initial_height, 0]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={() => setActiveImage(itemIndex)}
      animate={{
        x: translateValue.x,
        y: translateValue.y,
        z: translateValue.z,
        scaleX: itemScale.x,
        scaleY: itemScale.y,
      }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <planeGeometry args={[item.width, IMAGE_HEIGHT]} />
      {/* <imageFadeMaterial
        ref={shaderRef}
        tex={texture1}
        tex2={texture2}
        disp={dispTexture}
        toneMapped={false}
        uCurvature={-1}
        uScreenWidth={viewport.width}
        uOffsetX={item.positionX}
      /> */}
    </motion.mesh>
  );
};

export default Grid;

// export const ImageFadeMaterial = shaderMaterial(
//   {
//     effectFactor: 0.5,
//     dispFactor: 0,
//     tex: null,
//     tex2: null,
//     disp: null,
//     uCurvature: 0,
//     uScreenWidth: 0,
//     uOffsetX: 0,
//   },
//   `uniform float uCurvature;
//   uniform float uScreenWidth;
//   uniform float uOffsetX;

//   varying vec2 vUv;

//   void main() {
//     vUv = uv;
//     vec3 curvedPosition = position;
//     float relativePosX = (position.x + uOffsetX);
//     float normalizedPosX = (relativePosX + (uScreenWidth / 2.0)) / uScreenWidth;
//     curvedPosition.z = (-sin(normalizedPosX * 3.14)) * uCurvature;

//     gl_Position = projectionMatrix * modelViewMatrix * vec4(curvedPosition, 1.0);
//   }`,
//   ` varying vec2 vUv;
//     uniform sampler2D tex;
//     uniform sampler2D tex2;
//     uniform sampler2D disp;
//     uniform float _rot;
//     uniform float dispFactor;
//     uniform float effectFactor;
//     void main() {
//       vec2 uv = vUv;
//       vec4 disp = texture2D(disp, uv);
//       vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
//       vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
//       vec4 _texture = texture2D(tex, distortedPosition);
//       vec4 _texture2 = texture2D(tex2, distortedPosition2);
//       vec4 finalTexture = mix(_texture, _texture2, dispFactor);
//       gl_FragColor = finalTexture;
//       #include <tonemapping_fragment>
//       #include <colorspace_fragment>
//     }`
// );

// extend({ ImageFadeMaterial });
