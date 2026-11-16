import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Canvas3D({
  isHome = true,
  onHoverObjectChange,
  onDragStateChange
}) {
  const canvasRef = useRef(null);

  // Keep latest props in refs to avoid recreating the WebGL scene on prop changes
  const isHomeRef = useRef(isHome);
  isHomeRef.current = isHome;

  const onHoverRef = useRef(onHoverObjectChange);
  onHoverRef.current = onHoverObjectChange;

  const onDragRef = useRef(onDragStateChange);
  onDragRef.current = onDragStateChange;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const phone = window.innerWidth < 700;
    const lite = window.innerWidth < 1024;
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

    let renderer = null;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: !phone,
        powerPreference: 'high-performance',
        alpha: false
      });
    } catch (e) {
      console.warn('WebGL initialization failed, falling back to 2D gradient.', e);
      document.documentElement.classList.add('nogl');
      return;
    }

    if (!renderer) {
      document.documentElement.classList.add('nogl');
      return;
    }

    // Prevent default context lost crash
    const handleContextLost = (e) => {
      e.preventDefault();
      console.warn('WebGL context lost.');
    };
    canvas.addEventListener('webglcontextlost', handleContextLost, false);

    const BG = 0x0e0e0f;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BG);
    scene.fog = new THREE.FogExp2(BG, 0.021);

    const camera = new THREE.PerspectiveCamera(56, 1, 0.1, 300);

    const amb = new THREE.AmbientLight(0x7a7a86, 0.55);
    scene.add(amb);

    const sun = new THREE.DirectionalLight(0xffffff, 0.8);
    sun.position.set(6, 14, 10);
    scene.add(sun);

    const glow = new THREE.PointLight(0xff4d00, 1.2, 48, 2);
    scene.add(glow);

    const matA = new THREE.MeshStandardMaterial({
      color: 0x1d1d20,
      roughness: 0.75,
      metalness: 0.2
    });
    const matB = new THREE.MeshStandardMaterial({
      color: 0x2d2d32,
      roughness: 0.65,
      metalness: 0.25
    });
    const orange = new THREE.MeshBasicMaterial({ color: 0xff4d00 });

    function edged(mesh, color, opacity) {
      const edges = new THREE.EdgesGeometry(mesh.geometry);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color, transparent: true, opacity })
      );
      mesh.add(line);
      return mesh;
    }

    // Floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(70, 280),
      new THREE.MeshStandardMaterial({ color: 0x111113, roughness: 0.45, metalness: 0.35 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.z = -100;
    scene.add(floor);

    const gh = new THREE.GridHelper(280, 140, 0x3a3a40, 0x1e1e22);
    gh.position.set(0, 0.02, -100);
    gh.material.transparent = true;
    gh.material.opacity = 0.5;
    scene.add(gh);

    const cl = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.02, 280), orange);
    cl.position.set(0, 0.04, -100);
    scene.add(cl);

    // Corridor: fins + beams with spacious atrium and deep breathing room
    const step = lite ? 2 : 1;
    for (let i = 0; i < 34; i += step) {
      const z = 16 - i * 4.8;
      const h = 7.5 + Math.sin(i * 0.8) * 2.2 + (i % 5 === 0 ? 3 : 0);

      // Open clearance around the gateway: no fins right on top of or immediately behind the AT mark
      if (z > -12 && z < 2) continue;

      const isNearGateway = z >= 2 && z <= 12;
      const corridorWidth = isNearGateway ? 9.2 : 7.8 + Math.sin(i * 0.4) * 0.6;

      [-1, 1].forEach((s) => {
        const w = (0.5 + ((i + (s > 0 ? 1 : 0)) % 4 === 0 ? 0.6 : 0)) * (step === 2 ? 1.3 : 1);
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 1.8), i % 2 ? matA : matB);
        m.position.set(s * corridorWidth, h / 2, z);
        edged(m, 0x4a4a52, 0.55);
        scene.add(m);
      });

      if ((i % 3 === 0 || (step === 2 && i % 6 === 0)) && (z <= -16 || z >= 8)) {
        const beamW = corridorWidth * 2 + 2.5;
        const b = new THREE.Mesh(new THREE.BoxGeometry(beamW, 0.35, 1.1), matB);
        b.position.set(Math.sin(i * 0.7) * 1.2, 9.6 + Math.cos(i * 0.5) * 0.8, z);
        edged(b, i % 9 === 0 ? 0xff4d00 : 0x55555d, i % 9 === 0 ? 0.95 : 0.5);
        scene.add(b);
      }

      if (i % 5 === 0 && (z <= -16 || z >= 8)) {
        const st = new THREE.Mesh(new THREE.BoxGeometry(14, 0.04, 0.28), orange);
        st.position.set(0, 0.05, z);
        scene.add(st);
      }
    }

    function portal(z, w, h) {
      const g = new THREE.Group();
      const t = 0.3;
      [[0, h / 2, w, t], [0, -h / 2, w, t]].forEach((a) => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(a[2], a[3], 0.6), orange);
        m.position.set(a[0], a[1], 0);
        g.add(m);
      });
      [-1, 1].forEach((s) => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(t, h + t, 0.6), orange);
        m.position.set((s * w) / 2, 0, 0);
        g.add(m);
      });
      g.add(
        new THREE.Mesh(
          new THREE.PlaneGeometry(w, h),
          new THREE.MeshBasicMaterial({ color: 0xff4d00, transparent: true, opacity: 0.05, depthWrite: false })
        )
      );
      g.position.set(0, h / 2 + 0.2, z);
      scene.add(g);
    }
    portal(-28, 12.0, 9.5);
    portal(-56, 11.0, 8.8);
    portal(-86, 9.8, 8.2);

    // AT Mark Gateway: given generous space, scaled and grounded with breathing room
    const logo = new THREE.Group();
    logo.position.set(0, -0.4, -4.2);
    logo.scale.set(0.88, 0.88, 0.88);
    scene.add(logo);

    const logoParts = [];
    const interactives = [];
    const U = 0.0167;
    const px = (x) => (x - 790) * U;
    const py = (y) => (1296 - y) * U;

    function slab(w, h, d, x, y, dir) {
      const mat = new THREE.MeshStandardMaterial({
        color: 0xe9e5dd,
        roughness: 0.55,
        metalness: 0.1,
        emissive: 0xff4d00,
        emissiveIntensity: 0
      });
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(x, y, 0);
      m.userData = { base: m.position.clone(), dir, mat, hov: 0 };
      logo.add(m);
      logoParts.push(m);
      interactives.push(m);
      return m;
    }

    function leg(x1, y1, x2, y2, tx, dir) {
      const X1 = px(x1);
      const Y1 = py(y1);
      const X2 = px(x2);
      const Y2 = py(y2);
      const len = Math.hypot(X2 - X1, Y2 - Y1);
      const ang = Math.atan2(Y2 - Y1, X2 - X1);
      const m = slab(len, 1.35, 0.6, (X1 + X2) / 2 + tx, (Y1 + Y2) / 2, dir);
      m.rotation.z = ang;
      m.userData.base.copy(m.position);
      return m;
    }

    leg(527, 1146, 790, 705, 0.34, new THREE.Vector3(-1, 0, 0.4));
    leg(790, 705, 1054, 1146, -0.34, new THREE.Vector3(1, 0, 0.4));
    slab(419 * U, 59 * U, 0.6, px(1236.5), py(816.5), new THREE.Vector3(0, 0.9, 0.4));
    slab(59 * U, 397 * U, 0.6, px(1236.5), py(1097.5), new THREE.Vector3(0, -0.5, 0.4));

    [-1, 1].forEach((s) => {
      const d = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.3, 0.5), orange);
      d.position.set(s * 5.4, py(967), 0);
      logo.add(d);
    });
    logoParts.forEach((m) => {
      edged(m, 0xff4d00, 0);
    });

    // Panels, platforms and monolith
    const panels = [];
    function panel(w, h, d, x, y, z, ry, key) {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), matB);
      m.position.set(x, y, z);
      m.rotation.y = ry;
      edged(m, 0x66666e, 0.6);
      m.userData = { ry, key };
      scene.add(m);
      panels.push(m);
      return m;
    }
    panel(0.18, 4.5, 2.8, -5.4, 4.6, -20, 0.5, 1);
    panel(0.18, 3.6, 2.4, 5.2, 3.4, -24, -0.5, -1);

    [[3.4, 0.5, 0], [2.5, 0.5, 0.5], [1.6, 0.5, 1]].forEach((a, i) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(a[0] + 1.2, 0.5, 2.4), matB);
      m.position.set(-3.4 + i * 0.35, 0.25 + i * 0.52, -33);
      edged(m, i === 2 ? 0xff4d00 : 0x66666e, i === 2 ? 0.95 : 0.6);
      scene.add(m);
    });

    const mono = new THREE.Mesh(new THREE.BoxGeometry(2, 9, 2), matA);
    mono.position.set(3.7, 4.5, -41);
    edged(mono, 0x66666e, 0.6);
    scene.add(mono);

    const fr = new THREE.Group();
    [[2.8, 0.14, 0, 1.4], [2.8, 0.14, 0, -1.4]].forEach((a) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(a[0], a[1], 0.14), orange);
      m.position.set(0, a[3], 0);
      fr.add(m);
    });
    [-1, 1].forEach((s) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.94, 0.14), orange);
      m.position.set(s * 1.4, 0, 0);
      fr.add(m);
    });
    fr.position.set(-3.2, 5, -56);
    scene.add(fr);
    fr.userData = { key: 1 };
    panels.push(fr);

    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.1, 0),
      new THREE.MeshBasicMaterial({ color: 0x8d8c88, wireframe: true, transparent: true, opacity: 0.7 })
    );
    ico.position.set(3.4, 4.4, -60);
    ico.userData = { key: -1 };
    scene.add(ico);
    panels.push(ico);

    // Resize Handler
    function handleResize() {
      if (!renderer) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, phone ? 1.25 : (lite ? 1.5 : 2)));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = w / h < 1 ? 72 : 56;
      camera.updateProjectionMatrix();
    }
    handleResize();
    window.addEventListener('resize', handleResize);

    // Interaction state
    let tx = 0, ty = 0, mx = 0, my = 0;
    let ps = 0, exploded = 0, exTarget = 0;
    let dragging = false, dragStart = 0, yawT = 0, yaw = 0;
    let hoverObj = null;

    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();

    const onPointerMove = (e) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = -(e.clientY / window.innerHeight) * 2 + 1;
      if (dragging) {
        yawT = Math.min(1, Math.max(-1, ((e.clientX - dragStart) / window.innerWidth) * 2.2));
      }
    };

    const onPointerDown = (e) => {
      if (e.pointerType === 'touch' || e.pointerType === 'pen') return;
      if (e.target && e.target.closest && e.target.closest('#hero') && !hoverObj && !reduce) {
        dragging = true;
        dragStart = e.clientX;
        if (onDragRef.current) onDragRef.current(true);
      }
    };

    const onPointerUp = () => {
      if (dragging) {
        dragging = false;
        yawT = 0;
        if (onDragRef.current) onDragRef.current(false);
      }
    };

    const onClick = () => {
      if (hoverObj && isHomeRef.current) {
        exTarget = exTarget ? 0 : 1;
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    document.addEventListener('click', onClick);

    let animId;

    const loop = () => {
      animId = requestAnimationFrame(loop);

      if (!isHomeRef.current || !renderer) return;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const p = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      ps += (p - ps) * (reduce ? 1 : 0.07);

      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;
      yaw += (yawT - yaw) * (reduce ? 1 : 0.08);

      const z = 17 - ps * 88;

      const sway = Math.sin(ps * 7) * 1.3;
      camera.position.set(
        sway + mx * 1.4 + yaw * 3,
        3.3 + Math.sin(ps * Math.PI) * 1.1 + my * 0.5,
        z
      );
      camera.lookAt(
        mx * 2.2 + Math.sin(ps * 7 + 0.6) * 1.2 + yaw * 9,
        3.4 + my * 0.9,
        z - 20
      );
      camera.rotateZ(-mx * 0.03);

      glow.position.set(0, 4, z - 30);
      glow.intensity = 0.9 + Math.sin(ps * Math.PI) * 0.7;
      amb.intensity = 0.5 + ps * 0.25;
      scene.fog.density = 0.021 - ps * 0.005;

      // AT Logo interaction
      if (logo) {
        logo.rotation.y = reduce ? 0 : mx * 0.12;
        logo.rotation.x = reduce ? 0 : -my * 0.04;
        exploded += (exTarget - exploded) * (reduce ? 1 : 0.08);

        if (!lite && fine) {
          ndc.set(tx, ty);
          raycaster.setFromCamera(ndc, camera);
          const hit = raycaster.intersectObjects(interactives, false);
          const newHover = hit.length ? hit[0].object : null;
          if (newHover !== hoverObj) {
            hoverObj = newHover;
            if (onHoverRef.current) onHoverRef.current(!!hoverObj);
          }
        }

        logoParts.forEach((m) => {
          const u = m.userData;
          const want = m === hoverObj ? 1 : 0;
          u.hov += (want - u.hov) * 0.16;
          u.mat.emissiveIntensity = u.hov * 0.55;
          if (m.children[0] && m.children[0].material) {
            m.children[0].material.opacity = u.hov * 0.95;
          }
          m.position.copy(u.base).addScaledVector(u.dir, exploded * (1.1 + 0.5 * u.hov));
        });
      }

      // Panels rotation
      panels.forEach((o) => {
        const k2 = o.userData.key || 1;
        if (o.userData.ry !== undefined) {
          o.rotation.y = o.userData.ry + ps * 3 * k2;
        } else {
          o.rotation.y = ps * 5 * k2;
        }
      });

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('click', onClick);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []); // Run ONCE on mount

  return (
    <>
      <canvas id="gl" ref={canvasRef} aria-hidden="true" />
      <div className="vig" aria-hidden="true" />
    </>
  );
}
