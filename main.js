(()=>{"use strict";class e{#e;#t;GAME_CLOCK=2880;GAME_OFFSET=-6.15;#i;constructor(e){this.#t=e}get inGameTimeEl(){return void 0===this.#e&&(this.#e=document.getElementById(this.#t)),this.#e}get sinceMidnight(){const e=new Date,t=new Date(e);return t.setHours(0),t.setMinutes(0),t.setSeconds(0),(e.getTime()-t.getTime())/1e3}leftPadZero(e){return`0${e}`.slice(-2)}renderTime(e,t){return`${this.leftPadZero(e)}:${this.leftPadZero(t)}`}get inGameTimeProgress(){return this.sinceMidnight%this.GAME_CLOCK}get inGameTimeDecimal(){return this.inGameTimeProgress/(this.GAME_CLOCK/24)}get inGameTime(){const e=this.inGameTimeDecimal+this.GAME_OFFSET,t=Math.floor(e),i=Math.round(e%1*60);return this.renderTime(t,i)}run(){this.inGameTimeEl.value=this.inGameTime}start(){this.inGameTimeEl&&(this.run(),void 0===this.#i&&(this.#i=setInterval(this.run.bind(this),250)))}stop(){clearInterval(this.#i),this.#i=void 0}}class t{#s;#l;#r;#n;#a;#m;constructor(e,t,i){this.#s=e,this.#r=t,this.#a=i}get missionCalcFormEl(){return void 0===this.#l&&(this.#l=document.getElementById(this.#s)),this.#l}get creditResultFieldEl(){return void 0===this.#n&&(this.#n=document.getElementById(this.#r)),this.#n}get rpResultFieldEl(){return void 0===this.#m&&(this.#m=document.getElementById(this.#a)),this.#m}changeListener(){this.missionCalcFormEl.querySelectorAll("input").forEach((e=>e.addEventListener("change",this.formChanged.bind(this))))}submitListener(){this.missionCalcFormEl.addEventListener("submit",(e=>e.preventDefault()))}setup(){this.missionCalcFormEl&&(this.changeListener(),this.submitListener(),this.calcCredit(this.missionCalcFormEl),this.calcRP(this.missionCalcFormEl))}formChanged(e){this.calcCredit(e.target.form),this.calcRP(e.target.form)}calcCredit(e){const t=e.reset_time.value*e.retry_rate.value;let i=t;t<e.cool_down.value&&(i=e.cool_down.value);const s=e.time_taken.value*e.retry_rate.value+i;console.log("Time taken:",s);const l=s/60,r=e.credit.value/l;this.creditResultFieldEl.value=parseInt(r).toLocaleString()}calcRP(e){const t=e.reset_time.value*e.retry_rate.value;let i=t;t<e.cool_down.value&&(i=e.cool_down.value);const s=e.time_taken.value*e.retry_rate.value+i;console.log("Time taken:",s);const l=s/60,r=e.rp.value/l;this.rpResultFieldEl.value=parseInt(r).toLocaleString()}}new e("ingame-time").start(),new t("calc","credit_result","rp_result").setup()})();
//# sourceMappingURL=main.js.map