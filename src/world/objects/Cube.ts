import * as THREE from "three";
import Experience from "../../Experience";

export default class Cube {
  experience: Experience;
  mesh: THREE.Mesh;

  constructor() {
    this.experience = Experience.getInstance();

    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    );
    this.experience.scene.add(this.mesh);
  }

  update() {
    this.mesh.rotation.y += this.experience.time.delta * 0.6;
  }
}
