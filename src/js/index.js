import InGameTime from './igt.js'
import MissionCalc from './mission-calc.js';

(function () {
  const ingameTime = new InGameTime('ingame-time')
  ingameTime.start()

  const missionCalc = new MissionCalc('calc', 'credit_result', 'rp_result')
  missionCalc.setup()
})()
