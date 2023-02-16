import './style.css'
import * as THREE from 'three'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

// const boxGeometry = new THREE.BoxGeometry(
//   1, 1, 1
// )
// const material = new THREE.MeshBasicMaterial(
//   { color: 0x00FF00 }
// )
// const mesh = new THREE.Mesh(boxGeometry, material)
// scene.add(mesh)
camera.position.z = 5

const planeGeometry = new THREE.PlaneGeometry(
  5, 5, 10, 10
);
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
  flatShading: true,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);

const light = new THREE.DirectionalLight(
  0xffffff,
  1
)
const { array } = planeMesh.geometry.attributes.position
for (let i = 0; i < array.length; i += 3) {
  const x = array[i]
  const y = array[i + 1]
  const z = array[i + 2]

  array[i + 2] = z + Math.random()
}
light.position.set(
  0, 0, 1
)
scene.add(light)

function animation() {
  requestAnimationFrame(animation)
  renderer.render(scene, camera)
  // mesh.rotation.x += 0.1
  // mesh.rotation.y += 0.1
  planeMesh.rotation.z += 0.01
  planeMesh.rotation.x += 0.03
  planeMesh.rotation.y += 0.01
}

animation()