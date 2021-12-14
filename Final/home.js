
import * as THREE from './build/three.module.js';

import Stats from './build/stats.module.js';
import { GLTFLoader } from "./src/GLTFLoader.js";

// import { GUI } from './build/lil-gui.module.min.js';
// var renderer, scene, camera, composer, circle, skelet, particle;

let camera, scene, renderer, stats, parameters;
let mouseX = 0, mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
const materials = [];

window.onload = function () {
  init();
  animate();
}

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
  document.getElementById('canvas').appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 400;
  scene.add(camera);


  const geometry = new THREE.BufferGeometry();
  const vertices = [];

  const textureLoader = new THREE.TextureLoader();

  const sprite1 = textureLoader.load('assets/circle.png');
  const sprite2 = textureLoader.load('assets/spark1.png');


  for (let i = 0; i < 500; i++) {

    const x = Math.random() * 2000 - 1000;
    const y = Math.random() * 2000 - 1000;
    const z = Math.random() * 2000 - 1000;

    vertices.push(x, y, z);

  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  parameters = [
    [[1.0, 0.2, 0.5], sprite2, 50],

    [[0.90, 0.05, 0.5], sprite1, 10],
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
    "./assets/earth02.gltf",
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
      earth.position.set(1, 1, 1);
      earth.rotation.set(0.349066, 0, 0); // <-- changed to better display texture
      earth.scale.set(100, 100, 100);
      // Add model to scene
      scene.add(earth);
    },
    undefined,
    function (error) {
      console.error(error);
    })

  // circle = new THREE.Object3D();
  // skelet = new THREE.Object3D();
  // particle = new THREE.Object3D();

  // scene.add(circle);
  // scene.add(skelet);
  // scene.add(particle);

  // var geometry = new THREE.TetrahedronGeometry(2, 0);
  // var geom = new THREE.IcosahedronGeometry(7, 1);
  // var geom2 = new THREE.IcosahedronGeometry(15, 1);

  // var material = new THREE.MeshPhongMaterial({
  //   color: 0xffffff,
  //   shading: THREE.FlatShading
  // });

  // for (var i = 0; i < 1000; i++) {
  //   var mesh = new THREE.Mesh(geometry, material);
  //   mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
  //   mesh.position.multiplyScalar(90 + (Math.random() * 700));
  //   mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  //   particle.add(mesh);
  // }

  // var mat = new THREE.MeshPhongMaterial({
  //   color: 0xffffff,
  //   shading: THREE.FlatShading
  // });

  // var mat2 = new THREE.MeshPhongMaterial({
  //   color: 0xffffff,
  //   wireframe: true,
  //   side: THREE.DoubleSide

  // });

  // var planet = new THREE.Mesh(geom, mat);
  // planet.scale.x = planet.scale.y = planet.scale.z = 16;
  // circle.add(planet);

  // var planet2 = new THREE.Mesh(geom2, mat2);
  // planet2.scale.x = planet2.scale.y = planet2.scale.z = 10;
  // skelet.add(planet2);

  // var ambientLight = new THREE.AmbientLight(0x999999);
  // scene.add(ambientLight);

  var lights = [];
  lights[0] = new THREE.DirectionalLight(0xffffff, 1);
  lights[0].position.set(1, 0, 0);
  lights[1] = new THREE.DirectionalLight(0x11E8BB, 1);
  lights[1].position.set(0.75, 1, 0.5);
  lights[2] = new THREE.DirectionalLight(0x8200C9, 1);
  lights[2].position.set(-0.75, -1, 0.5);
  scene.add(lights[0]);
  scene.add(lights[1]);
  scene.add(lights[2]);


  window.addEventListener('resize', onWindowResize, false);
  document.body.style.touchAction = 'none';
  document.body.addEventListener('pointermove', onPointerMove);

};

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