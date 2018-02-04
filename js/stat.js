'use strict';

const renderNumbers = () => {
  const max = 1;
  const min = 0;
  return ((Math.random() * (max - min)) + min);
};

const renderText = function (ctx, text, fontParams) {
  ctx.fillStyle = fontParams.color;
  ctx.font = fontParams.font;
  ctx.fillText(text, fontParams.x, fontParams.y);
};

// const Color = function () {
//   this.userColumnColor = {
//     red: 255,
//     green: 0,
//     blue: 0,
//     alfa: 1
//   };
//   this.otherColumnsColor = {
//     red: 0,
//     green: 191,
//     blue: 255,
//     alfa: null
//   };
//
//   this.renderAlfa = function () {
//     return +(renderNumbers() + 0.2).toFixed(1);
//   };
//
//   this.getRgbaString = function () {
//
//   };
// };

// TODO(@greenlera) генерацию числа вынести
// TODO(@greenlera) переименовать объект в renderer
// TODO(@greenlera) вынести объект color
// TODO(@greenlera) вынести простую логику из методов
// TODO(@greenlera) отрисовку текстов
// TODO(@greenlera) не вызыват снаружи методы
// TODO(@greenlera) перепридумать публичный интерфейс
// TODO(@greenlera) добавить менеджера


// var ctx = canvas.getContext('2d');
// var players = [4000, 4200, 1400, 3500];
//
// var height = 150;
// var width = 20;
//
// var offset = 20;
//
// var max = Math.max.apply(null, players);
//
// players.forEach(function(player, index) {
//   var columnHeight = (player * height) / max;
//
//   ctx.fillRect((width + offset) * index, height - columnHeight, width, columnHeight);
// });

const StatisticsRenderer = function (ctx, names, times) {
  this.names = names;
  this.ctx = ctx;
  this.fontOptions = {
    color: `black`,
    font: `16px PT Mono`,
    x: 0,
    y: 0
  };
  this.cloudOptions = {
    cloudX: 100,
    cloudY: 10,
    cloudWidth: 420,
    cloudHeight: 270,
    cloudOffset: 10,
    mainCloudColor: `white`,
    shadowCloudColor: `rgba(0, 0, 0, 0.7)`
  };
  this.columnOptions = {
    columnWidth: 40,
    columnMaxHeight: 150,
    columnOffset: 50,
    padding: 5
  };
  this.times = times.map((time) => {
    return Math.round(time);
  });

  this.render = function () {
    this.renderCloud(
        this.cloudOptions.cloudY + this.cloudOptions.cloudOffset, this.cloudOptions.cloudY + this.cloudOptions.cloudOffset, this.cloudOptions.shadowCloudColor);
    this.renderCloud(
        this.cloudOptions.cloudX,
        this.cloudOptions.cloudY,
        this.cloudOptions.mainCloudColor);
    renderText(
        this.ctx,
        `Ура! Вы победили!`,
        Object.assign({},
            this.fontOptions, {
              x: 220,
              y: 40
            }
        ));
    this.renderColumns();
  };


  this.renderCloud = function (x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, this.cloudOptions.cloudWidth, this.cloudOptions.cloudHeight);
  };

  this.renderNumbers = function () {
    return +(renderNumbers() + 0.2).toFixed(1);
  };

  this.renderColor = function () {
    const rgbColor = this.otherColumnsColor.slice(4, -1);
    const alfa = this.renderNumbers();
    return `rgba(${rgbColor},${alfa})`;
  };

  this.renderColumns = function () {
    const max = Math.max.apply(null, this.times);
    this.names.forEach(function (name, index) {
      const x = this.cloudOptions.cloudX + this.columnOptions.columnOffset + ((this.columnOptions.columnWidth + this.columnOptions.columnOffset) * index);
      const y = Math.round((-this.columnOptions.columnMaxHeight * this.times[index]) / max);

      renderText(this.ctx, name,
          Object.assign({}, this.fontOptions, {
            x,
            y: this.cloudOptions.cloudHeight + this.columnOptions.padding
          }));
      this.ctx.fillStyle = name === `Вы` ? this.userColumnColor : this.renderColor();
      this.ctx.fillRect(x, 250, 40, y);
      renderText(this.ctx, this.times[index],
          Object.assign({}, this.fontOptions, {
            x,
            y: this.cloudOptions.cloudHeight - (-y) - this.columnOptions.padding * 5
          }));
    }, this);
  };
};


window.renderStatistics = function (ctx, names, times) {
  const renderer = new StatisticsRenderer(ctx, names, times);
  renderer.render();
};
