// Import required source code
// Import three.js core
import * as THREE from "./build/three.module.js";
// Import pointer lock controls
import { PointerLockControls } from "./src/PointerLockControls.js";
import { GLTFLoader } from "./src/GLTFLoader.js";
import { Water } from './src/Water2.js';

// Establish variables
let camera, scene, renderer, controls, material, particle, clock, mesh1, mixer1, mesh2, mixer2, mesh3, mixer3, mesh4, mixer4, mesh5, mixer5;
let water;
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

    camera.position.y = 1;
    camera.position.x = 50;
    camera.position.z = 500;



    // Define basic scene parameters
    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0xffffff, 0, 750);

    particle = new THREE.Object3D();
    scene.add(particle);

    var geometry = new THREE.TetrahedronGeometry(2, 0);
    var geom = new THREE.IcosahedronGeometry(7, 1);
    var geom2 = new THREE.IcosahedronGeometry(15, 1);

    // water from three.js ocean
    const water = buildWater();

    function buildWater() {
        const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
        const water = new Water(
            waterGeometry,
            {
                color: 0xffb6c1,
                textureWidth: 1024,
                textureHeight: 1024,
                waterNormals: new THREE.TextureLoader().load(
                    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg', function (texture) {
                        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                    }),
                alpha: 1.0,
                sunDirection: new THREE.Vector3(),
                sunColor: 0xffffff,
                waterColor: 0xffb6c1,
                distortionScale: 3.7,
                fog: scene.fog !== undefined
            }
        );
        water.rotation.x = - Math.PI / 2;
        scene.add(water);

        const waterUniforms = water.material.uniforms;
        return water;
    }

    // var material = new THREE.MeshPhongMaterial({
    //     color: 0xffffff,
    //     shading: THREE.FlatShading
    // });

    for (var i = 0; i < 1000; i++) {
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
        mesh.position.multiplyScalar(90 + (Math.random() * 700));
        mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
        particle.add(mesh);
    }

    // // Define scene lighting
    // const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
    // light.position.set(0.5, 1, 0.75);
    // scene.add(light);

    // light
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Define controls
    controls = new PointerLockControls(camera, document.body);

    // Identify the html divs for the overlays
    const blocker = document.getElementById("blocker");
    const instructions = document.getElementById("instructions");
    // const container = document.getElementById("space");
    clock = new THREE.Clock();


    // Load GLTF model1



    const loader1 = new GLTFLoader().load(
        "./assets/rock.gltf",
        function (gltf) {
            // set position and scale
            mesh1 = gltf.scene;
            mesh1.position.set(-15, -38, -120);
            mesh1.scale.set(5, 5, 5);
            // mesh1.rotation.y = 80;


            // Add model to scene
            scene.add(mesh1);


        },
        undefined,
        function (error) {
            console.error(error);
        }
    );



    const loader2 = new GLTFLoader().load(
        "./assets/rock2.gltf",
        function (gltf) {
            // set position and scale
            mesh5 = gltf.scene;
            mesh5.position.set(-1, -42, 200);
            mesh5.scale.set(5, 5, 5);
            // mesh1.rotation.y = 80;


            // Add model to scene
            scene.add(mesh5);


        },
        undefined,
        function (error) {
            console.error(error);
        }
    );

    // Load GLTF model2 and animation

    const loader3 = new GLTFLoader().load(
        "./assets/heart1.gltf",
        function (gltf) {

            // set position and scale
            mesh2 = gltf.scene;
            mesh2.position.set(1, 6, 1);
            mesh2.scale.set(2, 2, 2);
            mesh2.rotation.y = 60;


            // Add model to scene
            scene.add(mesh2);
            // Check for and play animation frames
            mixer2 = new THREE.AnimationMixer(mesh2);
            gltf.animations.forEach((clip) => {
                mixer2.clipAction(clip).play();
            });
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );

    // Load GLTF model3 and animation



    const loader4 = new GLTFLoader().load(
        "./assets/crystals.gltf",
        function (gltf) {
            // set position and scale
            mesh3 = gltf.scene;
            mesh3.position.set(1, -1, 100);
            mesh3.scale.set(2, 2, 2);
            mesh3.rotation.y = 20;


            // Add model to scene
            scene.add(mesh3);
            // Check for and play animation frames
            mixer3 = new THREE.AnimationMixer(mesh3);
            gltf.animations.forEach((clip) => {
                mixer3.clipAction(clip).play();
            });
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );



    const loader5 = new GLTFLoader().load(
        "./assets/tree1.gltf",
        function (gltf) {
            // set position and scale
            mesh4 = gltf.scene;
            mesh4.position.set(10, -70, -50);
            mesh4.scale.set(10, 10, 10);
            mesh4.rotation.y = .01;


            // Add model to scene
            scene.add(mesh4);

        },
        undefined,
        function (error) {
            console.error(error);
        }
    );
    // Listen for clicks and respond by removing overlays and starting mouse look controls
    // Listen
    instructions.addEventListener("click", function () {
        controls.lock();
    });
    // Remove overlays and begin controls on click
    controls.addEventListener("lock", function () {
        instructions.style.display = "none";
        blocker.style.display = "none";
    });
    // Restore overlays and stop controls on esc
    controls.addEventListener("unlock", function () {
        blocker.style.display = "block";
        instructions.style.display = "";
    });
    // Add controls to scene
    scene.add(controls.getObject());

    // Define key controls for WASD controls
    const onKeyDown = function (event) {
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

    const onKeyUp = function (event) {
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

    // Define Rendered and html document placement
    renderer = new THREE.WebGLRenderer({
        antialias: true, alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
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

    particle.rotation.x += 0.0000;
    particle.rotation.y -= 0.0010;
    var delta = clock.getDelta();
    // if (mixer1) mixer1.update(delta);
    if (mixer2) mixer2.update(delta);
    if (mixer3) mixer3.update(delta);

    const time = performance.now();

    // Check for controls being activated (locked) and animate scene according to controls
    if (controls.isLocked === true) {
        raycaster.ray.origin.copy(controls.getObject().position);
        raycaster.ray.origin.y -= 10;

        const intersections = raycaster.intersectObjects(objects, false);

        const onObject = intersections.length > 0;

        const delta = (time - prevTime) / 1000;

        velocity.x -= velocity.x * 15.0 * delta;
        velocity.z -= velocity.z * 15.0 * delta;

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
