
export default class MissionCalc {
  #missionCalcFormElId
  #missionCalcFormEl

  #resultFieldId
  #resultFieldEl

  constructor (missionCalcFormElId, resultFieldId) {
    this.#missionCalcFormElId = missionCalcFormElId
    this.#resultFieldId = resultFieldId
  }

  get missionCalcFormEl () {
    if (this.#missionCalcFormEl === undefined) {
      this.#missionCalcFormEl = document.getElementById(this.#missionCalcFormElId)
    }
    return this.#missionCalcFormEl
  }

  get resultFieldEl () {
    if (this.#resultFieldEl === undefined) {
      this.#resultFieldEl = document.getElementById(this.#resultFieldId)
    }
    return this.#resultFieldEl
  }

  changeListener () {
    this.missionCalcFormEl.querySelectorAll('input').forEach((input) => input.addEventListener('change', this.calc))
  }

  submitListener () {
    this.missionCalcFormEl.addEventListener('submit', (e) => e.preventDefault())
  }

  setup () {
    this.changeListener()
    this.submitListener()
    this.calc()
  }

  calc () {
    const resetEstimatedTime = this.missionCalcFormEl.reset_time.value * this.missionCalcFormEl.retry_rate.value
    let resetTime = resetEstimatedTime
    if (resetEstimatedTime < this.missionCalcFormEl.cool_down.value) {
      resetTime = this.missionCalcFormEl.cool_down.value
    }

    const inMissionTime = this.missionCalcFormEl.time_taken.value * this.missionCalcFormEl.retry_rate.value
    const totalTime = inMissionTime + resetTime
    console.log('Time taken:', totalTime)

    const ratio = totalTime / 60

    const creditsPerHour = this.missionCalcFormEl.credit.value * ratio

    this.resultFieldEl.value = creditsPerHour
  }
}
