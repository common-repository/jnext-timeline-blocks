/**
 * Return Jnext Timeline Block Dynamic generated Classes
 */

 function ContentTimelineClasses(attributes){
    
    /* Layout */
    var block_layout_class = "jnext-post-timeline-block__vertical" + " ";
    if (attributes.postTimelineLayout == "horizontal") {

      block_layout_class = "jnext-post-timeline-block__horizontal" + " ";

    }

    /* Arrow position */
    var block_arrow_align_class = "jnext-post-timeline-block__arrow-center" + " ";
    if (attributes.arrowalignment == "top") {

      block_arrow_align_class = "jnext-post-timeline-block__arrow-top" + " ";

    } else if (attributes.arrowalignment == "bottom") {

      block_arrow_align_class = "jnext-post-timeline-block__arrow-bottom" + " ";

    } else if ( attributes.arrowalignment == "left" ) {
      
      block_arrow_align_class = "jnext-post-timeline-block__arrow-left" + " ";

    } else if ( attributes.arrowalignment == "right" ) {
      
      block_arrow_align_class = "jnext-post-timeline-block__arrow-right" + " ";

    }

    block_arrow_align_class += block_layout_class;

    /* Block Alignment */
    var block_align_class = "jnext-post-timeline-block__center-block" + " ";
    if (attributes.timelineAlignment == "left") {

      block_align_class = "jnext-post-timeline-block__left-block" + " ";

    } else if (attributes.timelineAlignment == "right") {

      block_align_class = "jnext-post-timeline-block__right-block" + " ";

    } else if (attributes.timelineAlignment == "top") {

      block_align_class = "jnext-post-timeline-block__top-block" + " ";

    } else if (attributes.timelineAlignment == "bottom") {

      block_align_class = "jnext-post-timeline-block__bottom-block" + " ";

    }

    block_align_class += block_arrow_align_class;

    if(1 == attributes.jnext_s_lick_h__PostToShow){
      block_align_class += 'jnext-post-timeline-block__full-w'
    }

    /* Responsive from which device */
    block_align_class += "jnext_post_timeline-block__" + attributes.stack + "";

    return [block_align_class];
}

function JnextDayAlignClass(attributes, i) {

    var jnext_day_align_class = "";
  
    if ( "left" == attributes.timelineAlignment ) {

      jnext_day_align_class = "jnext_post-timeline-block__day-left";

    } else if ( "right" == attributes.timelineAlignment ) {

      jnext_day_align_class = "jnext_post-timeline-block__day-right";

    } else if ( "center" == attributes.timelineAlignment ) {

      if (attributes.postTimelineLayout == "vertical") {
        if (i % 2 == "0") {

          jnext_day_align_class = "jnext_post-timeline-block__day-left";

        } else {

          jnext_day_align_class = "jnext_post-timeline-block__day-right";

        }
      }else{

        if (i % 2 == "0") {

          jnext_day_align_class = "jnext_post-timeline-block__day-bottom";

        } else {

          jnext_day_align_class = "jnext_post-timeline-block__day-top";

        }

      }

    } else if ( "top" == attributes.timelineAlignment ){
      
      jnext_day_align_class = "jnext_post-timeline-block__day-top";

    } else if ( "bottom" == attributes.timelineAlignment ){
      
      jnext_day_align_class = "jnext_post-timeline-block__day-bottom";

    }
  
    return [jnext_day_align_class];
}

function jnextAlignClass(attributes, i){

  let jnext_align_class = "";

  if ("left" == attributes.timelineAlignment) {

    jnext_align_class = "jnext-post-timeline-block__widget jnext-post-timeline-block__left";

  } else if ("right" == attributes.timelineAlignment) {

    jnext_align_class = "jnext-post-timeline-block__widget jnext-post-timeline-block__right";

  } else if ("center" == attributes.timelineAlignment) {

    if (attributes.postTimelineLayout == "vertical") {
      if (i % 2 == "0") {

        jnext_align_class = "jnext-post-timeline-block__widget jnext-post-timeline-block__right";

      } else {

        jnext_align_class = "jnext-post-timeline-block__widget jnext-post-timeline-block__left";
        
      }
    }else{
      if (i % 2 == "0") {

        jnext_align_class = "jnext-post-timeline-block__widget jnext-post-timeline-block__top";

      } else {

        jnext_align_class = "jnext-post-timeline-block__widget jnext-post-timeline-block__bottom";
        
      }
    } 
  }else if ("top" == attributes.timelineAlignment) {

      jnext_align_class = "jnext-post-timeline-block__widget jnext-post-timeline-block__top";
  
  } else if ("bottom" == attributes.timelineAlignment) {

    jnext_align_class = "jnext-post-timeline-block__widget jnext-post-timeline-block__bottom";

  }

  return [jnext_align_class];

}

export { JnextDayAlignClass, jnextAlignClass };
export default ContentTimelineClasses;
