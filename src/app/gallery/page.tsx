"use client";

import * as THREE from "three";
import { GalleryCanvas, GalleryUpload } from "@/components/Gallery";
import { useState } from "react";

const positionArray = [
  new THREE.Vector3(-0.8, 0, -0.6),
  new THREE.Vector3(0.8, 0, -0.6),
  new THREE.Vector3(-1.75, 0, 0.25),
  new THREE.Vector3(1.75, 0, 0.25),
  new THREE.Vector3(-2.15, 0, 1.5),
  new THREE.Vector3(2.15, 0, 1.5),
  new THREE.Vector3(-2.15, 0, 1.5),
  new THREE.Vector3(2, 0, 2.75),
];

interface ImageProps {
  url: string;
  position: THREE.Vector3;
  rotation: any;
}

const Home = () => {
  const [files, setFiles] = useState<ImageProps[]>([
    // {
    //   position: new THREE.Vector3(-0.8, 0, -0.6),
    //   rotation: [0, 0, 0],
    //   url: "https://firebasestorage.googleapis.com/v0/b/deji-firegram.appspot.com/o/d3486ae9-136e-5856-bc42-212385ea7970?alt=media&token=72fc14e3-b411-4a81-940f-53a252f51758",
    // },
  ]);
  const changeFiles = (urls: string[]) => {
    const createUrlObject = [...urls].map((url, i) => ({
      position: positionArray[i],
      rotation: [0, 0, 0],
      url,
    }));
    setFiles((prev) => [...prev, ...createUrlObject]);
  };
  return (
    <div className="h-screen">
      {files.length === 0 ? (
        <GalleryUpload changeFiles={changeFiles} />
      ) : (
        <GalleryCanvas images={files} />
      )}
    </div>
  );
};

export default Home;
