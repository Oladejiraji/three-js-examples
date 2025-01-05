import { useMemo } from "react";
import { Octree } from "three/examples/jsm/math/Octree.js";

export default function useOctree(scene: any) {
  //console.log('in useOctree')
  const octree = useMemo(() => {
    console.log("new Octree");
    return new Octree().fromGraphNode(scene);
  }, [scene]);

  return octree;
}
