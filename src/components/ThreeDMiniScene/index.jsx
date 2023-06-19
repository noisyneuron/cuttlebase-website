import React, { useRef, useEffect } from 'react'
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three-stdlib/loaders/GLTFLoader'
import { Box3, BoxGeometry, Mesh, TextureLoader, MeshBasicMaterial, MeshLambertMaterial } from 'three'

export const ThreeDMiniScene = React.forwardRef(({initialZ, isBrain}, ref ) => {
  const gltf = useLoader(GLTFLoader, `/assets/models/${isBrain ? 'Glassbrain' : 'cuttlefish_body'}.glb`)
  const { camera, scene } = useThree()
  const lightRef = useRef()

  useEffect( () => {
    camera.position.z = initialZ
    camera.fov = 55
    camera.updateProjectionMatrix()
    ref.current = camera
  }, [ref, camera, initialZ])

  useEffect(() => {
    const loader = new TextureLoader()
    const textures = [
      'px.png', 'nx.png',
      'py.png', 'ny.png',
      'pz.png', 'nz.png'
    ];
    const materials = textures.map(t => {
      return new MeshBasicMaterial({ color: 0xffffff, map: loader.load(`/assets/models/mini${isBrain ? 'brain' : 'body'}_textures/${t}`), transparent: true })
    })
    const bbox = new Box3()
    bbox.setFromObject(gltf.scene)
    const dimensions = {
      x: bbox.max.x - bbox.min.x,
      y: bbox.max.y - bbox.min.y,
      z: bbox.max.z - bbox.min.z,
    }
    const boxGeo = new BoxGeometry(dimensions.x, dimensions.y, dimensions.z)
    const cube = new Mesh(boxGeo, materials)
    if(isBrain) {
      cube.position.x = 0.12
      cube.position.y = 0.31
    } else {
      cube.position.x = 0.01
      cube.position.z = 0.006
      cube.position.y = -0.02
    }
    scene.add(cube)
    if(isBrain) {
      gltf.scene.children[0].material = new MeshLambertMaterial()
    } else {
      gltf.scene.children.find(x => x.name === 'SK').material = new MeshLambertMaterial()
    }
  }, [gltf, scene, isBrain])

  useFrame(() => {
    lightRef.current.quaternion.copy(camera.quaternion)
  })

  return (
    <>
      <group ref={lightRef}>
        <pointLight position={[0, 0, 10]} intensity={0.3}/>
      </group>
      <primitive object={gltf.scene} scale={isBrain ? [18, 18, 18] : [.3,.3,.3]} />
    </>
  )
})
