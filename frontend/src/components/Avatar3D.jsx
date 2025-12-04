import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Cone, Cylinder, Torus, MeshDistortMaterial, Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

// Composant Avatar 3D avancé
const AnimatedAvatar = ({ isTyping, avatarType = 'philosophe' }) => {
  const groupRef = useRef();
  const headRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const accessory1Ref = useRef();
  const accessory2Ref = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Animation du groupe principal
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 2) * 0.1;
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.3;
    }

    // Animation de la tête
    if (headRef.current) {
      headRef.current.scale.y = 1 + Math.sin(time * 2) * 0.05;
      
      if (isTyping) {
        headRef.current.rotation.z = Math.sin(time * 5) * 0.1;
      }
    }

    // Clignement des yeux
    if (leftEyeRef.current && rightEyeRef.current) {
      const blink = Math.sin(time * 3) > 0.95 ? 0.1 : 1;
      leftEyeRef.current.scale.y = blink;
      rightEyeRef.current.scale.y = blink;
    }

    // Animation des accessoires
    if (accessory1Ref.current) {
      accessory1Ref.current.rotation.y = time * (isTyping ? 2 : 0.5);
    }
    if (accessory2Ref.current) {
      accessory2Ref.current.rotation.z = Math.sin(time * 2) * 0.3;
    }
  });

  // Configuration des avatars
  const getAvatarConfig = () => {
    const configs = {
      prophete: {
        color: '#9c27b0',
        secondaryColor: '#ce93d8',
        headShape: 'sphere',
        accessories: ['crystal', 'aura'],
        eyeGlow: true
      },
      frigo: {
        color: '#00bcd4',
        secondaryColor: '#b2ebf2',
        headShape: 'box',
        accessories: ['ice', 'snowflakes'],
        metallic: true
      },
      coach: {
        color: '#ff9800',
        secondaryColor: '#ffb74d',
        headShape: 'sphere',
        accessories: ['whistle', 'muscles'],
        intense: true
      },
      pirate: {
        color: '#795548',
        secondaryColor: '#a1887f',
        headShape: 'sphere',
        accessories: ['hat', 'eyepatch'],
        eyePatch: true
      },
      enfant: {
        color: '#ff4081',
        secondaryColor: '#ff80ab',
        headShape: 'sphere',
        accessories: ['pacifier', 'toy'],
        cute: true
      },
      allergique: {
        color: '#f44336',
        secondaryColor: '#ef5350',
        headShape: 'sphere',
        accessories: ['mask', 'pills'],
        scared: true
      },
      poete: {
        color: '#673ab7',
        secondaryColor: '#9575cd',
        headShape: 'sphere',
        accessories: ['rose', 'book'],
        dramatic: true
      },
      confus: {
        color: '#4caf50',
        secondaryColor: '#81c784',
        headShape: 'sphere',
        accessories: ['question', 'swirl'],
        dizzy: true
      },
      complot: {
        color: '#212121',
        secondaryColor: '#616161',
        headShape: 'sphere',
        accessories: ['tinfoil', 'eye'],
        paranoid: true
      },
      philosophe: {
        color: '#ff6b9d',
        secondaryColor: '#f48fb1',
        headShape: 'sphere',
        accessories: ['toga', 'scroll'],
        wise: true
      }
    };

    return configs[avatarType] || configs.philosophe;
  };

  const config = getAvatarConfig();

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Aura/Glow */}
        <Sphere args={[1.8, 32, 32]} scale={[1.6, 1.9, 1.6]}>
          <meshStandardMaterial 
            color={config.secondaryColor} 
            transparent 
            opacity={0.2}
            emissive={config.color}
            emissiveIntensity={0.3}
          />
        </Sphere>

        {/* Tête principale */}
        <group ref={headRef}>
          {config.headShape === 'box' ? (
            <Box args={[1.4, 1.8, 1.4]}>
              <MeshDistortMaterial
                color={config.color}
                distort={0.2}
                speed={isTyping ? 3 : 1}
                roughness={config.metallic ? 0.1 : 0.4}
                metalness={config.metallic ? 0.9 : 0.5}
              />
            </Box>
          ) : (
            <Sphere args={[1, 64, 64]} scale={[1.4, 1.7, 1.4]}>
              <MeshDistortMaterial
                color={config.color}
                distort={config.intense ? 0.5 : 0.3}
                speed={isTyping ? 3 : 1}
                roughness={0.3}
                metalness={0.7}
              />
            </Sphere>
          )}
        </group>

        {/* Yeux */}
        {!config.eyePatch ? (
          <>
            {/* Œil gauche */}
            <Sphere ref={leftEyeRef} args={[0.18, 32, 32]} position={[-0.4, 0.3, 1.2]}>
              <meshStandardMaterial 
                color="#ffffff"
                emissive={config.eyeGlow ? config.color : '#000000'}
                emissiveIntensity={config.eyeGlow ? 0.5 : 0}
              />
            </Sphere>
            <Sphere args={[0.09, 32, 32]} position={[-0.4, 0.3, 1.35]}>
              <meshStandardMaterial color="#000000" />
            </Sphere>

            {/* Œil droit */}
            <Sphere ref={rightEyeRef} args={[0.18, 32, 32]} position={[0.4, 0.3, 1.2]}>
              <meshStandardMaterial 
                color="#ffffff"
                emissive={config.eyeGlow ? config.color : '#000000'}
                emissiveIntensity={config.eyeGlow ? 0.5 : 0}
              />
            </Sphere>
            <Sphere args={[0.09, 32, 32]} position={[0.4, 0.3, 1.35]}>
              <meshStandardMaterial color="#000000" />
            </Sphere>
          </>
        ) : (
          <>
            {/* Œil gauche */}
            <Sphere ref={leftEyeRef} args={[0.18, 32, 32]} position={[-0.4, 0.3, 1.2]}>
              <meshStandardMaterial color="#ffffff" />
            </Sphere>
            <Sphere args={[0.09, 32, 32]} position={[-0.4, 0.3, 1.35]}>
              <meshStandardMaterial color="#000000" />
            </Sphere>
            
            {/* Cache-œil */}
            <Box args={[0.35, 0.25, 0.1]} position={[0.4, 0.3, 1.2]}>
              <meshStandardMaterial color="#000000" />
            </Box>
          </>
        )}

        {/* Bouche */}
        <Sphere 
          args={[0.35, 32, 32]} 
          position={[0, config.scared ? -0.5 : -0.2, 1.1]}
          scale={config.cute ? [1.3, 0.4, 0.5] : [1.1, 0.6, 0.5]}
        >
          <meshStandardMaterial 
            color={config.scared ? '#000000' : '#ff1744'} 
          />
        </Sphere>

        {/* Accessoires spécifiques */}
        {config.accessories.includes('crystal') && (
          <group ref={accessory1Ref} position={[0, 1.8, 0]}>
            <Cone args={[0.35, 0.8, 6]}>
              <meshStandardMaterial 
                color="#9c27b0" 
                transparent 
                opacity={0.7}
                emissive="#9c27b0"
                emissiveIntensity={0.8}
              />
            </Cone>
          </group>
        )}

        {config.accessories.includes('aura') && (
          <Torus args={[1.5, 0.05, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial 
              color={config.secondaryColor}
              emissive={config.color}
              emissiveIntensity={0.5}
            />
          </Torus>
        )}

        {config.accessories.includes('ice') && (
          <Box ref={accessory1Ref} args={[0.4, 0.4, 0.4]} position={[0, 1.5, 0]}>
            <meshStandardMaterial 
              color="#b3e5fc" 
              transparent 
              opacity={0.7}
              roughness={0.1}
              metalness={0.9}
            />
          </Box>
        )}

        {config.accessories.includes('hat') && (
          <group position={[0, 1.5, 0]}>
            <Cylinder args={[0.9, 0.9, 0.2, 32]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#000000" />
            </Cylinder>
            <Cone args={[0.7, 0.8, 32]} position={[0, 0.5, 0]}>
              <meshStandardMaterial color="#000000" />
            </Cone>
          </group>
        )}

        {config.accessories.includes('tinfoil') && (
          <Cone ref={accessory1Ref} args={[1.2, 1.8, 3]} position={[0, 2.2, 0]}>
            <meshStandardMaterial 
              color="#c0c0c0" 
              metalness={1} 
              roughness={0.2}
            />
          </Cone>
        )}

        {config.accessories.includes('toga') && (
          <group ref={accessory2Ref}>
            <Torus args={[1.3, 0.12, 16, 32]} position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#ffffff" />
            </Torus>
            <Cylinder args={[0.15, 0.15, 2, 32]} position={[0.8, -0.5, 0]}>
              <meshStandardMaterial color="#8b4513" />
            </Cylinder>
          </group>
        )}

        {config.accessories.includes('question') && (
          <group ref={accessory1Ref} position={[1.2, 1.8, 0]}>
            <Sphere args={[0.25, 32, 32]}>
              <meshStandardMaterial 
                color="#ffeb3b"
                emissive="#ffeb3b"
                emissiveIntensity={0.5}
              />
            </Sphere>
            <Cylinder args={[0.12, 0.12, 0.4, 32]} position={[0, -0.4, 0]}>
              <meshStandardMaterial color="#ffeb3b" />
            </Cylinder>
          </group>
        )}

        {config.accessories.includes('mask') && (
          <Box args={[1.3, 0.5, 0.15]} position={[0, 0, 1.3]}>
            <meshStandardMaterial color="#ffffff" />
          </Box>
        )}

        {config.accessories.includes('rose') && (
          <group ref={accessory2Ref} position={[-1, 0.5, 0]}>
            <Sphere args={[0.2, 32, 32]}>
              <meshStandardMaterial color="#e91e63" />
            </Sphere>
            <Cylinder args={[0.05, 0.05, 0.8, 32]} position={[0, -0.6, 0]}>
              <meshStandardMaterial color="#2e7d32" />
            </Cylinder>
          </group>
        )}

        {config.accessories.includes('eye') && (
          <group ref={accessory1Ref} position={[0, 1.8, 0]}>
            <Sphere args={[0.3, 32, 32]}>
              <meshStandardMaterial color="#ffffff" />
            </Sphere>
            <Sphere args={[0.15, 32, 32]} position={[0, 0, 0.25]}>
              <meshStandardMaterial 
                color="#ff0000"
                emissive="#ff0000"
                emissiveIntensity={0.8}
              />
            </Sphere>
          </group>
        )}

        {/* Particules autour si isTyping */}
        {isTyping && (
          <>
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const radius = 2;
              return (
                <Sphere 
                  key={i}
                  args={[0.1, 16, 16]} 
                  position={[
                    Math.cos(angle) * radius,
                    Math.sin(angle * 2) * 0.5,
                    Math.sin(angle) * radius
                  ]}
                >
                  <meshStandardMaterial 
                    color={config.color}
                    emissive={config.color}
                    emissiveIntensity={1}
                  />
                </Sphere>
              );
            })}
          </>
        )}
      </group>
    </Float>
  );
};

const Avatar3D = ({ isTyping = false, avatarType = 'philosophe' }) => {
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#00d4ff" />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#ff6b9d" />
        <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.3} penumbra={1} />
        
        <Suspense fallback={null}>
          <AnimatedAvatar isTyping={isTyping} avatarType={avatarType} />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate={!isTyping}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Avatar3D;