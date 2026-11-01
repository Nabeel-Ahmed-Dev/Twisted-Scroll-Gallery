import Experience from "../Experience";
import Gallery from "./Gallery";

export default class World {
  experience: Experience;
  gallery: Gallery;

  constructor() {
    this.experience = Experience.getInstance();
    this.gallery = new Gallery();
  }

  update() {
    this.gallery.update();
  }
}
