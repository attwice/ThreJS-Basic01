import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { PointLightHelper, Scene } from 'three'

//Loader
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('/textures/earth_normalmap_8192x4096.jpg')
const Texture = textureLoader.load('/textures/earth 3.jpg')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const geometry = new THREE.SphereBufferGeometry(15, 32, 32);

// Materials

// const material = new THREE.MeshBasicMaterial()
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.color = new THREE.Color(0xffffff)
material.map = Texture;
material.normalMap = normalTexture;

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

// const pointLight = new THREE.PointLight(0xffffff, 10)
// pointLight.position.x = 20 
// pointLight.position.y = 30
// pointLight.position.z = 40
// scene.add(pointLight)
    //Red light
const pointLight2 = new THREE.PointLight(0xff0000, 20)
pointLight2.position.set(-23, 30, 6.5)
scene.add(pointLight2)

const light2 = gui.addFolder('Light Red')

light2.add(pointLight2.position, 'x').min(-30).max(30).step(0.5)
light2.add(pointLight2.position, 'y').min(-30).max(30).step(0.5)
light2.add(pointLight2.position, 'z').min(-30).max(30).step(0.5)
light2.add(pointLight2, 'intensity').min(0).max(30).step(1)

const light2Color = {
    color: 0xff0000
}

light2.addColor(light2Color, 'color')
    .onChange(() => {
        pointLight2.color.set(light2Color.color)
    })

const pointLightHelper = new THREE.PointLightHelper(pointLight2, 2)
scene.add(pointLightHelper) 

//Blue light
const pointLight3 = new THREE.PointLight(0x0000ff, 20)
pointLight3.position.set(24, -30, 2.5)
scene.add(pointLight3)

const light3 = gui.addFolder('Light Blue')

light3.add(pointLight3.position, 'x').min(-30).max(30).step(0.5)
light3.add(pointLight3.position, 'y').min(-30).max(30).step(0.5)
light3.add(pointLight3.position, 'z').min(-30).max(30).step(0.5)
light3.add(pointLight3, 'intensity').min(0).max(30).step(1)

const light3Color = {
    color: 0x0000ff
}

light3.addColor(light3Color, 'color')
    .onChange(() => {
        pointLight3.color.set(light3Color.color)
    })

const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 2)
scene.add(pointLightHelper2) 
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 50
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha : true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0; 
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2; 
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event){
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}
 
const updateSphere = (event) => {
    sphere.position.y = window.scrollY * 0.05
}

window.addEventListener('scroll', updateSphere);

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.x += .5 * (targetY - sphere.rotation.x)
    sphere.rotation.y += .5 * (targetX - sphere.rotation.y) 
    sphere.position.z += 50 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()