type Listener = (data?: any) => void;

class SimpleEventEmitter {
  private events: { [key: string]: Listener[] };

  constructor() {
    this.events = {};
  }

  on(event: string, listener: Listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  off(event: string, listener: Listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((l) => l !== listener);
  }

  emit(event: string, data?: any) {
    if (!this.events[event]) return;
    this.events[event].forEach((listener) => listener(data));
  }
}

export const eventEmitter = new SimpleEventEmitter();
