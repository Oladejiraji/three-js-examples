/* eslint-disable jsx-a11y/alt-text */
"use client";
import CurvedPlane from "@/components/Loop/CurvedPlane";
import {
  Environment,
  Image,
  OrbitControls,
  Scroll,
  ScrollControls,
  useScroll,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Fragment, useEffect, useRef } from "react";
import { AxesHelper, DoubleSide, Group, Mesh } from "three";

const Grid = () => {
  return (
    <div className="w-screen h-screen">
      <Canvas
        camera={{
          position: [0, 0, 200],
        }}
      >
        <OrbitControls />
        {/* <ScrollControls damping={0.05} pages={2} infinite>
          <Scroll> */}
        <Page />
        {/* </Scroll>
        </ScrollControls> */}
        <ambientLight />
        <Environment files="/images/venice_sunrise_4k.hdr" />
      </Canvas>
    </div>
  );
};

const Page = () => {
  const { viewport } = useThree();
  const IMAGE_HEIGHT = viewport.height / 6;
  const width1 = viewport.width / 8;
  const width2 = viewport.width / 9;
  const width3 = viewport.width / 10;
  const width4 = viewport.width / 12;
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

  const gridData = [
    { rows: row1Data },
    { rows: row1Data },
    { rows: row1Data },
    { rows: row1Data },

    { rows: row1Data },
    { rows: row1Data },
    { rows: row1Data },
    { rows: row1Data },

    { rows: row1Data },
    { rows: row1Data },
    { rows: row1Data },
    { rows: row1Data },

    { rows: row1Data },
    { rows: row1Data },
    { rows: row1Data },
    { rows: row1Data },
  ];

  const groupRef = useRef<Group>(null);
  const scroll = useScroll();
  useEffect(() => {
    if (!groupRef.current) return;
    console.log(groupRef.current);
  }, []);

  useFrame(() => {
    if (!groupRef?.current) return;
  });
  return (
    <group>
      <CurvedPlane width={5} height={5} radius={100}>
        <meshStandardMaterial
          side={DoubleSide}
          opacity={0.9}
          transparent
          toneMapped={true}
        />
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
                  />
                );
              })}
            </group>
          );
        })}
      </CurvedPlane>
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
}

const ImageItem = ({ item, TOP_LEFT, index, rowIndex }: IImageItemProps) => {
  const ref = useRef<Mesh>(null);
  const { viewport } = useThree();
  const IMAGE_HEIGHT = viewport.height / 6;
  const initial_height = TOP_LEFT[1] - index * 2 * IMAGE_HEIGHT;
  useFrame(() => {
    if (!ref.current) return;
  });
  return (
    <mesh ref={ref} position={[item.positionX, initial_height, 0]}>
      <Image url={`/images/grid/grid${(index % 3) + 1}${rowIndex + 1}.jpg`}>
        <planeGeometry args={[item.width, IMAGE_HEIGHT]} />
      </Image>
    </mesh>
  );
};

export default Grid;
