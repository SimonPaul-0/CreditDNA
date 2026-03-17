import * as THREE from 'three';

export function initDNA(canvas: HTMLCanvasElement): { dispose: () => void } {
  const scene = new THREE.Scene();
  const W = canvas.clientWidth || canvas.offsetWidth || 400;
  const H = canvas.clientHeight || canvas.offsetHeight || 600;
  const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
  camera.position.set(0, 0, 7);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H);
  renderer.setClearColor(0x000000, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  const ptLight1 = new THREE.PointLight(0x22c55e, 2, 20);
  ptLight1.position.set(3, 3, 3);
  scene.add(ptLight1);
  const ptLight2 = new THREE.PointLight(0x16a34a, 1.5, 20);
  ptLight2.position.set(-3, -3, 2);
  scene.add(ptLight2);
  const ptLight3 = new THREE.PointLight(0xd4500f, 0.8, 15);
  ptLight3.position.set(0, 0, 5);
  scene.add(ptLight3);

  const strandMat = new THREE.MeshPhongMaterial({ color: 0x22c55e, emissive: 0x0a3d1a, shininess: 80, transparent: true, opacity: 0.92 });
  const strandMat2 = new THREE.MeshPhongMaterial({ color: 0x16a34a, emissive: 0x061f0d, shininess: 80, transparent: true, opacity: 0.85 });
  const pairMat = new THREE.MeshPhongMaterial({ color: 0xd4500f, emissive: 0x3d1500, shininess: 60, transparent: true, opacity: 0.7 });

  const group = new THREE.Group();
  scene.add(group);

  const TURNS = 3.5;
  const HEIGHT = 5;
  const RADIUS = 1.2;
  const SEGMENTS = 80;
  const PAIR_COUNT = 18;

  const curve1Points: THREE.Vector3[] = [];
  const curve2Points: THREE.Vector3[] = [];
  for (let i = 0; i <= SEGMENTS; i++) {
    const t = (i / SEGMENTS) * Math.PI * 2 * TURNS;
    const y = (i / SEGMENTS) * HEIGHT - HEIGHT / 2;
    curve1Points.push(new THREE.Vector3(Math.cos(t) * RADIUS, y, Math.sin(t) * RADIUS));
    curve2Points.push(new THREE.Vector3(Math.cos(t + Math.PI) * RADIUS, y, Math.sin(t + Math.PI) * RADIUS));
  }

  const curve1 = new THREE.CatmullRomCurve3(curve1Points);
  const curve2 = new THREE.CatmullRomCurve3(curve2Points);
  const tube1 = new THREE.TubeGeometry(curve1, 200, 0.05, 8, false);
  const tube2 = new THREE.TubeGeometry(curve2, 200, 0.05, 8, false);
  group.add(new THREE.Mesh(tube1, strandMat));
  group.add(new THREE.Mesh(tube2, strandMat2));

  for (let i = 0; i < PAIR_COUNT; i++) {
    const t = i / (PAIR_COUNT - 1);
    const angle = t * Math.PI * 2 * TURNS;
    const y = t * HEIGHT - HEIGHT / 2;
    const p1 = new THREE.Vector3(Math.cos(angle) * RADIUS, y, Math.sin(angle) * RADIUS);
    const p2 = new THREE.Vector3(Math.cos(angle + Math.PI) * RADIUS, y, Math.sin(angle + Math.PI) * RADIUS);
    const mid = p1.clone().add(p2).multiplyScalar(0.5);
    const dir = p2.clone().sub(p1);
    const len = dir.length();
    const pairGeo = new THREE.CylinderGeometry(0.03, 0.03, len, 6);
    const pair = new THREE.Mesh(pairGeo, pairMat);
    pair.position.copy(mid);
    pair.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    group.add(pair);
    const sphereGeo = new THREE.SphereGeometry(0.1, 12, 12);
    const s1 = new THREE.Mesh(sphereGeo, strandMat);
    s1.position.copy(p1);
    group.add(s1);
    const s2 = new THREE.Mesh(sphereGeo, strandMat2);
    s2.position.copy(p2);
    group.add(s2);
  }

  const pCount = 200;
  const pPositions = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pPositions[i * 3]     = (Math.random() - 0.5) * 8;
    pPositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    pPositions[i * 3 + 2] = (Math.random() - 0.5) * 4;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
  const pMat = new THREE.PointsMaterial({ color: 0x22c55e, size: 0.04, transparent: true, opacity: 0.5 });
  scene.add(new THREE.Points(pGeo, pMat));

  let mouseX = 0, mouseY = 0;
  const onMouse = (e: MouseEvent) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener('mousemove', onMouse);

  const onResize = () => {
    const w = canvas.clientWidth || canvas.offsetWidth || 400;
    const h = canvas.clientHeight || canvas.offsetHeight || 600;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener('resize', onResize);

  let running = true;
  let raf = 0;
  const animate = () => {
    if (!running) return;
    raf = requestAnimationFrame(animate);
    const t = performance.now() * 0.001;
    group.rotation.y = t * 0.35 + mouseX * 0.3;
    group.rotation.x = mouseY * 0.15;
    group.position.y = Math.sin(t * 0.4) * 0.08;
    ptLight1.intensity = 2 + Math.sin(t * 1.5) * 0.5;
    renderer.render(scene, camera);
  };
  animate();

  return {
    dispose: () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    }
  };
}
