export const annotations = [
  {
    title: "Bathroom Sink",
    description: "<p>Bathroom Sink is good for washing your hands</p>",
    camPos: {
      x: 6.61,
      y: 3.89,
      z: 1.37,
    },
    lookAt: {
      x: 7.37,
      y: 3.27,
      z: 0.36,
    },
  },
  {
    title: "Bath",
    camPos: {
      x: 7.13,
      y: 4.33,
      z: 1.98,
    },
    lookAt: {
      x: 8.32,
      y: 2.71,
      z: 1.33,
    },
  },
  {
    title: "Radiator",
    description: "Keeps you warm in winter.",
    camPos: {
      x: 7.13,
      y: 1.15,
      z: 0.66,
    },
    lookAt: {
      x: 5.78,
      y: 0.89,
      z: 0.68,
    },
  },
  {
    title: "Sky Light",
    camPos: {
      x: 13.05,
      y: 4.35,
      z: 5.06,
    },
    lookAt: {
      x: 11,
      y: 2.7,
      z: 3.42,
    },
  },
];

export type AnnotationType = ReturnType<() => typeof annotations>;
