import * as THREE from "three";
import Sizes from "./Sizes";
import Experience from "../Experience";

export default class Renderer {
  experience: Experience;
  instance: THREE.WebGLRenderer;
  private sizes: Sizes;

  constructor() {
    this.experience = Experience.getInstance();
    this.sizes = this.experience.sizes;
    this.instance = new THREE.WebGLRenderer({
      canvas: this.experience.canvas,
      antialias: true,
      alpha: true,
    });
    this.instance.setClearColor(0x000000, 0);
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    const { scene, camera } = this.experience;
    this.instance.render(scene, camera.instance);
  }
}
