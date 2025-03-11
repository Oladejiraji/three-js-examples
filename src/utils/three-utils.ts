import * as THREE from "three";

export function CurvedPlaneGeometry(
  width = 1,
  height = 1,
  x: number,
  maxWidth: number,
  delta = 0
) {
  const segments = 32;
  const segmentsH = segments;
  const segmentsV = segments / (width / height);
  const geometry = new THREE.PlaneGeometry(width, height, segmentsH, segmentsV);

  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i++) {
    const segmentX = position.getX(i);
    const totalDeviation = segmentX + x;
    const zPosition = getZPosition(totalDeviation, Math.abs(maxWidth), delta);
    position.setZ(i, zPosition);
  }

  return { geometry };
}

function getZPosition(x: number, maxX: number, amplitude = 1) {
  return amplitude * (1 - (x / maxX) ** 2);
}

export const applyCurve = (
  geometry: THREE.BufferGeometry,
  positionX: number,
  centerX: number,
  delta: number
) => {
  const curveIntensity = Math.abs(delta) * 30;

  const positionAttribute = geometry.getAttribute("position");
  const positions = positionAttribute.array as Float32Array;

  for (let i = 0; i < positionAttribute.count; i++) {
    const x = positions[i * 3];
    const worldX = x + positionX;
    const distanceFromCenter = worldX - centerX;
    const z =
      -(distanceFromCenter * distanceFromCenter) * curveIntensity * 0.01;
    positions[i * 3 + 2] = z;
  }

  positionAttribute.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
};
