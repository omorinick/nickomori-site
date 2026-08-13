'use client'

import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { RootState } from '@react-three/fiber'
import * as THREE from 'three'

function InjectionPen() {
  const groupRef = useRef<THREE.Group>(null)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPreference = () => {
      reducedMotionRef.current = query.matches
    }
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
    const step = Math.min(delta, 0.05)
    groupRef.current.rotation.y += step * 0.48
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.045
  })

  return (
    <group ref={groupRef} rotation={[-0.12, -0.35, -0.12]} scale={1.12}>
      {/* Main pearl-finish barrel */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.27, 0.27, 2.25, 48]} />
        <meshPhysicalMaterial color="#f4f5f2" roughness={0.16} clearcoat={0.8} clearcoatRoughness={0.12} />
      </mesh>

      {/* Branded green injection cap */}
      <mesh position={[1.34, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.28, 0.58, 48]} />
        <meshPhysicalMaterial color="#0c9f52" roughness={0.12} clearcoat={1} />
      </mesh>
      <mesh position={[1.64, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.24, 0.3, 0.08, 48]} />
        <meshPhysicalMaterial color="#087d40" roughness={0.2} clearcoat={0.7} />
      </mesh>

      {/* Rear dose dial and button */}
      <mesh position={[-1.26, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.29, 0.29, 0.28, 48]} />
        <meshPhysicalMaterial color="#2d3330" roughness={0.24} metalness={0.1} />
      </mesh>
      <mesh position={[-1.45, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.24, 0.14, 48]} />
        <meshPhysicalMaterial color="#0c9f52" roughness={0.16} clearcoat={1} />
      </mesh>

      {/* Dose window set into the front face */}
      <mesh position={[-0.35, 0, 0.269]}>
        <boxGeometry args={[0.62, 0.16, 0.045]} />
        <meshPhysicalMaterial color="#202522" roughness={0.16} metalness={0.12} />
      </mesh>
      <mesh position={[-0.35, 0, 0.296]}>
        <boxGeometry args={[0.34, 0.055, 0.012]} />
        <meshBasicMaterial color="#dff7e5" />
      </mesh>

      {/* Transparent cartridge collar */}
      <mesh position={[0.79, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.279, 0.279, 0.26, 48]} />
        <meshPhysicalMaterial
          color="#cde9dc"
          transparent
          opacity={0.55}
          roughness={0.05}
          transmission={0.35}
          thickness={0.12}
        />
      </mesh>

      {/* Fine metal rings make the model read as manufactured, not illustrative. */}
      {[-1.08, 0.64, 0.94, 1.06].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.272, 0.018, 10, 48]} />
          <meshStandardMaterial color="#6f7773" roughness={0.25} metalness={0.65} />
        </mesh>
      ))}
    </group>
  )
}

export default function InjectorScene() {
  return (
    <Canvas
      aria-label="Rotating prefilled injection pen product rendering"
      frameloop="always"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.4], fov: 33 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.95} />
      <directionalLight position={[4, 5, 5]} intensity={2.4} />
      <directionalLight position={[-4, -2, 3]} intensity={0.8} color="#d8ffe6" />
      <pointLight position={[0, -3, 3]} intensity={0.45} color="#9ee8bd" />
      <InjectionPen />
    </Canvas>
  )
}
