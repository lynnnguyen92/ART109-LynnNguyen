// Art 109 Three.js Demo Site
// client2.js
// A three.js scene which loads a custom GLTF model and implements Orbit controls

// Import required source code
// Import three.js core
import * as THREE from "./build/three.module.js";

// Import add-ons for GLTF models and orbit controls
import { OrbitControls } from "./src/OrbitControls.js";
import { GLTFLoader } from "./src/GLTFLoader.js";

let container, scene, camera, renderer, mesh, mesh2, mixer, controls, clock;
let ticker = 0;
// Call init and animate functions (defined below)
init();
animate();

function init() {



const instructions = document.getElementById("instructions");

container = document.getElementById("space");
//Crate clock for animation
clock = new THREE.Clock();

//Create scene
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.5,
  1000
);
 renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x00000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Add scene to gltf.html
container.appendChild(renderer.domElement);

// Material to be added to model
// var newMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

// Variable for GLTF data

// Load GLTF model, add material, and add it to the scene
const loader = new GLTFLoader().load(
  "assets/QR code-animated.gltf",
  function(gltf) {
    // Scan loaded model for mesh and apply defined material if mesh is present
    gltf.scene.traverse(function(child) {
      if (child.isMesh) {
        //child.material = newMaterial;
      }
    });
    // set position and scale
    mesh = gltf.scene;
    mesh.position.set(0, -.1, 1);
    mesh.scale.set(.4, .4, .4);
    // Add model to scene
    scene.add(mesh);

    //Check for and play animation frames
    mixer = new THREE.AnimationMixer(mesh);
    gltf.animations.forEach((clip) => {
      mixer.clipAction(clip).play();
    });
  },
  undefined,
  function(error) {
    console.error(error);
  }
);



// Load GLTF model, add material, and add it to the scene
const loader2 = new GLTFLoader().load(
  "assets/QR code-05.gltf",
  function(gltf) {
    // Scan loaded model for mesh and apply defined material if mesh is present
    gltf.scene.traverse(function(child) {
      if (child.isMesh) {
        //child.material = newMaterial;
      }
    });
    // set position and scale
    mesh2 = gltf.scene;
    mesh2.position.set(0, -.1, 1);
    mesh2.scale.set(.4, .4, .4);
    // Add model to scene
    scene.add(mesh2);
  },
  undefined,
  function(error) {
    console.error(error);
  }
);


// Add Orbit Controls
 controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 0;
controls.maxDistance = 10;
controls.target.set(0, 0, -0.2);
controls.update();

// Position our camera so we can see the shape
camera.position.z =3;

// Add a directional light to the scene

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
// directionalLight.position.set(100,100,100);
// directionalLight.target.position.set( 10, 100, 1000 );
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
scene.add(directionalLight);

// Add an ambient light to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambientLight);
}

// Define animate loop
function animate() {
  controls.update();
  requestAnimationFrame(animate);
  var delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  render();
}

// Define
function render() {

  renderer.render(scene, camera);
}


// Respond to Window Resizing
window.addEventListener("resize", onWindowResize);

// Window resizing function
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

document.onkeydown = setupKeyControls;
function setupKeyControls() {
  var cube = scene.getObjectByName('cube');
  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 37:
      camera.position.x += 0.1;
      break;
      case 38:
      camera.position.z -= 0.1;
      break;
      case 39:
      camera.position.x -= 0.1;
      break;
      case 40:
      camera.position.z += 0.1;
      break;
    }
  };
}
