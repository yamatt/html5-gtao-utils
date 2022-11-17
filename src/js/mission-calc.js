
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
    this.missionCalcFormEl.querySelectorAll('input').forEach((input) => input.addEventListener('change', this.formChanged.bind(this)))
  }

  submitListener () {
    this.missionCalcFormEl.addEventListener('submit', (e) => e.preventDefault())
  }

  setup () {
    this.changeListener()
    this.submitListener()
    this.calc(this.missionCalcFormEl)
  }

  formChanged (e) {
    this.calc(e.target.form)
  }

  calc (formEl) {
    const resetEstimatedTime = formEl.reset_time.value * formEl.retry_rate.value
    let resetTime = resetEstimatedTime
    if (resetEstimatedTime < formEl.cool_down.value) {
      resetTime = formEl.cool_down.value
    }

    const inMissionTime = formEl.time_taken.value * formEl.retry_rate.value
    const totalTime = inMissionTime + resetTime
    console.log('Time taken:', totalTime)

    const ratio = totalTime / 60

    const creditsPerHour = formEl.credit.value / ratio

    this.resultFieldEl.value = parseInt( creditsPerHour ).toLocaleString();
  }
}
