
class Yourself {
  constructor() {
    this._currentSlide = null;
    this._forms = null;
    this._slides = null;
    this._beginBtn = null;
    this._resultsBtn = null;
    this._results = null;
    this._moreBtn = null;
    this._moreHint = null;


    this._onNext = this._onNext.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onResults = this._onResults.bind(this)
    this._onMore = this._onMore.bind(this)

  }

  async setup() {
    this._beginBtn = document.querySelector("#begin-btn");
    this._beginBtn.addEventListener("click", this._onNext);

    this._slides = document.querySelectorAll(".item");
    this._forms = document.querySelectorAll("form");
    for (let form of this._forms) {
      form.addEventListener("submit", this._onSubmit);
    }

    this._resultsBtn = document.querySelector("#results-btn");
    this._resultsBtn.addEventListener("click", this._onResults);
    this._results = document.querySelector("#fh5co-features-2");

    this._moreBtn = document.querySelector(".more-btn");
    this._moreBtn.addEventListener("click", this._onMore);
    this._moreHint = document.querySelector(".more-hint");

  }

  /* Get index of the current slide */
  _getCurrIndex() {
    for (let [index, node] of this._slides.entries()) {
      if (node === this._currentSlide) {
        return index;
      }
    }
  }

  /* Event Listener: When next button is clicked, continue to next slide */
  _onNext(event) {
    // Hide current slide
    this._currentSlide = event.target.closest(".item");
    let nextIndex = this._getCurrIndex() + 1;
    if (nextIndex >= this._slides.length) return;
    // Show next slide
    this._currentSlide.classList.remove("displayed");
    this._slides[nextIndex].classList.add("displayed");
  }

  /* Event Listener: When submit button is clicked, extract answers */
  async _onSubmit(event) {
    event.preventDefault();
    this._currentSlide = event.target.closest(".item");
    let questionIndex = this._getCurrIndex() - 1;

    // Extract form data
    let data = new FormData(this._forms[questionIndex]);
    let output = "";
    let answer = {}

    console.log(data.values())
    for (const entry of data) {
      // Muliple answers
      if (output !== "") {
        output = output + ", ";
      }
      // If no answer is given, prompt user with an alert
      if (entry[1] === "") {
        console.log("first");
        alert("Please provide an answer.");
        return;
      }
      output = output + entry[0] + "=" + entry[1] + "\r";
      answer[entry[0]] = entry[1]
    };

    // If no answer is given, prompt user with an alert
    if (output === "") {
      console.log("second");
      alert("Please provide an answer.");
      return;
    }

    console.log(answer);
    // Go to next slide
    this._onNext(event);
  }

  /* Event Listener: when results button is clicked, reveal data profile results */
  _onResults(event) {
    this._results.classList.remove("hide");
    this._results.scrollIntoView();
  }

  /* Event Listener: show answer when button of question 3 is clicked */
  _onMore(event) {
    this._moreHint.classList.remove("hide");
  }
}

let yourself = new Yourself();
yourself.setup();
