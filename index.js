require('./index.css');
var carousel = require('./js/carousel');
require('./js/goTop');
var Pubu = require('./js/pubu');

carousel.start($(".container"));
var pubu = new Pubu(8, 3);
pubu.init();
pubu.getNextPage();
$(".btn-load").click(function () {
  pubu.getNextPage();
});