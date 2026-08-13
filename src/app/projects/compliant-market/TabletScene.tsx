'use client'

import { useEffect, useRef } from 'react'
import { RoundedBox } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import type { RootState } from '@react-three/fiber'
import * as THREE from 'three'

type TabletShape = 'round' | 'bar' | 'oval'

function Tablet({ shape, color, scoreColor }: { shape: TabletShape; color: string; scoreColor: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPreference = () => { reducedMotionRef.current = query.matches }
    syncPreference()
    query.addEventListener('change', syncPreference)
    return () => query.removeEventListener('change', syncPreference)
  }, [])

  useFrame((state: RootState, delta: number) => {
    if (!groupRef.current) return
    if (reducedMotionRef.current) {
      groupRef.current.rotation.y = -0.35
      groupRef.current.position.y = 0
      return
    }
    groupRef.current.rotation.y += Math.min(delta, 0.05) * 0.58
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.85) * 0.05
  })

  const material = <meshPhysicalMaterial color={color} roughness={0.22} clearcoat={0.55} clearcoatRoughness={0.2} />

  return (
    <group ref={groupRef} rotation={[-0.2, -0.35, -0.14]}>
      {shape === 'round' && (
        <>
          <mesh rotation={[Math.PI / 2, 0, 0]} scale={[1.15, 1.15, 0.42]}>
            <cylinderGeometry args={[0.82, 0.82, 0.5, 64, 2]} />
            {material}
          </mesh>
          <mesh position={[0, 0, 0.425]}>
            <boxGeometry args={[0.055, 1.18, 0.025]} />
            <meshStandardMaterial color={scoreColor} roughness={0.7} />
          </mesh>
        </>
      )}

      {shape === 'bar' && (
        <>
          <RoundedBox args={[2.9, 0.82, 0.42]} radius={0.2} smoothness={6}>
            {material}
          </RoundedBox>
          {[-0.72, 0, 0.72].map((x) => (
            <mesh key={x} position={[x, 0, 0.218]}>
              <boxGeometry args={[0.045, 0.62, 0.018]} />
              <meshStandardMaterial color={scoreColor} roughness={0.72} />
            </mesh>
          ))}
        </>
      )}

      {shape === 'oval' && (
        <>
          <mesh scale={[1.5, 0.78, 0.42]}>
            <sphereGeometry args={[0.82, 64, 32]} />
            {material}
          </mesh>
          <mesh position={[0, 0, 0.355]}>
            <boxGeometry args={[0.045, 0.84, 0.018]} />
            <meshStandardMaterial color={scoreColor} roughness={0.72} />
          </mesh>
        </>
      )}
    </group>
  )
}

export default function TabletScene({
  shape,
  color,
  scoreColor = '#9fa3a5',
}: {
  shape: TabletShape
  color: string
  scoreColor?: string
}) {
  return (
    <Canvas
      aria-label={`Rotating ${shape} tablet product rendering`}
      frameloop="always"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.2], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 5, 5]} intensity={2.3} />
      <directionalLight position={[-4, -2, 3]} intensity={0.65} color="#ffe7ec" />
      <pointLight position={[0, -3, 3]} intensity={0.35} color="#ffffff" />
      <Tablet shape={shape} color={color} scoreColor={scoreColor} />
    </Canvas>
  )
}
