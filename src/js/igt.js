
export default class InGameTime {
  #ingameTimeEl
  #ingameTimeElId

  GAME_CLOCK = 48 * 60 // 48 minutes in seconds
  GAME_OFFSET = -6.15 // in seconds

  #updater

  constructor (igtElId) {
    this.#ingameTimeElId = igtElId
  }

  get inGameTimeEl () {
    if (this.#ingameTimeEl === undefined) {
      this.#ingameTimeEl = document.getElementById(this.#ingameTimeElId)
    }
    return this.#ingameTimeEl
  }

  get sinceMidnight () {
    const now = new Date()
    const midnight = new Date(now)
    midnight.setHours(0)
    midnight.setMinutes(0)
    midnight.setSeconds(0)
    return (now.getTime() - midnight.getTime()) / 1000
  }

  leftPadZero (number) {
    return `0${number}`.slice(-2)
  }

  renderTime (hours, minutes) {
    const hourPrepend = this.leftPadZero(hours)
    const minutePrepend = this.leftPadZero(minutes)
    return `${hourPrepend}:${minutePrepend}`
  }

  get inGameTimeProgress () {
    return this.sinceMidnight % this.GAME_CLOCK
  }

  get inGameTimeDecimal () {
    return this.inGameTimeProgress / (this.GAME_CLOCK / 24)
  }

  get inGameTime () {
    const inGameTimeDecimal = this.inGameTimeDecimal + this.GAME_OFFSET // I think the offset is actually a factor of rounding
    const inGameHours = Math.floor(inGameTimeDecimal)
    const inGameMinutes = Math.round((inGameTimeDecimal % 1) * 60)

    return this.renderTime(inGameHours, inGameMinutes)
  }

  run () {
    this.inGameTimeEl.value = this.inGameTime
  }

  start () {
    if (this.inGameTimeEl) {
      this.run()
      if (this.#updater === undefined) {
        this.#updater = setInterval(this.run.bind(this), 250)
      }
    }
  }

  stop () {
    clearInterval(this.#updater)
    this.#updater = undefined
  }
}
