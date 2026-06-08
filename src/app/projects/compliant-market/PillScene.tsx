'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { RootState } from '@react-three/fiber'
import * as THREE from 'three'

function PillMesh({ color1, color2 }: { color1: string; color2: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef  = useRef<THREE.Mesh>(null)

  // Bake two-tone vertex colors into the geometry.
  // CapsuleGeometry is Y-aligned; y≥0 → color2 (right after 90° rotation), y<0 → color1 (left).
  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return
    const geo = mesh.geometry
    const pos = geo.attributes.position.array as Float32Array
    const count = pos.length / 3
    const buf = new Float32Array(count * 3)
    const c1 = new THREE.Color(color1)
    const c2 = new THREE.Color(color2)
    for (let i = 0; i < count; i++) {
      const c = pos[i * 3 + 1] >= 0 ? c2 : c1
      buf[i * 3] = c.r; buf[i * 3 + 1] = c.g; buf[i * 3 + 2] = c.b
    }
    geo.setAttribute('color', new THREE.BufferAttribute(buf, 3))
  }, [color1, color2])

  useFrame((state: RootState, delta: number) => {
    if (!groupRef.current) return
    // Clamp delta so a long tab-inactive period doesn't cause a huge rotation jump
    // that can stall the loop on the next frame.
    const d = Math.min(delta, 0.05)
    groupRef.current.rotation.y += d * 0.65
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.06
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.45, 1.3, 8, 32]} />
        <meshPhysicalMaterial
          vertexColors
          roughness={0.07}
          metalness={0.02}
          clearcoat={1}
          clearcoatRoughness={0.07}
        />
      </mesh>
    </group>
  )
}

export default function PillScene({
  color1 = '#e8722a',
  color2 = '#f4a46a',
}: {
  color1?: string
  color2?: string
}) {
  return (
    <Canvas
      frameloop="always"
      camera={{ position: [0, 0, 5], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        // Prevent the browser from permanently discarding the WebGL context
        // when the page is idle or GPU memory is reclaimed.
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault()
        }, false)
      }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 5]}  intensity={2}   />
      <directionalLight position={[-3, -2, 3]} intensity={0.5} color="#ffe4cc" />
      <pointLight       position={[0, -3, 2]}  intensity={0.3} color="#ffaa66" />
      <PillMesh color1={color1} color2={color2} />
    </Canvas>
  )
}
