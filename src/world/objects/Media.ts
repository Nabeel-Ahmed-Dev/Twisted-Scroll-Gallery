import * as THREE from "three";
import Experience from "../../Experience";
import fragmentShader from "../../shaders/twist/fragment.glsl?raw";
import vertexShader from "../../shaders/twist/vertex.glsl?raw";

export default class Media {
  experience: Experience;
  mesh: THREE.Mesh;
  material!: THREE.ShaderMaterial;
  index: number;
  spacing: number;

  constructor(index: number, spacing: number, image: string) {
    this.experience = Experience.getInstance();
    this.mesh = new THREE.Mesh();
    this.index = index;
    this.spacing = spacing;

    this.createMesh(image);
  }

  createMesh(image: string) {
    const geometry = new THREE.PlaneGeometry(1.5, 2, 32, 64);

    const texture = new THREE.TextureLoader().load(image);
    texture.colorSpace = THREE.SRGBColorSpace;

    this.material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      side: THREE.DoubleSide,
      uniforms: {
        uTexture: new THREE.Uniform(texture),
        uY: new THREE.Uniform(0),
        uTwistMax: new THREE.Uniform(3),
        uRadius: new THREE.Uniform(30),
      },
    });

    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.frustumCulled = false;
    this.experience.scene.add(this.mesh);
  }

  update(scroll: number, totalHeight: number) {
    const { elapsed } = this.experience.time;
    let y = this.index * this.spacing + scroll + elapsed * 0.2;
    y = (((y % totalHeight) + totalHeight) % totalHeight) - totalHeight / 2;

    const angle = y + Math.PI * 0.5;

    this.mesh.position.set(Math.cos(angle), y * 1.25, Math.sin(angle));
    this.mesh.rotation.y = Math.PI * 0.5 - angle;

    this.material.uniforms.uY.value = y;
  }
}
