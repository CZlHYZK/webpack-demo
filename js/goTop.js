
$('body').append('<div class="backTop">Top</div>');
$(window).scroll(function () {
  if ($(window).scrollTop() > 500)
    $(".backTop").css("opacity", 1);
  else
    $(".backTop").css("opacity", 0);
});
$(".backTop").click(function () {
  $(window).scrollTop(0);
})
module.exports={};