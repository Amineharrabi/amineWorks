import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: 'Secondary',
    title: 'Lycée Garcon Sfax',
    subtitle: 'High School',
    position: 'right',
  },
  {
    point: new THREE.Vector3(-4, -4, -3),
    year: 'University',
    title: 'Faculty of Science Sfax',
    subtitle: 'Undergraduate',
    position: 'left',
  },
  {
    point: new THREE.Vector3(-3, -1, -6),
    year: 'Work',
    title: 'For Right Solutions',
    subtitle: 'Software Engineer & Data Engineer',
    position: 'left',
  },
  {
    point: new THREE.Vector3(0, -1, -10),
    year: 'Current',
    title: 'Faculty of Science Sfax',
    subtitle: 'Undergraduate Student',
    position: 'left',
  },
]