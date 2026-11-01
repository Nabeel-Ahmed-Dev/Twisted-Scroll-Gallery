import EventEmitter from "../utils/EventEmitter";
import { Timer } from "three";

export default class Time extends EventEmitter {
  private timer: Timer;
  elapsed: number;
  delta: number;

  constructor() {
    super();

    this.timer = new Timer();
    this.timer.connect(document);
    this.elapsed = 0;
    this.delta = 0;

    window.requestAnimationFrame((t) => this.tick(t));
  }

  tick(timestamp: number) {
    this.timer.update(timestamp);

    this.delta = this.timer.getDelta();
    this.elapsed = this.timer.getElapsed();

    this.trigger("tick");

    window.requestAnimationFrame((t) => this.tick(t));
  }
}
