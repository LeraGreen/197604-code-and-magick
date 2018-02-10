'use strict';

const generateNumber = (min, max) => (Math.random() * (max - min)) + min;


const renderText = (ctx, text, fontParams) => {
  ctx.fillStyle = fontParams.color;
  ctx.font = fontParams.font;
  ctx.fillText(text, fontParams.x, fontParams.y);
};

class Color {
  constructor(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  getRgbaString(alpha) {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${alpha})`;
  }
}

class StatisticsRenderer {
  constructor(data, userName, winnerPhrase, fontOptions, cloudOptions, columnOptions) {
    this.names = data.names;
    this.ctx = data.ctx;
    this.times = data.times;
    this.userName = userName;
    this.winnerPhrase = winnerPhrase;
    this.fontOptions = fontOptions;
    this.cloudOptions = cloudOptions;
    this.columnOptions = columnOptions;
  }

  render() {
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
        this.winnerPhrase,
        Object.assign({}, this.fontOptions, {
          x: 220,
          y: 40
        }));
    this.maxTime = Math.max.apply(null, this.times);
    this.renderHeight = this.cloudOptions.height - this.cloudOptions.offset * 2;
    this.names.forEach(this.renderColumns, this);
  }


  renderCloud(x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, this.cloudOptions.width, this.cloudOptions.height);
  }

  renderColumns(name, index) {
    const x = this.cloudOptions.x + this.columnOptions.offset + ((this.columnOptions.width + this.columnOptions.offset) * index);
    const height = Math.round((this.columnOptions.maxHeight * this.times[index]) / this.maxTime);

    renderText(this.ctx, name,
        Object.assign({}, this.fontOptions, {
          x,
          y: this.cloudOptions.height
        }));

    this.ctx.fillStyle = name === this.userName ? this.columnOptions.userColor.getRgbaString(1) : this.columnOptions.otherColor.getRgbaString(+generateNumber(0.2, 1).toFixed(1));

    this.ctx.fillRect(x, this.renderHeight - height, this.columnOptions.width, height);

    renderText(this.ctx, this.times[index],
        Object.assign({}, this.fontOptions, {
          x,
          y: (this.renderHeight - height) - this.columnOptions.padding
        }));
  }
}

window.renderStatistics = function (ctx, names, times) {
  const initialData = {
    'ctx': ctx,
    'names': names,
    'times': times.map(Math.round)
  };
  const userName = `Вы`;
  const winnerPhrase = `Ура! Вы победили!`;
  const fontOptions = {
    color: `black`,
    font: `16px PT Mono`,
    x: 0,
    y: 0
  };
  const cloudOptions = {
    x: 100,
    y: 10,
    width: 420,
    height: 270,
    offset: 10,
    mainColor: new Color(255, 255, 255).getRgbaString(1),
    shadowColor: new Color(0, 0, 0).getRgbaString(0.7)
  };
  const columnOptions = {
    width: 40,
    maxHeight: 150,
    offset: 50,
    padding: 5,
    userColor: new Color(255, 0, 0),
    otherColor: new Color(0, 191, 255)
  };
  const renderer = new StatisticsRenderer(initialData, userName, winnerPhrase, fontOptions, cloudOptions, columnOptions);
  renderer.render();
};
