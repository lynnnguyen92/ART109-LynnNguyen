
import * as THREE from './build/three.module.js';

import Stats from './build/stats.module.js';
import { GLTFLoader } from "./src/GLTFLoader.js";

// import { GUI } from './build/lil-gui.module.min.js';

var camera, scene, renderer, stats, parameters;
let mouseX = 0, mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

const materials = [];

init();
animate();

function init() {

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.z = 1000;

  scene = new THREE.Scene();
  // scene.background = new THREE.Color(0xed70e1);
  scene.fog = new THREE.FogExp2(0x000000, 0.0008);


  const geometry = new THREE.BufferGeometry();
  const vertices = [];

  const textureLoader = new THREE.TextureLoader();

  const sprite1 = textureLoader.load('assets/circle.png');
  const sprite2 = textureLoader.load('assets/spark1.png');

  // Identify the html divs for the overlays
  const blocker = document.getElementById("blocker");
  const instructions = document.getElementById("instructions");



  // for (let i = 0; i < 1000; i++) {
  for (let i = 0; i < 100; i++) {

    const x = Math.random() * 2000 - 1000;
    const y = Math.random() * 2000 - 1000;
    const z = Math.random() * 2000 - 1000;

    vertices.push(x, y, z);

  }



  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  parameters = [
    [[1.0, 0.2, 0.5], sprite2, 200],

    [[0.90, 0.05, 0.5], sprite1, 20],
  ];

  for (let i = 0; i < parameters.length; i++) {

    const color = parameters[i][0];
    const sprite = parameters[i][1];
    const size = parameters[i][2];

    materials[i] = new THREE.PointsMaterial({ size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: true });
    materials[i].color.setHSL(color[0], color[1], color[2]);

    const particles = new THREE.Points(geometry, materials[i]);

    particles.rotation.x = Math.random() * 6;
    particles.rotation.y = Math.random() * 6;
    particles.rotation.z = Math.random() * 6;


    scene.add(particles);

  }
  var earth;
  // Load GLTF model and add it to the scene
  const loader = new GLTFLoader().load(
    "./assets/earth01.gltf",
    function (gltf) {
      // Scan loaded model for mesh and apply defined material if mesh is present
      gltf.scene.traverse(function (child) {
        // if (child.isMesh) {
        //   child.material = newMaterial;
        // }
      });
      // set position and scale
      // const  mesh = new THREE.Mesh();
      earth = gltf.scene;
      earth.position.set(1, 1, 10);
      earth.rotation.set(0, 0, 0); // <-- changed to better display texture
      earth.scale.set(200, 200, 200);
      // Add model to scene
      scene.add(earth);
    },
    undefined,
    function (error) {
      console.error(error);
    })

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // renderer.autoClear = false;
  // renderer.setClearColor(0x000000, 0.0);

  document.body.appendChild(renderer.domElement);



  document.body.style.touchAction = 'none';
  document.body.addEventListener('pointermove', onPointerMove);

  //

  window.addEventListener('resize', onWindowResize);

}


function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function onPointerMove(event) {

  if (event.isPrimary === false) return;

  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;

}

//

function animate() {

  requestAnimationFrame(animate);

  render();
  // stats.update();

}

function render() {

  const time = Date.now() * 0.00005;

  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (- mouseY - camera.position.y) * 0.05;

  camera.lookAt(scene.position);

  for (let i = 0; i < scene.children.length; i++) {

    const object = scene.children[i];

    if (object instanceof THREE.Points) {

      object.rotation.y = time * (i < 4 ? i + 1 : - (i + 1));

    }

  }

  for (let i = 0; i < materials.length; i++) {

    const color = parameters[i][0];

    const h = (360 * (color[0] + time) % 360) / 360;
    materials[i].color.setHSL(h, color[1], color[2]);

  }

  renderer.render(scene, camera);

}