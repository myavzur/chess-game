
import React, { PropsWithChildren } from "react"
import { useBox } from "@react-three/cannon"
import { useFrame } from '@react-three/fiber'

import { Golem as GolemGLTF } from 'GLTF/Golem'

import { CellProps } from './Cell.interface'

const BoxStatic: React.FC<any> = (props) => {
  const [ref] = useBox(() => ({
    mass: 10,
    position: props.position,
    args: [1, 0.25, 1],
    type: "Static"
  }))

  return (
    <object3D ref={ref}>
      <mesh>
        <boxGeometry args={[1, 0.25, 1]}/>
        <meshLambertMaterial color={props.cell.color}/>
      </mesh>
    </object3D>
  )
}

const Figure: React.FC<any> = (props) => {
  const [ref] = useBox(() => ({
    mass: 10,
    position: props.position,
    rotation: props.rotation,
    args: props.size,
  }))

  return (
    <object3D ref={ref} {...props}>
      {props.children}
    </object3D>
  )
}

const CellComponent: React.FC<CellProps> = ({ cell, isSelected, onClick }) => {
  return (
    <group 
      position={[cell.x, 0, 0]}
      onClick={() => onClick(cell)}
    >
      <BoxStatic cell={cell} />

      {cell.isAvailable && (
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[0.5, 0.25, 0.5]}/>
          <meshToonMaterial color={cell.isEnemyOnCell ? "red" : "green"} />
        </mesh>
      )}
      
      {cell.figure 
        && (
          <Figure 
            size={[0, 1, 0]}
            position={[0, 1, 0]} 
            scale={[0.02, 0.02, 0.02]}
            rotation={cell.figure.color === 'white' ? [0, 3, 0] : [0, 0, 0]}
          >
            <GolemGLTF />
          </Figure> 
        )
      }
    </group>
  )
}


export default CellComponent