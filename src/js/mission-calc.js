
export default class MissionCalc {
  #missionCalcFormElId;
  #missionCalcFormEl;

  #resultFieldId;
  #resultFieldEl;

  constructor (missionCalcFormElId, resultFieldId) {
    this.#missionCalcFormElId = missionCalcFormElId;
    this.#resultFieldId = resultFieldId;
  }

  get missionCalcFormEl() {
    if (this.#missionCalcFormEl === undefined) {
      this.#missionCalcFormEl = document.getElementById(this.#missionCalcFormElId);
    }
    return this.#missionCalcFormEl;
  }

  get resultField() {
    if (this.#resultFieldEl === undefined) {
      this.#resultFieldEl = document.getElementById(this.#resultFieldId);
    }
    return this.#resultFieldEl;
  }

  changeListener() {
    this.missionCalcFormEl.querySelectorAll("input").forEach((input) => input.addEventListener('change', this.calc))
  }

  submitListener() {
    this.missionCalcEl.addEventListener('submit', (e) => e.preventDefault());
  }

  setup() {
    this.changeListener();
    this.submitListener();
    this.calc();
  }

  calc() {
    this.resultFieldEl.value = "Hello";
  }
}
