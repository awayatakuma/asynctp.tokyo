import type { VRM } from '@pixiv/three-vrm'
import * as THREE from 'three'

export const applyCrossedArmsPose = (vrm: VRM) => {
  const humanoid = vrm.humanoid
  if (!humanoid) return

  // クォータニオンをオイラー角に変換するヘルパー関数
  const quatToEuler = (x: number, y: number, z: number, w: number) => {
    const quat = new THREE.Quaternion(x, y, z, w)
    const euler = new THREE.Euler()
    euler.setFromQuaternion(quat)
    return euler
  }

  // 肩
  const leftShoulder = humanoid.getNormalizedBoneNode('leftShoulder')
  const rightShoulder = humanoid.getNormalizedBoneNode('rightShoulder')

  if (leftShoulder) {
    const euler = quatToEuler(
      0.0014528793863571126,
      -0.004549256886234341,
      -0.02544775692561751,
      0.9996647463378544
    )
    leftShoulder.rotation.copy(euler)
  }
  if (rightShoulder) {
    const euler = quatToEuler(
      -0.020662636485454786,
      -0.11172056360924844,
      -0.1806873563954334,
      0.9769563195758197
    )
    rightShoulder.rotation.copy(euler)
  }

  // 上腕
  const leftUpperArm = humanoid.getNormalizedBoneNode('leftUpperArm')
  const rightUpperArm = humanoid.getNormalizedBoneNode('rightUpperArm')

  if (leftUpperArm) {
    const euler = quatToEuler(
      -0.18437736755074519,
      -0.35337938699414867,
      -0.35694759218548144,
      0.8448173835899001
    )
    leftUpperArm.rotation.copy(euler)
  }
  if (rightUpperArm) {
    const euler = quatToEuler(
      0.5288046377757548,
      0.1907581144064607,
      0.4645880089379485,
      0.6842039014840658
    )
    rightUpperArm.rotation.copy(euler)
  }

  // 前腕
  const leftLowerArm = humanoid.getNormalizedBoneNode('leftLowerArm')
  const rightLowerArm = humanoid.getNormalizedBoneNode('rightLowerArm')

  if (leftLowerArm) {
    const euler = quatToEuler(
      0.215602995047516,
      -0.42372746204320555,
      0.1045851273134802,
      0.8735172222582608
    )
    leftLowerArm.rotation.copy(euler)
  }
  if (rightLowerArm) {
    const euler = quatToEuler(0, 0.7009971619732336, 0, 0.7131640617035271)
    rightLowerArm.rotation.copy(euler)
  }

  // 手
  const leftHand = humanoid.getNormalizedBoneNode('leftHand')
  const rightHand = humanoid.getNormalizedBoneNode('rightHand')

  if (leftHand) {
    const euler = quatToEuler(0, 0, 0.6818671164166954, 0.7314760662862325)
    leftHand.rotation.copy(euler)
  }
  if (rightHand) {
    const euler = quatToEuler(
      -0.34709219053003915,
      0.23078779146484332,
      -0.1754509466856778,
      0.8918973998677979
    )
    rightHand.rotation.copy(euler)
  }

  // 指の詳細設定
  applyFingerPose(vrm)
}

const applyFingerPose = (vrm: VRM) => {
  const humanoid = vrm.humanoid
  if (!humanoid) return

  // クォータニオンをオイラー角に変換するヘルパー関数
  const quatToEuler = (x: number, y: number, z: number, w: number) => {
    const quat = new THREE.Quaternion(x, y, z, w)
    const euler = new THREE.Euler()
    euler.setFromQuaternion(quat)
    return euler
  }

  // 左手の指
  const leftThumbProximal = humanoid.getNormalizedBoneNode('leftThumbProximal')
  const leftThumbDistal = humanoid.getNormalizedBoneNode('leftThumbDistal')
  const leftIndexProximal = humanoid.getNormalizedBoneNode('leftIndexProximal')
  const leftMiddleProximal =
    humanoid.getNormalizedBoneNode('leftMiddleProximal')
  const leftRingProximal = humanoid.getNormalizedBoneNode('leftRingProximal')
  const leftRingIntermediate = humanoid.getNormalizedBoneNode(
    'leftRingIntermediate'
  )
  const leftLittleProximal =
    humanoid.getNormalizedBoneNode('leftLittleProximal')
  const leftLittleIntermediate = humanoid.getNormalizedBoneNode(
    'leftLittleIntermediate'
  )

  if (leftThumbProximal) {
    const euler = quatToEuler(
      0.3653113320247309,
      0.3573817589055018,
      -0.6144253943561405,
      0.6010884659234678
    )
    leftThumbProximal.rotation.copy(euler)
  }
  if (leftThumbDistal) {
    const euler = quatToEuler(0, 0.754220241171368, 0, 0.6566215255437515)
    leftThumbDistal.rotation.copy(euler)
  }
  if (leftIndexProximal) {
    const euler = quatToEuler(0, -0.07477785453337735, 0, 0.9972002168428291)
    leftIndexProximal.rotation.copy(euler)
  }
  if (leftMiddleProximal) {
    const euler = quatToEuler(0, 0.10564605323929471, 0, 0.9944037969733222)
    leftMiddleProximal.rotation.copy(euler)
  }
  if (leftRingProximal) {
    const euler = quatToEuler(0, 0, -0.45450238482990407, 0.8907455204400019)
    leftRingProximal.rotation.copy(euler)
  }
  if (leftRingIntermediate) {
    const euler = quatToEuler(0, 0, -0.678385142248964, 0.734706471167808)
    leftRingIntermediate.rotation.copy(euler)
  }
  if (leftLittleProximal) {
    const euler = quatToEuler(0, 0, -0.583379154003904, 0.812199952397)
    leftLittleProximal.rotation.copy(euler)
  }
  if (leftLittleIntermediate) {
    const euler = quatToEuler(0, 0, -0.5991782180305362, 0.8006156774868647)
    leftLittleIntermediate.rotation.copy(euler)
  }
}
