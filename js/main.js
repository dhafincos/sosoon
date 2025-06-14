// Fungsi untuk menampilkan model 3D
function showModel(modelPath) {
    const modal = document.getElementById('unitModal');
    const viewer = document.getElementById('unitViewer3d');
    viewer.innerHTML = '';
    
    // Inisialisasi scene Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, viewer.clientWidth/viewer.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(viewer.clientWidth, viewer.clientHeight);
    viewer.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);
    
    // Grid helper
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);
    
    // Load model 3D
    const loader = new THREE.GLTFLoader();
    loader.load(
        modelPath,
        function (gltf) {
            scene.add(gltf.scene);
            
            // Orbit controls
            const controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            
            // Posisi kamera
            camera.position.set(5, 3, 5);
            camera.lookAt(0, 0, 0);
            
            // Animasi
            function animate() {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            }
            
            animate();
        },
        undefined,
        function (error) {
            console.error('Error loading model:', error);
        }
    );
    
    // Handle resize
    window.addEventListener('resize', function() {
        camera.aspect = viewer.clientWidth / viewer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(viewer.clientWidth, viewer.clientHeight);
    });
    
    modal.style.display = 'flex';
}