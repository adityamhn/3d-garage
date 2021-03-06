import './App.css';
import * as THREE from 'three'
import { Canvas, useFrame, extend, useThree, useLoader } from 'react-three-fiber'
import { useRef,Suspense } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

const Orbit = () => {
  const { camera, gl } = useThree()
  return (
    <orbitControls args={[camera, gl.domElement]} />
  )
}

function App() {

  const Box = (props) => {
    const ref = useRef()
    const texture = useLoader(THREE.TextureLoader,'https://images.pexels.com/photos/129733/pexels-photo-129733.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500')
    useFrame(state => {
      ref.current.rotation.x += 0.01
      ref.current.rotation.y += 0.01
    })
    return (
      <mesh ref={ref} {...props} castShadow>
        <boxBufferGeometry />
        <meshPhysicalMaterial map={texture}
           />
      </mesh>
    )
  }

  const Floor = (props) => {
    return (
      <mesh {...props} receiveShadow>
        <boxBufferGeometry args={[20, 1, 10]} />
        <meshPhysicalMaterial />
      </mesh>
    )
  }


  const Bulb = (props) => {
    return (
      <mesh {...props}>
        <pointLight castShadow />
        <sphereBufferGeometry args={[0.2, 20, 20]} />
        <meshPhongMaterial emissive="yellow" />
      </mesh>
    )
  }


  return (
    <div style={{ height: "100vh", widht: "100vw" }}>

      <Canvas
        shadowMap style={{ background: "black" }} camera={{ position: [3,3, 3] }}>
        <fog attach="fog" args={['white', 1, 10]} />
        <ambientLight intensity={0.2} />
        <Bulb position={[0, 3, 0]} />
        <axesHelper args={[5]} />
        <Orbit />
        <Suspense fallback={null}>

        <Box position={[0, 1, 0]} />
        </Suspense>
        <Floor position={[0, -0.5, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
