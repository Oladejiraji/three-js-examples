import { PositionInterface } from "./types";

export const xPositions = {
  a: 0.203,
  b: 0.145,
  c: 0.087,
  d: 0.029,
  e: -0.029,
  f: -0.087,
  g: -0.145,
  h: -0.203,
} as const;

export const yPositions = {
  1: -0.203,
  2: -0.145,
  3: -0.087,
  4: -0.029,
  5: 0.029,
  6: 0.087,
  7: 0.145,
  8: 0.203,
} as const;

export const positions: PositionInterface = {
  a1: [xPositions.a, 0.017, yPositions[1]],
  a2: [xPositions.a, 0.017, yPositions[2]],
  a3: [xPositions.a, 0.017, yPositions[3]],
  a4: [xPositions.a, 0.017, yPositions[4]],
  a5: [xPositions.a, 0.017, yPositions[5]],
  a6: [xPositions.a, 0.017, yPositions[6]],
  a7: [xPositions.a, 0.017, yPositions[7]],
  a8: [xPositions.a, 0.017, yPositions[8]],

  b1: [xPositions.b, 0.017, yPositions[1]],
  b2: [xPositions.b, 0.017, yPositions[2]],
  b3: [xPositions.b, 0.017, yPositions[3]],
  b4: [xPositions.b, 0.017, yPositions[4]],
  b5: [xPositions.b, 0.017, yPositions[5]],
  b6: [xPositions.b, 0.017, yPositions[6]],
  b7: [xPositions.b, 0.017, yPositions[7]],
  b8: [xPositions.b, 0.017, yPositions[8]],

  c1: [xPositions.c, 0.017, yPositions[1]],
  c2: [xPositions.c, 0.017, yPositions[2]],
  c3: [xPositions.c, 0.017, yPositions[3]],
  c4: [xPositions.c, 0.017, yPositions[4]],
  c5: [xPositions.c, 0.017, yPositions[5]],
  c6: [xPositions.c, 0.017, yPositions[6]],
  c7: [xPositions.c, 0.017, yPositions[7]],
  c8: [xPositions.c, 0.017, yPositions[8]],

  d1: [xPositions.d, 0.017, yPositions[1]],
  d2: [xPositions.d, 0.017, yPositions[2]],
  d3: [xPositions.d, 0.017, yPositions[3]],
  d4: [xPositions.d, 0.017, yPositions[4]],
  d5: [xPositions.d, 0.017, yPositions[5]],
  d6: [xPositions.d, 0.017, yPositions[6]],
  d7: [xPositions.d, 0.017, yPositions[7]],
  d8: [xPositions.d, 0.017, yPositions[8]],

  e1: [xPositions.e, 0.017, yPositions[1]],
  e2: [xPositions.e, 0.017, yPositions[2]],
  e3: [xPositions.e, 0.017, yPositions[3]],
  e4: [xPositions.e, 0.017, yPositions[4]],
  e5: [xPositions.e, 0.017, yPositions[5]],
  e6: [xPositions.e, 0.017, yPositions[6]],
  e7: [xPositions.e, 0.017, yPositions[7]],
  e8: [xPositions.e, 0.017, yPositions[8]],

  f1: [xPositions.f, 0.017, yPositions[1]],
  f2: [xPositions.f, 0.017, yPositions[2]],
  f3: [xPositions.f, 0.017, yPositions[3]],
  f4: [xPositions.f, 0.017, yPositions[4]],
  f5: [xPositions.f, 0.017, yPositions[5]],
  f6: [xPositions.f, 0.017, yPositions[6]],
  f7: [xPositions.f, 0.017, yPositions[7]],
  f8: [xPositions.f, 0.017, yPositions[8]],

  g1: [xPositions.g, 0.017, yPositions[1]],
  g2: [xPositions.g, 0.017, yPositions[2]],
  g3: [xPositions.g, 0.017, yPositions[3]],
  g4: [xPositions.g, 0.017, yPositions[4]],
  g5: [xPositions.g, 0.017, yPositions[5]],
  g6: [xPositions.g, 0.017, yPositions[6]],
  g7: [xPositions.g, 0.017, yPositions[7]],
  g8: [xPositions.g, 0.017, yPositions[8]],

  h1: [xPositions.h, 0.017, yPositions[1]],
  h2: [xPositions.h, 0.017, yPositions[2]],
  h3: [xPositions.h, 0.017, yPositions[3]],
  h4: [xPositions.h, 0.017, yPositions[4]],
  h5: [xPositions.h, 0.017, yPositions[5]],
  h6: [xPositions.h, 0.017, yPositions[6]],
  h7: [xPositions.h, 0.017, yPositions[7]],
  h8: [xPositions.h, 0.017, yPositions[8]],
};

export const DURATION = 10;
