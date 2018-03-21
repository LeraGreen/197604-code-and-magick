'use strict';

const setup = document.querySelector(`.setup`);
const similarListElement = setup.querySelector(`.setup-similar-list`);
const setupSimilar = setup.querySelector(`.setup-similar`);


const wizardCoatColors = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const wizardEyesColors = [`black`, `red`, `blue`, `yellow`, `green`];
const fireballColors = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];

const wizardsOptions = {
  elementsQuantity: 4,
  names: [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`],
  familyNames: [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`],
  coatColors: wizardCoatColors,
  eyesColors: wizardEyesColors
};

const setElementVisible = (element, isVisible) => {
  element.classList.toggle(`hidden`, !isVisible);
};

const shuffleArray = (array) => {
  const newArray = array.slice();

  for (let i = newArray.length - 1; i >= 0; i--) {
    const index = Math.floor(window.generateNumber(0, i));
    const lastIndex = newArray.length - 1;
    [newArray[index], newArray[lastIndex]] = [newArray[lastIndex], newArray[index]];
  }
  return newArray;
};

const getWizards = (names, familyNames, coatColors, eyesColors, quantity) => {
  const mixNames = shuffleArray(names);
  const mixFamilyNames = shuffleArray(familyNames);
  const mixCoatColors = shuffleArray(coatColors);
  const mixEyesColors = shuffleArray(eyesColors);
  const array = [];
  for (let i = 0; i < quantity; i++) {
    array.push({
      name: `${mixNames[i]} ${mixFamilyNames[i]}`,
      coatColor: mixCoatColors[i],
      eyesColor: mixEyesColors[i]
    });
  }
  return array;
};


const createContent = (string) => {
  const container = document.createElement(`template`);
  container.innerHTML = string;
  return container.content.children[0];
};

class WizardsRenderer {
  constructor(data, container) {
    //list. Только ты знаешь что это будет список волшебников, но на самом деле это просто контейнер. Еще подумалось что мы одним и тем же рендерером можем отрисовывать волшебников в разные контейнеры, поэтому можно сделать container (не list) параметром метода render.
    this.data = data;
    this.container = container;
  }

  render() {
    const fragment = document.createDocumentFragment();
    for (const item of this.data) {
      createContent(this.getTemplate(item));
      fragment.appendChild(createContent(this.getTemplate(item)));
    }
    this.container.appendChild(fragment);
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
}

class WizardsHandler {
  constructor(container) {
    this.container = container;
    this.containerOpen = document.querySelector(`.setup-open`);
    this.containerClose = this.container.querySelector(`.setup-close`);
    this.inputUserName = this.container.querySelector(`[name = "username"]`);
    this.fireballWrap = this.container.querySelector(`.setup-fireball-wrap`);
    this.wizardPicture = this.container.querySelector(`.setup-wizard`);
    this.wizardCoat = this.wizardPicture.querySelector(`.wizard-coat`);
    this.wizardEyes = this.wizardPicture.querySelector(`.wizard-eyes`);
    this.enterButton = 13;
    this.escapeButton = 27;
  }

  setHandlers() {
    this.containerOpen.addEventListener(`click`, () => {
      setElementVisible(this.container, true);
    });
    this.containerOpen.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === this.enterButton) {
        setElementVisible(this.container, true);
      }
    });
    this.containerClose.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === this.enterButton) {
        setElementVisible(this.container, false);
      }
    });
    this.containerClose.addEventListener(`click`, () => {
      setElementVisible(this.container, false);
    });
    document.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === this.escapeButton && evt.target !== this.inputUserName) {
        setElementVisible(this.container, false);
      }
    });
    this.wizardCoat.addEventListener(`click`, (evt) => {
      const index = Math.round(window.generateNumber(0, wizardCoatColors.length - 1));
      evt.target.setAttribute(`style`, `fill: ` + wizardCoatColors[index]);
    });
    this.wizardEyes.addEventListener(`click`, (evt) => {
      const index = Math.round(window.generateNumber(0, wizardEyesColors.length - 1));
      evt.target.setAttribute(`style`, `fill: ` + wizardEyesColors[index]);
    });
    this.fireballWrap.addEventListener(`click`, (evt) => {
      const index = Math.round(window.generateNumber(0, fireballColors.length - 1));
      evt.currentTarget.style.background = fireballColors[index];
    });
    this.inputUserName.addEventListener(`invalid`, () => {
      if (this.inputUserName.validity.tooShort) {
        this.inputUserName.setCustomValidity(`Имя должно состоять минимум из 2-х символов`);
      } else if (this.inputUserName.validity.tooLong) {
        this.inputUserName.setCustomValidity(`Имя не должно превышать 25-ти символов`);
      } else if (this.inputUserName.validity.valueMissing) {
        this.inputUserName.setCustomValidity(`Обязательное поле`);
      } else {
        this.inputUserName.setCustomValidity(``);
      }
    });
    this.inputUserName.addEventListener(`input`, (evt) => {
      const target = evt.target;
      if (target.value.length < 2) {
        target.setCustomValidity(`Имя должно состоять минимум из 2-х символов`);
      } else {
        target.setCustomValidity(``);
      }
    });
  }
}

const dataWizards = getWizards(wizardsOptions.names, wizardsOptions.familyNames, wizardsOptions.coatColors, wizardsOptions.eyesColors, wizardsOptions.elementsQuantity);

const wizardsRenderer = new WizardsRenderer(dataWizards, similarListElement);
wizardsRenderer.render();
setElementVisible(setupSimilar, true);

const wizardsHandler = new WizardsHandler(setup);
wizardsHandler.setHandlers();
