'use client'

import {
  type VRM,
  VRMExpressionPresetName,
  VRMLoaderPlugin,
} from '@pixiv/three-vrm'
import {
  createVRMAnimationClip,
  type VRMAnimation,
  VRMAnimationLoaderPlugin,
  VRMLookAtQuaternionProxy,
} from '@pixiv/three-vrm-animation'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  type AnimationAction,
  AnimationMixer,
  LoopRepeat,
  Vector3,
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

interface VRMModelProps {
  url: string
  animationUrl?: string
}

export const VRMModel = ({ url, animationUrl }: VRMModelProps) => {
  const vrmRef = useRef<VRM | null>(null)
  const mixerRef = useRef<AnimationMixer | null>(null)
  const [animationAction, setAnimationAction] =
    useState<AnimationAction | null>(null)

  const lastBlinkTimeRef = useRef(0)
  const blinkInterval = 3
  const blinkDuration = 0.15

  const { camera } = useThree()

  const gltf = useLoader(GLTFLoader, url, (loader) => {
    loader.register((parser) => new VRMLoaderPlugin(parser))
  })

  const vrm = gltf.userData.vrm as VRM
  vrmRef.current = vrm

  /**
   * RATIONALE: Manually create VRMLookAtQuaternionProxy to suppress console warnings
   * from the animation library and ensure stable eye-tracking integration.
   */
  useEffect(() => {
    let proxy: VRMLookAtQuaternionProxy | null = null
    if (vrm?.lookAt) {
      const alreadyHasProxy = vrm.scene.children.some(
        (child) => child instanceof VRMLookAtQuaternionProxy
      )
      if (!alreadyHasProxy) {
        proxy = new VRMLookAtQuaternionProxy(vrm.lookAt)
        proxy.name = 'VRMLookAtQuaternionProxy'
        vrm.scene.add(proxy)
      }
    }

    return () => {
      if (proxy) {
        vrm?.scene.remove(proxy)
      }
    }
  }, [vrm])

  // --- Animation Setup (Conditional) ---

  /**
   * RATIONALE: We initialize the animation clip only if animationUrl is provided.
   * By using an array in useLoader, we can pass an empty array when animationUrl is
   * missing to avoid unnecessary fetches (which would cause JSON parse errors
   * if it fetches HTML pages).
   */
  const vrmaGltfArray = useLoader(
    GLTFLoader,
    animationUrl ? [animationUrl] : [],
    (loader) => {
      loader.register((parser) => new VRMAnimationLoaderPlugin(parser))
    }
  )
  const vrmaGltf = vrmaGltfArray.length > 0 ? vrmaGltfArray[0] : null

  useEffect(() => {
    if (vrm && animationUrl && vrmaGltf?.userData.vrmAnimations) {
      const vrmAnimation = vrmaGltf.userData.vrmAnimations[0] as VRMAnimation
      const mixer = new AnimationMixer(vrm.scene)
      mixerRef.current = mixer

      const clip = createVRMAnimationClip(vrmAnimation, vrm)
      const action = mixer.clipAction(clip)
      action.setLoop(LoopRepeat, Infinity)

      mixer.stopAllAction()
      action.stop()

      setAnimationAction(action)

      return () => {
        action.stop()
        mixer.stopAllAction()
        mixer.uncacheRoot(vrm.scene)
        mixerRef.current = null
      }
    }
  }, [vrm, vrmaGltf, animationUrl])

  /**
   * RATIONALE: Add 'Saccade' (micro-jitter) to eye tracking to simulate human-like
   * focus shifts, making the character look more intelligent and less like a camera.
   */
  const lookAtMouse = useCallback(
    (vrm: VRM, elapsedTime: number, mouse: { x: number; y: number }) => {
      if (!vrm.lookAt) return

      const saccadeX = (Math.random() - 0.5) * 0.01
      const saccadeY = (Math.random() - 0.5) * 0.01

      const vector = new Vector3(
        mouse.x + (elapsedTime % 1.0 > 0.98 ? saccadeX : 0),
        mouse.y + (elapsedTime % 1.0 > 0.98 ? saccadeY : 0),
        0.5
      )
      vector.unproject(camera)

      const vrmPosition = vrm.scene.position
      const lookDirection = vector.clone().sub(vrmPosition).normalize()

      vrm.lookAt.lookAt(lookDirection)
    },
    [camera]
  )

  /**
   * RATIONALE: Procedural animation using phase-shifted sine waves creates a
   * natural 'living' appearance. By moving bones (hips, spine, shoulders) at
   * slightly different times, we avoid the rigid look of simultaneous movement.
   */
  const updateProceduralMotion = useCallback(
    (vrm: VRM, elapsedTime: number) => {
      if (!vrm.humanoid || !vrm.expressionManager) return

      const t = elapsedTime
      const breathe = Math.sin(t * 1.2)
      const sway = Math.sin(t * 0.5)
      const deepSway = Math.cos(t * 0.3)

      // Base posture and breathing waves
      const hips = vrm.humanoid.getNormalizedBoneNode('hips')
      if (hips) {
        hips.position.y = 0.91935 + breathe * 0.008
        hips.rotation.z = sway * 0.05
        hips.rotation.x = deepSway * 0.02
      }

      const spine = vrm.humanoid.getNormalizedBoneNode('spine')
      if (spine) {
        const spineBreathe = Math.sin(t * 1.2 - 0.5)
        spine.rotation.x = spineBreathe * 0.04 + 0.04
        spine.rotation.z = -(sway * 0.06)
      }

      // Shoulder movement is key to visible breathing
      const lSh = vrm.humanoid.getNormalizedBoneNode('leftShoulder')
      const rSh = vrm.humanoid.getNormalizedBoneNode('rightShoulder')
      if (lSh && rSh) {
        const shoulderLift = Math.max(0, Math.sin(t * 1.2 - 0.7)) * 0.05
        lSh.rotation.z = 0.15 + shoulderLift
        rSh.rotation.z = -0.15 - shoulderLift
      }

      const neck = vrm.humanoid.getNormalizedBoneNode('neck')
      if (neck) {
        const headTilt = Math.sin(t * 0.5 - 0.3)
        neck.rotation.z = headTilt * 0.08
        neck.rotation.x = Math.sin(t * 1.2 - 1.0) * 0.02
      }

      const lArm = vrm.humanoid.getNormalizedBoneNode('leftUpperArm')
      const rArm = vrm.humanoid.getNormalizedBoneNode('rightUpperArm')
      if (lArm && rArm) {
        const armSway = Math.sin(t * 0.5 - 0.8) * 0.04
        lArm.rotation.z = 1.1 + armSway
        rArm.rotation.z = -1.1 - armSway
        lArm.rotation.x = 0.25
        rArm.rotation.x = 0.25
      }

      // Feminine inward leg rotation
      const lLeg = vrm.humanoid.getNormalizedBoneNode('leftUpperLeg')
      const rLeg = vrm.humanoid.getNormalizedBoneNode('rightUpperLeg')
      if (lLeg && rLeg) {
        lLeg.rotation.y = 0.08
        rLeg.rotation.y = -0.08
      }

      // Dynamic facial warmth
      // RATIONALE: Using a fixed subtle Neutral/Relaxed combination to avoid the
      // "creepy" over-exaggerated joy. A small amount of 'Neutral' with 'Relaxed'
      // creates a calm, natural baseline.
      vrm.expressionManager.setValue(VRMExpressionPresetName.Relaxed, 0.25)
      vrm.expressionManager.setValue(VRMExpressionPresetName.Neutral, 0.1)
      vrm.expressionManager.setValue(VRMExpressionPresetName.Happy, 0.0) // Disable Happy for now

      const fingerNames = [
        'leftIndexProximal',
        'rightIndexProximal',
        'leftMiddleProximal',
        'rightMiddleProximal',
      ] as const
      for (const name of fingerNames) {
        const bone = vrm.humanoid.getNormalizedBoneNode(name)
        if (bone) {
          bone.rotation.z = name.startsWith('left') ? 0.2 : -0.2
        }
      }
    },
    []
  )

  const updateBlinking = useCallback(
    (vrm: VRM, elapsedTime: number) => {
      if (!vrm.expressionManager) return

      if (elapsedTime - lastBlinkTimeRef.current > blinkInterval) {
        lastBlinkTimeRef.current = elapsedTime
      }

      const timeSinceBlink = elapsedTime - lastBlinkTimeRef.current
      if (timeSinceBlink < blinkDuration) {
        const blinkProgress = timeSinceBlink / blinkDuration
        const blinkValue = Math.sin(blinkProgress * Math.PI)
        vrm.expressionManager.setValue('blink', blinkValue)
      } else {
        vrm.expressionManager.setValue('blink', 0)
      }
    },
    [blinkInterval, blinkDuration]
  )

  useFrame((state, delta) => {
    if (vrmRef.current) {
      // delta is already provided by useFrame, which is the time since last frame.
      // state.clock is deprecated in latest Three.js but Fiber provides delta.
      const elapsedTime = state.clock.getElapsedTime()

      if (mixerRef.current && animationAction && animationUrl) {
        mixerRef.current.update(delta)
      }

      /**
       * RATIONALE: Applying procedural motion AFTER mixer update to ensure our
       * natural idle pose and breathing correctly override the T-pose or static
       * states of the animation mixer.
       */
      updateProceduralMotion(vrmRef.current, elapsedTime)
      updateBlinking(vrmRef.current, elapsedTime)
      lookAtMouse(vrmRef.current, elapsedTime, state.mouse)

      vrmRef.current.update(delta)
    }
  })

  return <primitive object={vrm.scene} scale={1.1} />
}
