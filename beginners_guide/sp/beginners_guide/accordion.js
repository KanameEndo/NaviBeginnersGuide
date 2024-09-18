$('.add').click(function(event) {							
  $(this).toggleClass("selected");

  // アコーディオンの次の要素にボタンが配置されている場合
  if($(this).next().hasClass('search-form-content_button')){
    $(this).next().next().slideToggle();
  }else{
    $(this).next().slideToggle();
  }
  event.stopPropagation();
}).next().hide();

const dogbreeds = $('#toDogBreeds');	
const prefectures = $('#toPrefecture');	
$('.dog_breeds_modal').click(function() {
  if (dogbreeds.hasClass('selected')) {
    dogbreeds.toggleClass("selected").next().slideToggle();
  }
  if (!prefectures.hasClass('selected')) {
    prefectures.toggleClass("selected").next().slideToggle();
  }
});
$('.prefectures_modal').click(function() {
  if (prefectures.hasClass('selected')) {
    prefectures.toggleClass("selected").next().slideToggle();
  }
  if (!dogbreeds.hasClass('selected')) {
    dogbreeds.toggleClass("selected").next().slideToggle();
  }
});
$('.conditions_modal').click(function() {
  if (!prefectures.hasClass('selected')) {
    prefectures.toggleClass("selected").next().slideToggle();
  }
  if (!dogbreeds.hasClass('selected')) {
    dogbreeds.toggleClass("selected").next().slideToggle();
  }
});

//犬種ページではアコーディオン閉じない
$('.page_breeds').next().show();
//犬種選択(親子要素)
$('.puppySearchList2 input[type="checkbox"]').change(function(){
    if ($(this).is(':checked')) {
        $(this).parent().find('input[type="checkbox"]').click();
        $(this).parent().find('input[type="checkbox"]').prop('checked', true);
    }
    else {
        $(this).parent().find('input[type="checkbox"]').prop('checked', false);
        $(this).parents('li').each(function(){
            $(this).children('input[type="checkbox"]').prop('checked', false);
        });
    }
});
var parent_id = ['13','20','42','6','18','37'];
parent_id.forEach(function(v){
    $('.open_tgl_' + v).click(function () {
        $('.open_cnt_' + v).slideToggle();
        $('.open_tgl_' + v).toggleClass("selected");
      });
});
//SP時だけアコーディオンにする
var windowWidth = $(window).width();
var windowSm = 640;
if (windowWidth <= windowSm) {
$('.add_sp').click(function() {							
  $(this).toggleClass("selected_sp").next().slideToggle();
}).next().hide();
}