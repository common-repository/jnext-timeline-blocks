function jnextTimelineContent_back(id) {

    var timeline = jQuery(".jnext-content-timeline").parents("#block-" + id);
    var tm_item = timeline.find(".jnext-content-timeline");
    var line_inner = timeline.find(".JnextTbfocusconnector");
    var line_outer = timeline.find(".JnextTbconnector");
    var $icon_class = timeline.find(".jtb__view-icon-wrap");

    if ($icon_class.length > 0) {

        var $card_last = timeline.find(".jnext-timeline-content:last-child");
        var timeline_start_icon = $icon_class.first().position();
        var timeline_end_icon = $icon_class.last().position();
        line_outer.css("top", timeline_start_icon.top);
        var timeline_card_height = $card_last.height();

        var last_item_top = $card_last.offset().top - tm_item.offset().top;
        var $last_item, parent_top;
        var $document = jQuery(document);

        if (jQuery('.jnext-timeline-block__horizontal').parents("#block-" + id).length) {

            var horizontal = jQuery('.jnext-timeline-block__horizontal').parents("#block-" + id);
            var horizontal_item = horizontal.find('.jnext-timeline-block__horizontal');
            var remove_spacing = horizontal_item.find('.jnext-timeline-content:nth-child(odd)').css('margin-top').replace("px", "");
            var oddTimelineHighestBox = 0;
            var topTimelineHighestBox = 0;

            var hLineouter = horizontal_item.find('.JnextTbconnector');
            var hlast_item_right = $card_last.offset().top - horizontal_item.offset().top;
            var horizontal_arrows = jQuery('.prev-arrow, .next-arrow').outerHeight() / 2;
            var parent_right;

            initJnextContentTimeline(horizontal_item);
            
            horizontal_item.find('.jnext-timeline-content:nth-child(odd)').each(function () {
                if (jQuery(this).find('.jtb__detail-wrap').outerHeight() > oddTimelineHighestBox) {
                    oddTimelineHighestBox = jQuery(this).find('.jtb__detail-wrap').outerHeight();
                }
            });
            
            horizontal_item.find('.jnext-timeline-content').each(function () {
                if (jQuery(this).find('.jtb__detail-wrap').outerHeight() > topTimelineHighestBox) {
                    topTimelineHighestBox = jQuery(this).find('.jtb__detail-wrap').outerHeight();
                }
            });

            if (horizontal_item.hasClass("jnext-timeline-block__center-block")) {

                horizontal_item.find('.jnext-timeline-content:nth-child(odd)').each(function () {
                    jQuery(this).find('.jnext-timeline-blocks__widget').css('margin-top', (oddTimelineHighestBox - jQuery(this).find('.jtb__detail-wrap').outerHeight()));
                });

                horizontal_item.find('.jnext-timeline-content:nth-child(even) .jtb__date-wrap').css('margin-top', ((+(oddTimelineHighestBox - horizontal_item.find('.jnext-timeline-content:nth-child(even) .jtb__date-wrap').outerHeight())) + (+remove_spacing)));

                hLineouter.css("top", (+(oddTimelineHighestBox + ($icon_class.outerHeight() / 2)) + (+remove_spacing)));
                parent_right = hlast_item_right - timeline_start_icon.top;
                $last_item = parent_right + timeline_end_icon.top;

                jQuery('.prev-arrow, .next-arrow').css('top', (+(oddTimelineHighestBox + ($icon_class.outerHeight() / 2)) + (+remove_spacing) - horizontal_arrows));

            } else if (horizontal_item.hasClass("jnext-timeline-block__top-block")) {

                jQuery('.prev-arrow, .next-arrow').css('top', (timeline_start_icon.top + ($icon_class.outerHeight() / 2)) - horizontal_arrows);
                hLineouter.css("top", timeline_start_icon.top + ($icon_class.outerHeight() / 2));

            } else if (horizontal_item.hasClass("jnext-timeline-block__bottom-block")) {

                hLineouter.css("top", (+(topTimelineHighestBox + ($icon_class.outerHeight() / 2)) + (+remove_spacing)));
                hLineouter.css("bottom", 'unset');
                jQuery('.prev-arrow, .next-arrow').css('top', (+(topTimelineHighestBox + ($icon_class.outerHeight() / 2)) + (+remove_spacing) - horizontal_arrows));

                horizontal_item.find('.jnext-timeline-content').each(function () {
                    jQuery(this).find('.jnext-timeline-blocks__widget').css('margin-top', topTimelineHighestBox - jQuery(this).find('.jtb__detail-wrap').outerHeight());
                });
            }

        }

        if (jQuery('.jnext-timeline-block__horizontal').parents("#block-" + id).length == 0) {
            if (tm_item.hasClass("jnext-timeline-block__arrow-center")) {

                line_outer.css("bottom", timeline_end_icon.top);
                parent_top = last_item_top - timeline_start_icon.top;
                $last_item = parent_top + timeline_end_icon.top;

            } else if (tm_item.hasClass("jnext-timeline-block__arrow-top")) {

                var top_height = timeline_card_height - timeline_end_icon.top;
                line_outer.css("bottom", top_height);
                $last_item = last_item_top;

            } else if (tm_item.hasClass("jnext-timeline-block__arrow-bottom")) {

                var bottom_height = timeline_card_height - timeline_end_icon.top;
                line_outer.css("bottom", bottom_height);
                parent_top = last_item_top - timeline_start_icon.top;
                $last_item = parent_top + timeline_end_icon.top;

            }
        }

        var num = 0;
        var elementEnd = $last_item + 20;

        var connectorHeight = (jQuery('.jnext-timeline-block__horizontal').length) ? 3 * timeline.find(".jtb__view-icon-wrap:first").width() : 3 * timeline.find(".jtb__view-icon-wrap:first").height();

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
            if (viewportHeightHalf + Math.abs(photoViewportOffsetTop) < elementEnd) {
                line_inner.height(viewportHeightHalf + photoViewportOffsetTop);
            } else {
                if (photoViewportOffsetTop + viewportHeightHalf >= elementEnd) {
                    line_inner.height(elementEnd);
                }
            }
        } else {
            if (photoViewportOffsetTop + viewportHeightHalf < elementEnd) {
                if (0 > photoViewportOffsetTop) {
                    line_inner.height(viewportHeightHalf - Math.abs(photoViewportOffsetTop));
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
        var timeline_icon = timeline.find(".jtb__view-icon-wrap"), animate_border = timeline.find(".jnext-timeline-blocks__widget");

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
                timeline_icon[i].classList.remove("jnext-timeline-blocks__out-view-icon");
                timeline_icon[i].classList.add("jnext-timeline-blocks__in-view-icon");
            } else {
                // Remove classes if element is below than half of viewport.
                timeline_icon[i].classList.add("jnext-timeline-blocks__out-view-icon");
                timeline_icon[i].classList.remove("jnext-timeline-blocks__in-view-icon");
            }
        }
    }

}

function initJnextContentTimeline(horizontal_item) {
    var slider_item = jQuery(horizontal_item).find('.list');
    var slide = slider_item.data('slidesshow'),
        scroll = slider_item.data('slidescroll'),
        sPeed = slider_item.data('speed'),
        autoplay = slider_item.data('autoplay'),
        autoplayspeed = slider_item.data('autoplayspeed'),
        fade = slider_item.data('fade'),
        arrow = slider_item.data('arrow'),
        dot = slider_item.data('dots');
    
    slider_item.not('.jnext_s_lick-initialized').jnext_s_lick({
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
        prevArrow: '.prev-arrow',
        nextArrow: '.next-arrow',
        adaptiveHeight: true,
        touchMove: false,
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

export { jnextTimelineContent_back };