'use strict';

const showElement = (element) => {
  element.classList.remove(`hidden`);
};

const getRandomElement = (array) => {
  const min = 0;
  const index = Math.floor(Math.random() * (array.length - min)) + min;
  return array[index];
};

const createContent = (string) => {
  const container = document.createElement(`div`);
  container.innerHTML = string;
  return container;
};

const RendererWizards = function () {
  this.setup = document.querySelector(`.setup`);
  this.similarListElement = this.setup.querySelector(`.setup-similar-list`);
  this.setupSimilar = this.setup.querySelector(`.setup-similar`);
  this.elementsQuantity = 4;
  this.names = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
  this.familyNames = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
  this.coatColors = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)
  `, `rgb(56, 159, 117)
  `, `rgb(215, 210, 55)
  `, `rgb(0, 0, 0)`];
  this.eyesColors = [`black`, `red`, `blue`, `yellow`, `green`];

  this.render = function () {
    showElement(this.setup);
    this.pasteFragment(this.getArray());
  };

  this.getArray = function () {
    const array = [];
    for (let i = 0; i < this.elementsQuantity; i++) {
      const object = Object.assign({}, {
        name: `${getRandomElement(this.names)} ${getRandomElement(this.familyNames)}`,
        coatcolor: getRandomElement(this.coatColors),
        eyesColor: getRandomElement(this.eyesColors)
      });
      array.push(object);
    }
    return array;
  };


  this.getTemplate = function (wizard) {
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
  };

  this.pasteFragment = (array) => {
    const fragment = document.createDocumentFragment();
    for (const item of array) {
      fragment.appendChild(createContent(this.getTemplate(item)));
    }
    this.similarListElement.appendChild(fragment);
    this.setupSimilar.classList.remove(`hidden`);
  };
};

const rendererWizards = new RendererWizards();
rendererWizards.render();
