import {
  convertIndexesToPosition,
  convertPositionToSquare,
} from "@/utils/helpers";
import { Chess, Move, Square } from "chess.js";
import React, { Dispatch, SetStateAction } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { positions } from "@/utils/constants";
import { Color } from "three";
import { Text } from "@react-three/drei";

interface IProps {
  activeSpots: Move[];
  activeSquare: string;
  handleClickBoard: (e: ThreeEvent<MouseEvent>) => void;
}

const Board = ({ activeSpots, activeSquare, handleClickBoard }: IProps) => {
  return (
    <group position={[0, 0, 0]}>
      {Object.entries(positions).map((entry, index) => {
        const colorCheck = activeSpots.find((fnd) => fnd.to === entry[0]);
        const alternateValue =
          Math.floor(index / 8) % 2 ? index % 2 === 1 : index % 2 === 0;
        const color =
          colorCheck || entry[0] === activeSquare
            ? new Color("rgb(219, 155, 24)")
            : alternateValue
            ? "#333"
            : "white";

        return (
          <mesh position={entry[1]} onClick={handleClickBoard} key={index}>
            <boxGeometry args={[0.058, 0.005, 0.058]} />
            <meshBasicMaterial color={color} />
            {/* <Text scale={[0.03, 0.03, 0.03]}>{entry[0]}</Text> */}
          </mesh>
        );
      })}
    </group>
  );
};

export default Board;
