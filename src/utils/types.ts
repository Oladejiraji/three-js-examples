export interface PositionsType {
  rook_1?: [x: number, y: number, z: number];
  rook_2?: [x: number, y: number, z: number];
  knight_1?: [x: number, y: number, z: number];
  knight_2?: [x: number, y: number, z: number];
  bishop_1?: [x: number, y: number, z: number];
  bishop_2?: [x: number, y: number, z: number];
  king?: [x: number, y: number, z: number];
  queen?: [x: number, y: number, z: number];
  pawn_1?: [x: number, y: number, z: number];
  pawn_2?: [x: number, y: number, z: number];
  pawn_3?: [x: number, y: number, z: number];
  pawn_4?: [x: number, y: number, z: number];
  pawn_5?: [x: number, y: number, z: number];
  pawn_6?: [x: number, y: number, z: number];
  pawn_7?: [x: number, y: number, z: number];
  pawn_8?: [x: number, y: number, z: number];
}

export interface PositionInterface {
  [key: string]: [x: number, y: number, z: number];
}
