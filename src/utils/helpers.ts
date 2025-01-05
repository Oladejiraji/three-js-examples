import { Square } from "chess.js";
import { Vector3 } from "three";
import { PositionInterface } from "./types";
import { positions } from "./constants";
import { Board, PositionBoard } from "@/components/Chess/Chess";

const indexToPositionMap = {
  0: "a",
  1: "b",
  2: "c",
  3: "d",
  4: "e",
  5: "f",
  6: "g",
  7: "h",
};

export type PieceOptions = "n" | "p" | "b" | "r" | "q" | "k";
export type PieceStateOptions =
  | "pawn_1"
  | "pawn_2"
  | "pawn_3"
  | "pawn_4"
  | "pawn_5"
  | "pawn_6"
  | "rook_1"
  | "rook_2"
  | "knight_1"
  | "knight_2"
  | "bishop_1"
  | "bishop_2"
  | "king"
  | "queen";

export interface BoardPieces {
  rook_1: string;
  knight_1: string;
  bishop_1: string;
  king: string;
  queen: string;
  bishop_2: string;
  knight_2: string;
  rook_2: string;

  pawn_1: string;
  pawn_2: string;
  pawn_3: string;
  pawn_4: string;
  pawn_5: string;
  pawn_6: string;
  pawn_7: string;
  pawn_8: string;
}

export const convertIndexesToPosition = (x: number, y: number) => {
  return `${indexToPositionMap[x as keyof typeof indexToPositionMap]}${y + 1}`;
};

export const getActivePiece = (
  type: PieceOptions,
  usedPieces: PieceStateOptions[]
): PieceStateOptions => {
  if (type === "k") {
    return "king";
  }
  if (type === "q") {
    return "queen";
  }
  if (type === "r") {
    if (usedPieces.includes("rook_1")) return "rook_2";
    return "rook_1";
  }
  if (type === "n") {
    if (usedPieces.includes("knight_1")) return "knight_2";
    return "knight_1";
  }
  if (type === "b") {
    if (usedPieces.includes("bishop_1")) return "bishop_2";
    return "bishop_1";
  }
  if (type === "p") {
    const usedPawns = usedPieces.filter((piece) => piece.includes("pawn"));
    if (usedPawns.length > 7) {
      console.log("error pawn greater than 7:", type, usedPieces);
      return "pawn_1";
    }
    return `pawn_${usedPawns.length + 1}` as PieceStateOptions;
  }
  console.log("error default get active piece error:", type, usedPieces);
  return "pawn_1";
};

export const convertPositionNumbersToObject = (
  pos?: [x: number, y: number, z: number]
) => {
  return pos
    ? { x: pos[0], y: pos[1], z: pos[2] }
    : { x: 1000, y: 1000, z: 1000 };
};

export function getRandomHexColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const convertPositionToSquare = (
  vector: Vector3
): Square | undefined => {
  for (const entry in positions) {
    if (
      positions[entry][0] === vector.x &&
      positions[entry][1] === vector.y &&
      positions[entry][2] === vector.z
    )
      return entry as Square;
  }
};

function shallowEqual(obj1: any, obj2: any): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

type PositionInterfaceOrNull = PositionInterface | null | undefined;
export const equalizePositions = (
  oldPosition: PositionInterfaceOrNull,
  newPosition: PositionInterfaceOrNull
): boolean => {
  if (!oldPosition && !newPosition) return true;
  if (!oldPosition || !newPosition) return false;

  return shallowEqual(oldPosition, newPosition);
};

export const convertIndexArrayToPositionArray = (indexArray: Board) => {
  const positionArray: PositionBoard = [];
  indexArray.forEach((first, i) => {
    first.forEach((second, j) => {
      if (second) {
        const position = positions[second.square];
        positionArray.push({
          board: second,
          position,
        });
      }
    });
  });
  return positionArray;
};
