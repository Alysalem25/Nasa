// eslint-disable-next-line no-unused-vars
import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import earthMap from "../texture/earthmap.jpeg";
import earthbump from "../texture/earthbump.jpeg";
import earthCloud from "../texture/earthCloud.png";
import galaxy from "../texture/galaxy.png";
import initializeDomEvents from "./threex";
import Arowana from "../../assets/marine/Fish_endangered.jpg";
// import Seal from "../texture/MOm-Mediterranean-monk-seal-.jpg";
import Seal from "../../assets/marine/MOm-Mediterranean-monk-seal-.jpg";
import Vaquita from "../../assets/marine/Vaquita.jpg";
// import turtle from "../../assets/marine/turtle.jpg"
import catfish from "../../assets/marine/catfish.jpeg";
import Whale from "../../assets/marine/Whale.jpeg"
import { Link } from "react-router-dom";

const GlobeComponent = () => {
  const [showCard, setShowCard] = useState(false);
  const [place, setPlace] = useState("");
  const [creature, setCreature] = useState("");
  const [cid, setCid] = useState(0);
  const [cimage, setCimage] = useState("");

  const containerRef = useRef(null);
  const targetRotationX = useRef(0.05);
  const targetRotationY = useRef(0.02);
  const mouseX = useRef(0);
  const mouseXOnMouseDown = useRef(0);
  const mouseY = useRef(0);
  const mouseYOnMouseDown = useRef(0);
  const windowHalfX = useRef(window.innerWidth / 2);
  const windowHalfY = useRef(window.innerHeight / 2);
  const slowingFactor = 0.98;
  const dragFactor = 0.0002;
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const contentRef = useRef();


  const earthMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load(earthMap),
    bumpMap: new THREE.TextureLoader().load(earthbump),
    bumpScale: 0.01,
  });
  const cloudMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load(earthCloud),
    transparent: true,
  });
  const starMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(galaxy),
    side: THREE.BackSide,
  });
  const countryData = [
    {
      id: 2,
      name: "See of Cortez",
      creature: "Vaquita Phocoena Sinus",
      cimage: Vaquita,
      latitude: 65,
      longitude: -70,
    },
    {
      id: 1,
      name: "South Asia",
      creature: "The Asian Arowana",
      cimage: Arowana,
      latitude: 80,
      longitude: 90,
    },
    {
      id: 5,
      name: "Mediterranean",
      creature: "Monachus monachus",
      cimage: Seal,
      latitude: 56.0, // increase - toward the south
      longitude: 147.0, // increas- toward the west
    },
    {
      id: 4,
      name: "the Lower Mekong River",
      creature: " Mekong Giant Catfish",
      cimage: catfish,
      latitude: 75,
      longitude: 75,
    },
    {
      id: 3,
      name: "North atlantic",
      creature: " Right Whale",
      cimage: Whale ,
      latitude: -45,
      longitude: 30,
    },
    // Add more country coordinates here...
  ];


  const onDocumentMouseDown = (event) => {
    event.preventDefault();
    document.addEventListener("mousemove", onDocumentMouseMove);
    document.addEventListener("mouseup", onDocumentMouseUp);

    mouseXOnMouseDown.current = event.clientX - windowHalfX.current;
    mouseYOnMouseDown.current = event.clientY - windowHalfY.current;
  };

  const onDocumentMouseMove = (event) => {
    mouseX.current = event.clientX - windowHalfX.current;
    targetRotationX.current =
      (mouseX.current - mouseXOnMouseDown.current) * dragFactor;
    mouseY.current = event.clientY - windowHalfY.current;
    targetRotationY.current =
      (mouseY.current - mouseYOnMouseDown.current) * dragFactor;
  };

  const onDocumentMouseUp = () => {
    document.removeEventListener("mousemove", onDocumentMouseMove);
    document.removeEventListener("mouseup", onDocumentMouseUp);
  };

  const writeContent = () => {
    const contentElement = contentRef.current;
    contentElement.textContent = "salma";
  };
  useEffect(() => {
    let animationFrameId;
    const container = containerRef.current;
    // Initialize DOM events
    const THREEx = {};
    initializeDomEvents(THREE, THREEx);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // create scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // create camera
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 1.7;
      cameraRef.current = camera;

      // create earthGeometry
      const earthGeometry = new THREE.SphereGeometry(0.4, 32, 32);

      const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
      scene.add(earthMesh);

      // set ambientlight
      const ambientlight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientlight);
      // set point light
      const pointerlight = new THREE.PointLight(0xffffff, 0.9);
      // set light position
      pointerlight.position.set(5, 3, 5);
      scene.add(pointerlight);

      // create cloudGeometry
      const cloudGeometry = new THREE.SphereGeometry(0.42, 32, 32);

      const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
      scene.add(cloudMesh);

      // create starGeometry
      const starGeometry = new THREE.SphereGeometry(5, 64, 64);

      const starMesh = new THREE.Mesh(starGeometry, starMaterial);
      scene.add(starMesh);

      /////////////////same, no change


      const markers = [];
      const domEvents = new THREEx.DomEvents(camera, renderer.domElement);
      countryData.forEach((country) => {
        const phi = ((90 - country.latitude) * Math.PI) / 180;
        const theta = ((country.longitude + 180) * Math.PI) / 180;

        const radius = 0.4;
        const markerX = radius * Math.sin(phi) * Math.cos(theta);
        const markerY = radius * Math.cos(phi);
        const markerZ = radius * Math.sin(phi) * Math.sin(theta);

        const markerGeometry = new THREE.SphereGeometry(0.01, 16, 16);
        const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);
        markerMesh.position.set(markerX, markerY, markerZ);
        scene.add(markerMesh);
        domEvents.addEventListener(markerMesh, "click", function () {
          setPlace(country.name);
          setCreature(country.creature);
          setCid(country.id);
          setCimage(country.cimage);
          setShowCard((prev) => !prev);
        });

        markers.push(markerMesh);
      });

      const render = () => {
        earthMesh.rotateOnWorldAxis(
          new THREE.Vector3(0, 1, 0),
          targetRotationX.current
        );
        earthMesh.rotateOnWorldAxis(
          new THREE.Vector3(1, 0, 0),
          targetRotationY.current
        );
        cloudMesh.rotateOnWorldAxis(
          new THREE.Vector3(0, 1, 0),
          targetRotationX.current
        );
        cloudMesh.rotateOnWorldAxis(
          new THREE.Vector3(1, 0, 0),
          targetRotationY.current
        );
        targetRotationY.current *= slowingFactor;
        targetRotationX.current *= slowingFactor;

        // Update marker positions
        markers.forEach((markerMesh, index) => {
          const country = countryData[index];
          const phi = ((90 - country.latitude) * Math.PI) / 180;
          const theta = ((country.longitude + 180) * Math.PI) / 180;
          const radius = 0.4;
          // Convert spherical coordinates to Cartesian coordinates
          const markerX = radius * Math.cos(phi) * Math.cos(theta);
          const markerY = radius * Math.sin(phi);
          const markerZ = radius * Math.cos(phi) * Math.sin(theta);
          // Apply the same rotation as the Earth and cloud meshes
          const markerPosition = new THREE.Vector3(markerX, markerY, markerZ);
          markerPosition.applyEuler(earthMesh.rotation);
          markerMesh.position.copy(markerPosition);
        });

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(render);
      };

      const handleResize = () => {
        windowHalfX.current = window.innerWidth / 2;
        windowHalfY.current = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      const animate = () => {
        render();
      };

      animate();

      window.addEventListener("resize", handleResize);

      container.addEventListener("mousedown", onDocumentMouseDown);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", handleResize);
        container.removeEventListener("mousedown", onDocumentMouseDown);

        container.removeChild(renderer.domElement);
      };

    // create renderer
  }, []);

  return (
    <div className="relative">
      <div ref={containerRef} className="block z-10" />

      <div className="what_is_globe">
        <h1>It is our planet</h1>
        <ul>
          <li>
            click on <span>Red</span>point to show the endanger Species
          </li>
        </ul>
      </div>

      {showCard && (
        <div className="col-md-4 col-sm-6 col-xs-12">
          <div className="card">
            <div
              className="cover item-a"
              style={{ backgroundImage: `url(${cimage})` }}
            >
              <h1>{creature}</h1>
              <span className="price" ref={contentRef} onClick={writeContent}>
                {place}
              </span>
              <div className="card-back">
                <Link to={`/species/${cid}`}>Read More</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobeComponent;
