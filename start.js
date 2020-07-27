
class Index {
  constructor() {
    this._characterBtns = null;
    this._selected = null;
    this._quiz = null;
    this._datasetBtns = null;
    this._datasetsMenu = null;
    this._steps = null;
    this._continue = null;
    this._onCharacter = this._onCharacter.bind(this);
    this._onStep = this._onStep.bind(this);
    this._onDataset = this._onDataset.bind(this);
  }

  async setup() {
    this._quiz = document.querySelector("#fh5co-testimony");
    this._datasetsMenu = document.querySelector("#datasets-menu");
    this._continue = document.querySelector("#continue");

    // Set current character as active
    let character;
    if(getCharacter()) {
      character = CHARACTERS[getCharacter()];
    } else {
      character = CHARACTERS[0];
    }
    let element = document.querySelector(`#${character.id}`);
    element.classList.add("active");

    // Add click character event listeners
    this._characterBtns = document.querySelectorAll(".characterBtn");
    for (let button of this._characterBtns) {
      button.addEventListener("click", this._onCharacter);
    }
    this._loadCharacter();

    // Module steps
    this._steps = document.querySelectorAll(".step");
    for (let step of this._steps) {
      step.addEventListener("click", this._onStep);
    }

    // Datasets
    this._datasetBtns = document.querySelectorAll(".datasetBtn");
    for (let button of this._datasetBtns) {
      button.addEventListener("click", this._onDataset);
    }

  }

  /* Event Listener: When character is selected, make character active and load its contents */
  _onCharacter(event) {
    // Remove active event listeners from all other characters
    for (let button of this._characterBtns) {
      let character = button.parentNode;
      if (character.classList.contains("active")) {
        character.classList.remove("active");
      }
    }
    event.target.parentNode.classList.add("active");
    this._loadCharacter();
    this._quiz.classList.remove("hide");
    this._quiz.scrollIntoView();
  }

  /* Load character's contents */
  async _loadCharacter() {
    let indexSelected;
    // Find which character is active
    for (let i = 0; i < this._characterBtns.length; i++) {
      let button = this._characterBtns[i];
      let character = button.parentNode;
      if (character.classList.contains("active")) {
        indexSelected = i;
        break;
      }
    }
    // Populate
    this._selected = CHARACTERS[indexSelected];
    sessionStorage.setItem("character", this._selected.num);

  }

  /* Event Listener: When a module step is selected, displays the datasets menu. */
  _onStep(event) {
    this._datasetsMenu.classList.remove("hide");
    this._datasetsMenu.scrollIntoView();
  }

  /* Event Listener: When a dataset is selected, marks as active and displays continue button. */
  _onDataset(event) {
    // Remove active event listeners from all other datasets
    for (let button of this._datasetBtns) {
      let dataset = button.parentNode;
      if (dataset.classList.contains("active")) {
        dataset.classList.remove("active");
      }
    }
    event.target.parentNode.classList.add("active");
    this._continue.classList.remove("hide");
    this._continue.scrollIntoView();
  }

}

let index = new Index();
index.setup();
