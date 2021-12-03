// Art 109 Three.js Demo Site
// client7.js
// A three.js scene which uses planes and texture loading to generate a scene with images which can be traversed with basic WASD and mouse controls, this scene is full screen with an overlay.

// Import required source code
// Import three.js core
import * as THREE from "./build/three.module.js";
// Import pointer lock controls
import {
  PointerLockControls
} from "./src/PointerLockControls.js";
import { GLTFLoader } from "./src/GLTFLoader.js";

// Establish variables
let container, scene, camera, renderer, mesh1, mesh2,mesh3, mesh4, mixer1,mixer2,mixer3,mixer4, controls, clock;
let ticker = 0;
const objects = [];
let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();

// Initialization and animation function calls
init();
animate();

// Initialize the scene
function init() {

  // Establish the camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.y = 10;
	// camera.position.x = 6;
  camera.position.z = 150;



  // Define basic scene parameters
  scene = new THREE.Scene();

  scene.fog = new THREE.Fog(0x7985ba, 0, 200);

  // Add an ambient light to the scene
  const ambientLight = new THREE.AmbientLight(0xffffff, 5);
  scene.add(ambientLight);



  // Define controls
  controls = new PointerLockControls(camera, document.body);

  // Identify the html divs for the overlays
  const blocker = document.getElementById("blocker");
  const instructions = document.getElementById("instructions");
	clock = new THREE.Clock();

  // Listen for clicks and respond by removing overlays and starting mouse look controls
  // Listen
  instructions.addEventListener("click", function() {
    controls.lock();
  });
  // Remove overlays and begin controls on click
  controls.addEventListener("lock", function() {
    instructions.style.display = "none";
    blocker.style.display = "none";
  });
  // Restore overlays and stop controls on esc
  controls.addEventListener("unlock", function() {
    blocker.style.display = "block";
    instructions.style.display = "";
  });
  // Add controls to scene
  scene.add(controls.getObject());

  // Define key controls for WASD controls
  const onKeyDown = function(event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        moveForward = true;
        break;

      case "ArrowLeft":
      case "KeyA":
        moveLeft = true;
        break;

      case "ArrowDown":
      case "KeyS":
        moveBackward = true;
        break;

      case "ArrowRight":
      case "KeyD":
        moveRight = true;
        break;

      case "Space":
        if (canJump === true) velocity.y += 350;
        canJump = false;
        break;
    }
  };

  const onKeyUp = function(event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        moveForward = false;
        break;

      case "ArrowLeft":
      case "KeyA":
        moveLeft = false;
        break;

      case "ArrowDown":
      case "KeyS":
        moveBackward = false;
        break;

      case "ArrowRight":
      case "KeyD":
        moveRight = false;
        break;
    }
  };

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  // Add raycasting for mouse controls
  raycaster = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(0, -1, 0),
    0,
    10
  );

  // Generate the ground
  let floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
  floorGeometry.rotateX(-Math.PI/2 );

  // Vertex displacement pattern for ground
  let position = floorGeometry.attributes.position;

  for (let i = 0, l = position.count; i < l; i++) {
    vertex.fromBufferAttribute(position, i);

    vertex.x += Math.random() * 20 + 10;
    vertex.y += Math.random() * 2 ;
    vertex.z += Math.random() * 20 + 10;

    position.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

  position = floorGeometry.attributes.position;
  const colorsFloor = [];

  for (let i = 0, l = position.count; i < l; i++) {
    color.setRGB(Math.random() * 0.1+ 0.1, Math.random() * 0.3 + 0.1, Math.random() * 0.1+0.5);
    colorsFloor.push(color.r, color.g, color.b);
  }

  floorGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colorsFloor, 4)
  );

  const floorMaterial = new THREE.MeshBasicMaterial({
    vertexColors: true
  });

  const floor = new THREE.Mesh(floorGeometry, floorMaterial);

  // Insert completed floor into the scene
  scene.add(floor);


  const loader1 = new GLTFLoader().load(
    "./assets/building.gltf", // comment this line out and un comment the line below to swithc models
    function(gltf) {

      // set position and scale
			mesh1 = gltf.scene;
			mesh1.position.set(1, 2, 10);
			mesh1.scale.set(5, 5, 5);
      // mesh.rotation.y = 80;

			// Add model to scene
			scene.add(mesh1);

      // Check for and play animation frames
      mixer1 = new THREE.AnimationMixer(mesh1);
      gltf.animations.forEach((clip) => {
        mixer1.clipAction(clip).play();
      });
	  },
    undefined,
    function(error) {
      console.error(error);
    }
  );
  //
  // Material to be added to model
  var newMaterial = new THREE.MeshBasicMaterial({ color: 0xc49beb });

  const loader2 = new GLTFLoader().load(
    "./assets/QR-animated.gltf", // comment this line out and un comment the line below to swithc models
    function(gltf) {
      gltf.scene.traverse(function(child) {
        if (child.isMesh) {
          child.material = newMaterial;
        }
      });
      // set position and scale
      mesh2 = gltf.scene;
      mesh2.position.set(1, 2, 10);
      mesh2.scale.set(5, 5, 5);

      // Add model to scene
      scene.add(mesh2);
      //
      // Check for and play animation frames
      mixer2 = new THREE.AnimationMixer(mesh2);
      gltf.animations.forEach((clip) => {
        mixer2.clipAction(clip).play();
      });
    },
    undefined,
    function(error) {
      console.error(error);
    }
  );
  // Material to be added to model
  var newMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
  const loader3 = new GLTFLoader().load(
    "./assets/QR-animated.gltf", // comment this line out and un comment the line below to swithc models
    function(gltf) {
      gltf.scene.traverse(function(child) {
        if (child.isMesh) {
          child.material = newMaterial;
        }
      });

      // set position and scale
			mesh3 = gltf.scene;
			mesh3.position.set(70, -10, 10);
			mesh3.scale.set(7, 7, 7);
       mesh3.rotation.y = 10;



			// Add model to scene
			scene.add(mesh3);
      //
      // Check for and play animation frames
      mixer3 = new THREE.AnimationMixer(mesh3);
      gltf.animations.forEach((clip) => {
        mixer3.clipAction(clip).play();
      });
	  },
    undefined,
    function(error) {
      console.error(error);
    }
  );
  // Material to be added to model
  var newMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
  const loader4 = new GLTFLoader().load(
    "./assets/QR-animated.gltf", // comment this line out and un comment the line below to swithc models
    function(gltf) {
      gltf.scene.traverse(function(child) {
        if (child.isMesh) {
          child.material = newMaterial;
        }
      });

      // set position and scale
      mesh4 = gltf.scene;
      mesh4.position.set(-80,30, 80);
      mesh4.scale.set(6, 6, 6);
       mesh4.rotation.y = 180;



      // Add model to scene
      scene.add(mesh4);
      //
      // Check for and play animation frames
      mixer4 = new THREE.AnimationMixer(mesh4);
      gltf.animations.forEach((clip) => {
        mixer4.clipAction(clip).play();
      });
    },
    undefined,
    function(error) {
      console.error(error);
    }
  );


  // Define Rendered and html document placement
	renderer = new THREE.WebGLRenderer({
    antialias: true, alpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setClearColor( 0x138999, 12 );
    renderer.setClearColor( 0xa17a99, 2 );
  document.body.appendChild(renderer.domElement);

  // Listen for window resizing
  window.addEventListener("resize", onWindowResize);
}

// Window resizing function
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}



// Animation function
function animate() {

  requestAnimationFrame(animate);
	var delta = clock.getDelta();
	if (mixer1) mixer1.update(delta);
  if (mixer2) mixer2.update(delta);
  if (mixer3) mixer3.update(delta);
  if (mixer4) mixer4.update(delta);

  const time = performance.now();

  // Check for controls being activated (locked) and animate scene according to controls
  if (controls.isLocked === true) {
    raycaster.ray.origin.copy(controls.getObject().position);
    raycaster.ray.origin.y -= 10;

    const intersections = raycaster.intersectObjects(objects, false);

    const onObject = intersections.length > 0;

    const delta = (time - prevTime) / 1000;

    velocity.x -= velocity.x * 30.0 * delta;
    velocity.z -= velocity.z * 30.0 * delta;

    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize(); // this ensures consistent movements in all directions

    if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
    if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

    if (onObject === true) {
      velocity.y = Math.max(0, velocity.y);
      canJump = true;
    }

    controls.moveRight(-velocity.x * delta);
    controls.moveForward(-velocity.z * delta);

    controls.getObject().position.y += velocity.y * delta; // new behavior

    if (controls.getObject().position.y < 10) {
      velocity.y = 0;
      controls.getObject().position.y = 10;

      canJump = true;
    }
  }


  prevTime = time;

  renderer.render(scene, camera);
}
