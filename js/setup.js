'use strict';

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

const names = [`Иван`, `Хуан Себастьян`,`Мария`,`Кристоф`,`Виктор`,`Юлия`,`Люпита`,`Вашингтон`];

const familyNames = [`да Марья`, `Верон`,`Мирабелла`,`Вальц`,`Онопко`,`Топольницкая`,`Нионго`,`Ирвинг`];

const coatColors = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`,`rgb(146, 100, 161)
`,`rgb(56, 159, 117)
`,`rgb(215, 210, 55)
`,`rgb(0, 0, 0)`];

const eyesColors = [`black`, `red`,`blue`,`yellow`,`green`];

const getRandomElement = (array) => {
  const min = 0;
  const index = Math.floor(Math.random() * (array.length - min)) + min;
  return array[index];
};

const getArray = (length) => {
  const array = [];
  for (let i = 0; i < length; i++) {
    const object = Object.assign({}, {
      name: `${getRandomElement(names)} ${getRandomElement(familyNames)}`,
      coatcolor: getRandomElement(coatColors),
      eyesColor: getRandomElement(eyesColors)
    });
    array.push(object);
  };
  return array;
};

console.log(getArray(4));
