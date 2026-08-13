'use client'

import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { RootState } from '@react-three/fiber'
import * as THREE from 'three'

function Vial({
  contents,
  capColor,
  contentsColor,
  labelColor,
}: {
  contents: 'liquid' | 'powder'
  capColor: string
  contentsColor: string
  labelColor: string
}) {
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
      groupRef.current.rotation.y = -0.4
      groupRef.current.position.y = 0
      return
    }
    groupRef.current.rotation.y += Math.min(delta, 0.05) * 0.48
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.82) * 0.045
  })

  return (
    <group ref={groupRef} rotation={[-0.08, -0.4, -0.08]} scale={1.05}>
      {/* Glass bottle */}
      <mesh>
        <cylinderGeometry args={[0.68, 0.72, 1.92, 64]} />
        <meshPhysicalMaterial color="#e8f1f3" transparent opacity={0.28} transmission={0.72} thickness={0.12} roughness={0.08} />
      </mesh>

      {/* Contents sit visibly behind the glass. */}
      {contents === 'liquid' ? (
        <mesh position={[0, -0.42, 0]}>
          <cylinderGeometry args={[0.58, 0.61, 0.94, 64]} />
          <meshPhysicalMaterial color={contentsColor} transparent opacity={0.76} roughness={0.18} transmission={0.12} />
        </mesh>
      ) : (
        <mesh position={[0, -0.78, 0]} scale={[1, 0.24, 1]}>
          <sphereGeometry args={[0.55, 48, 24]} />
          <meshStandardMaterial color={contentsColor} roughness={0.96} />
        </mesh>
      )}

      {/* Paper label and a restrained identity stripe. */}
      <mesh position={[0, -0.06, 0]}>
        <cylinderGeometry args={[0.705, 0.705, 0.82, 64, 1, true]} />
        <meshStandardMaterial color={labelColor} roughness={0.8} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.71, 0.71, 0.1, 64, 1, true]} />
        <meshStandardMaterial color={capColor} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* Narrow neck, rubber stopper, and crimped flip cap. */}
      <mesh position={[0, 1.04, 0]}>
        <cylinderGeometry args={[0.42, 0.54, 0.3, 64]} />
        <meshPhysicalMaterial color="#e5eff1" transparent opacity={0.4} transmission={0.55} roughness={0.1} />
      </mesh>
      <mesh position={[0, 1.21, 0]}>
        <cylinderGeometry args={[0.39, 0.39, 0.16, 64]} />
        <meshStandardMaterial color="#454a4d" roughness={0.55} />
      </mesh>
      <mesh position={[0, 1.34, 0]}>
        <cylinderGeometry args={[0.48, 0.48, 0.18, 64]} />
        <meshPhysicalMaterial color={capColor} metalness={0.32} roughness={0.28} clearcoat={0.5} />
      </mesh>
      <mesh position={[0, 1.445, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.05, 64]} />
        <meshPhysicalMaterial color={capColor} roughness={0.2} clearcoat={0.8} />
      </mesh>
    </group>
  )
}

export default function VialScene({
  contents,
  capColor,
  contentsColor,
  labelColor,
}: {
  contents: 'liquid' | 'powder'
  capColor: string
  contentsColor: string
  labelColor: string
}) {
  return (
    <Canvas
      aria-label={`Rotating ${contents === 'liquid' ? 'multidose' : 'lyophilized peptide'} vial product rendering`}
      frameloop="always"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.2], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.95} />
      <directionalLight position={[4, 5, 5]} intensity={2.4} />
      <directionalLight position={[-4, -2, 3]} intensity={0.75} color="#deefff" />
      <pointLight position={[0, -3, 3]} intensity={0.4} color="#fff4cf" />
      <Vial contents={contents} capColor={capColor} contentsColor={contentsColor} labelColor={labelColor} />
    </Canvas>
  )
}
