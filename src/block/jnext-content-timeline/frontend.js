/**
 * Common js file for timeline.
 */
(function ($) {
  // Listen for events.
  window.addEventListener("load", jnextTimelineContentBlockInit);
  window.addEventListener("resize", jnextTimelineContentBlockInit);
  window.addEventListener("scroll", jnextTimelineContentBlockInit);

  window.addEventListener("load", jnextTimelineContentHorizontalInit);
  var resizeContentTimer;
  $(window).on('resize', function(){
    
    clearTimeout(resizeContentTimer);
    resizeContentTimer = setTimeout(function() {

      jnextTimelineContentHorizontalInit();
              
    }, 1000);
    
  }).trigger('resize');


  /* Callback function for all event listeners.*/
  function jnextTimelineContentBlockInit() {
    
    var timeline = $(".jnext-content-timeline:not(.jnext-timeline-block__horizontal)");

    if (timeline.parents(".wp-block").length == 0) {
      timeline.each(function () {

        var line_inner = $(this).find(".JnextTbfocusconnector");
        var line_outer = $(this).find(".JnextTbconnector");
        var $icon_class = $(this).find(".jtb__view-icon-wrap");
        var $card_last = $(this).find(".jnext-timeline-content:last-child");
        var $document = $(document);
        /* Set top and bottom for line.*/
        var timeline_start_icon = $icon_class.first().position();
        var timeline_end_icon = $icon_class.last().position();
        line_outer.css("top", timeline_start_icon.top);

        var timeline_card_height = $card_last.height();
        var last_item_top = $card_last.offset().top - $(this).offset().top;
        var $last_item, parent_top;

        if ($(this).hasClass("jnext-timeline-block__arrow-center")) {
          line_outer.css("bottom", timeline_end_icon.top);

          parent_top = last_item_top - timeline_start_icon.top;
          $last_item = parent_top + timeline_end_icon.top;
        } else if ($(this).hasClass("jnext-timeline-block__arrow-top")) {
          var top_height = timeline_card_height - timeline_end_icon.top;
          line_outer.css("bottom", top_height);

          $last_item = last_item_top;
        } else if ($(this).hasClass("jnext-timeline-block__arrow-bottom")) {
          var bottom_height = timeline_card_height - timeline_end_icon.top;
          line_outer.css("bottom", bottom_height);

          parent_top = last_item_top - timeline_start_icon.top;
          $last_item = parent_top + timeline_end_icon.top;
        }

        var num = 0;
        var elementEnd = $last_item + 20;
        var connectorHeight =
          3 * $(this).find(".jtb__view-icon-wrap:first").height();
        var viewportHeight = document.documentElement.clientHeight;
        var viewportHeightHalf = viewportHeight / 2 + connectorHeight;
        var elementPos = $(this).offset().top;
        var new_elementPos = elementPos + timeline_start_icon.top;
        var photoViewportOffsetTop = new_elementPos - $document.scrollTop();

        if (photoViewportOffsetTop < 0) {
          photoViewportOffsetTop = Math.abs(photoViewportOffsetTop);
        } else {
          photoViewportOffsetTop = -Math.abs(photoViewportOffsetTop);
        }

        if (elementPos < viewportHeightHalf) {
          if (
            viewportHeightHalf + Math.abs(photoViewportOffsetTop) <
            elementEnd
          ) {
            line_inner.height(viewportHeightHalf + photoViewportOffsetTop);
          } else {
            if (photoViewportOffsetTop + viewportHeightHalf >= elementEnd) {
              line_inner.height(elementEnd);
            }
          }
        } else {
          if (photoViewportOffsetTop + viewportHeightHalf < elementEnd) {
            if (0 > photoViewportOffsetTop) {
              line_inner.height(
                viewportHeightHalf - Math.abs(photoViewportOffsetTop)
              );
              ++num;
            } else {
              line_inner.height(viewportHeightHalf + photoViewportOffsetTop);
            }
          } else {
            if (photoViewportOffsetTop + viewportHeightHalf >= elementEnd) {
              line_inner.height(elementEnd);
            }
          }
        }

        /* Icon bg color and icon color */
        var timeline_icon_pos, timeline_card_pos;
        var elementPos, elementCardPos;
        var timeline_icon_top, timeline_card_top;
        var timeline_icon = $(this).find(".jtb__view-icon-wrap"),
          animate_border = $(this).find(".jnext-timeline-content");

        for (var i = 0; i < timeline_icon.length; i++) {
          timeline_icon_pos = $(timeline_icon[i]).offset().top;
          timeline_card_pos = $(animate_border[i]).offset().top;
          elementPos = $(this).offset().top;
          elementCardPos = $(this).offset().top;

          timeline_icon_top = timeline_icon_pos - $document.scrollTop();
          timeline_card_top = timeline_card_pos - $document.scrollTop();

          if (timeline_card_top < viewportHeightHalf) {
            animate_border[i].classList.remove("out-view");
            animate_border[i].classList.add("in-view");
          } else {
            /* Remove classes if element is below than half of viewport.*/
            animate_border[i].classList.add("out-view");
            animate_border[i].classList.remove("in-view");
          }

          if (timeline_icon_top < viewportHeightHalf) {
            /* Add classes if element is above than half of viewport.*/
            timeline_icon[i].classList.remove(
              "jnext-timeline-blocks__out-view-icon"
            );
            timeline_icon[i].classList.add("jnext-timeline-blocks__in-view-icon");
          } else {
            /* Remove classes if element is below than half of viewport.*/
            timeline_icon[i].classList.add(
              "jnext-timeline-blocks__out-view-icon"
            );
            timeline_icon[i].classList.remove(
              "jnext-timeline-blocks__in-view-icon"
            );
          }
        }
      });
    }
  }

  function jnextTimelineContentHorizontalInit(){
    var horizontal_item = $('.jnext-timeline-block__horizontal');
    
    if(horizontal_item.length){
      var hLineouter = horizontal_item.find('.JnextTbconnector');
      var $card_last = horizontal_item.find(".jnext-timeline-content:last-child");
      var hlast_item_right = $card_last.offset().top - horizontal_item.offset().top;
      var $icon_class = horizontal_item.find(".jtb__view-icon-wrap");
      var timeline_start_icon = $icon_class.first().position();
      var timeline_end_icon = $icon_class.last().position();
      var horizontal_arrows = jQuery('.prev-arrow, .next-arrow').outerHeight() / 2;
      
      initJnextContentTimeline(horizontal_item);

      var parent_right;
      
      var oddTimelineHighestBox = 0;
      horizontal_item.find('.jnext-timeline-content:nth-child(odd)').each(function(){
        if($(this).find('.jtb__detail-wrap').outerHeight() > oddTimelineHighestBox){  
          oddTimelineHighestBox = $(this).find('.jtb__detail-wrap').outerHeight(); 
        }   
      });

      var topTimelineHighestBox = 0;
      horizontal_item.find('.jnext-timeline-content').each(function(){
          if(jQuery(this).find('.jtb__detail-wrap').outerHeight() > topTimelineHighestBox){ 
              topTimelineHighestBox = $(this).find('.jtb__detail-wrap').outerHeight(); 
          }
      });
      
      var remove_spacing = horizontal_item.find('.jnext-timeline-content:nth-child(odd)').css('margin-top').replace("px", "");

      if( horizontal_item.hasClass("jnext-timeline-block__center-block") ){
          
        horizontal_item.find('.jnext-timeline-content:nth-child(odd)').each(function(){
          $(this).find('.jnext-timeline-blocks__widget').css('margin-top', ( oddTimelineHighestBox - $(this).find('.jtb__detail-wrap').outerHeight() ) - remove_spacing );
        });
        
        horizontal_item.find('.jnext-timeline-content:nth-child(even) .jtb__date-wrap').css('margin-top', ( parseFloat(oddTimelineHighestBox) - parseFloat(horizontal_item.find('.jnext-timeline-content:nth-child(even) .jtb__date-wrap').height()) ));
        
        hLineouter.css("top", oddTimelineHighestBox + ( $icon_class.outerHeight() / 2 ));
        parent_right = hlast_item_right - timeline_start_icon.top;
        $last_item = parent_right + timeline_end_icon.top;
        $('.prev-arrow, .next-arrow').css('top', ( oddTimelineHighestBox + ( $icon_class.outerHeight() / 2 ) - horizontal_arrows ) );

      }else if ( horizontal_item.hasClass("jnext-timeline-block__top-block") ){

        $('.prev-arrow, .next-arrow').css('top', ( timeline_start_icon.top + ( $icon_class.outerHeight() / 2 ) - horizontal_arrows ) );
        hLineouter.css( "top", timeline_start_icon.top + ( $icon_class.outerHeight() / 2 ) );

      } else if ( horizontal_item.hasClass("jnext-timeline-block__bottom-block") ){
        
        hLineouter.css( "top", ( +( topTimelineHighestBox + ( $icon_class.outerHeight() / 2 ) ) ) + (+remove_spacing) );
        hLineouter.css( "bottom", 'unset' );
        
        jQuery('.prev-arrow, .next-arrow').css('top', ( +( topTimelineHighestBox + ( $icon_class.outerHeight() / 2 ) ) ) + (+remove_spacing)  - horizontal_arrows );

        horizontal_item.find('.jnext-timeline-content').each(function(){ 
          jQuery(this).find('.jnext-timeline-blocks__widget').css('margin-top', topTimelineHighestBox - jQuery(this).find('.jtb__detail-wrap').outerHeight() );
        });
      }
    } 
  }

})(jQuery);

function initJnextContentTimeline(horizontal_item){
  jQuery(horizontal_item).each(function(){
    var slider_item = jQuery(this).find('.list');
    var slide = slider_item.data('slidesshow'),
      scroll = slider_item.data('slidescroll'),
      sPeed = slider_item.data('speed'),
      autoplay = slider_item.data('autoplay'),
      autoplayspeed = slider_item.data('autoplayspeed'),
      fade = slider_item.data('fade'),
      arrow = slider_item.data('arrow'),
      dot = slider_item.data('dots');
    jQuery(this).find('.list').not('.jnext_s_lick-initialized').jnext_s_lick({
      "cssEase": 'linear', 
      infinite: false,
      slidesToShow: slide,
      slidesToScroll: scroll,
      fade: fade,
      autoplay: autoplay,
      autoplaySpeed: autoplayspeed,
      speed: sPeed,
      dots: dot,
      arrows: arrow,
      prevArrow: jQuery(this).find('.prev-arrow'),
      nextArrow: jQuery(this).find('.next-arrow'),
      adaptiveHeight: true,
      touchMove: false,
      focusOnSelect: true,
      responsive: [
          {
              breakpoint: 767,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  dots: true,
              }
          }
      ]
    }).on('afterChange', function(){
      jQuery('.jnext_s_lick-current').prevAll().addClass('jnext_s_lick-prev-slide');
      jQuery('.jnext_s_lick-current').nextAll().removeClass('jnext_s_lick-prev-slide');
    });
  });
}