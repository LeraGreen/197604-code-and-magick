var Statistics = function (ctx, names, times) {
  this.names = names,
  this.ctx = ctx,
  this.font = '16px PT Mono',
  this.fontColor = 'black',
  this.cloudX = 100,
  this.cloudY = 10,
  this.cloudWidth = 420,
  this.cloudHeight = 270,
  this.columnWidth = 40,
  this.columnMaxHeight = 150,
  this.columnOffset = 50,
  this.padding = 5,
  this.userColumnColor = 'rgba(255, 0, 0, 1)',
  this.otherColumnsColor = 'rgb(0,191,255)',
  this.times = times.map(function(time) {
    return Math.round(time);
  }),


  this.renderCloud = function (x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, this.cloudWidth, this.cloudHeight);
  },

  this.renderText = function (text, x, y) {
    this.ctx.fillStyle = this.fontColor;
    this.ctx.font = this.font;
    this.ctx.fillText(text, x, y);
  },

  this.renderNumbers = function () {
    var max = 1;
    var min = 0;
    return +((Math.random() * (max - min)) + min + 0.2).toFixed(1);
  }

  this.renderColor = function () {
    var rgbColor = this.otherColumnsColor.slice(4, -1);
    var alfa = this.renderNumbers();
    return `rgba(${rgbColor},${alfa})`;
  },

  this.renderColumns = function () {
    var max = Math.max.apply(null,this.times);
    this.names.forEach(function (name, index) {
      var x = this.cloudX + this.columnOffset + ((this.columnWidth + this.columnOffset) * index);
      var y = Math.round((-this.columnMaxHeight * this.times[index]) / max);
      this.renderText(name, x, this.cloudHeight + this.padding);
      this.ctx.fillStyle = name === 'Вы' ? this.userColumnColor : this.renderColor();
      this.ctx.fillRect(x, 250, 40, y);
      this.renderText(this.times[index], x, this.cloudHeight - (- y) - this.padding * 5);
    }, this);
  }
};


window.renderStatistics = function (ctx, names, times) {
  var statistics = new Statistics(ctx, names, times);

  statistics.renderCloud(110, 20, 'rgba(0, 0, 0, 0.7)');
  statistics.renderCloud(100, 10, 'white');
  statistics.renderText('Ура! Вы победили!', 220, 40);
  statistics.renderColumns();
};
