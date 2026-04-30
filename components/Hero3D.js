import React, { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function OrbitingRings() {
  const root = useRef()
  const inner = useRef()
  const cursor = useRef({ x: 0, y: 0 })

  const points = useMemo(() => {
    const data = []
    const count = 56
    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2
      const radius = i % 2 === 0 ? 1.15 : 0.82
      data.push(Math.cos(angle) * radius, Math.sin(angle) * radius, (i % 6) * 0.06 - 0.16)
    }
    return new Float32Array(data)
  }, [])

  useEffect(() => {
    const onMove = (event) => {
      cursor.current.x = (event.clientX / window.innerWidth) * 2 - 1
      cursor.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((state, delta) => {
    if (root.current) {
      root.current.rotation.x += (cursor.current.y * 0.35 - root.current.rotation.x) * 0.06
      root.current.rotation.y += (cursor.current.x * 0.45 - root.current.rotation.y) * 0.06
      root.current.rotation.z += delta * 0.08
    }

    if (inner.current) {
      inner.current.rotation.y -= delta * 0.22
      inner.current.rotation.x += delta * 0.1
    }

    state.camera.position.x += (cursor.current.x * 0.18 - state.camera.position.x) * 0.03
    state.camera.position.y += (cursor.current.y * 0.12 - state.camera.position.y) * 0.03
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={root}>
      <mesh ref={inner}>
        <torusGeometry args={[0.74, 0.2, 20, 80]} />
        <meshStandardMaterial color="#e4c18d" metalness={0.8} roughness={0.2} emissive="#5b4524" emissiveIntensity={0.2} />
      </mesh>
      <mesh rotation={[0.7, 0.2, 0]}>
        <torusGeometry args={[1.02, 0.08, 12, 120]} />
        <meshStandardMaterial color="#f4efe6" metalness={0.35} roughness={0.38} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={points} count={points.length / 3} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#d6b07a" sizeAttenuation />
      </points>
      <mesh position={[0.25, -0.15, 0.55]} rotation={[0.9, 0.2, 0.4]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#8fa38f" metalness={0.55} roughness={0.3} />
      </mesh>
      <mesh position={[-0.55, 0.35, -0.3]} rotation={[0.4, 0.8, 0.2]}>
        <icosahedronGeometry args={[0.22, 1]} />
        <meshStandardMaterial color="#cdbb9d" metalness={0.45} roughness={0.35} />
      </mesh>
    </group>
  )
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 3.4], fov: 46 }} dpr={[1, 1.5]} style={{ width: '100%', height: '100%' }}>
      <color attach="background" args={["#101217"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} color="#f0d6a8" />
      <directionalLight position={[-3, -2, -4]} intensity={0.45} color="#8fa38f" />
      <pointLight position={[0, 0, 2.5]} intensity={0.8} color="#d6b07a" distance={12} />
      <OrbitingRings />
    </Canvas>
  )
}
