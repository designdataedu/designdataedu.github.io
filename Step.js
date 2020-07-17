
export default class Step {
  constructor(name) {
    this.name = name;
  }

  addToDOM(parent) {
    let step = document.createElement("a");
    step.classList.add("fh5co-figure");
    step.classList.add("to-animate");

    parent.appendChild(image);
  }
}

/*
 * make Step class (vertical)
 * addToDOM - create element, add class to style it, find parent
 */
