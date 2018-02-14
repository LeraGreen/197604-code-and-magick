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
  constructor(ctx, statistics, options) {
    this.ctx = ctx;
    this.names = statistics.names;
    this.times = statistics.times;
    this.userName = options.phrases.userName;
    this.winnerPhrase = options.phrases.winnerPhrase;
    this.fontOptions = options.font;
    this.cloudOptions = options.cloud;
    this.columnOptions = options.column;
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

    const maxTime = Math.max.apply(null, this.times);
    const renderHeight = this.cloudOptions.height - this.cloudOptions.offset * 2;

    for (let i = 0; i < this.names.length; i++) {
      this.renderColumn(this.names[i], i, maxTime, renderHeight);
    }
  }


  renderCloud(x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, this.cloudOptions.width, this.cloudOptions.height);
  }

  renderColumn(name, index, maxTime, renderHeight) {
    const x = this.cloudOptions.x + this.columnOptions.offset + ((this.columnOptions.width + this.columnOptions.offset) * index);
    const height = Math.round((this.columnOptions.maxHeight * this.times[index]) / maxTime);

    renderText(this.ctx, name,
        Object.assign({}, this.fontOptions, {
          x,
          y: this.cloudOptions.height
        }));

    this.ctx.fillStyle = name === this.userName
      ? this.columnOptions.userColor.getRgbaString(1)
      : this.columnOptions.otherColor.getRgbaString(+generateNumber(0.2, 1).toFixed(1));

    this.ctx.fillRect(x, renderHeight - height, this.columnOptions.width, height);

    renderText(this.ctx, this.times[index],
        Object.assign({}, this.fontOptions, {
          x,
          y: (renderHeight - height) - this.columnOptions.padding
        }));
  }
}

window.renderStatistics = function (ctx, names, times) {
  const statistics = {
    'names': names,
    'times': times.map(Math.round)
  };
  const options = {
    phrases: {
      userName: `Вы`,
      winnerPhrase: `Ура! Вы победили!`
    },
    font: {
      color: `black`,
      font: `16px PT Mono`,
      x: 0,
      y: 0
    },
    cloud: {
      x: 100,
      y: 10,
      width: 420,
      height: 270,
      offset: 10,
      mainColor: new Color(255, 255, 255).getRgbaString(1),
      shadowColor: new Color(0, 0, 0).getRgbaString(0.7)
    },
    column: {
      width: 40,
      maxHeight: 150,
      offset: 50,
      padding: 5,
      userColor: new Color(255, 0, 0),
      otherColor: new Color(0, 191, 255)
    }
  };
  const renderer = new StatisticsRenderer(ctx, statistics, options);
  renderer.render();
};
