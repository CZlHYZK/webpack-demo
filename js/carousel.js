
function Carousel($ct) {
  this.$ct = $ct;
  this.pageIndex = 1;
  this.$picCt = $ct.find(".pictures");

  this.isAnimate = false;
  this.timeToCarouse = null;//此变量用于存储定时自动轮播事件指针，用户点击按钮时停止轮播
  this.timeCheck = null;//此变量用于存储用户离开时定时自动轮播事件指针，当用户无操作6秒时重新开始自动轮播
  this.bullets = $ct.find(".bullets>li");
}
Carousel.prototype.init = function () {
  this.$picCt.prepend(this.$ct.find(".pictures>li").last().clone());
  this.$picCt.append(this.$ct.find(".pictures>li").eq(1).clone());
  this.$pics = this.$ct.find(".pictures>li>img");
  this.picCount = this.$pics.length;
  this.picWidth = this.$ct.width();
  this.$ct.find(".pictures>li").css('width', this.$ct.width() + 'px');
  this.$picCt.width((this.picCount) * this.picWidth);
}
Carousel.prototype.next = function (count) {
  if (this.isAnimate)
    return;
  this.isAnimate = true;
  var _this = this;
  this.$picCt.animate({
    left: '-=' + count * this.picWidth
  }, function () {
    _this.pageIndex += count;
    if (_this.pageIndex === 5) {
      _this.pageIndex = 1;
      _this.$picCt.css("left", -_this.picWidth + "px");
    }
    _this.moveBullet();
    _this.isAnimate = false;
  });
}
Carousel.prototype.pre = function (count) {
  var _this = this;
  if (this.isAnimate)
    return;
  this.isAnimate = true;
  this.$picCt.animate({
    left: '+=' + count * _this.picWidth
  }, function () {
    _this.pageIndex -= count;

    if (_this.pageIndex === 0) {
      _this.pageIndex = 4;
      _this.$picCt.css("left", -picCount * picWidth + "px");
    }
    _this.moveBullet();
    _this.isAnimate = false;
  });
}
Carousel.prototype.moveBullet = function () {
  this.$ct.find(".bullets>li").removeClass("active").eq(this.pageIndex - 1).addClass("active");
}

Carousel.prototype.bind = function () {
  var _this = this;
  this.$ct.find(".pre").click(function () {
    clearInterval(_this.timeToCarouse);
    clearInterval(_this.timeCheck);
    _this.pre(1);
    _this.checkUserControl();
  });
  this.$ct.find(".next").click(function () {
    clearInterval(_this.timeToCarouse);
    clearInterval(_this.timeCheck);
    _this.next(1);
    _this.checkUserControl();
  });
  this.$ct.find(".bullets>li").click(function () {
    clearInterval(_this.timeToCarouse);
    clearInterval(_this.timeCheck);
    var thisIndex = $(this).index();
    if (thisIndex > _this.pageIndex)
      _this.next(thisIndex - _this.pageIndex + 1);
    else if (thisIndex < _this.pageIndex)
      _this.pre(_this.pageIndex - thisIndex - 1);
    _this.checkUserControl();
  });
}
Carousel.prototype.autoCarouse = function () {
  var _this = this;
  this.init();
  this.bind();
  this.timeToCarouse = setInterval(function () {
    _this.next(1);
  }, 2000);
}
Carousel.prototype.checkUserControl = function () {
  var _this = this;
  this.timeCheck = setInterval(function () {
    _this.next(1);
  }, 3000);
}
module.exports = {
  start: function ($ct) {
    $ct.each(function (index, ele) {
      (new Carousel($(ele))).autoCarouse();
    });
  }
}

