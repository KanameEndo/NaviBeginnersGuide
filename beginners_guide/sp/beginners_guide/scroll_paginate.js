$.fn.extend({
    buttonPaginate: function() {
      var $deferred = $.Deferred();
      var $elem = $(this[0]);
      var $button = $('<p class="button"><button class="next">もっと見る</button></p>');
      var $spiner = $('<div class="ajax_spiner">');
      var url = window.nextPageUrl;
  
      if(url) {
        $elem.after($button);
        $elem.after($spiner);
        $spiner.hide();
      }
  
      $(document).on('click', 'button.next', function(){
        url = window.nextPageUrl;
        if(!url) {
          $button.hide();
          $spiner.hide();
          $deferred.resolve();
          return;
        }
  
        $(this).hide();
        $spiner.show();
        $.ajax(url, {method:'GET', dataType:'html'}).success(function(data){
          $elem.append(data);
          $spiner.hide();
          $("img.lazy").lazyload({
              effect: 'fadeIn',
              effectspeed: 1000,
              threshold: 500
          });
          url = window.nextPageUrl;
          if(url) {
            $('button.next').show();
          }
          $deferred.notify();
        }).always(function(){
        });
      });
  
      return $deferred;
    }
  });
  
  $.fn.extend({
    /**
     * スクロールページ送り
     */
    scrollPaginate: function() {
      var $deferred = $.Deferred();
      var $elem = $(this[0]);
      var $spiner = $('<div class="ajax_spiner">');
      if (window.nextPageUrl) {
        $elem.after($spiner);
      }
      var paginating = false;
      $(window).on("scroll", function() {
        var url = window.nextPageUrl;
        if (!url) {
          $spiner.hide();
          $("img.lazy").lazyload({
              effect: 'fadeIn',
              effectspeed: 1000,
              threshold: 500
          });
          $deferred.resolve();
          return;
        }
        var scrollHeight = $elem.height() + $elem.offset().top;
        var scrollPosition = $(window).height() + $(window).scrollTop();
        if (scrollHeight - scrollPosition < 100) {
          if (paginating) {
            return;
          }
          paginating = true;
          $.ajax(url, {method:'GET', dataType:'html'}).success(function(data){
            $elem.append(data);
            $deferred.notify();
          }).always(function(){
            paginating = false;
          });
        }
      });
  
      return $deferred;
    }
  });
