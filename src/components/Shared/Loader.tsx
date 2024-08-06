import React from "react";
import { useProgress, Html } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
};

export default Loader;
