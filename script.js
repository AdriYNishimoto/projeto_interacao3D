import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

let scene, camera, renderer, controls, model, directionalLight;

function init() {
    // Configuração da cena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    // Configuração da câmera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Configuração do renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight - 60); // Ajuste para os controles
    document.getElementById('canvasContainer').appendChild(renderer.domElement);

    // Controles de órbita
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Luzes
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Redimensionamento da janela
    window.addEventListener('resize', onWindowResize);

    // Configuração do input de arquivo
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', handleFileSelect);

    // Configuração do controle de brilho
    const brightnessInput = document.getElementById('brightness');
    brightnessInput.addEventListener('input', (event) => {
        directionalLight.intensity = parseFloat(event.target.value);
    });

    animate();
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    const reader = new FileReader();

    reader.onload = function(e) {
        // Remove modelo anterior, se existir
        if (model) scene.remove(model);

        if (fileName.endsWith('.glb')) {
            const loader = new GLTFLoader();
            loader.parse(e.target.result, '', (gltf) => {
                model = gltf.scene;
                scene.add(model);
                adjustModel();
            }, (error) => {
                console.error('Erro ao carregar o modelo .glb:', error);
            });
        } else if (fileName.endsWith('.obj')) {
            const loader = new OBJLoader();
            const text = new TextDecoder().decode(e.target.result);
            model = loader.parse(text);
            model.traverse((child) => {
                if (child.isMesh && !child.material) {
                    child.material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
                }
            });
            scene.add(model);
            adjustModel();
        }
    };

    if (fileName.endsWith('.glb') || fileName.endsWith('.obj')) {
        reader.readAsArrayBuffer(file);
    }
}

function adjustModel() {
    // Centraliza e ajusta a escala do modelo
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 5 / maxDim;

    model.scale.set(scale, scale, scale);
    model.position.sub(center.multiplyScalar(scale));

    // Ajusta a câmera
    camera.position.z = maxDim * scale * 2;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight - 60); // Ajuste para os controles
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

init();