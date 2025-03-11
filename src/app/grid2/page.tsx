"use client";
import { Scroll, ScrollControls, useScroll } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import { Group, Vector3 } from "three";

const GROUP_HEIGHT = 5;
interface IGroup {
  color: string;
  position: Vector3;
  offset?: number;
}
function Category(props: IGroup) {
  const { color, position, offset = 0 } = props;
  const { height } = useThree((state) => state.viewport);
  const ref = useRef<Group<any>>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (ref.current) {
      ref.current.position.y = height * offset;
      //   ref.current.position.y = height * scroll.offset + height * offset;
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <planeGeometry args={[1, height]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

function Experience() {
  const { height } = useThree((state) => state.viewport);

  return (
    <group>
      <Category position={new Vector3(0, 0, 0)} color="red" offset={0} />
      <Category position={new Vector3(0, height, 0)} color="blue" offset={1} />
      {/* <Category position={new Vector3(0, 0, 0)} color="blue" /> */}
      {/* <Category position={new Vector3(0, -height, 0)} color="red" offset={-1} /> */}
      {/* <Category
        position={new Vector3(0, -height * 2, 0)}
        color="blue"
        offset={-2}
      />
      <Category
        position={new Vector3(0, -height * 3, 0)}
        color="red"
        offset={-3}
      /> */}

      {/* <Category
        position={new Vector3(0, -GROUP_HEIGHT * 2, 0)}
        color="blue"
        offset={-2}
      /> */}
      {/* <Category
        position={new Vector3(0, -GROUP_HEIGHT * 3, 0)}
        color="red"
        offset={-GROUP_HEIGHT * 3}
      /> */}
    </group>
  );
}

const Page2 = () => {
  return (
    <Canvas>
      <ScrollControls pages={3} infinite>
        <Experience />
        <Scroll></Scroll>
      </ScrollControls>
    </Canvas>
  );
};

export default Page2;
