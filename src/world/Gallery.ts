import Experience from "../Experience";
import Media from "./objects/Media";

const IMAGES = [
  "images/1.jpg",
  "images/2.jpg",
  "images/3.jpg",
  "images/4.jpg",
  "images/5.jpg",
];

export default class Gallery {
  experience: Experience;
  medias: Media[] = [];
  spacing = 1.5;
  count = 10;

  constructor() {
    this.experience = Experience.getInstance();

    for (let i = 0; i < this.count; i++) {
      this.medias.push(new Media(i, this.spacing, IMAGES[i % IMAGES.length]));
    }
  }

  get totalHeight() {
    return this.spacing * this.count;
  }

  update() {
    const scroll = this.experience.scroll.current;
    const total = this.totalHeight;

    for (const media of this.medias) {
      media.update(scroll, total);
    }
  }
}
