/**
 * Common js file for timeline.
 */
(function ($) {
    // Listen for events.
    window.addEventListener("load", JnextpostTimelineContent);
    window.addEventListener("resize", JnextpostTimelineContent);
    window.addEventListener("scroll", JnextpostTimelineContent);

    window.addEventListener("load", jnextPostTimelineHorizontalInit);
    var resizeTimer;
    jQuery(window).on('resize', function(){
        
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {

            jnextPostTimelineHorizontalInit();
                
        }, 1000);
        
    }).trigger('resize');

    // Callback function for all event listeners.
    function JnextpostTimelineContent() {
        var timeline = jQuery(".jnext-post-timeline:not(.jnext-post-timeline-block__horizontal)");
        if (timeline.parents(".wp-block").length == 0) {
            timeline.each(function () {
                var line_inner = jQuery(this).find(".JnextTb__post-block-focusconnector");
                var line_outer = jQuery(this).find(".JnextTb__post-block-connector");
                var $icon_class = jQuery(this).find(".jtb__post-view-icon-wrap");
                var $card_last = jQuery(this).find(".jnext-post-timeline-wrap:last-child");
                var $document = jQuery(document);
                
                // Set top and bottom for line.
                var timeline_start_icon = $icon_class.first().position();
                var timeline_end_icon = $icon_class.last().position();
                line_outer.css("top", timeline_start_icon.top);

                var timeline_card_height = $card_last.height();
                var last_item_top = $card_last.offset().top - jQuery(this).offset().top;
                var $last_item, parent_top;

                if (jQuery(this).hasClass("jnext-post-timeline-block__arrow-center")) {
                    line_outer.css("bottom", timeline_end_icon.top);

                    parent_top = last_item_top - timeline_start_icon.top;
                    $last_item = parent_top + timeline_end_icon.top;
                } else if (jQuery(this).hasClass("jnext-post-timeline-block__arrow-top")) {
                    var top_height = timeline_card_height - timeline_end_icon.top;
                    line_outer.css("bottom", top_height);

                    $last_item = last_item_top;
                } else if (jQuery(this).hasClass("jnext-post-timeline-block__arrow-bottom")) {
                    var bottom_height = timeline_card_height - timeline_end_icon.top;
                    line_outer.css("bottom", bottom_height);

                    parent_top = last_item_top - timeline_start_icon.top;
                    $last_item = parent_top + timeline_end_icon.top;
                }

                var num = 0;
                var elementEnd = $last_item + 20;
                var connectorHeight =
                3 * jQuery(this).find(".jtb__post-view-icon-wrap:first").height();
                var viewportHeight = document.documentElement.clientHeight;
                var viewportHeightHalf = viewportHeight / 2 + connectorHeight;
                var elementPos = jQuery(this).offset().top;
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

                //Icon bg color and icon color
                var timeline_icon_pos, timeline_card_pos;
                var elementPos, elementCardPos;
                var timeline_icon_top, timeline_card_top;
                var timeline_icon = jQuery(this).find(".jtb__post-view-icon-wrap"),
                animate_border = jQuery(this).find(".jnext-post-timeline-wrap");

                for (var i = 0; i < timeline_icon.length; i++) {
                    timeline_icon_pos = jQuery(timeline_icon[i]).offset().top;
                    timeline_card_pos = jQuery(animate_border[i]).offset().top;
                    elementPos = jQuery(this).offset().top;
                    elementCardPos = jQuery(this).offset().top;

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
                        timeline_icon[i].classList.add(
                            "jnext-post-timeline-blocks__out-view-icon"
                        );
                        timeline_icon[i].classList.remove(
                            "jnext-post-timeline-blocks__in-view-icon"
                        );
                    }
                }
            });
        }
    }

    function jnextPostTimelineHorizontalInit() {
        var post_horizontal_item = jQuery('.jnext-post-timeline-block__horizontal');
    
        if(post_horizontal_item.length){
            var hLineouter = post_horizontal_item.find('.JnextTb__post-block-connector');
            var $card_last = post_horizontal_item.find(".jnext-post-timeline-content:last-child");
            var hlast_item_right = $card_last.offset().top - post_horizontal_item.offset().top;
            var $icon_class = post_horizontal_item.find(".jtb__post-view-icon-wrap");
            var timeline_start_icon = $icon_class.first().position();
            var timeline_end_icon = $icon_class.last().position();
            var horizontal_arrows = jQuery('.post_prev-arrow, .post_next-arrow').outerHeight() / 2;
            
            initJnextPostTimeline(post_horizontal_item);

            var parent_right;
            
            var oddTimelineHighestBox = 0;
            post_horizontal_item.find('.jnext-post-timeline-content:nth-child(odd)').each(function(){
                if(jQuery(this).find('.jtb__post-detail-wrap').outerHeight() > oddTimelineHighestBox){  
                    oddTimelineHighestBox = jQuery(this).find('.jtb__post-detail-wrap').outerHeight(); 
                }   
            });

            var topTimelineHighestBox = 0;
            post_horizontal_item.find('.jnext-post-timeline-content').each(function(){
                if(jQuery(this).find('.jtb__post-detail-wrap').outerHeight() > topTimelineHighestBox){ 
                    topTimelineHighestBox = jQuery(this).find('.jtb__post-detail-wrap').outerHeight(); 
                }
            });
            
            var remove_spacing = post_horizontal_item.find('.jnext-post-timeline-content:nth-child(odd)').css('margin-top').replace("px", "");

            if( post_horizontal_item.hasClass("jnext-post-timeline-block__center-block") ){
                
                post_horizontal_item.find('.jnext-post-timeline-content:nth-child(odd)').each(function(){
                    jQuery(this).find('.jnext-post-timeline-block__widget').css('margin-top', ( oddTimelineHighestBox - jQuery(this).find('.jtb__post-detail-wrap').outerHeight() ) );
                });
                
                post_horizontal_item.find('.jnext-post-timeline-content:nth-child(even) .jtb__post-block-date-wrap').css('margin-top', ( ( +( oddTimelineHighestBox - post_horizontal_item.find('.jnext-post-timeline-content:nth-child(even) .jtb__post-block-date-wrap').outerHeight() ) ) + (+remove_spacing) ) );
    
                hLineouter.css( "top", ( +( oddTimelineHighestBox + ( $icon_class.outerHeight() / 2 ) ) + (+remove_spacing) ) );
                parent_right = hlast_item_right - timeline_start_icon.top;
                $last_item = parent_right + timeline_end_icon.top;
                
                jQuery('.post_prev-arrow, .post_next-arrow').css('top', ( +( oddTimelineHighestBox + ( $icon_class.outerHeight() / 2 ) ) + (+remove_spacing) - horizontal_arrows ) );
    
            }else if ( post_horizontal_item.hasClass("jnext-post-timeline-block__top-block") ){
                
                jQuery('.post_prev-arrow, .post_next-arrow').css('top', ( timeline_start_icon.top + ( $icon_class.outerHeight() / 2 ) ) - horizontal_arrows );
                hLineouter.css( "top", timeline_start_icon.top + ( $icon_class.outerHeight() / 2 ) );

            } else if ( post_horizontal_item.hasClass("jnext-post-timeline-block__bottom-block") ){
                                    
                hLineouter.css( "top", ( +( topTimelineHighestBox + ( $icon_class.outerHeight() / 2 ) ) + (+remove_spacing) ) );
                hLineouter.css( "bottom", 'unset' );
                jQuery('.post_prev-arrow, .post_next-arrow').css('top', ( +( topTimelineHighestBox + ( $icon_class.outerHeight() / 2 ) ) + (+remove_spacing) - horizontal_arrows ) );

                post_horizontal_item.find('.jnext-post-timeline-content').each(function(){
                    jQuery(this).find('.jnext-post-timeline-block__widget').css('margin-top', topTimelineHighestBox - jQuery(this).find('.jtb__post-detail-wrap').outerHeight() );
                });
            }
        }
    }

})(jQuery);
function initJnextPostTimeline(post_horizontal_item){
    jQuery(post_horizontal_item).each(function(){
        var postSlider_item = jQuery(this).find('.list');
        var post_slide = postSlider_item.data('slidesshow'),
            post_scroll = postSlider_item.data('slidescroll'),
            post_speed = postSlider_item.data('speed'),
            post_autoplay = postSlider_item.data('autoplay'),
            post_autoplayspeed = postSlider_item.data('autoplayspeed'),
            post_fade = postSlider_item.data('fade'),
            post_arrow = postSlider_item.data('arrow'),
            post_dot = postSlider_item.data('dot');
        jQuery(this).find('.list').not('.jnext_s_lick-initialized').jnext_s_lick({
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
            focusOnSelect: true,
            adaptiveHeight: true,
            prevArrow: jQuery(this).find('.post_prev-arrow'),
            nextArrow: jQuery(this).find('.post_next-arrow'),
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