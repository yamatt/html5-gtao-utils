import InGameTime from "./igt.js";

(function () {
  const ingame_time = new InGameTime('ingame-time');
  ingame_time.start();

  const mission_calc = new MissionCalc('calc', 'result');
  mission_calc.setup();
})();
