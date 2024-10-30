/**
 * Returns Dynamic Generated CSS
 */

import generateCSSforBlocks from "../../generateCSSforBlocks";

function JnextBlockStyles(props) {
    const {
        attributes,
    } = props;
    var border_with_color = "12px solid " + attributes.backgroundColor;
    if(attributes.timelineAlignment != 'center' && attributes.timelineLayout !== 'horizontal'){
      var selector = {
        ' .jtb-one-sided_inner_block': {
          "border-radius": JnextBlockgenerateCSSUnit(attributes.itemBorderRadius, "px"),
          "border-width": JnextBlockgenerateCSSUnit(attributes.itemBorderWidth, "px"),
          "border-style": attributes.itemBorderStyle,
          "border-color": attributes.itemBorderColor,
          padding: JnextBlockgenerateCSSUnit(attributes.itemPadding, "px"),
          "background-color": attributes.backgroundColor || "#ffffff",
        }
      };
    }else{
      var selector = {
        ' .jtb-details' : {
          "border-radius": JnextBlockgenerateCSSUnit(attributes.itemBorderRadius, "px"),
          "border-width": JnextBlockgenerateCSSUnit(attributes.itemBorderWidth, "px"),
          "border-style": attributes.itemBorderStyle,
          "border-color": attributes.itemBorderColor,
          padding: JnextBlockgenerateCSSUnit(attributes.itemPadding, "px"),
          "background-color": attributes.backgroundColor || "#ffffff",
        }
      };
    }

    var selectors = {
        " .jnext-timeline-block__center-block .jnext-timeline-content .jtb__date-wrap" : {
          "margin" : ( ( attributes.iconBgsize - attributes.dateLineHeight ) / 2) + "px 0px",
        },


        " .jnext-timeline-blocks__left .jnext_timeline-block__day-right .jnext_timeline_blocks_arrow:after": {
          "border-left": border_with_color,
        },

        " .jnext-timeline-blocks__right .jnext_timeline-block__day-right .jnext_timeline_blocks_arrow:after": {
          "border-left": border_with_color,
        },
    
        " .jnext-timeline-blocks__right .jnext_timeline-block__day-left .jnext_timeline_blocks_arrow:after": {
          "border-right": border_with_color,
        },

        " .jnext-timeline-blocks__left .jnext_timeline-block__day-left .jnext_timeline_blocks_arrow:after": {
          "border-right": border_with_color,
        },
    
        " .JnextTbconnector": {
          "background-color": attributes.separatorColor,
        },
    
        " .JnextTbfocusconnector": {
          "background-color": attributes.iconBgFocus,
        },
    
        " .jnext-tmieline-blocks-main .Jtb_ifb-icon svg": {
          color: attributes.iconColor,
          fill: attributes.iconColor,
        },
    
        " .jtb__view-icon-wrap": {
          "background-color": attributes.separatorBg,
          "border-color": attributes.separatorBorder,
        },
    
        " .jnext-tmieline-blocks-main .jtb__view-icon-wrap.jnext-timeline-blocks__in-view-icon": {
          background: attributes.iconBgFocus,
          "border-color": attributes.borderFocus,
          color: attributes.iconFocus,
        },
    
        " .jnext-timeline-block__horizontal .jnext-timeline-content.jnext_s_lick-prev .jtb__view-icon-wrap": {
          background: attributes.iconBgFocus,
          "border-color": attributes.borderFocus,
          color: attributes.iconFocus,
        },

        ".jnext-timeline-block__horizontal .jnext-timeline-content.jnext_s_lick-current .jtb__view-icon-wrap": {
          background: attributes.iconBgFocus,
          "border-color": attributes.borderFocus,
          color: attributes.iconFocus,
        },

        " .jnext-tmieline-blocks-main .jtb__view-icon-wrap.jnext-timeline-blocks__in-view-icon svg": {
          fill: attributes.iconFocus,
        },
    
        " .jnext-timeline-block__vertical.jnext-timeline-block__left-block .JnextTbconnector": {
          left: attributes.iconBgsize / 2 + "px",
        },
    
        " .jnext-timeline-block__vertical.jnext-timeline-block__right-block .JnextTbconnector": {
          right: (attributes.iconBgsize / 2 - 2) + "px",
        },
    
        " .jnext-timeline-content": {
          "margin-bottom": JnextBlockgenerateCSSUnit(attributes.verticalSpace, "px"),
        },
    
        " .jtb__view-icon-wrap.jnext-timeline-blocks__out-view-icon": {
          "min-width": JnextBlockgenerateCSSUnit(attributes.iconBgsize, "px"),
          "min-height": JnextBlockgenerateCSSUnit(attributes.iconBgsize, "px"),
          "max-height": JnextBlockgenerateCSSUnit(attributes.iconBgsize, "px"),
          "border-width": JnextBlockgenerateCSSUnit(attributes.iconborderwidth, "px"),
          "border-radius": JnextBlockgenerateCSSUnit(attributes.iconborderradius, "px"),
        },

        " .jtb__view-icon-wrap.jnext-timeline-blocks__in-view-icon":{
          "min-width": JnextBlockgenerateCSSUnit(attributes.iconBgsize, "px"),
          "min-height": JnextBlockgenerateCSSUnit(attributes.iconBgsize, "px"),
          "max-height": JnextBlockgenerateCSSUnit(attributes.iconBgsize, "px"),
          "border-width": JnextBlockgenerateCSSUnit(attributes.iconborderwidth, "px"),
          "border-radius": JnextBlockgenerateCSSUnit(attributes.iconborderradius, "px"),
        },
        
        " .jnext-timeline-block__vertical .jtb__view-icon-wrap.jnext-timeline-blocks__out-view-icon": {
          "margin-left": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
          "margin-right": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
        },

        " .jnext-timeline-block__vertical .jtb__view-icon-wrap.jnext-timeline-blocks__in-view-icon": {
          "margin-left": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
          "margin-right": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
        },

        " .jnext-timeline-block__horizontal .jtb__view-icon-wrap" : {
          "margin-top": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
          "margin-bottom": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
        },
    
        " .Jtb_ifb-icon": {
          width: JnextBlockgenerateCSSUnit(attributes.iconSize, "px"),
          height: JnextBlockgenerateCSSUnit((attributes.iconBgsize - attributes.iconborderwidth * 2), "px"),
        },
    
        " .jnext-timeline-block__date": {
          color: attributes.dateColor,
          "line-height": attributes.dateLineHeight + "px",
          "font-weight": attributes.dateFontWeight,
          "font-size": JnextBlockgenerateCSSUnit(attributes.dateFontSize, "px"),
          "font-family": attributes.dateFontFamily,
        },
    
        " .jnext-timeline-block__heading": {
          color: attributes.headingColor,
          "line-height": attributes.headingLineHeight + "px",
          "font-weight": attributes.headingFontWeight,
          "font-size": JnextBlockgenerateCSSUnit(attributes.headingFontSize, "px"),
          "font-family": attributes.headingFontFamily,
          "margin-bottom": JnextBlockgenerateCSSUnit(attributes.headingBottomMargin, "px"),
        },
    
        " .jnext-timeline-block__description": {
          color: attributes.contentColor,
          "line-height": attributes.contentLineHeight + "px",
          "font-weight": attributes.contentFontWeight,
          "font-size": JnextBlockgenerateCSSUnit(attributes.contentFontSize, "px"),
          "font-family": attributes.contentFontFamily,
        },
    
        " .JnextTbconnector": {
          "background-color": attributes.separatorColor,
          width: JnextBlockgenerateCSSUnit(attributes.separatorwidth, "px"),
        },

        " .jnext-timeline-block__vertical .JnextTbconnector": {
          "margin-left":
            attributes.timelineAlignment !== "center" ? JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px") : "",
          "margin-right":
            attributes.timelineAlignment !== "center" ? JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px") : "",
        },

        " .jnext-timeline-block__horizontal .JnextTbconnector": {
          height: JnextBlockgenerateCSSUnit(attributes.separatorwidth, "px"),
          width: '100%',
          "margin-top": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
          "margin-bottom": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
        },

        " .jnext-timeline-block__horizontal .JnextTbfocusconnector": {
          height: JnextBlockgenerateCSSUnit(attributes.separatorwidth, "px!important"),
        },

        " .jnext-timeline-block__horizontal .jnext_s_lick-arrow": {
          "width": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_iconBgsize, "px" ),
          "height": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_iconBgsize, "px" ),
          "border": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_iconborderwidth, "px" ) + " solid " + attributes.jnext_s_lick_iconBorderColor,
          "background": attributes.jnext_s_lick_BgColor,
          "border-radius": JnextBlockgenerateCSSUnit(attributes.jnext_s_lick_iconborderradius, "px"),
          "margin-top": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
          "margin-bottom": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
        },

        " .jnext-timeline-block__horizontal .jnext_s_lick-arrow svg": {
          "font-size": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_iconSize, "px" ),
          "height": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_iconHeight, "px" ),
        },

        " .jnext-timeline-block__horizontal .jnext_s_lick-arrow svg path": {
          "fill": attributes.jnext_s_lick_iconColor 
        },
        
        " .jnext-timeline-block__horizontal .jnext_s_lick-arrow:hover": {
          "border-color": attributes.jnext_s_lick_iconBorderFillColor,
          "background": attributes.jnext_s_lick_Focus_BgColor
        },

        " .jnext-timeline-block__horizontal .jnext_s_lick-arrow:focus": {
          "border-color": attributes.jnext_s_lick_iconBorderFillColor,
          "background": attributes.jnext_s_lick_Focus_BgColor
        },

        " .jnext-timeline-block__horizontal .jnext_s_lick-arrow:active": {
          "border-color": attributes.jnext_s_lick_iconBorderFillColor,
          "background": attributes.jnext_s_lick_Focus_BgColor
        },

        " .jnext-timeline-block__horizontal .jnext_s_lick-arrow:hover svg path": {
          fill: attributes.jnext_s_lick_iconFillColor,
        },

        " .jnext-timeline-block__horizontal .jnext_s_lick-arrow:focus svg path": {
          fill: attributes.jnext_s_lick_iconFillColor,
        },

        " .jnext-timeline-block__horizontal .jnext_s_lick-arrow:active svg path": {
          fill: attributes.jnext_s_lick_iconFillColor,
        },

        " .jnext-timeline-block__horizontal .jnext_s_lick-arrow.prev-arrow": {
          left: "-" + JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_iconBgsize, "px" ),
        },

        " .jnext-timeline-block__horizontal .jnext_s_lick-arrow.next-arrow": {
          right: "-" + JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_iconBgsize, "px" ),
        },

        " .jnext-timeline-block__horizontal .jnext_s_lick-dots > li": {
          "width": JnextBlockgenerateCSSUnit( ( attributes.jnext_s_lick_dotBgsize + ( attributes.jnext_s_lick_dotborderwidth * 2 ) ), "px" ),
          "height": JnextBlockgenerateCSSUnit( ( attributes.jnext_s_lick_dotBgsize + ( attributes.jnext_s_lick_dotborderwidth * 2 ) ), "px" ),
        },

        " .jnext-timeline-block__horizontal .jnext_s_lick-dots button:before": {
          "width": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_dotSize, "px" ),
          "height": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_dotSize, "px" ),
          "border-radius": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_dotradius, "px" ),
          "opacity": attributes.jnext_s_lick_dotOpacity,
          "background": attributes.jnext_s_lick_dotColor
        },

        " .jnext-timeline-block__horizontal .jnext_s_lick-dots button": {
          "max-width": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_dotBgsize, "px" ),
          "max-height": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_dotBgsize, "px" ),
          "border": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_dotborderwidth, "px" ) + " solid " + attributes.jnext_s_lick_dotBorderColor,
          "border-radius": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_dotborderradius, "px" ),
          "background": attributes.jnext_s_lick_dotBgColor,
          "padding": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_dotBGSpacing, "px" )
        },

        " .jnext-timeline-block__horizontal .jnext_s_lick-dots button:hover": {
          "border-color": attributes.jnext_s_lick_dotBorderFillColor,
          "background": attributes.jnext_s_lick_Focus_dotBgColor
        },

        " .jnext-timeline-block__horizontal .jnext_s_lick-dots button:hover:before": {
          "opacity": attributes.jnext_s_lick_dotFocusOpacity,
          "background": attributes.jnext_s_lick_dotFillColor
        },

        " .jnext-timeline-block__horizontal .jnext_s_lick-dots .jnext_s_lick-active button:before": {
          "opacity": attributes.jnext_s_lick_dotFocusOpacity,
          "background": attributes.jnext_s_lick_dotFillColor
        },

        " .jnext-timeline-block__horizontal .list > div": {
          "padding-bottom": JnextBlockgenerateCSSUnit( attributes.jnext_s_lick_sliderBottomSpacing, "px" ),
        },

        " .jnext-timeline-block__horizontal .jnext_timeline-block__day-top .jnext_timeline_blocks_arrow:after": {
          "border-bottom-color": attributes.backgroundColor || "#ffffff"
        },

        " .jnext-timeline-block__horizontal .jnext_timeline-block__day-bottom .jnext_timeline_blocks_arrow:after": {
          "border-top-color": attributes.backgroundColor || "#ffffff"
        },

        " .jnext-timeline-block__horizontal .jnext_timeline-block__day-left .jnext_timeline_blocks_arrow:after": {
					"border-right-color": attributes.backgroundColor || '#ffffff',
				},
		
				" .jnext-timeline-block__horizontal .jnext_timeline-block__day-right .jnext_timeline_blocks_arrow:after": {
					"border-left-color": attributes.backgroundColor || '#ffffff',
				},

        " .jnext-timeline-blocks-content-timeline .jnext-timeline-block__horizontal .JnextTbconnector::after" : {
					"height" : JnextBlockgenerateCSSUnit( attributes.separatorwidth, "px" ),
        },
				
				" .jnext-timeline-blocks-content-timeline .jnext-timeline-block__horizontal .JnextTbconnector::before" : {
					"height" : JnextBlockgenerateCSSUnit( attributes.separatorwidth, "px"),
        },

    };
    
    var mobile_selectors = {
        " .jnext-timeline-block__center-block.jnext_timeline-block__mobile .JnextTbconnector": {
          left: attributes.iconBgsize / 2 + "px",
          right: attributes.iconBgsize / 2 + "px",
          "margin-left": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
          "margin-right": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
        },
    
        " .jnext-timeline-block__left-block.jnext_timeline-block__mobile .JnextTbconnector": {
          left: JnextBlockgenerateCSSUnit(attributes.iconBgsize / 2, "px"),
        },
    
        " .jnext-timeline-block__right-block.jnext_timeline-block__mobile .JnextTbconnector": {
          right: JnextBlockgenerateCSSUnit((attributes.iconBgsize / 2 - attributes.separatorwidth), "px"),
        },

        " .jnext-timeline-block__center-block.jnext_timeline-block__mobile .jnext_timeline-block__day-right .jnext_timeline_blocks_arrow::after": {
          "border-right": border_with_color,
        }
    };
    
    var tablet_selectors = {
        " .jnext-timeline-block__center-block.jnext_timeline-block__tablet .JnextTbconnector": {
          left: attributes.iconBgsize / 2 + "px",
          right: attributes.iconBgsize / 2 + "px",
          "margin-left": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
          "margin-right": JnextBlockgenerateCSSUnit(attributes.horizontalSpace, "px"),
        },
    
        " .jnext-timeline-block__left-block.jnext_timeline-block__tablet .JnextTbconnector": {
          left: JnextBlockgenerateCSSUnit((attributes.iconBgsize / 2), "px"),
        },
    
        " .jnext-timeline-block__right-block.jnext_timeline-block__tablet .JnextTbconnector": {
          right: JnextBlockgenerateCSSUnit((attributes.iconBgsize / 2 - attributes.separatorwidth), "px"),
        },

        " .jnext-timeline-block__center-block.jnext_timeline-block__tablet .jnext_timeline-block__day-right .jnext_timeline_blocks_arrow::after": {
          "border-right": border_with_color,
        }
    };
    
    var styling_css = "";
    var id = `.jnext-timeline-blocks-content-timeline.block-${attributes.block_id}`;

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