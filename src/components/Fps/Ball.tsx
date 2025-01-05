export default function Ball({ radius }: { radius: number }) {
  return (
    <mesh castShadow>
      <sphereGeometry args={[radius, 16, 16]} />
      <meshStandardMaterial />
    </mesh>
  );
}
