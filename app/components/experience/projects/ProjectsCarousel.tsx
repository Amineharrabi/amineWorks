import { useEffect, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import ProjectTile from "./ProjectTile";

import { PROJECTS } from "@constants";
import { usePortalStore } from "@stores";

// Widen the arc as projects are added so the tiles never overlap.
// With 7 or fewer projects this is the original half circle.
export const CAROUSEL_FOV = Math.PI * Math.max(1, PROJECTS.length / 9);

const ProjectsCarousel = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const isActive = usePortalStore((state) => state.activePortalId === "projects");

  useEffect(() => {
    if (!isActive) setActiveId(null);
  }, [isActive]);

  const onClick = (id: number) => {
    if (!isMobile) return;
    setActiveId(id === activeId ? null : id);
  };

  const tiles = useMemo(() => {
    const fov = CAROUSEL_FOV;
    const count = PROJECTS.length;
    // Push the ring outwards when needed so neighbouring tiles keep the same spacing (radius 13 for 7 projects).
    const distance = Math.max(13, 2.9 / Math.sin(fov / count / 2));
    const startAngle = -(fov - Math.PI) / 2;

    return PROJECTS.map((project, i) => {
      const angle = startAngle + (fov / count) * i;
      const z = -distance * Math.sin(angle);
      const x = -distance * Math.cos(angle);
      const rotY = Math.PI / 2 - angle;

      return (
        <ProjectTile
          key={i}
          project={project}
          index={i}
          position={[x, 1, z]}
          rotation={[0, rotY, 0]}
          activeId={activeId}
          onClick={() => onClick(i)}
        />
      );
    });
  }, [activeId, isActive]);

  return (
    <group rotation={[0, -Math.PI / 12, 0]}>
      {tiles}
    </group>
  );
};

export default ProjectsCarousel;