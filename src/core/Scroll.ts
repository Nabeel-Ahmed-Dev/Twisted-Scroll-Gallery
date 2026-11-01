import EventEmitter from "../utils/EventEmitter";

export default class Scroll extends EventEmitter {
  target = 0;
  current = 0;
  ease = 0.08;

  constructor() {
    super();

    this.onWheel = this.onWheel.bind(this);
    window.addEventListener("wheel", this.onWheel, { passive: false });
  }

  private onWheel(event: WheelEvent) {
    this.target += event.deltaY * 0.003;
  }

  update() {
    this.current += (this.target - this.current) * this.ease;
  }

  destory() {
    window.removeEventListener("wheel", this.onWheel);
  }
}
