import { useEffect, useRef, forwardRef } from 'react'
import { useLoader, extend, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from 'three-stdlib/controls/OrbitControls'
import { FrontSide, BackSide } from 'three'
import { GLTFLoader } from 'three-stdlib/loaders/GLTFLoader'
import { download } from '../../util/CaptureImage'

extend({ OrbitControls })

export const ThreeDScene = forwardRef(({
  isBrain,
  currentSelection = [],
  glassOpacity,
  cartilage,
  body,
  autoRotate,
  center,
  capture,
  miniScale,
  miniCameraRef,
  regionRef,
  functionRef,
  colors,
  breadcrumbs,
  regions,
  ...props
}, tooltipRef) => {
  const { nodes } = useLoader(GLTFLoader, `/assets/models/${isBrain ? 'cuttlefish_brain' : 'cuttlefish_body'}.glb`)
  const { camera, scene, gl } = useThree()
  const doCapture = useRef(false)
  const controls = useRef()
  const lights = useRef()

  const rotation = [0, 0, 0];
    
  useEffect(() => {
    const zoomDist = body ? 33 : 5
    const dist = camera.position.length()
    const factor = zoomDist / dist
    camera.position.x *= factor
    camera.position.y *= factor
    camera.position.z *= factor
  }, [body, camera])

  useEffect(() => {
    controls.current.reset()
  }, [center])

  useEffect(() => {
    if (capture > 0) doCapture.current = true
  }, [capture])

  useEffect(() => {
    controls.current.autoRotate = autoRotate
  }, [autoRotate])

  useEffect(() => {
    if (controls.current) {
      controls.current.addEventListener('change', e => {
        if (miniCameraRef.current && camera) {
          miniCameraRef.current.position.copy(camera.position)
          miniCameraRef.current.position.normalize().multiplyScalar(miniScale)
          miniCameraRef.current.quaternion.copy(camera.quaternion)
        }
      })
      controls.current.addEventListener('start', e => {
        tooltipRef.current.classList.add('-dragged')
      })
      controls.current.addEventListener('end', e => {
        tooltipRef.current.classList.remove('-dragged')
      })
    }
  }, [controls, miniCameraRef, camera, miniScale, tooltipRef])

  useFrame(() => {
    if (controls.current.autoRotate) controls.current.update()
    lights.current.quaternion.copy(camera.quaternion)
    gl.render(scene, camera)
    if (doCapture.current) {
      doCapture.current = false
      download(gl.domElement.toDataURL())
    }
  }, 10)

  function onPartHovered(event) {
    let found = false
    for (let i = 0; i < event.intersections.length; i++) {
      if (event.intersections[i].object.name !== 'GLASS' && event.intersections[i].object.name !== 'SK' && event.intersections[i].object.visible) {
        const abbreviation = event.intersections[i].object.name
        if (breadcrumbs[abbreviation]) {
          regionRef.current.innerText = breadcrumbs[abbreviation].path
          functionRef.current.innerText = breadcrumbs[abbreviation].function
          tooltipRef.current.innerText = regions[abbreviation]
          tooltipRef.current.classList.remove('-hide')
          found = true
        }
        break
      }
    }
    if (!found) {
      regionRef.current.innerText = ''
      functionRef.current.innerText = ''
      tooltipRef.current.innerText = ''
      tooltipRef.current.classList.add('-hide')
    } 
  }

  function onWheel() {
    tooltipRef.current.classList.add('-hide')
  }

  return (
    <>
      <orbitControls ref={controls} args={[camera, gl.domElement]} key={'3d-controls'} />
      <group ref={lights} key={'3d-lights'}>
        <ambientLight color={0x404040} intensity={1} />
        <pointLight position={[50, 50, 50]} color={0xffffff} intensity={0.5} />
        <pointLight position={[-50, -50, 50]} color={0xffffff} intensity={0.7} />
      </group>

      <group scale={isBrain ? [20, 20, 20] : [3.5, 3.5, 3.5]} key={'3d-model'} onWheel={onWheel}>
        {
          Object.keys(nodes).map((nodeName, i) => {
            if (colors[nodeName]) {
              // BRAIN
              if (isBrain) {
                if (nodeName === 'GLASS' || nodeName === 'C' || nodeName === 'SK') {
                  return (
                    <group key={`brain-mesh-${nodeName}-${i}`}>
                      <mesh
                        geometry={nodes[nodeName].geometry}
                        visible={
                          nodeName === 'SK'
                            ? body
                            : (nodeName === 'C'
                              ? cartilage
                              : true
                            )
                        }
                        name={nodeName}
                        renderOrder={-2}
                        rotation={rotation}
                      >
                        <meshPhongMaterial
                          color={colors[nodeName]}
                          shininess={0}
                          opacity={
                            nodeName === 'GLASS'
                              ? glassOpacity
                              : (nodeName === 'SK'
                                ? 0.5
                                : (nodeName === 'C'
                                  ? 0.75
                                  : 1
                                )
                              )
                          }
                          transparent={true}
                          depthWrite={false}
                          side={BackSide}
                        />
                      </mesh>
                      <mesh
                        geometry={nodes[nodeName].geometry}
                        visible={
                          nodeName === 'SK'
                            ? body
                            : (nodeName === 'C'
                              ? cartilage
                              : true
                            )
                        }
                        name={nodeName}
                        rotation={rotation}
                      >
                        <meshPhongMaterial
                          color={colors[nodeName]}
                          shininess={0}
                          opacity={
                            nodeName === 'GLASS'
                              ? glassOpacity
                              : (nodeName === 'SK'
                                ? 0.5
                                : (nodeName === 'C'
                                  ? 0.7
                                  : 1
                                )
                              )
                          }
                          transparent={true}
                          depthWrite={false}
                          side={FrontSide}
                        />
                      </mesh>
                    </group>
                  )
                } else {
                  return (
                    <mesh
                      geometry={nodes[nodeName].geometry}
                      visible={currentSelection.includes(nodeName)}
                      key={`brain-mesh-${nodeName}`}
                      name={nodeName}
                      onPointerOver={onPartHovered}
                      onPointerOut={onPartHovered}
                      rotation={rotation}
                    >
                      <meshPhongMaterial
                        color={colors[nodeName]}
                        shininess={0}
                      />
                    </mesh>
                  )
                }
              } 
              
              // BODY
              else {
                if (nodeName === 'SK') {
                  return (
                    <group key={`body-mesh-${nodeName}-${i}`}>
                      <mesh
                        geometry={nodes[nodeName].geometry}
                        visible={true}
                        name={nodeName}
                        renderOrder={-2}
                        rotation={rotation}
                      >
                        <meshPhongMaterial
                          color={colors[nodeName]}
                          shininess={0}
                          opacity={ nodeName === 'SK' ? glassOpacity : 1 }
                          transparent={true}
                          depthWrite={false}
                          side={BackSide}
                        />
                      </mesh>
                      <mesh
                        geometry={nodes[nodeName].geometry}
                        visible={true}
                        name={nodeName}
                        rotation={rotation}
                      >
                        <meshPhongMaterial
                          color={colors[nodeName]}
                          shininess={0}
                          opacity={nodeName === 'SK' ? glassOpacity : 1}
                          transparent={true}
                          depthWrite={false}
                          side={FrontSide}
                        />
                      </mesh>
                    </group>
                  )
                } else {
                  return (
                    <mesh
                      geometry={nodes[nodeName].geometry}
                      visible={currentSelection.includes(nodeName)}
                      key={`body-mesh-${nodeName}`}
                      name={nodeName}
                      onPointerOver={onPartHovered}
                      onPointerOut={onPartHovered}
                      rotation={rotation}
                    >
                      <meshPhongMaterial
                        color={colors[nodeName]}
                        shininess={0}
                      />
                    </mesh>
                  )
                }
              }
            } else {
              return null
            }
          })
        }
      </group>
    </>
  )
})