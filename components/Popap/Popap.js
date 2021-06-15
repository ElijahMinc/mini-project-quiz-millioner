import { questions } from '../../root/getQuastions.js';
import { timerPage } from './../Timer/Timer.js';
import { quastionsCard } from './../Questions/Questions.js';
import { hints } from './../Hints/Hints.js';
import { getMoneyPage } from './../GetMoney/GetMoney.js';
class Popap {
   constructor(questions, popap, timer) {
      this.questions = questions.questions;
      this.popap = document.querySelector(popap);
      this.timer = timer;
      this.timerTick = true;
   }
   usePhone(answer) {
      let phone = `
      <div class="popap__body">
         <h2 class="popap__title">Внимание!</h2>
         <div class="popap__content">
            Ответ зала: <strong class="answer-bold">${answer}</strong>
         </div>
      </div>
   `;
      this.popap.classList.add('_show');
      this.popap.innerHTML = phone;
      setTimeout(() => {
         this.popap.classList.remove('_show')
         this.popap.innerHTML = ``;
      }, 3000);
   }
   attention() {
      let statusTitlePopap = `Внимание`;
      let infoText = `имеете одну попытку! Будьте внимательны!`;
      let html = `
         <div class="popap__body">
            <h2 class="popap__title">${statusTitlePopap}</h2>
            <div class="popap__content">
               Вы ${infoText}
            </div>
         </div>
      `;
      this.popap.classList.add('_show');
      this.popap.innerHTML = html;
      setTimeout(() => {
         this.popap.classList.remove('_show')
         this.popap.innerHTML = ``;
      }, 3000);
   }
   warning(attempt, dollars) {
      if (attempt < 0) {
         if (dollars === quastionsCard.reward[quastionsCard.rewardCurrent].innerText) {
            this.total(dollars);
         }
         this.total(dollars);
      }
      if (attempt === 0) {
         this.attention();
         quastionsCard.render();
      }
   }
   total(dollars, endGame) {
      let statusTitlePopap = `Внимание`;
      let statusBtn = `Okey`;
      let infoText = ``;
      if (quastionsCard.current == this.questions.length
         && dollars
         || endGame) {
         quastionsCard.innerText = `1000 000$`;
         if (endGame) {
            quastionsCard.innerText = dollars;
            this.startGameAgain();
         }
         statusBtn = `Забрать приз и начать сначала?`;
         infoText = `выиграли <strong class="answer-bold">${quastionsCard.innerText}</strong>`;
      } else if (quastionsCard.attempt === 0) {
         infoText = `имеете одну попытку! Будьте внимательны!`;
      }
      if (quastionsCard.attempt < 0) {
         if (quastionsCard.rewardCurrent <= 9 && quastionsCard.rewardCurrent >= 6) {
            statusBtn = `Начать заново`;
            infoText = `выиграли <strong class="answer-bold">${quastionsCard.dollars}</strong>`;
         } else if (quastionsCard.rewardCurrent <= 5 && quastionsCard.rewardCurrent >= 0) { // ноль
            statusBtn = `Начать заново`;
            infoText = `выиграли <strong class="answer-bold">${quastionsCard.dollars}</strong>`
         } else {
            statusBtn = `Начать заново`;
            infoText = `проиграли <strong class="answer-bold">${quastionsCard.dollars}</strong>`;
         }
      }
      let html = `
         <div class="popap__body">
            <h2 class="popap__title">${statusTitlePopap}</h2>
            <div class="popap__content">
               Вы ${infoText}
            </div>
            <button class="popap__btn">
               ${statusBtn}
            </button>

         </div>
      `;
      // <div class="popap__close">
      //    <i class="fas fa-times"></i>
      // </div>
      this.popap.classList.add('_show');
      this.popap.innerHTML = html;
      this.setup();
   }
   // handleCloseBtn() {
   //    this.popap.classList.remove('_show');
   //    pageBody.innerHTML = `
   //    <div class="not-today">
   //       <img src="img/cat.jpg" />
   //    </div>
   //    `
   // }
   timerRefresh() { //ОБНОВЛЕНИЕ ТАЙМЕРА ПО ОКОНЧАНИЮ ВРЕМЕНИ
      let timer = setInterval(() => {
         let nowTime = this.timer.render();
         if (nowTime === 0) {
            getMoneyPage.render();
            quastionsCard.attempt--
            if (quastionsCard.current == this.questions.length) {
               clearInterval(timer);
               this.total(this.dollars);
            }
            if (quastionsCard.attempt == 0) {
               quastionsCard.dollars = quastionsCard.reward[quastionsCard.rewardCurrent].innerText; // DOLLARS
               quastionsCard.reward[quastionsCard.rewardCurrent].classList.add('active'); // DOLLARS
               quastionsCard.rewardCurrent--;
               this.attention();//ВЫЗОВ ПОПАПА В КОНЦЕ
               document.querySelector('[data-type="health"]').classList.add('disabled');
               timerPage.refresh();
               quastionsCard.render();
            } else if (quastionsCard.attempt < 0) {
               if (quastionsCard.attempt < 0) {
                  if (quastionsCard.rewardCurrent <= 9 && quastionsCard.rewardCurrent >= 6) {
                     quastionsCard.dollars = quastionsCard.reward[10].innerText;
                  }
                  if (quastionsCard.rewardCurrent <= 5 && quastionsCard.rewardCurrent >= 0) { // был 0
                     quastionsCard.dollars = quastionsCard.reward[5].innerText;
                  }
                  popap.timerTick = false;
                  popap.warning(quastionsCard.attempt, quastionsCard.dollars);
               }
               clearInterval(timer); // TIMER FALSE!!
               this.total(this.dollars);
            }
         }
         if (!this.timerTick) {
            clearInterval(timer); // TIMER FALSE!!
         }
      }, 1000);
   }
   startGameAgain() {
      popap.timerTick = false;
      timerPage.refresh();
      quastionsCard.reward.forEach(e => e.classList.remove('active'));
      quastionsCard.rewardCurrent = 14;
      quastionsCard.nextLevel = 1;
      quastionsCard.current = 0;
      quastionsCard.attempt = 1;
   }
   handleStartBtn() {
      if (quastionsCard.current == this.questions.length || quastionsCard.attempt < 0) {
         // НАЧАТЬ ЗАНОВО!
         this.startGameAgain();
      }
      quastionsCard.reward.forEach(e => e.classList.remove('active'));
      popap.timerTick = true;
      this.timerRefresh();
      this.popap.classList.remove('_show');
      hints.render();
      quastionsCard.render();
   }
   setup() {
      // const closeBtn = document.querySelector('.popap__close');
      const startGame = document.querySelector('.popap__btn');
      // closeBtn.addEventListener('click', () => this.handleCloseBtn());
      startGame.addEventListener('click', () => this.handleStartBtn());
   }
   render() {
      let html = `
         <div class="popap__body">
            <h2 class="popap__title">Внимание!</h2>
            <div class="popap__content">
               На каждый вопрос даётся 1 минута! Начинаем?
            </div>
            <button class="popap__btn">
               Начать игру
            </button>

         </div>
      `;
      // <div class="popap__close">
      //    <i class="fas fa-times"></i>
      // </div>
      this.popap.classList.add('_show');
      this.popap.innerHTML = html;
      this.setup();
   }
}
export const popap = new Popap(questions, '#popap', timerPage);
