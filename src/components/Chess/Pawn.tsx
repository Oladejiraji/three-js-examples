import React, { useEffect, useState } from "react";
import { motion } from "framer-motion-3d";
import { ThreeEvent } from "@react-three/fiber";
import { convertPositionNumbersToObject } from "@/utils/helpers";
import { DURATION } from "@/utils/constants";

interface IProps {
  nodes: any;
  materials: any;
  handleClick: (e: ThreeEvent<MouseEvent>) => void;
  position: [x: number, y: number, z: number];
  color: string;
}

const Pawn = (props: IProps) => {
  const { nodes, materials, handleClick, position, color } = props;
  const [sc, setSc] = useState(1);
  const [pc, setPc] = useState(convertPositionNumbersToObject(position));
  useEffect(() => {
    // setPc(convertPositionNumbersToObject([0.145, 0.017, 0.145]));
    // setPc(convertPositionNumbersToObject(position));
  }, [position]);
  return (
    <motion.mesh
      geometry={
        color === "w"
          ? nodes.piece_pawn_white_01.geometry
          : nodes.piece_pawn_black_01.geometry
      }
      material={
        color === "w"
          ? materials.chess_set_pieces_white
          : materials.chess_set_pieces_black
      }
      initial={false}
      scale={1}
      // onTap={() => setPc(convertPositionNumbersToObject([0.145, 0.017, 0.145]))}
      transition={{ duration: 100 }}
      animate={{ ...pc, scale: sc }}
      // animate={{ ...convertPositionNumbersToObject(position) }}
      onClick={handleClick}
      name={color === "w" ? "w-pawn_1" : "b-pawn_1"}
    />
  );
};

export default Pawn;
