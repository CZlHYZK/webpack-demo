function Pubu(newsNum, curPage) {
  this.newsNum = newsNum;
  this.curPage = curPage;
  this.columnCount = 1;
  this.arr = null;
  this.isLoading = false;
}
Pubu.prototype.init = function () {
  this.arr = [];
  var itemWidth = 260;
  var bodyWidth = $("body").width();
  columnCount = Math.floor(bodyWidth / itemWidth);
  $(".picct").css("width", itemWidth * columnCount);
  for (var i = 0; i < columnCount; i++)
    this.arr[i] = 0;
}
Pubu.prototype.getMinColumnIndex = function () {
  return this.arr.indexOf(Math.min.apply(null, this.arr));
}
Pubu.prototype.reader = function (data) {
  var _this = this;
  $.each(data.data, function (index, ele) {
    var resultString = '<div class="section"><img src="' + ele.img_url + '"><h3><a href="' + ele.url + '">' +
      ele.name + '</a></h3><p>' + ele.short_intro + '</p></div>';
    var $result = $(resultString);

    $result.find("img").on("load",function () {
      $(".picct").append($result);
      $result.css({
        top: _this.arr[_this.getMinColumnIndex()],
        left: _this.getMinColumnIndex() * $(".picct .section").outerWidth(true)
      })
      _this.arr[_this.getMinColumnIndex()] += $result.outerHeight(true);
      $('.picct').height(Math.max.apply(null, _this.arr));
      _this.curPage++;
      _this.isLoading = false;
    })
  });
}
Pubu.prototype.getNextPage = function () {
  this.isLoading = true;
  var _this = this;
  $.ajax({
    type: "post",
    url: "http://platform.sina.com.cn/slide/album_tech",
    dataType: "jsonp",
    jsonp: "jsoncallback",
    data: {
      app_key: '1271687855',
      num: _this.newsNum,
      page: _this.curPage
    },
    success: function (data) {
      _this.reader(data);
    },
    error: function (msg) {
      console.log("获取数据失败：" + msg);
    }
  })
}


module.exports = Pubu;
