'use strict';

const setup = document.querySelector(`.setup`);
const similarListElement = setup.querySelector(`.setup-similar-list`);
const setupSimilar = setup.querySelector(`.setup-similar`);

const wizardsOptions = {
  elementsQuantity: 4,
  names: [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`],
  familyNames: [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`],
  coatColors: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)
  `, `rgb(56, 159, 117)
  `, `rgb(215, 210, 55)
  `, `rgb(0, 0, 0)`],
  eyesColors: [`black`, `red`, `blue`, `yellow`, `green`]
};


const setElementVisible = (element, isVisible) => {
  element.classList.toggle(`hidden`, !isVisible);
};

// после принятия пр убрать эту функцию, так как она есть в другом модуле
const generateNumber = (min, max) => (Math.random() * (max - min)) + min;

const shuffleArray = (array) => {
  const newArray = array.slice();

  for (let i = newArray.length - 1; i >= 0; i--) {
    const index = Math.floor(generateNumber(0, i));
    const lastIndex = newArray.length - 1;
    [newArray[index], newArray[lastIndex]] = [newArray[lastIndex], newArray[index]];
  }
  return newArray;
};

const getArray = (names, familyNames, coatColors, eyesColors, quantity) => {
  const mixNames = shuffleArray(names);
  const mixFamilyNames = shuffleArray(familyNames);
  const mixCoatColors = shuffleArray(coatColors);
  const mixEyesColors = shuffleArray(eyesColors);
  const array = [];
  for (let i = 0; i < quantity; i++) {
    const object = Object.assign({}, {
      name: `${mixNames[i]} ${mixFamilyNames[i]}`,
      coatColor: mixCoatColors[i],
      eyesColor: mixEyesColors[i]
    });
    array.push(object);
  }
  return array;
};


const createContent = (string) => {
  const container = document.createElement(`template`);
  container.innerHTML = string;
  return container.content;
};

class WizardsRenderer {
  constructor(data, list) {
    this.data = data;
    this.list = list;
    this.renderElements();
  }

  render() {
    this.renderElements();
  }

  getTemplate(wizard) {
    return `<div class="setup-similar-item">
      <div class="setup-similar-content">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 86" class="setup-similar-wizard">
          <g class="wizard">
            <use xlink:href="#wizard-coat" class="wizard-coat" fill="${wizard.coatColor}"></use>
            <use xlink:href="#wizard-head" class="wizard-head"></use>
            <use xlink:href="#wizard-eyes" class="wizard-eyes" fill="${wizard.eyesColor}"></use>
            <use xlink:href="#wizard-hands" class="wizard-hands"></use>
          </g>
        </svg>
      </div>
      <p class="setup-similar-label">${wizard.name}</p>
    </div>`;
  }

  renderElements() {
    const fragment = document.createDocumentFragment();
    for (const item of this.data) {
      fragment.appendChild(createContent(this.getTemplate(item)));
    }
    this.list.appendChild(fragment);
  }
}

const dataArray = getArray(wizardsOptions.names, wizardsOptions.familyNames, wizardsOptions.coatColors, wizardsOptions.eyesColors, wizardsOptions.elementsQuantity);

const rendererWizards = new WizardsRenderer(dataArray, similarListElement);
rendererWizards.render();
setElementVisible(setupSimilar, true);
setElementVisible(setup, true);
