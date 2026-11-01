import * as THREE from "three";
import Camera from "./core/Camera";
import Renderer from "./core/Renderer";
import Sizes from "./core/Sizes";
import World from "./world/World";
import Time from "./core/Time";
import Scroll from "./core/Scroll";

export default class Experience {
  private static instance: Experience;

  canvas!: HTMLCanvasElement;
  scene!: THREE.Scene;
  camera!: Camera;
  renderer!: Renderer;
  world!: World;
  sizes!: Sizes;
  time!: Time;
  scroll!: Scroll;

  constructor(canvas?: HTMLCanvasElement) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;

    this.canvas = canvas!;
    this.sizes = new Sizes();
    this.time = new Time();
    this.scroll = new Scroll();

    this.time.on("tick", () => {
      this.update();
    });

    this.sizes.on("resize", () => {
      this.resize();
    });

    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.world = new World();
    this.renderer = new Renderer();
  }

  static getInstance() {
    return Experience.instance;
  }

  private update() {
    this.scroll.update();
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
}
