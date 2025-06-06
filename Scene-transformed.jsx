/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 ./public/models/scene-transformed.glb 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/scene-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Suzanne007.geometry} material={nodes.Suzanne007.material} position={[1.742, 1.044, 24.966]} />
    </group>
  )
}

useGLTF.preload('/scene-transformed.glb')
