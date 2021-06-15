import { popap } from './../Popap/Popap.js';

class StartBtn {
   constructor(btnPage, popap) {
      this.btnPage = document.querySelector(btnPage);
      this.popap = popap
      this.render();
      this.setup();
   }
   hiddenBtn() {
      this.btnPage.style.display = 'none';
   }
   handleStartGame() {
      this.hiddenBtn();
      this.popap.render();
   }
   setup() {
      const btn = document.querySelector('[data-type="btn-start"]');
      btn.addEventListener('click', () => this.handleStartGame());
   }
   render() {
      let btn = `
      <div class="page__btn d-flex">
         <button id="btnStart" data-type="btn-start">Начать игру</button>
      </div>
      `
      this.btnPage.innerHTML = btn;
   }
};

export const startBtnPage = new StartBtn('#pageBtn', popap);
