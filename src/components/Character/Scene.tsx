import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    let resizeListenerRef: (() => void) | null = null;
    // Guard against StrictMode double-invoke: if cleanup runs before the async
    // loadCharacter() resolves, isCancelled=true prevents the stale callback
    // from adding a second character object to the shared scene.
    let isCancelled = false;

    // Capture the node locally so cleanup works even after React nulls canvasDiv.current
    const canvasContainer = canvasDiv.current;
    if (canvasContainer) {
      let rect = canvasContainer.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasContainer.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      let progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      loadCharacter().then((gltf) => {
        // If cleanup already ran (StrictMode double-invoke), bail out —
        // do NOT add anything to the scene or set up listeners.
        if (isCancelled || !gltf) return;

        const animations = setAnimations(gltf);
        hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
        mixer = animations.mixer;
        let character = gltf.scene;
        // Clear any ghost objects before adding the real character
        scene.clear();
        scene.add(character);
        headBone = character.getObjectByName("spine006") || null;
        screenLight = character.getObjectByName("screenlight") || null;
        progress.loaded().then(() => {
          if (isCancelled) return;
          setTimeout(() => {
            light.turnOnLights();
            animations.startIntro();
          }, 2500);
        });
        let onResize = () => handleResize(renderer, camera, canvasDiv, character);
        window.addEventListener("resize", onResize);
        // Save a ref to the listener for cleanup
        resizeListenerRef = onResize;
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }

      // Intersection Observer to track visibility
      let isVisible = true;
      const observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
        },
        { threshold: 0 }
      );
      observer.observe(canvasContainer);

      const animate = () => {
        requestAnimationFrame(animate);
        // Only render and calculate animations when visible in the viewport
        if (!isVisible) return;

        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        // Signal all pending async callbacks to abort
        isCancelled = true;
        clearTimeout(debounce);
        scene.clear();
        renderer.dispose();
        observer.disconnect();
        if (resizeListenerRef) {
          window.removeEventListener("resize", resizeListenerRef);
        }
        // Use locally-captured node — canvasDiv.current is nulled by React before cleanup
        if (canvasContainer && renderer.domElement.parentNode === canvasContainer) {
          canvasContainer.removeChild(renderer.domElement);
        }
        if (landingDiv) {
          document.removeEventListener("mousemove", onMouseMove);
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
