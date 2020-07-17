
class Index {
  constructor() {
    this._characterBtns = null;
    this._selected = null;
    this._quiz = null;

    // this._steps = null;
    // this._step = null;
    this._onCharacter = this._onCharacter.bind(this);

  }

  async setup() {
    this._quiz = document.querySelector("#fh5co-testimony");
    // console.log(getCurrUser());

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
    this._characterBtns = document.querySelectorAll(".select");
    for (let button of this._characterBtns) {
      button.addEventListener("click", this._onCharacter);
    }
    this._loadCharacter();
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
        // console.log("set");
        indexSelected = i;
        break;
      }
    }
    // Populate
    this._selected = CHARACTERS[indexSelected];
    console.log(this._selected);
    sessionStorage.setItem("character", this._selected.num);

  }

}

let index = new Index();
index.setup();
