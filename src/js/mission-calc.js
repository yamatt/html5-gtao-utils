
export default class MissionCalc {
  #missionCalcFormElId
  #missionCalcFormEl

  #creditResultFieldId
  #creditResultFieldEl

  #rpResultFieldId
  #rpResultFieldEl

  constructor (missionCalcFormElId, creditResultFieldId, rpResultFieldId) {
    this.#missionCalcFormElId = missionCalcFormElId
    this.#creditResultFieldId = creditResultFieldId
    this.#rpResultFieldId = rpResultFieldId
  }

  get missionCalcFormEl () {
    if (this.#missionCalcFormEl === undefined) {
      this.#missionCalcFormEl = document.getElementById(this.#missionCalcFormElId)
    }
    return this.#missionCalcFormEl
  }

  get creditResultFieldEl () {
    if (this.#creditResultFieldEl === undefined) {
      this.#creditResultFieldEl = document.getElementById(this.#creditResultFieldId)
    }
    return this.#creditResultFieldEl
  }

  get rpResultFieldEl () {
    if (this.#rpResultFieldEl === undefined) {
      this.#rpResultFieldEl = document.getElementById(this.#rpResultFieldId)
    }
    return this.#rpResultFieldEl
  }

  changeListener () {
    this.missionCalcFormEl.querySelectorAll('input').forEach((input) => input.addEventListener('change', this.formChanged.bind(this)))
  }

  submitListener () {
    this.missionCalcFormEl.addEventListener('submit', (e) => e.preventDefault())
  }

  setup () {
    if (this.missionCalcFormEl) {
      this.changeListener()
      this.submitListener()
      this.calcCredit(this.missionCalcFormEl)
      this.calcRP(this.missionCalcFormEl)
    }
  }

  formChanged (e) {
    this.calcCredit(e.target.form)
    this.calcRP(e.target.form)
  }

  calcCredit (formEl) {
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

    this.creditResultFieldEl.value = parseInt(creditsPerHour).toLocaleString()
  }

  calcRP (formEl) {
    const resetEstimatedTime = formEl.reset_time.value * formEl.retry_rate.value
    let resetTime = resetEstimatedTime
    if (resetEstimatedTime < formEl.cool_down.value) {
      resetTime = formEl.cool_down.value
    }

    const inMissionTime = formEl.time_taken.value * formEl.retry_rate.value
    const totalTime = inMissionTime + resetTime
    console.log('Time taken:', totalTime)

    const ratio = totalTime / 60

    const rpPerHour = formEl.rp.value / ratio

    this.rpResultFieldEl.value = parseInt(rpPerHour).toLocaleString()
  }
}
