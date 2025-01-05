import React from "react";
import { motion } from "framer-motion-3d";
import { ThreeEvent } from "@react-three/fiber";
import { convertPositionNumbersToObject } from "@/utils/helpers";
import { DURATION } from "@/utils/constants";

interface IProps {
  nodes: any;
  materials: any;
  handleClick: (e: ThreeEvent<MouseEvent>) => void;
  position: [x: number, y: number, z: number];
  color: "w" | "b";
}

const Knight = (props: IProps) => {
  const { nodes, materials, handleClick, position, color } = props;
  return (
    <motion.mesh
      geometry={
        color === "w"
          ? nodes.piece_knight_white_01.geometry
          : nodes.piece_knight_black_01.geometry
      }
      material={
        color === "w"
          ? materials.chess_set_pieces_white
          : materials.chess_set_pieces_black
      }
      position={position}
      onClick={handleClick}
      initial={false}
      animate={convertPositionNumbersToObject(position)}
      transition={{ duration: DURATION }}
      name={color === "w" ? "w-knight_1" : "b-knight_1"}
    />
  );
};

export default Knight;
