type Callback = (...args: unknown[]) => void;

export default class EventEmitter {
  private callbacks: Record<string, Callback[]> = {};

  on(event: string, cb: Callback) {
    (this.callbacks[event] ??= []).push(cb);
    return this;
  }

  off(event: string, cb: Callback) {
    this.callbacks[event] = (this.callbacks[event] ?? []).filter(
      (fn) => fn !== cb,
    );
    return this;
  }

  trigger(event: string, ...args: unknown[]) {
    for (const cb of this.callbacks[event] ?? []) {
      cb(...args);
    }
    return this;
  }
}
