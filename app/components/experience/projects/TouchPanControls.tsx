import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { CAROUSEL_FOV } from "./ProjectsCarousel";

/**
 * Claude generated this. Very good code ngl.
 *
 * @returns
 */
export const TouchPanControls = () => {
  const { camera } = useThree()
  const touchStartRef = useRef({ x: 0, y: 0 })
  const cameraRotationRef = useRef({ x: 0, y: 0 })
  const targetRotationRef = useRef({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  // Set initial camera and target rotation values
  useEffect(() => {
    cameraRotationRef.current = {
      x: camera.rotation.y,
      y: camera.rotation.x
    }
    targetRotationRef.current = {
      x: camera.rotation.y,
      y: camera.rotation.x
    }
  }, [camera])

  // Animation loop for smooth camera movement
  useFrame(() => {
    if (!camera) return

    // Apply smooth damping to camera rotation
    const dampingFactor = 0.05

    camera.rotation.y += (targetRotationRef.current.x - camera.rotation.y) * dampingFactor
    camera.rotation.x += (targetRotationRef.current.y - camera.rotation.x) * dampingFactor

    // Update camera matrix
    camera.updateProjectionMatrix()
  })

  // Handle touch events
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        setIsDragging(true)
        touchStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        }
        // Remember current rotation as starting point
        cameraRotationRef.current = {
          x: targetRotationRef.current.x,
          y: targetRotationRef.current.y
        }
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return

      // Calculate touch movement delta
      const touchX = e.touches[0].clientX
      const deltaX = touchX - touchStartRef.current.x

      // Update target rotation with sensitivity adjustment
      const sensitivity = 0.005
      const newRotationY = cameraRotationRef.current.x + deltaX * sensitivity

      // Apply rotation limits to prevent over-rotation.
      // A wider carousel arc grows past both ends, and further past the last tile than the first.
      const extraArc = CAROUSEL_FOV - Math.PI
      const maxRotationLeft = Math.PI / 3 + extraArc / 2
      const maxRotationRight = Math.PI / 3 + extraArc
      targetRotationRef.current.x = Math.max(Math.min(newRotationY, maxRotationLeft), -maxRotationRight)
    }

    const handleTouchEnd = () => {
      if (isDragging) {
        setIsDragging(false)
      }
    }

    // Momentum scrolling when finger is lifted
    const handleTouchMomentum = () => {
      if (!isDragging && Math.abs(targetRotationRef.current.x - camera.rotation.y) < 0.001) {
        // When movement nearly stops, update the reference point
        cameraRotationRef.current = {
          x: camera.rotation.y,
          y: camera.rotation.x
        }
      }
    }

    // Add event listeners
    document.addEventListener('touchstart', handleTouchStart, { passive: false })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)

    // For momentum effect
    const momentumInterval = setInterval(handleTouchMomentum, 100)

    // Clean up event listeners
    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      clearInterval(momentumInterval)
    }
  }, [camera, isDragging])

  // Prevent default behavior to avoid browser gestures interfering
  // useEffect(() => {
  //   const preventDefault = (e) => e.preventDefault()
  //   document.addEventListener('touchmove', preventDefault, { passive: false })

  //   return () => {
  //     document.removeEventListener('touchmove', preventDefault)
  //   }
  // }, [])

  return null
}