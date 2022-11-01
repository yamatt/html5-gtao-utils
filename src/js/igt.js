
export default class InGameTime {
  INGAME_TIME_EL_ID = "ingame-time";

  #ingame_time_el;

  GAME_CLOCK = 48 * 60; // 48 minutes in seconds
  GAME_OFFSET = -0.05; // in seconds

  #updater;

  get inGameTimeEl() {
    if (this.#ingame_time_el === undefined) {
      this.#ingame_time_el = document.getElementById(this.INGAME_TIME_EL_ID);
    }
    return this.#ingame_time_el;
  }

  get sinceMidnight() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(0)
    midnight.setMinutes(0)
    midnight.setSeconds(0)
    return (now.getTime() - midnight.getTime())/1000;
  }

  leftPadZero(number) {
    return `0${number}`.slice(-2)
  }

  renderTime(hours, minutes) {
    const hourPrepend = this.leftPadZero(hours);
    const minutePrepend = this.leftPadZero(minutes);
    return `${hourPrepend}:${minutePrepend}`
  }

  get inGameTimeProgress() {
    return this.sinceMidnight % this.GAME_CLOCK;
  }

  get inGameTimeDecimal() {
    return this.inGameTimeProgress / (this.GAME_CLOCK / 24);
  }

  get inGameTime() {
    const inGameTimeDecimal = this.inGameTimeDecimal + this.GAME_OFFSET; // I think the offset is actually a factor of rounding
    const inGameHours = Math.floor(inGameTimeDecimal)
    const inGameMinutes = Math.round((inGameTimeDecimal % 1) * 60);

    return this.renderTime(inGameHours, inGameMinutes);
  }

  run() {
    this.inGameTimeEl.value = this.inGameTime;
  }

  start() {
    this.run();
    if (this.#updater === undefined) {
      this.#updater = setInterval(this.run.bind(this), 250);
    }
  }

  stop() {
    clearInterval(this.#updater);
    this.#updater = undefined;
  }
}
