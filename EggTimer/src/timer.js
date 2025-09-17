// Timer logic skeleton
// See TASK-basic-timer-logic.md for requirements and structure

class EggTimer {
  constructor(onTick, onFinish) {
    this.duration = 0; // seconds
    this.remaining = 0;
    this.interval = null;
    this.onTick = onTick || (()=>{});
    this.onFinish = onFinish || (()=>{});
    this.running = false;
  }

  setTime(seconds) {
    this.duration = seconds;
    this.remaining = seconds;
    this.onTick(this.remaining);
  }

  start() {
    if (this.running || this.remaining <= 0) return;
    this.running = true;
    this.interval = setInterval(() => {
      if (this.remaining > 0) {
        this.remaining--;
        this.onTick(this.remaining);
        if (this.remaining === 0) {
          this.stop();
          this.onFinish();
        }
      }
    }, 1000);
  }

  pause() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.running = false;
    }
  }

  reset() {
    this.pause();
    this.remaining = this.duration;
    this.onTick(this.remaining);
  }

  stop() {
    this.pause();
    this.remaining = 0;
    this.onTick(this.remaining);
  }
}

export default EggTimer;
