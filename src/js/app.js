/* eslint-disable no-param-reassign */
export default class App {
  constructor() {
    this.document = document;
    this.playerScore = this.document.querySelector('td.player-score');
    this.goblinScore = this.document.querySelector('td.goblin-score');
    this.field = document.querySelector('ul.field');
    this.fieldArray = Array.from(this.field.children);
    this.playerScoreVar = 0;
    this.goblinScoreVar = 0;
    this.field.addEventListener('click', this.click.bind(this), { capture: true });
  }

  init() {
    this.interval = setInterval(this.move.bind(this), 1000);
  }

  move() {
    const lastIndex = this.fieldArray.findIndex((item) => item.classList.contains('active'));
    const activeIndex = this.newIndex(lastIndex);
    this.fieldArray[lastIndex].classList.remove('active');
    this.fieldArray[activeIndex].classList.add('active');
    this.goblinScoreVar += 1;
    this.goblinScore.innerText = this.goblinScoreVar;
    if (this.goblinScoreVar > 4) {
      this.finish();
    }
  }

  newIndex(lastIndex, activeIndex) {
    activeIndex = Math.floor(Math.random() * this.fieldArray.length);
    if (activeIndex === lastIndex) {
      return this.newIndex(lastIndex, activeIndex);
    }
    return activeIndex;
  }

  click(event) {
    if (this.field.querySelector('li.active') === event.target) {
      this.playerScoreVar += 1;
      this.goblinScoreVar -= 1;
      this.playerScore.innerText = this.playerScoreVar;
      if (this.playerScoreVar < 5) {
        clearInterval(this.interval);
        this.move();
        this.interval = setInterval(this.move.bind(this), 1000);
      } else {
        this.finish();
      }
    }
  }

  finish() {
    clearInterval(this.interval);
    // eslint-disable-next-line no-restricted-globals
    this.final = confirm(`Победил ${(this.playerScoreVar > 4) ? 'Игрок' : 'Гоблин'}. Начать заново?`);
    if (this.final) {
      this.init();
    }
    this.playerScoreVar = 0;
    this.goblinScoreVar = 0;
    this.playerScore.innerText = this.playerScoreVar;
    this.goblinScore.innerText = this.playerScoreVar;
  }
}
