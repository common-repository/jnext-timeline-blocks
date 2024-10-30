/*  Js for timeline line and inner line filler*/
function JnextpostTimelineContent(id) {
    
    var timeline = jQuery(".jnext-post-timeline").parents("#block-" + id);
    var tm_item = timeline.find(".jnext-post-timeline");
    var line_inner = timeline.find(".JnextTb__post-block-focusconnector");
    var line_outer = timeline.find(".JnextTb__post-block-connector");
    var $icon_class = timeline.find(".jtb__post-view-icon-wrap");

    if ($icon_class.length > 0) {
      var $card_last = timeline.find(".jnext-post-timeline-wrap:last-child");
      var timeline_start_icon = $icon_class.first().position();
      var timeline_end_icon = $icon_class.last().position();
      
      line_outer.css("top", timeline_start_icon.top);

      var timeline_card_height = $card_last.find('.jtb-post-details').height();
      var last_item_top = $card_last.offset().top - tm_item.offset().top;
      var $last_item, parent_top;
      var $document = jQuery(document);

        if(jQuery('.jnext-post-timeline-block__horizontal').parents("#block-"+id).length){
            
            var horizontal = jQuery('.jnext-post-timeline-block__horizontal').parents("#block-"+id);
            var horizontal_item = horizontal.find('.jnext-post-timeline-block__horizontal');
            var oddTimelineHighestBox = 0;
            var topTimelineHighestBox = 0;
            var hLineouter = horizontal_item.find('.JnextTb__post-block-connector');
            var hlast_item_right = $card_last.offset().top - horizontal_item.offset().top;
            var horizontal_arrows = jQuery('.post_prev-arrow, .post_next-arrow').outerHeight() / 2;
            var parent_right;
            var remove_spacing = horizontal_item.find('.jnext-post-timeline-content:nth-child(odd)').css('margin-top').replace("px", "");

            initJnextPostTimeline(horizontal_item);
            
            horizontal_item.find('.jnext-post-timeline-content:nth-child(odd)').each(function(){
                if(jQuery(this).find('.jtb__post-detail-wrap').outerHeight() > oddTimelineHighestBox){ 
                    oddTimelineHighestBox = jQuery(this).find('.jtb__post-detail-wrap').outerHeight(); 
                }            
            });

            horizontal_item.find('.jnext-post-timeline-content').each(function(){
                if(jQuery(this).find('.jtb__post-detail-wrap').outerHeight() > topTimelineHighestBox){ 
                    topTimelineHighestBox = jQuery(this).find('.jtb__post-detail-wrap').outerHeight(); 
                }
            });

            if( horizontal_item.hasClass("jnext-post-timeline-block__center-block") ){
                
            horizontal_item.find('.jnext-post-timeline-content:nth-child(odd)').each(function(){
                jQuery(this).find('.jnext-post-timeline-block__widget').css('margin-top', ( oddTimelineHighestBox - jQuery(this).find('.jtb__post-detail-wrap').outerHeight() ) );
            });
                
            horizontal_item.find('.jnext-post-timeline-content:nth-child(even) .jtb__post-block-date-wrap').css('margin-top', ( ( +( oddTimelineHighestBox - horizontal_item.find('.jnext-post-timeline-content:nth-child(even) .jtb__post-block-date-wrap').outerHeight() ) ) + (+remove_spacing) ) );

            hLineouter.css( "top", ( +( oddTimelineHighestBox + ( $icon_class.outerHeight() / 2 ) ) + (+remove_spacing) ) );
            parent_right = hlast_item_right - timeline_start_icon.top;
            $last_item = parent_right + timeline_end_icon.top;
            
            jQuery('.post_prev-arrow, .post_next-arrow').css('top', ( +( oddTimelineHighestBox + ( $icon_class.outerHeight() / 2 ) ) + (+remove_spacing) - horizontal_arrows ) );

            }else if ( horizontal_item.hasClass("jnext-post-timeline-block__top-block") ){
                
                jQuery('.post_prev-arrow, .post_next-arrow').css('top', ( timeline_start_icon.top + ( $icon_class.outerHeight() / 2 ) ) - horizontal_arrows );
                hLineouter.css( "top", timeline_start_icon.top + ( $icon_class.outerHeight() / 2 ) );

            } else if ( horizontal_item.hasClass("jnext-post-timeline-block__bottom-block") ){
                                    
                hLineouter.css( "top", ( +( topTimelineHighestBox + ( $icon_class.outerHeight() / 2 ) ) + (+remove_spacing) ) );
                hLineouter.css( "bottom", 'unset' );
                jQuery('.post_prev-arrow, .post_next-arrow').css('top', ( +( topTimelineHighestBox + ( $icon_class.outerHeight() / 2 ) ) + (+remove_spacing) - horizontal_arrows ) );

                horizontal_item.find('.jnext-post-timeline-content').each(function(){
                    jQuery(this).find('.jnext-post-timeline-block__widget').css('margin-top', topTimelineHighestBox - jQuery(this).find('.jtb__post-detail-wrap').outerHeight() );
                });
            }

        }

        if(jQuery('.jnext-post-timeline-block__horizontal').parents("#block-"+id).length == 0){
            if (tm_item.hasClass("jnext-post-timeline-block__arrow-center")) {
            
                line_outer.css("bottom", timeline_end_icon.top);
                parent_top = last_item_top - timeline_start_icon.top;
                $last_item = parent_top + timeline_end_icon.top;

            } else if (tm_item.hasClass("jnext-post-timeline-block__arrow-top")) {
            
                var top_height = timeline_card_height - timeline_end_icon.top;
                line_outer.css("bottom", top_height);
                $last_item = last_item_top;

            } else if (tm_item.hasClass("jnext-post-timeline-block__arrow-bottom")) {

                var bottom_height = timeline_card_height - timeline_end_icon.top;
                line_outer.css("bottom", bottom_height);
                parent_top = last_item_top - timeline_start_icon.top;
                $last_item = parent_top + timeline_end_icon.top;

            }
        }

        var num = 0;
        var elementEnd = $last_item + 20;

        var connectorHeight =
            3 * timeline.find(".jtb__post-view-icon-wrap:first").height();
        var viewportHeight = document.documentElement.clientHeight + connectorHeight;
        var viewportHeightHalf = viewportHeight / 2 + connectorHeight;

        var elementPos = tm_item.offset().top;

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

        //For changing icon background color and icon color.
        var timeline_icon_pos, timeline_card_pos;
        var elementPos, elementCardPos;
        var timeline_icon_top, timeline_card_top;
        var timeline_icon = timeline.find(".jtb__post-view-icon-wrap"),
            animate_border = timeline.find(".jnext-post-timeline-wrap");

        for (var i = 0; i < timeline_icon.length; i++) {
            timeline_icon_pos = jQuery(timeline_icon[i]).offset().top;
            timeline_card_pos = jQuery(animate_border[i]).offset().top;
            elementPos = timeline.offset().top;
            elementCardPos = timeline.offset().top;

            timeline_icon_top = timeline_icon_pos - $document.scrollTop();
            timeline_card_top = timeline_card_pos - $document.scrollTop();

            if (timeline_card_top < viewportHeightHalf) {
                animate_border[i].classList.remove("out-view");
                animate_border[i].classList.add("in-view");
            } else {
                // Remove classes if element is below than half of viewport.
                animate_border[i].classList.add("out-view");
                animate_border[i].classList.remove("in-view");
            }

            if (timeline_icon_top < viewportHeightHalf) {
                // Add classes if element is above than half of viewport.
                timeline_icon[i].classList.remove(
                    "jnext-post-timeline-blocks__out-view-icon"
                );
                timeline_icon[i].classList.add("jnext-post-timeline-blocks__in-view-icon");
            } else {
                // Remove classes if element is below than half of viewport.
                timeline_icon[i].classList.add("jnext-post-timeline-blocks__out-view-icon");
                timeline_icon[i].classList.remove(
                    "jnext-post-timeline-blocks__in-view-icon"
                );
            }
        }
    }		
}

function initJnextPostTimeline(horizontal_item){
    var postSlider_item = jQuery(horizontal_item).find('.list');
    var post_slide = postSlider_item.data('slidesshow'),
        post_scroll = postSlider_item.data('slidescroll'),
        post_speed = postSlider_item.data('speed'),
        post_autoplay = postSlider_item.data('autoplay'),
        post_autoplayspeed = postSlider_item.data('autoplayspeed'),
        post_fade = postSlider_item.data('fade'),
        post_arrow = postSlider_item.data('arrow'),
        post_dot = postSlider_item.data('dot');
    postSlider_item.not('.jnext_s_lick-initialized').jnext_s_lick({
        "cssEase": 'linear', 
        infinite: false,
        slidesToShow: post_slide,
        slidesToScroll: post_scroll,
        fade: post_fade,
        autoplay: post_autoplay,
        autoplaySpeed: post_autoplayspeed,
        speed: post_speed,
        dots: post_dot,
        arrows: post_arrow,
        prevArrow: '.post_prev-arrow',
        nextArrow: '.post_next-arrow',
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true,
                }
            },
            {
                breakpoint: 480,
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
}

export { JnextpostTimelineContent };