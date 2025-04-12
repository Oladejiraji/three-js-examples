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
  color: string;
}

const Bishop = (props: IProps) => {
  const { nodes, materials, handleClick, position, color } = props;
  return (
    <motion.group
      name={color === "w" ? "w-bishop_1" : "b-bishop_1"}
      onClick={handleClick}
      initial={false}
      animate={convertPositionNumbersToObject(position)}
      transition={{ duration: DURATION }}
    >
      <mesh
        geometry={nodes.Cylinder003.geometry}
        material={
          color === "w"
            ? materials.chess_set_pieces_white
            : materials.chess_set_pieces_black
        }
      />
      <mesh
        geometry={nodes.Cylinder003_1.geometry}
        material={
          color === "w"
            ? materials.chess_set_pieces_white
            : materials.chess_set_pieces_black
        }
      />
    </motion.group>
  );
};

export default Bishop;
