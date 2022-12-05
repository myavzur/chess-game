import React from "react"
import { ThreeElements } from '@react-three/fiber/dist/declarations/src/three-types'
import * as THREE from 'three'

const Axis: ThreeElements['primitive']['object'] = () => {
  return (
    <primitive object={new THREE.AxesHelper(10)} />
  )
}

export default Axis