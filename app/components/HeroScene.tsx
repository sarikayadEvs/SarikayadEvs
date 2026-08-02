"use client";

import { Float, Line, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function CoreGrid() {
  const group = useRef<THREE.Group>(null);
  const pointer = useThree((state) => state.pointer);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.09;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * 0.08, 0.025);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -pointer.x * 0.06, 0.025);
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.08;
  });
  return (
    <group ref={group} position={[1.65, 0.05, 0]} rotation={[0.22, -0.55, 0.08]}>
      {Array.from({ length: 27 }, (_, id) => {
        const x = (id % 3) - 1, y = (Math.floor(id / 3) % 3) - 1, z = Math.floor(id / 9) - 1;
        return <mesh key={id} position={[x * 0.72, y * 0.72, z * 0.72]}><boxGeometry args={[0.52, 0.52, 0.52]} /><meshPhysicalMaterial color={id % 7 === 0 ? "#b9f44b" : id % 5 === 0 ? "#ffb454" : "#151a1d"} emissive={id % 7 === 0 ? "#88c92f" : id % 5 === 0 ? "#b66d22" : "#071113"} emissiveIntensity={id % 7 === 0 ? 1.2 : 0.25} metalness={0.76} roughness={0.18} transparent opacity={0.86} /></mesh>;
      })}
      <mesh scale={2.65}><boxGeometry args={[1, 1, 1]} /><meshBasicMaterial color="#60edff" wireframe transparent opacity={0.12} /></mesh>
    </group>
  );
}

function CodePanel({ position, rotation, accent }: { position: [number, number, number]; rotation: [number, number, number]; accent: string }) {
  return <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.22}><group position={position} rotation={rotation}>
    <RoundedBox args={[2.3, 1.25, 0.06]} radius={0.08} smoothness={3}><meshPhysicalMaterial color="#121719" metalness={0.38} roughness={0.18} transparent opacity={0.68} transmission={0.18} /></RoundedBox>
    <mesh position={[-0.88, 0.4, 0.04]}><circleGeometry args={[0.035, 16]} /><meshBasicMaterial color={accent} /></mesh>
    {[0.18, -0.02, -0.22, -0.42].map((y, index) => <mesh key={y} position={[-0.22 + index * 0.06, y, 0.04]}><boxGeometry args={[index === 1 ? 1.35 : 1.6 - index * 0.18, 0.035, 0.018]} /><meshBasicMaterial color={index === 1 ? accent : "#607077"} transparent opacity={index === 1 ? 0.85 : 0.42} /></mesh>)}
  </group></Float>;
}

function ProjectNetwork() {
  const nodes: [number, number, number][] = [[3.15, 1.7, -1], [3.85, -1.6, -1.5], [0.1, 2.55, -2.2], [-1.5, -2.1, -2.6]];
  return <group><Line points={nodes} color="#60edff" transparent opacity={0.16} lineWidth={0.55} />{nodes.map((position, index) => <Float key={index} speed={1 + index * 0.1} floatIntensity={0.28}><mesh position={position}><sphereGeometry args={[index === 0 ? 0.08 : 0.055, 12, 12]} /><meshBasicMaterial color={index === 3 ? "#ffb454" : "#60edff"} /></mesh></Float>)}</group>;
}

export default function HeroScene() {
  return <Canvas camera={{ position: [0, 0, 7.5], fov: 47 }} dpr={[1, 1.45]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }} performance={{ min: 0.55 }}>
    <ambientLight intensity={0.7} /><directionalLight position={[4, 5, 6]} intensity={2.2} color="#d7fbff" /><pointLight position={[2, -2, 3]} intensity={22} distance={8} color="#70edff" />
    <CoreGrid /><CodePanel position={[-2.35, 1.25, -0.5]} rotation={[0.05, 0.25, -0.05]} accent="#60edff" /><CodePanel position={[-1.35, -1.75, -1.5]} rotation={[-0.08, 0.48, 0.06]} accent="#b9f44b" /><ProjectNetwork />
  </Canvas>;
}
