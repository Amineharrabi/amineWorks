import { Edges, Text, TextProps } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";

import { usePortalStore } from "@stores";
import { Project } from "@types";

interface ProjectTileProps {
  project: Project;
  index: number;
  position: [number, number, number];
  rotation: [number, number, number];
  activeId: number | null;
  onClick: () => void;
}

const ProjectTile = ({ project, index, position, rotation, activeId, onClick }: ProjectTileProps) => {
  const projectRef = useRef<THREE.Group>(null);
  const hoverAnimRef = useRef<gsap.core.Timeline | null>(null);
  const [hovered, setHovered] = useState(false);
  const isProjectSectionActive = usePortalStore((state) => state.activePortalId === "projects");

  const titleProps = useMemo(() => ({
    font: "./soria-font.ttf",
    color: "black",
  }), []);

  const subtitleProps: Partial<TextProps> = useMemo(() => ({
    font: "./Vercetti-Regular.woff",
    color: "black",
    anchorX: "left",
    anchorY: "top",
  }), []);

  useEffect(() => {
    if (!projectRef.current) return;
    hoverAnimRef.current?.kill();

    const [mesh, title, textBox, button] = projectRef.current.children;

    hoverAnimRef.current = gsap.timeline();
    hoverAnimRef.current
      .to(projectRef.current.position, { z: hovered ? 1 : 0, duration: 0.2 }, 0)
      .to(projectRef.current.position, { y: hovered ? 0.5 : 0 }, 0)
      .to(projectRef.current.scale, {
        x: hovered ? 1.15 : 1,
        y: hovered ? 1.15 : 1,
        z: hovered ? 1.15 : 1,
      }, 0)
      .to(title.position, { y: hovered ? 2.3 : 2.3 }, 0)
      .to(textBox.position, { y: hovered ? 0.5 : 0.5 }, 0)
      // .to(textBox.scale, { y: hovered ? 1 : 0, x: hovered ? 1 : 0 }, 0)
      .to(textBox, { fillOpacity: hovered ? 1 : 0.3, duration: 0.4 }, 0)
      .to(mesh.scale, { y: hovered ? 1.15 : 1 }, 0)
      .to((mesh as THREE.Mesh).material, { opacity: hovered ? 0.95 : 0.3 }, 0)
      .to(mesh.position, { y: hovered ? 0.3 : 0 }, 0);

    if (project.url) {
      hoverAnimRef.current
        .to(button.scale, { y: hovered ? 1 : 0, x: hovered ? 1 : 0 }, 0)
        .to(button.position, { z: hovered ? 0.3 : -1 }, 0);
    }
  }, [hovered]);

  useEffect(() => {
    if (isMobile) {
      setHovered(activeId === index);
    }
  }, [isMobile, activeId]);

  useEffect(() => {
    if (projectRef.current) {
      gsap.to(projectRef.current.position, {
        y: isProjectSectionActive ? 0 : -10,
        duration: 1,
        delay: isProjectSectionActive ? index * 0.1 : 0,
      });
    }
  }, [isProjectSectionActive]);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (!project.url) return;
    const button = e.eventObject;
    gsap.to(button.position, { z: 0, duration: 0.1 })
      .then(() => gsap.to(button.position, { z: 0.3, duration: 0.3 }));
    setTimeout(() => window.open(project.url, '_blank'), 50);
  };

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={onClick}
      onPointerOver={() => !isMobile && isProjectSectionActive && setHovered(true)}
      onPointerOut={() => !isMobile && isProjectSectionActive && setHovered(false)}>
      <group ref={projectRef}>
        <mesh>
          <planeGeometry args={[5, 8.5, 1]} />
          <meshBasicMaterial color="#FFF" transparent opacity={0.3} />
          {/* <meshPhysicalMaterial transmission={1} roughness={0.3} /> */}
          <Edges color="black" lineWidth={1.5} />
        </mesh>
        <Text
          {...titleProps}
          position={[-2.2, 5.9, 0.101]}
          anchorX="left"
          anchorY="top"
          maxWidth={4.6}
          fontSize={0.72}>
          {project.title}
        </Text>
        <Text
          {...subtitleProps}
          maxWidth={4.6}
          position={[-2.2, 2.8, 0.1]}
          // scale={[0, 0, 1]}
          fontSize={0.35}>
          {project.subtext}
        </Text>
        {project.url && (
          <group
            position={[1.5, -3.5, -1]}
            scale={[0, 0, 1]}
            onClick={handleClick}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}>
            <mesh>
              <boxGeometry args={[1.1, 0.4, 0.2]} />
              <meshBasicMaterial color="#222" />
              <Edges color="white" lineWidth={1} />
            </mesh>
            <Text
              {...subtitleProps}
              color="white"
              position={[-0.4, 0.15, 0.2]}
              fontSize={0.25}>
              VIEW ↗
            </Text>
          </group>
        )}
      </group>
    </group>
  );
};

export default ProjectTile;