import * as THREE from "three";
import Experience from "../Experience";

export default class Camera {
  experience: Experience;
  instance: THREE.PerspectiveCamera;

  constructor() {
    this.experience = Experience.getInstance();
    const { scene } = this.experience;
    const sizes = this.experience.sizes;

    this.instance = new THREE.PerspectiveCamera(
      80,
      sizes.width / sizes.height,
      0.1,
      100,
    );
    this.instance.position.z = 3;
    scene.add(this.instance);
  }

  update() {}

  resize() {
    const sizes = this.experience.sizes;

    this.instance.aspect = sizes.width / sizes.height;
    this.instance.updateProjectionMatrix();
  }
}
