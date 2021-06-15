import { questions } from '../../root/getQuastions.js';
class Timer {
   constructor(questions, timer) {
      this.questions = questions.questions;
      this.timer = document.querySelector(timer);
      this.timeNow = 60 + 1;
   }
   refresh() {
      this.timeNow = 60 + 1;
   }
   render() {
      let timer = `
      <div class="timer__body">
         <span>${--this.timeNow} sec</span>
      </div>
      `;
      this.timer.innerHTML = timer;
      return this.timeNow
   }
};

export const timerPage = new Timer(questions, '#timer');
