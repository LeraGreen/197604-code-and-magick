var Statistics = function (ctx, names, times) {
  this.ctx = ctx,
  this.names = names,
  this.times = times,
  this.font = '16px PT Mono',
  this.fontColor = 'black',
  this.cloudX = 100,
  this.cloudY = 10,
  this.cloudWidth = 420,
  this.cloudHeight = 270,
  this.columnWidth = 40,
  this.columnMaxHeight = 150,
  this.columnOffset = 50,
  this.padding = 30

  this.renderCloud = function (x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, this.cloudWidth, this.cloudHeight);
  },

  this.renderText = function (text, x, y) {
    ctx.fillStyle = this.fontColor;
    ctx.font = this.font;
    ctx.fillText(text, x, y);
  },

  this.renderColumns = function () {
    this.names.forEach(function (name, index) {
      var x = this.cloudX + this.columnOffset + ((this.columnWidth + this.columnOffset) * index);
      this.ctx.fillText(name, x, 260);
      this.ctx.fillRect(x, 240, 40, -150);
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
