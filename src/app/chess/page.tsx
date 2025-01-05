"use client";

import { Chess } from "@/components/Chess";
import { Environment, OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";

export default function ChessPage() {
  const musicRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    // if (musicRef) musicRef.current?.play();
  }, [musicRef]);
  return (
    <div className="w-screen h-screen">
      <audio id="background-music" loop autoPlay ref={musicRef}>
        <source src="../../audio/hill.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <Canvas
        camera={{ position: [0, 0.5, 0.5] }}
        onCreated={({ camera }) => camera.lookAt(0, 1, 0)}
      >
        <ambientLight />
        <Environment files="/images/venice_sunrise_4k.hdr" />
        <Chess />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
