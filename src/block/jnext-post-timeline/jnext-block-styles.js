/**
 * Returns Dynamic Generated CSS
 */

import generateCSSforBlocks from "../../generateCSSforBlocks";
 
function JnextBlockStyles(props) {
    const {
        attributes,
    } = props;
    var border_with_color = "12px solid " + attributes.itemBackgroundColor;
    if(attributes.timelineAlignment != 'center' && attributes.postTimelineLayout != 'horizontal'){
        var selector = {
            ' .jtb-post-one-sided_inner_block': {
            "border-radius": JnextBlockgenerateCSSUnit(attributes.itemBorderRadius, "px"),
            padding: JnextBlockgenerateCSSUnit(attributes.itemPadding, "px"),
            "background-color": attributes.itemBackgroundColor || "#ffffff",
            }
        };
    }else{
        var selector = {
            ' .jtb-post-details' : {
            "border-radius": JnextBlockgenerateCSSUnit(attributes.itemBorderRadius, "px"),
            padding: JnextBlockgenerateCSSUnit(attributes.itemPadding, "px"),
            "background-color": attributes.itemBackgroundColor || "#ffffff",
            }
        };
    }

    var boxShadowPosition = attributes.boxshadowPosition;
    
    if ( "outset" === attributes.boxshadowPosition || undefined === attributes.boxshadowPosition ) {
        boxShadowPosition = "";
    }

    var sepratorWidth = ( undefined !== attributes.sepratorWidth ) ? attributes.sepratorWidth : 2;
    
    var selectors = {

        " .jnext-post-timeline-block__center-block .jnext-post-timeline-content .jtb__post-block-date-wrap" : {
            "margin" : ( ( attributes.iconBackgroundSize - attributes.dateLineheight ) / 2) + "px 0px",
        },

        " .jnext-post-timeline-block__left .jnext_post-timeline-block__day-right .jnext_post_timeline_block_arrow:after": {
            "border-left": border_with_color,
        },

        " .jnext-post-timeline-block__right .jnext_post-timeline-block__day-right .jnext_post_timeline_block_arrow:after": {
            "border-left": border_with_color,
        },
    
        " .jnext-post-timeline-block__right .jnext_post-timeline-block__day-left .jnext_post_timeline_block_arrow:after": {
            "border-right": border_with_color,
        },
    
        " .jnext-post-timeline-block__left .jnext_post-timeline-block__day-left .jnext_post_timeline_block_arrow:after": {
            "border-right": border_with_color,
        },
    
        " .JnextTb__post-block-focusconnector": {
            "background-color": attributes.sepratorFocusColor,
        },
    
        " .jnext-post-timeline-blocks-main .Jtb_post-block-ifb-icon svg": {
            color: attributes.iconColor,
            fill: attributes.iconColor,
        },
    
        " .jtb__post-view-icon-wrap": {
            "background-color": attributes.iconBackgroundColor,
            "border-color": attributes.iconBorderColor,
            "min-width": JnextBlockgenerateCSSUnit(attributes.iconBackgroundSize, "px"),
            "min-height": JnextBlockgenerateCSSUnit(attributes.iconBackgroundSize, "px"),
            "max-height": JnextBlockgenerateCSSUnit(attributes.iconBackgroundSize, "px"),
            "border-radius": JnextBlockgenerateCSSUnit(attributes.iconBorderRadius, "px"),
        },
    
        " .jnext-post-timeline-blocks-main .jtb__post-view-icon-wrap.jnext-post-timeline-blocks__in-view-icon": {
            background: attributes.iconFocusBackgroundColor,
            "border-color": attributes.iconFocusBorderColor,
            color: attributes.iconFocusColor,
        },

        " .jnext-post-timeline-block__horizontal .jnext-post-timeline-content.jnext_s_lick-prev .jtb__post-view-icon-wrap": {
            background: attributes.iconFocusBackgroundColor,
            "border-color": attributes.iconFocusBorderColor,
            color: attributes.iconFocusColor,
        },

        " .jnext-post-timeline-block__horizontal .jnext-post-timeline-content.jnext_s_lick-current .jtb__post-view-icon-wrap": {
            background: attributes.iconFocusBackgroundColor,
            "border-color": attributes.iconFocusBorderColor,
            color: attributes.iconFocusColor,
        },
    
        " .jnext-post-timeline-blocks-main .jtb__post-view-icon-wrap.jnext-post-timeline-blocks__in-view-icon svg": {
            fill: attributes.iconFocusColor,
        },
    
        " .jnext-post-timeline-block__left-block .JnextTb__post-block-connector": {
            left: attributes.iconBackgroundSize / 2 + "px",
        },
    
        " .jnext-post-timeline-block__right-block .JnextTb__post-block-connector": {
            right: (attributes.iconBackgroundSize / 2 - sepratorWidth) + "px",
        },
    
        " .jnext-post-timeline-content": {
            "margin-bottom": JnextBlockgenerateCSSUnit(attributes.verticalSpace, "px")
        },
    
        " .jtb__post-view-icon-wrap.jnext-post-timeline-blocks__out-view-icon": {
            "min-width": JnextBlockgenerateCSSUnit(attributes.iconBackgroundSize, "px"),
            "min-height": JnextBlockgenerateCSSUnit(attributes.iconBackgroundSize, "px"),
            "max-height": JnextBlockgenerateCSSUnit(attributes.iconBackgroundSize, "px"),
            "border-width": JnextBlockgenerateCSSUnit(attributes.iconBorderWidth, "px"),
            "border-radius": JnextBlockgenerateCSSUnit(attributes.iconBorderRadius, "px"),
        },

        " .jtb__post-view-icon-wrap.jnext-post-timeline-blocks__in-view-icon": {
            "min-width": JnextBlockgenerateCSSUnit(attributes.iconBackgroundSize, "px"),
            "min-height": JnextBlockgenerateCSSUnit(attributes.iconBackgroundSize, "px"),
            "max-height": JnextBlockgenerateCSSUnit(attributes.iconBackgroundSize, "px"),
            "border-width": JnextBlockgenerateCSSUnit(attributes.iconBorderWidth, "px"),
            "border-radius": JnextBlockgenerateCSSUnit(attributes.iconBorderRadius, "px"),
        },

        " .jtb__post-view-icon-wrap.jnext-post-timeline-blocks__out-view-icon": {
            "margin-left": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
            "margin-right": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
        },

        " .jtb__post-view-icon-wrap.jnext-post-timeline-blocks__in-view-icon ": {
            "margin-left": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
            "margin-right": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
        },

        " .jnext-post-timeline-block__horizontal .jtb__post-view-icon-wrap" : {
            "margin-top": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
            "margin-bottom": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
        },
    
        " .Jtb_post-block-ifb-icon": {
            width: JnextBlockgenerateCSSUnit(attributes.iconSize, "px"),
            height: JnextBlockgenerateCSSUnit((attributes.iconBackgroundSize - attributes.iconBorderWidth * 2), "px"),
        },
    
        " .jtb-time": {
            color: attributes.dateColor,
            "line-height": attributes.dateLineheight + "px",
            "font-weight": attributes.dateFontweight,
            "font-size": JnextBlockgenerateCSSUnit(attributes.dateFontsize, "px"),
            "font-family": attributes.dateFontfamily,
        },

        " .jnext-timeline-blocks-post-timeline__heading .jnext-post-timeline__heading-text-link": {
            color: attributes.headingColor,
            "line-height": attributes.headingLineheight + "px",
            "font-weight": attributes.headingFontweight,
            "font-size": JnextBlockgenerateCSSUnit(attributes.headingFontsize, "px"),
            "font-family": attributes.headingFontfamily,
        },

        " .jnext-timeline-blocks-post-timeline__heading": {
            "font-size": JnextBlockgenerateCSSUnit(attributes.headingFontsize, "px"),
            "line-height": attributes.headingLineheight + "px",
            "margin-bottom": JnextBlockgenerateCSSUnit(attributes.headingBottomSpace, "px")
        },

        " .jnext-timeline-blocks-post-timeline-author .jnext-post-timeline-author-text-link": {
            color: attributes.authorColor,
            "line-height": attributes.authorLineheight + "px",
            "font-weight": attributes.authorFontweight,
            "font-size": JnextBlockgenerateCSSUnit(attributes.authorFontsize, "px"),
            "font-family": attributes.authorFontfamily,
        },

        " .jnext-timeline-blocks-post-timeline-author": {
            "margin-bottom": JnextBlockgenerateCSSUnit(attributes.authorBottomSpace, "px")
        },
    
        " .jnext-post-timeline__post-excerpt p": {
            color: attributes.contentColor,
            "line-height": attributes.contentLineheight + "px",
            "font-weight": attributes.contentFontweight,
            "font-size": JnextBlockgenerateCSSUnit(attributes.contentFontsize, "px"),
            "font-family": attributes.contentFontfamily,
        },

        " .jnext-post-timeline__post-excerpt": {
            "margin-bottom": JnextBlockgenerateCSSUnit(attributes.excerptBottomSpace, "px")
        },

        " .jnext-timeline-blocks-post-timeline__readMore-wrap .jnext-post-timeline__readMore-text-link:hover": {
            "background-color": attributes.readmoreHoverBackgroundColor,
            "border-color": attributes.readmoreHoverBorderColor,
            color: attributes.readmoreHoverColor + "!important",
        },

        " .jnext-timeline-blocks-post-timeline__readMore-wrap .jnext-post-timeline__readMore-text-link:focus": {
            "background-color": attributes.readmoreHoverBackgroundColor,
            "border-color": attributes.readmoreHoverBorderColor,
            color: attributes.readmoreHoverColor + "!important",
        },

        " .jnext-timeline-blocks-post-timeline__readMore-wrap .jnext-post-timeline__readMore-text-link:active": {
            "background-color": attributes.readmoreHoverBackgroundColor,
            "border-color": attributes.readmoreHoverBorderColor,
            color: attributes.readmoreHoverColor + "!important",
        },

        " .jnext-timeline-blocks-post-timeline__readMore-wrap .jnext-post-timeline__readMore-text-link": {
            color: attributes.readmoreColor + "!important",
            "line-height": attributes.readmoreLineheight + "px",
            "font-weight": attributes.readmoreFontweight,
            "font-size": JnextBlockgenerateCSSUnit(attributes.readmoreFontsize, "px"),
            "font-family": attributes.readmoreFontfamily,
            "background-color": attributes.readmoreBackgroundColor,
            "border-width": attributes.readmoreBorderwidth + "px",
            "border-color": attributes.readmoreBorderColor,
            "border-style": "solid",
            "box-shadow":
                JnextBlockgenerateCSSUnit(attributes.boxshadowHorizontal, "px") +
                " " +
                JnextBlockgenerateCSSUnit(attributes.boxshadowVertical, "px") +
                " " +
                JnextBlockgenerateCSSUnit(attributes.boxshadowBlur, "px") +
                " " +
                JnextBlockgenerateCSSUnit(attributes.boxshadowSpread, "px") +
                " " +
                attributes.boxshadowColor +
                " " +
                boxShadowPosition,
        },
    
        " .JnextTb__post-block-connector": {
            "background-color": attributes.sepratorColor,
            width: JnextBlockgenerateCSSUnit(attributes.sepratorWidth, "px"),
            "margin-left":
                attributes.timelineAlignment != "center" ? JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px") : "",
            "margin-right":
                attributes.timelineAlignment != "center" ? JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px") : "",
        },

        " .jnext-post-timeline-block__horizontal .JnextTb__post-block-connector": {
            height: JnextBlockgenerateCSSUnit(attributes.sepratorWidth, "px"),
            width: 'auto',
            "margin-top": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
            "margin-bottom": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
        },

        " .jnext-post-timeline-block__horizontal .JnextTb__post-block-focusconnector": {
            height: JnextBlockgenerateCSSUnit(attributes.sepratorWidth, "px!important"),
        },

        " .jnext-post-timeline-block__horizontal .jnext_s_lick_post__h-arrow": {
            "width": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_PostIconBgsize, "px" ),
            "height": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_PostIconBgsize, "px" ),
            "border": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_PostIconborderwidth, "px" ) + " solid " + attributes.jnext_s_lick_PostIconBorderColor,
            "background": attributes.jnext_s_lick_PostBgColor,
            "border-radius": JnextBlockgenerateCSSUnit(attributes.jnext_s_lick_PostIconborderradius, "px"),
            "margin-top": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
            "margin-bottom": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
        },

        " .jnext-post-timeline-block__horizontal .jnext_s_lick_post__h-arrow svg": {
            "font-size": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_h__PostIconSize, "px" ),
            "height": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_PostIconHeight, "px" ),
        },

        " .jnext-post-timeline-block__horizontal .jnext_s_lick_post__h-arrow svg path": {
            "fill": attributes.jnext_s_lick_PostIconColor 
        },
        
        " .jnext-post-timeline-block__horizontal .jnext_s_lick_post__h-arrow:hover": {
            "border-color": attributes.jnext_s_lick_PostIconBorderFillColor,
            "background": attributes.jnext_s_lick_PostFocus_BgColor
        },

        " .jnext-post-timeline-block__horizontal .jnext_s_lick_post__h-arrow:focus": {
            "border-color": attributes.jnext_s_lick_PostIconBorderFillColor,
            "background": attributes.jnext_s_lick_PostFocus_BgColor
        },

        " .jnext-post-timeline-block__horizontal .jnext_s_lick_post__h-arrow:active": {
            "border-color": attributes.jnext_s_lick_PostIconBorderFillColor,
            "background": attributes.jnext_s_lick_PostFocus_BgColor
        },

        " .jnext-post-timeline-block__horizontal .jnext_s_lick_post__h-arrow:hover svg path": {
            fill: attributes.jnext_s_lick_PostIconFillColor,
        },

        " .jnext-post-timeline-block__horizontal .jnext_s_lick_post__h-arrow:focus svg path": {
            fill: attributes.jnext_s_lick_PostIconFillColor,
        },

        " .jnext-post-timeline-block__horizontal .jnext_s_lick_post__h-arrow:active svg path": {
            fill: attributes.jnext_s_lick_PostIconFillColor,
        },

        " .jnext-post-timeline-block__horizontal .jnext_s_lick_post__h-arrow.post_prev-arrow": {
            left: "-" + JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_PostIconBgsize, "px" ),
        },

        " .jnext-post-timeline-block__horizontal .jnext_s_lick_post__h-arrow.post_next-arrow": {
            right: "-" + JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_PostIconBgsize, "px" ),
        },

        " .jnext-post-timeline-block__horizontal .jnext_s_lick-dots > li": {
            "width": JnextBlockgenerateCSSUnit( ( attributes.jnext_s_lick_PostdotBgsize + ( attributes.jnext_s_lick_Postdotborderwidth * 2 ) ), "px" ),
            "height": JnextBlockgenerateCSSUnit( ( attributes.jnext_s_lick_PostdotBgsize + ( attributes.jnext_s_lick_Postdotborderwidth * 2 ) ), "px" ),
        },

        " .jnext-post-timeline-block__horizontal .jnext_s_lick-dots button:before": {
            "width": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_PostdotSize, "px" ),
            "height": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_PostdotSize, "px" ),
            "border-radius": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_Postdotradius, "px" ),
            "opacity": attributes.jnext_s_lick_PostdotOpacity,
            "background": attributes.jnext_s_lick_PostdotColor
        },

        " .jnext-post-timeline-block__horizontal .jnext_s_lick-dots button": {
            "max-width": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_PostdotBgsize, "px" ),
            "max-height": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_PostdotBgsize, "px" ),
            "border": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_Postdotborderwidth, "px" ) + " solid " + attributes.jnext_s_lick_PostdotBorderColor,
            "border-radius": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_Postdotborderradius, "px" ),
            "background": attributes.jnext_s_lick_PostdotBgColor,
            "padding": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_PostdotBGSpacing, "px" )
        },

        " .jnext-post-timeline-block__horizontal .jnext_s_lick-dots button:hover": {
            "border-color": attributes.jnext_s_lick_PostdotBorderFillColor,
            "background": attributes.jnext_s_lick_PostDotFocusBgColor
        },

        " .jnext-post-timeline-block__horizontal .jnext_s_lick-dots button:hover:before": {
            "opacity": attributes.jnext_s_lick_PostdotFocusOpacity,
            "background": attributes.jnext_s_lick_PostdotFillColor
        },

        " .jnext-post-timeline-block__horizontal .jnext_s_lick-dots .jnext_s_lick-active button:before": {
            "opacity": attributes.jnext_s_lick_PostdotFocusOpacity,
            "background": attributes.jnext_s_lick_PostdotFillColor
        },

        " .jnext-post-timeline-block__horizontal .list > div": {
            "padding-bottom": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_h__PostbottomSpacing, "px" ),
        },

        " .jnext-post-timeline-block__horizontal .jnext_post-timeline-block__day-top .jnext_post_timeline_block_arrow:after": {
            "border-bottom-color": attributes.itemBackgroundColor || "#ffffff"
        },

        " .jnext-post-timeline-block__horizontal .jnext_post-timeline-block__day-bottom .jnext_post_timeline_block_arrow:after": {
            "border-top-color": attributes.itemBackgroundColor || "#ffffff"
        },

        " .jnext-post-timeline-block__horizontal .jnext_post-timeline-block__day-right .jnext_post_timeline_block_arrow:after": {
            "border-left-color": attributes.itemBackgroundColor
        },

        " .jnext-post-timeline-block__horizontal .jnext_post-timeline-block__day-left .jnext_post_timeline_block_arrow:after": {
            "border-right-color": attributes.itemBackgroundColor
        },

        " .jnext-post-timeline-block__horizontal .JnextTb__post-block-connector::after" : {
            "height" : JnextBlockgenerateCSSUnit( attributes.sepratorWidth, "px" ),
        },
                
        " .jnext-post-timeline-block__horizontal .JnextTb__post-block-connector::before" : {
            "height" : JnextBlockgenerateCSSUnit( attributes.sepratorWidth, "px"),
        },
    };
    
    var mobile_selectors = {

        " .jnext-post-timeline-block__center-block.jnext_post_timeline-block__mobile .JnextTb__post-block-connector": {
            left: JnextBlockgenerateCSSUnit(attributes.iconBackgroundSize / 2, "px"),
            right: JnextBlockgenerateCSSUnit(attributes.iconBackgroundSize / 2, "px"),
            "margin-left": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
            "margin-right": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
        },
    
        " .jnext-post-timeline-block__left-block.jnext_post_timeline-block__mobile .JnextTb__post-block-connector": {
            left: JnextBlockgenerateCSSUnit(attributes.iconBackgroundSize / 2, "px"),
        },
    
        " .jnext-post-timeline-block__right-block.jnext_post_timeline-block__mobile .JnextTb__post-block-connector": {
            right: JnextBlockgenerateCSSUnit((attributes.iconBackgroundSize / 2 - attributes.sepratorWidth), "px"),
        },

        " .jnext-post-timeline-block__center-block.jnext_post_timeline-block__mobile .jnext_post-timeline-block__day-right .jnext_post_timeline_block_arrow::after": {
            "border-right": border_with_color,
        }

    };
    
    var tablet_selectors = {

        " .jnext-post-timeline-block__center-block.jnext_post_timeline-block__tablet .JnextTb__post-block-connector": {
            left: JnextBlockgenerateCSSUnit(attributes.iconBackgroundSize / 2, "px"),
            right: JnextBlockgenerateCSSUnit(attributes.iconBackgroundSize / 2, "px"),
            "margin-left": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
            "margin-right": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
        },
    
        " .jnext-post-timeline-block__left-block.jnext_post_timeline-block__tablet .JnextTb__post-block-connector": {
            left: JnextBlockgenerateCSSUnit(attributes.iconBackgroundSize / 2, "px"),
        },
    
        " .jnext-post-timeline-block__right-block.jnext_post_timeline-block__tablet .JnextTb__post-block-connector": {
            right: JnextBlockgenerateCSSUnit((attributes.iconBackgroundSize / 2 - attributes.sepratorWidth), "px"),
        },

        " .jnext-post-timeline-block__center-block.jnext_post_timeline-block__tablet .jnext_post-timeline-block__day-right .jnext_post_timeline_block_arrow::after": {
            "border-right": border_with_color,
        }

    };
    
    var styling_css = "";
    var id = `.jnext-timeline-blocks-post-timeline.block-${attributes.block_id}`;

    styling_css = generateCSSforBlocks(selectors, id);
    styling_css += generateCSSforBlocks(selector, id);
    styling_css += generateCSSforBlocks(tablet_selectors, id, true, "tablet");
    styling_css += generateCSSforBlocks(mobile_selectors, id, true, "mobile");
    
    return styling_css;
}
export default JnextBlockStyles;
 
function JnextBlockgenerateCSSUnit(attr_value, unit) {
    var css = "";

    if (typeof attr_value != "undefined") {
        css += attr_value + unit;
    }

    return css;
}