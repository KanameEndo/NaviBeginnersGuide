// ページ内リンクッダの高さ分位置をずらす
$(function () {
  var windowWidth = $(window).width();
  var windowSm = 640;
  if (windowWidth <= windowSm) {
    //横幅640px以下のとき（つまりスマホ時）に行う処理を書く
    var headerHight = 60; //ヘッダの高さ
    $('a[href^="#scroll_contents"], .toc_list a[href^="#i"]').click(function(){
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top-headerHight; //ヘッダの高さ分位置をずらす
      $("html, body").animate({scrollTop:position}, 550, "swing");
      return false;
    });
  } else {
    //横幅640px超のとき（タブレット、PC）に行う処理を書く
    var headerHight = 140; //ヘッダの高さ
    $('a[href^="#scroll_contents"], .toc_list a[href^="#i"]').click(function(){
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top-headerHight; //ヘッダの高さ分位置をずらす
      $("html, body").animate({scrollTop:position}, 550, "swing");
      return false;
    });
  }
});

function getYMD(df) {
    if (typeof df === 'undefined') {
        df = 0;
    }
    var dt = new Date();
    dt.setDate(dt.getDate() + df);
    var y = dt.getFullYear();
    var m = ("00" + (dt.getMonth()+1)).slice(-2);
    var d = ("00" + dt.getDate()).slice(-2);
    var result = y + "/" + m + "/" + d;
    return result;
}

function get_age(birth){
     var t = new Date();
     var b = new Date(birth);
     var df = t - b;
     return Math.floor(df/86400000);
}

function get_year_age(birth) {
  now = getYMD().replace(/\//g, "");
  birthday = birth.replace(/\-/g, "");
  age = Math.floor((now - birthday) / 10000);
  return age;
}

function common_validation() {
  var error_count = 0;
  $('.validate_required').each(function (i, o) {
    if (o.value == '') {
      o.nextElementSibling.style.display='block'
      error_count = error_count + 1;
    } else {
      o.nextElementSibling.style.display='none'
    }
  });
  $('.validate_number').each(function (i, o) {
    if ($.isNumeric(o.value)) {
      o.nextElementSibling.style.display='block'
      error_count = error_count + 1;
    } else {
      o.nextElementSibling.style.display='none'
    }
  });
  $('.validate_email').each(function (i, o) {
    if (!o.value.match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)) {
      o.nextElementSibling.style.display='block'
      error_count = error_count + 1;
    } else {
      o.nextElementSibling.style.display='none'
    }
  });
  if (error_count > 0) {
    return true
  } else {
    return false
  }
}

function getParam(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}