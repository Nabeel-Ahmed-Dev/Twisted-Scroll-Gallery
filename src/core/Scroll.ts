import EventEmitter from "../utils/EventEmitter";

export default class Scroll extends EventEmitter {
  target = 0;
  current = 0;
  ease = 0.08;

  private lastY = 0;
  private dragging = false;

  constructor() {
    super();

    this.onWheel = this.onWheel.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);

    window.addEventListener("wheel", this.onWheel, { passive: false });
    window.addEventListener("touchstart", this.onTouchStart, { passive: true });
    window.addEventListener("touchmove", this.onTouchMove, { passive: false });
    window.addEventListener("touchend", this.onTouchEnd, { passive: true });
  }

  private onWheel(event: WheelEvent) {
    event.preventDefault();
    this.target += event.deltaY * 0.003;
  }

  private onTouchStart(event: TouchEvent) {
    this.dragging = true;
    this.lastY = event.touches[0].clientY;
  }

  private onTouchMove(event: TouchEvent) {
    if (!this.dragging) return;
    event.preventDefault(); // stop page bounce; needs passive: false

    const y = event.touches[0].clientY;
    const delta = this.lastY - y; // finger up → content up (same as wheel)
    this.lastY = y;

    this.target += delta * 0.01; // tune: 0.005 – 0.02
  }

  private onTouchEnd() {
    this.dragging = false;
  }

  update() {
    this.current += (this.target - this.current) * this.ease;
  }

  destroy() {
    window.removeEventListener("wheel", this.onWheel);
    window.removeEventListener("touchstart", this.onTouchStart);
    window.removeEventListener("touchmove", this.onTouchMove);
    window.removeEventListener("touchend", this.onTouchEnd);
  }
}
