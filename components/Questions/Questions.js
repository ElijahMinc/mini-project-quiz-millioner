import { questions } from '../../root/getQuastions.js';
import { timerPage } from './../Timer/Timer.js';
import { getMoneyPage } from './../GetMoney/GetMoney.js';
import { popap } from './../Popap/Popap.js';
class Questions {
   constructor(questions, windowQuestion, timerPage) {
      this.questions = questions.questions;
      this.windowQuestion = document.querySelector(windowQuestion);
      this.nextLevel = 1;
      this.currentAnswer = ``;
      this.timerPage = timerPage;
      this.current = 0; //на каком уровне мы находимся
      this.reward = document.querySelectorAll('.nav-list__item');
      this.rewardCurrent = 14;
      this.attempt = 1;
      this.dollars = this.reward[this.rewardCurrent].innerText;
   }
   validate(currentAnswer) {
      let status = false;
      if (this.currentAnswer == currentAnswer || quastionsCard.attempt < 0) {
         status = true;
         // МЫ ОПРЕДЕЛЯЕМ ПРОШЛИ ЛИ НА СЛЕД. ЭТАП
         this.dollars = this.reward[this.rewardCurrent].innerText;
         this.reward[this.rewardCurrent].classList.add('active');
         this.rewardCurrent--;
         // reward ДОБАВИТЬ КЛАСС РЕВАРД
      }
      return status
   }
   handleClickBtn() {
      getMoneyPage.render();
      const answer = document.querySelector('[data-check="checked"]');
      if (answer) {
         const valueAnswer = answer.dataset.value;
         if (this.current >= this.questions.length) {
            popap.total(this.dollars) // РЕЗУЛЬТАТ ПОСЛЕ ПРОХОЖДЕНИЯ ТЕСТА
            popap.timerTick = false;
         }
         this.timerPage.refresh(); //REFRESH TIMER
         if (this.validate(valueAnswer)) {
            this.render();
         } else {
            this.attempt--;
            if (quastionsCard.attempt < 0) {
               if (quastionsCard.rewardCurrent <= 9 && quastionsCard.rewardCurrent >= 6) {
                  this.dollars = this.reward[10].innerText;
               }
               if (quastionsCard.rewardCurrent <= 5 && quastionsCard.rewardCurrent >= 0) {
                  this.dollars = this.reward[5].innerText;
               }
               popap.timerTick = false;
               popap.warning(this.attempt, this.dollars);
            }
            if (quastionsCard.attempt == 0) {
               const health = document.querySelector('[data-type="health"]');
               if (!health.classList.contains('disabled')) {
                  this.dollars = this.reward[this.rewardCurrent].innerText;
                  this.reward[this.rewardCurrent].classList.add('active');
                  this.rewardCurrent--;
                  health.classList.add('disabled');
               };
               popap.warning(this.attempt);
            }
         }
      }
   }
   checkedAnswer(e, answers) {
      const currentAnswer = e.currentTarget;
      answers.forEach(e => {
         e.classList.remove('checked');
         e.removeAttribute('data-check', 'checked');
         e.removeAttribute('data-value', currentAnswer.innerText);
      });
      currentAnswer.classList.add('checked');
      currentAnswer.setAttribute('data-check', 'checked');
      currentAnswer.setAttribute('data-value', currentAnswer.innerText);
   }
   levelUp() {
      let nextLevel = this.questions.filter(question => {
         return +question.id === this.nextLevel;
      });
      this.nextLevel++;
      return nextLevel;
   }
   setup() {
      const btn = document.querySelector('[data-type="next"]');
      const answers = document.querySelectorAll('.quiz-quastions__item');
      btn.addEventListener('click', () => this.handleClickBtn());
      if (answers.length) { answers.forEach(e => e.addEventListener('click', (e) => this.checkedAnswer(e, answers))) };
   }
   render() {
      const currentLevel = this.levelUp();
      if (currentLevel[0]) {
         const { id, quastionTitle, question, someAnswer, answer } = currentLevel[0];
         this.currentAnswer = answer;
         let li = ``;
         someAnswer.forEach(answer => {
            li += `
            <li class="quiz-quastions__item">
               <span>${answer}</span>
            </li>
            `;
         });
         let currentQuestion = `
            <h2 class="quiz__title">${quastionTitle}</h2>
            <h3 class="quiz__question">${question}</h3>
            <ul class="quiz-quastions d-grid">
               ${li}
            </ul>
            <button class="quiz__btn" data-type="next">
               Выбрать
            </button>
            `;
         this.windowQuestion.innerHTML = currentQuestion;
         this.setup();
         this.current = id;
      }
   }
};

export const quastionsCard = new Questions(questions, '#windowQuestion', timerPage);
