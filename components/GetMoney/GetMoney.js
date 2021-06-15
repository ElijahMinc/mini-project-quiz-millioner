import { quastionsCard } from './../Questions/Questions.js';
import { popap } from './../Popap/Popap.js';
class getMoney {
   constructor(pickUpPage) {
      this.pickUpPage = document.querySelector(pickUpPage);
      this.endGame = false;
   }
   getMoneyBtn() {
      this.pickUpPage.innerHTML = ``;
      this.endGame = true;
      popap.total(quastionsCard.dollars, this.endGame);
   }
   setup() {
      const btn = document.querySelector('[data-type="pick-up-btn"]');
      btn.addEventListener('click', () => this.getMoneyBtn());
   }
   render() {
      let getMoney = `
      <div class="btn-pick-up__body">
         <button class="pick-up" data-type="pick-up-btn" id="btnPickUp">Забрать деньги</button>
      </div>
      `;
      this.pickUpPage.innerHTML = getMoney;
      this.setup();
   }
};
export const getMoneyPage = new getMoney('#btnPickUp');
