import { Project } from "../types";

// TODO: Move this to API
export const PROJECTS: Project[] = [
  {
    title: 'Tokamak Fusion Reactor Simulation',
    date: '2026',
    subtext: 'A 3D raytraced simulation of a Tokamak nuclear fusion reactor with plasma physics and magnetic field confinement, using OpenGL Compute Shaders.',
    url: 'https://github.com/Amineharrabi/FusionCpp',
  },
  {
    title: 'MNIST In Rust',
    date: '2025',
    subtext: 'A complete neural network implementation built from scratch in Rust using only ndarray for linear algebra. No TensorFlow, no PyTorch, no external ML libraries - just pure mathematics and high-performance Rust code.',
    url: 'https://github.com/Amineharrabi/MNIST_In_Rust',
  },
  {
    title: 'RQ-VAE-Unet Image Generation Model',
    date: '2025',
    subtext: 'A high-quality image generation system combining Residual Vector Quantization (RQ-VAE) with a refinement network (Unet) for image synthesis.',
    url: 'https://github.com/Amineharrabi/RQ-VAE-Unet-Image-Generation-Model',
  },
  {
    title: 'NTSB API Proxy',
    date: '2025',
    subtext: 'A local, pip-installable proxy around the NTSB public CAROL API that simplifies the complex FileExport payloads into simple parameters, lets you download raw ZIPs or directly get a stream of parsed JSON.',
    url: 'https://github.com/Amineharrabi/NTSB_api',
  },
  {
    title: 'AiGF Clone',
    date: '2026',
    subtext: 'small scripts and a notebook to convert conversation exports into a combined JSONL dataset suitable for fine-tuning a custom conversational model.',
    url: 'https://github.com/Amineharrabi/AIGF',
  },
  {
    title: 'Matchy',
    date: '2025',
    subtext: 'A mobile app that helps you discover and share music with friends. Uses Spotify\'s API to provide personalized music recommendations and playlist management.',
    url: 'https://github.com/Amineharrabi/Matchy',
  },
  {
    title: 'RomArtGen',
    date: '2026',
    subtext: 'scripts to extract CHR data from ROM files and train a generative AI model to create authentic 8-bit sprites. Uses Pytorch, binary file parsing and data extraction, K-means clustering, (GANs), and computer vision techniques.',
    url: 'https://github.com/Amineharrabi/RomArtGen',
  },
];
