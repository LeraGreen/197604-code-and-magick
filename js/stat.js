'use strict';

const generateNumber = (min, max) => {
  return (Math.random() * (max - min)) + min;
};

const renderText = (ctx, text, fontParams) => {
  ctx.fillStyle = fontParams.color;
  ctx.font = fontParams.font;
  ctx.fillText(text, fontParams.x, fontParams.y);
};

const Color = function (red, green, blue) {
  this.color = {
    'red': red,
    'green': green,
    'blue': blue
  };

  this.getAlfa = () => {
    return +generateNumber(0.2, 1).toFixed(1);
  };

  this.getRgbaString = (alfa) => {
    return `rgba(${this.color.red},${this.color.green},${this.color.blue},${alfa})`;
  };
};

const StatisticsRenderer = function (ctx, names, times) {
  this.names = names;
  this.ctx = ctx;
  this.userName = `Вы`;
  this.fontOptions = {
    color: `black`,
    font: `16px PT Mono`,
    x: 0,
    y: 0
  };
  this.cloudOptions = {
    x: 100,
    y: 10,
    width: 420,
    height: 270,
    offset: 10,
    mainColor: `white`,
    shadowColor: `rgba(0, 0, 0, 0.7)`,
    renderHeight: 270 - 10 * 2
  };
  this.columnOptions = {
    width: 40,
    maxHeight: 150,
    offset: 50,
    padding: 5,
    userColor: new Color(255, 0, 0),
    otherColor: new Color(0, 191, 255)
  };
  this.times = times;
  this.maxTime = Math.max.apply(null, this.times);

  this.render = function () {
    this.renderCloud(
        this.cloudOptions.x + this.cloudOptions.offset,
        this.cloudOptions.y + this.cloudOptions.offset,
        this.cloudOptions.shadowColor);
    this.renderCloud(
        this.cloudOptions.x,
        this.cloudOptions.y,
        this.cloudOptions.mainColor);
    renderText(
        this.ctx,
        `Ура! Вы победили!`,
        Object.assign({}, this.fontOptions, {
          x: 220,
          y: 40
        }
        ));
    this.renderColumns();
  };


  this.renderCloud = function (x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, this.cloudOptions.width, this.cloudOptions.height);
  };

  this.renderColumns = function () {
    this.names.forEach(function (name, index) {
      const x = this.cloudOptions.x + this.columnOptions.offset + ((this.columnOptions.width + this.columnOptions.offset) * index);
      const height = Math.round((this.columnOptions.maxHeight * this.times[index]) / this.maxTime);

      renderText(this.ctx, name,
          Object.assign({}, this.fontOptions, {
            x,
            y: this.cloudOptions.height + this.columnOptions.padding
          }));
      this.ctx.fillStyle = name === this.userName ? this.columnOptions.userColor.getRgbaString(1) : this.columnOptions.otherColor.getRgbaString(this.columnOptions.otherColor.getAlfa());
      this.ctx.fillRect(x, this.cloudOptions.renderHeight - height, this.columnOptions.width, height);
      renderText(this.ctx, this.times[index],
          Object.assign({}, this.fontOptions, {x,
            y: (this.cloudOptions.renderHeight - height) - this.columnOptions.padding
          }));
    }, this);
  };
};

window.renderStatistics = function (ctx, names, times) {
  const renderer = new StatisticsRenderer(ctx, names, times.map(Math.round));
  renderer.render();
};
