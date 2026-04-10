"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { MTLLoader, OBJLoader } from "three-stdlib";

interface ThreeCanvasProps {
  modelPath?: string;
  materialPath?: string;
  texturePath?: string;
  autoRotate?: boolean;
  rotateOnMouseMove?: boolean;
}

export function ThreeCanvas({
  modelPath = "/6b7f708d89270dad0e683a3eb7c7624f.obj",
  materialPath = "/material.mtl",
  texturePath = "/material.png",
  autoRotate = true,
  rotateOnMouseMove = true,
}: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Прозрачный фон
    sceneRef.current = scene;

    // Camera setup
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, -40, 3);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(10, 20, 15);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x87ceeb, 1);
    pointLight1.position.set(-30, 30, 40);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffd700, 0.8);
    pointLight2.position.set(30, 20, -30);
    scene.add(pointLight2);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(-20, 10, -20);
    scene.add(fillLight);

    // Load model with materials
    const mtlLoader = new MTLLoader();
    mtlLoader.load(materialPath, (materials) => {
      materials.preload();

      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(modelPath, (object) => {
        object.scale.set(2, 2, 2);
        object.position.set(0, -40, 0);
        object.castShadow = true;
        object.receiveShadow = true;

        // Load and apply texture
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
          texturePath,
          (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;

            object.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                // Apply texture to all materials
                if (child.material instanceof THREE.Material) {
                  if (Array.isArray(child.material)) {
                    child.material.forEach((mat: THREE.Material) => {
                      if (mat instanceof THREE.MeshPhongMaterial) {
                        mat.map = texture;
                        mat.emissive = new THREE.Color(0x222222);
                        mat.emissiveIntensity = 0.5;
                      }
                    });
                  } else {
                    if (child.material instanceof THREE.MeshPhongMaterial) {
                      child.material.map = texture;
                      child.material.emissive = new THREE.Color(0x222222);
                      child.material.emissiveIntensity = 0.5;
                    }
                  }
                }
              }
            });
          },
          undefined,
          (error) => {
            console.warn(`Failed to load texture: ${texturePath}`, error);
          },
        );

        scene.add(object);
        modelRef.current = object;
      });
    });

    // Mouse tracking
    const handleMouseMove = (event: MouseEvent) => {
      if (!rotateOnMouseMove) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = (event.clientX - rect.left) / width;
      mouseRef.current.y = (event.clientY - rect.top) / height;

      // Target rotation based on mouse position
      targetRotationRef.current.y = (mouseRef.current.x - 0.5) * Math.PI * 0.1;
      targetRotationRef.current.x = (mouseRef.current.y - 0.5) * Math.PI * 0.07;
    };

    // Handle window resize
    const handleResize = () => {
      const newWidth = containerRef.current?.clientWidth || width;
      const newHeight = containerRef.current?.clientHeight || height;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (modelRef.current) {
        if (rotateOnMouseMove) {
          // Smoothly interpolate to target rotation
          modelRef.current.rotation.x +=
            (targetRotationRef.current.x - modelRef.current.rotation.x) * 0.1;
          modelRef.current.rotation.y +=
            (targetRotationRef.current.y - modelRef.current.rotation.y) * 0.1;
        } else if (autoRotate) {
          // Auto-rotate if not using mouse
          modelRef.current.rotation.y += 0.005;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [modelPath, autoRotate, rotateOnMouseMove]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ position: "relative" }}
    />
  );
}
