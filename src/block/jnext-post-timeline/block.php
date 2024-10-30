<?php 
/**
 * Renders the post grid block on server.
 *
 * @param string $attributes  Pass the block attributes.
 * @return string HTML content for the post grid.
 */
function jnext_timeline_blocks_post_timeline_render_latest_posts( $attributes ) {

	/**
	 * Global post object.
	 * Used for excluding the current post from the grid.
	 *
	 * @var WP_Post
	 */
	global $post;
	$index = 0;
    
	$categories = isset( $attributes['categories'] ) ? $attributes['categories'] : '';
    

    if ( !empty( $attributes['excludeRemovedPost'] ) && ($key = array_search( get_the_ID(), $attributes['excludeRemovedPost'] )) !== false) {
        unset($attributes['excludeRemovedPost'][$key]);
    }

    if ( !empty( $attributes['orderByIncludeIds'] ) && ($key = array_search( get_the_ID(), $attributes['orderByIncludeIds'] )) !== false) {
        unset($attributes['orderByIncludeIds'][$key]);
    }

    if( !empty( $attributes['orderByIncludeIds'] ) && !empty( $attributes['excludeRemovedPost'] ) ){
        $post__in = $attributes['orderByIncludeIds'];
    }else{
        $post__in = ( empty( $attributes['excludeRemovedPost'] ) ) ? $attributes['orderByIncludeIds'] : $attributes['excludeRemovedPost'];
    }
    
	/* Setup the query */
	$grid_query = array(
		'posts_per_page'      => $attributes['noOfPosts'],
		'post_status'         => 'publish',
		'order'               => $attributes['order'],
        'orderby'             => ( 1 == $attributes['orderByIds'] && is_array($attributes['orderByIncludeIds']) && !empty($attributes['orderByIncludeIds']) ) ? 'post__in' : $attributes['orderBy'],
		'offset'              => $attributes['offset'],
		'post_type'           => $attributes['postType'],
		'ignore_sticky_posts' => 1,
	);

    if( empty($attributes['excludeRemovedPost']) && empty($attributes['orderByIncludeIds']) ){
        $grid_query['post__not_in'][] = get_the_ID();
    }else{
        $grid_query['post__in'] = $post__in;
    }
    
	if ( isset( $attributes['categories'] ) && '' !== $attributes['categories'] ) {
		$grid_query['tax_query'][] = array(
			'taxonomy' => ( isset( $attributes['taxonomyType'] ) ) ? $attributes['taxonomyType'] : 'category',
			'field'    => 'id',
			'terms'    => $attributes['categories'],
			'operator' => 'IN',
		);
	}
    
	/* Post Grid Excerpct styles. */

	$post_grid_markup = '';
    
    $post_h__autoplay = ( '' == $attributes['jnext_s_lick_h__PostAutoplay'] ) ? 'false' : 'true';
    $post_h__fade = ( '' == $attributes['jnext_s_lick_h__PostFade'] ) ? 'false' : 'true';
    $post_h__arrow = ( '' == $attributes['jnext_s_lick_h__PostArrows'] ) ? 'false' : 'true';
    $post_h__dot = ( '' == $attributes['jnext_s_lick_h__PostDots'] ) ? 'false' : 'true';

    $jnext_s_lick = '{"slidesToShow": '. $attributes['jnext_s_lick_h__PostToShow'] .', "slidesToScroll": '. $attributes['jnext_s_lick_h__PostToScroll'] .', "autoplay": '. $post_h__autoplay .', "autoplaySpeed": '. $attributes['jnext_s_lick_h__PostAutoplaySpeed'] .', "fade": '. $post_h__fade .', "speed": '. $attributes['jnext_s_lick_h__PostSpeed'] .', "arrows": '. $post_h__arrow .', "dots": '. $post_h__dot .', "touchMove": false}';
    
    $hide_arrows = ( false === $attributes['jnext_s_lick_h__PostArrows'] ) ? 'jnext_s_lick_post__h_hide-arrows' : '';

    $post_grid_markup .= sprintf(
        '<div class="JnextTb__post-block-connector">
            <div class="JnextTb__post-block-focusconnector"></div>
        </div>'
    );

	$post_grid_markup .= sprintf(
		'<div class="jnext-tmieline-blocks-main">'
	);

        $post_grid_markup .= sprintf(
            '<div class="jnext-tmieline-blocks-list">'
        );

            $post_grid_markup .= sprintf(
                "<div class='list' data-autoplay = '%s' data-speed = '%s' data-slidesshow = '%s' data-slidescroll = '%s' data-autoplayspeed = '%s' data-fade = '%s' data-arrow = '%s' data-dots = '%s'>", 
                $post_h__autoplay, $attributes['jnext_s_lick_h__PostSpeed'], $attributes['jnext_s_lick_h__PostToShow'], $attributes['jnext_s_lick_h__PostToScroll'], $attributes['jnext_s_lick_h__PostAutoplaySpeed'], $post_h__fade, $post_h__arrow, $post_h__dot
            );

            $grid_query = new WP_Query( $grid_query );

            /* Start the loop */
            if ( $grid_query->have_posts() ) {

                            while ( $grid_query->have_posts() ) {
                                $grid_query->the_post();

                                /* Setup the post ID */
                                $post_id = get_the_ID();

                                /* Setup the featured image ID */
                                $post_thumb_id = get_post_thumbnail_id( $post_id );

                                /* Setup the post classes */
                                $post_classes = 'post-"'.$post_id.'" jnext-post-timeline-content jnext-post-timeline-wrap';

                                /* Add sticky class */
                                if ( is_sticky( $post_id ) ) {
                                    $post_classes .= ' sticky';
                                } else {
                                    $post_classes .= null;
                                }

                                /* Join classes together */
                                $post_classes = join( ' ', get_post_class( $post_classes, $post_id ) );

                                $post_grid_markup .= sprintf(
                                    '<div data-postid="'.$post_id.'" class="%1$s">',
                                    esc_attr( $post_classes )
                                );

                                    if ( 'right' === $attributes['timelineAlignment'] ) {
                                        $post_grid_markup .= sprintf(
                                            '<div class="jnext-post-timeline-block__widget jnext-post-timeline-block__right">'
                                        );
                                    } else if ( 'left' === $attributes['timelineAlignment'] ) {
                                        $post_grid_markup .= sprintf(
                                            '<div class="jnext-post-timeline-block__widget jnext-post-timeline-block__left">'
                                        );
                                    } else if ( 'top' === $attributes['timelineAlignment'] ) {
                                        $post_grid_markup .= sprintf(
                                            '<div class="jnext-post-timeline-block__widget jnext-post-timeline-block__top">'
                                        );
                                    } else if ( 'bottom' === $attributes['timelineAlignment'] ) {
                                        $post_grid_markup .= sprintf(
                                            '<div class="jnext-post-timeline-block__widget jnext-post-timeline-block__bottom">'
                                        );
                                    } else {
                                        $post_grid_markup .= sprintf(
                                            '<div class="' . esc_html( jnext_align_classes( $index, $attributes ) ) . '">'
                                        );
                                    }

                                            /* Start the markup for the post */
                                            $post_grid_markup .= sprintf(
                                                '<div class="jtb-row">',
                                            );
                                                if('center' != $attributes['timelineAlignment'] && 'horizontal' != $attributes['postTimelineLayout']){
                                                    $post_grid_markup .= sprintf( ' 
                                                        <div class="jtb_post_timeline_blocks_detail jtb_post_timeline_block_one_sided_detail">'. get_centerAlignBlock_inner_content( $index, $attributes, $post_id ) .'</div>'
                                                    );
                                                }else{
                                                    $post_grid_markup .= sprintf( 
                                                        '<div class="jtb_post_timeline_blocks_detail">'. get_AlignBlock_inner_content( $index, $attributes, $post_id ) .'</div>'
                                                    );
                                                }
                                            $post_grid_markup .= sprintf(
                                                '</div>'
                                            );
                                    $post_grid_markup .= sprintf(
                                        '</div>'
                                    );
                                $post_grid_markup .= sprintf(
                                    '</div>'
                                );
                                $index++;
                            }
                        $post_grid_markup .= sprintf(
                            '</div>'
                        );

                        $post_grid_markup .= sprintf(
                            '<button class="slide-arrow post_prev-arrow jnext_s_lick_post__h-arrow '. $hide_arrows .'">'. rendorIcon('angle-left') .'</button>'
                        );
                        $post_grid_markup .= sprintf(
                            '<button class="slide-arrow post_next-arrow jnext_s_lick_post__h-arrow '. $hide_arrows .'">'. rendorIcon('angle-right') .'</button>'
                        );

                    $post_grid_markup .= sprintf(
                        '</div>'
                    );
                $post_grid_markup .= sprintf(
                    '</div>'
                );

                /* Restore original post data */
                wp_reset_postdata();

                /* Build the block classes */
                $class = "jnext-post-timeline";

                if ( isset( $attributes['className'] ) ) {
                    $class .= ' ' . $attributes['className'];
                }

                $other_classes = 'jnext-post-timeline-block';

                if( 'vertical' === $attributes['postTimelineLayout'] ) {
                    $other_classes .= ' jnext-post-timeline-block__vertical';
                }else{
                    $other_classes .= ' jnext-post-timeline-block__horizontal';
                }

                if ( 'top' === $attributes['arrowalignment'] ) {
                    /* Wrap the byline content */
                    $other_classes .= ' jnext-post-timeline-block__arrow-top';
                } elseif ( 'bottom' === $attributes['arrowalignment'] ) {
                    $other_classes .= ' jnext-post-timeline-block__arrow-bottom';
                } elseif ( 'left' === $attributes['arrowalignment'] ) {
                    $other_classes .= ' jnext-post-timeline-block__arrow-left';
                } elseif ( 'right' === $attributes['arrowalignment'] ) {
                    $other_classes .= ' jnext-post-timeline-block__arrow-right';
                } else {
                    $other_classes .= ' jnext-post-timeline-block__arrow-center';
                }

                if ( 'left' === $attributes['timelineAlignment'] ) {
                    $other_classes .= ' jnext-post-timeline-block__left-block';
                } elseif ( 'right' === $attributes['timelineAlignment'] ) {
                    $other_classes .= ' jnext-post-timeline-block__right-block';
                } elseif ( 'top' === $attributes['timelineAlignment'] ) {
                    $other_classes .= ' jnext-post-timeline-block__top-block';
                } elseif ( 'bottom' === $attributes['timelineAlignment'] ) {
                    $other_classes .= ' jnext-post-timeline-block__bottom-block';
                } else {
                    $other_classes .= ' jnext-post-timeline-block__center-block';
                }

                if ( 'mobile' === $attributes['stack'] ) {
                    $other_classes .= ' jnext_post_timeline-block__mobile';
                } elseif ( 'tablet' === $attributes['stack'] ) {
                    $other_classes .= ' jnext_post_timeline-block__tablet';
                } else {
                    $other_classes .= ' jnext_post_timeline-block__none';
                }

                $styles = '';

                $main_wrapper_class = "wp-block-jnext-timeline-blocks-jnext-post-timeline wp-block-jnext-timeline-blocks-jnext-post-timeline jnext-timeline-blocks-post-timeline block-{$attributes['block_id']}";

                /* Output the post markup */
                $block_content = sprintf(
                    '<div class="%4$s">
                        <%1$s class="%2$s %3$s">%5$s</%1$s>
                    </div>',
                    'div',
                    esc_attr( $class ),
                    esc_attr( $other_classes ),
                    esc_attr( $main_wrapper_class ),
                    $post_grid_markup
                );
                return $block_content;
            }
}
/**
 * Register jnext post timeline block
 */
function jnext_timeline_blocks_register_post_timeline_block(){

    /* Check if the register function exists */
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

    /* Block attributes */
	register_block_type(
        'jnext-timeline-blocks/jnext-post-timeline',
        array(
            'attributes' => array(
                'itemBackgroundColor'   => array(
                    'type'    => 'string',
                    'default' => '#f7faff',
                ),
                'block_id'    => array(
					'type'    => 'string',
					'default' => 'not_set',
				),
                'postTimelineLayout' => array(
                    'type' => 'string',
                    'default' => 'vertical',
                ),
                'excludeRemovedPost' => array(
                    'type' => 'array',
                    'default' => array(),
                ),
                'orderByIncludeIds' => array(
                    'type' => 'array',
                    'default' => array(),
                ),
                'orderByIds' => array(
                    'type' => 'boolean',
                    'default' => false,
                ),
                'sortedPosts' => array(
                    'type' => 'array',
                    'default' => array(),
                ),
                // Post Attributes
                'categories' => array(
                    'type'   => 'string',
                ),
                'className'  => array(
                    'type'   => 'string',
                ),
                'taxonomyType' => array(
					'type'    => 'string',
					'default' => 'category',
				),
                'postType'    => array(
					'type'    => 'string',
					'default' => 'post',
				),
                'noOfPosts'    => array(
					'type'    => 'number',
					'default' => 6,
				),
                'orderBy'     => array(
                    'type'    => 'string',
                    'default' => 'date',
                ),
                'order'       => array(
                    'type'    => 'string',
                    'default' => 'desc',
                ),
                'offset'      => array(
					'type'    => 'number',
					'default' => 0,
				),
                'itemBorderRadius' => array(
                    'type'    => 'number',
                    'default' => 5,
                ),
                
                'displayPostDate'   => array(
                    'type'    => 'boolean',
                    'default' => true,   
                ),
                'displayPostExcerpt'    => array(
                    'type'    => 'boolean',
                    'default' => true,
                ),
                'excerptLength'     => array(
					'type'    => 'number',
					'default' => 55,
				),
                'displayPostAuthor' => array(
                    'type'    => 'boolean',
                    'default' => true,
                ),
                'displayPostImage'  => array(
                    'type'    => 'boolean',
                    'default' => true,
                ),
                'displayPostLink'   => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostTitle'  => array(
					'type'    => 'boolean',
					'default' => true,
				),
                'displayTarget'     => array(
                    'type'    => 'boolean',
					'default' => true,
                ),
                'imageSize' => array(
					'type'    => 'string',
					'default' => 'full',
				),
                // Layout Attributes
                'Blockalign' => array(
					'type'    => 'string',
					'default' => 'center',
				),
                'timelineAlignment' => array(
                    'type'    => 'string',
					'default' => 'center',
                ),
                'arrowalignment' =>  array(
                    'type'    => 'string',
					'default' => 'center',
                ),
                'stack' => array(
                    'type'    => 'string',
					'default' => 'mobile',
                ),
                // icon & connector Attributes
                'icon' => array(
                    'type'    => 'string',
					'default' => '',
                ),
                'iconSize' => array(
                    'type'    => 'number',
                    'default' => 20,
                ),
                'iconBackgroundSize' => array(
                    'type'    => 'number',
                    'default' => 25,
                ),
                'iconBorderWidth'   => array(
                    'type'    => 'number',
                    'default' => 1,
                ),
                'iconBorderRadius'  => array(
                    'type'    => 'number',
                    'default' => 100,
                ),
                'sepratorWidth'    => array(
                    'type'    => 'number',
                    'default' => 3,
                ),
                'sepratorColor'    => array(
                    'type' => 'string',
                    'default' => '#f7faff',
                ),
                'iconColor'    => array(
                    'type' => 'string',
                    'default' => '#1f365c',
                ),
                'iconBackgroundColor'    => array(
                    'type' => 'string',
                    'default' => '#f7faff',
                ),
                'iconBorderColor'    => array(
                    'type' => 'string',
                    'default' => '#f7faff',
                ),

                'sepratorFocusColor'    => array(
                    'type' => 'string',
                    'default' => '#f56742',
                ),
                'iconFocusColor'    => array(
                    'type' => 'string',
                    'default' => '#fff',
                ),
                'iconFocusBackgroundColor'    => array(
                    'type' => 'string',
                    'default' => '#f56742',
                ),
                'iconFocusBorderColor'    => array(
                    'type' => 'string',
                    'default' => '#f56742',
                ),
                // spacing Attributes
                'itemPadding'    => array(
                    'type'    => 'number',
                    'default' => 20,
                ),
                'headingBottomSpace'    => array(
                    'type'    => 'number',
                    'default' => 15,
                ),
                'authorBottomSpace'    => array(
                    'type'    => 'number',
                    'default' => 10,
                ),
                'excerptBottomSpace'    => array(
                    'type'    => 'number',
                    'default' => 15,
                ),
                'verticalSpace'     => array(
                    'type'    => 'number',
                    'default' => 15,
                ),
                'horizontalSpace'   => array(
                    'type'    => 'number',
                    'default' => 0,
                ),
                // boxshadow Attributes
                'boxshadowColor'    => array(
                    'type'    => 'string',
                    'default' => '#9c9c9cc2',
                ),
                'boxshadowPosition'   => array(
					'type'    => 'string',
					'default' => 'outset',
				),
                'boxshadowHorizontal'   => array(
                    'type'    => 'number',
                    'default' => 0,
                ),
                'boxshadowVertical'   => array(
                    'type'    => 'number',
                    'default' => 4,
                ),
                'boxshadowBlur'   => array(
                    'type'    => 'number',
                    'default' => 6,
                ),
                'boxshadowSpread'   => array(
                    'type'    => 'number',
                    'default' => 2,
                ),
                // date Attributes
                'dateFontfamily'    => array(
                    'type'    => 'string',
                    'default' => '',
                ),
                'dateFontsize'  => array(
                    'type'    => 'number',
                    'default' => 16,
                ),
                'dateFontweight'  => array(
                    'type'    => 'string',
                    'default' => 400,
                ),
                'dateLineheight'  => array(
                    'type'    => 'number',
                    'default' => 20,
                ),
                'dateColor'     => array(
                    'type'    => 'string',
                    'default' => '#1f365c',
                ),
                // heading Attributes
                'headingTag'    => array(
                    'type'    => 'string',
                    'default' => 'h4',
                ),
                'headingFontfamily'    => array(
                    'type'    => 'string',
                    'default' => '',
                ),
                'headingFontsize'  => array(
                    'type'    => 'number',
                    'default' => 20,
                ),
                'headingFontweight'  => array(
                    'type'    => 'string',
                    'default' => 400,
                ),
                'headingLineheight'  => array(
                    'type'    => 'number',
                    'default' => 30,
                ),
                'headingColor'     => array(
                    'type'    => 'string',
                    'default' => '#1f365c',
                ),
                // author Attributes
                'authorFontfamily'    => array(
                    'type'    => 'string',
                    'default' => '',
                ),
                'authorFontsize'  => array(
                    'type'    => 'number',
                    'default' => 14,
                ),
                'authorFontweight'  => array(
                    'type'    => 'string',
                    'default' => 400,
                ),
                'authorLineheight'  => array(
                    'type'    => 'number',
                    'default' => 16,
                ),
                'authorColor'     => array(
                    'type'    => 'string',
                    'default' => '#1f365c',
                ),
                // Content Attributes
                'contentFontfamily'    => array(
                    'type'    => 'string',
                    'default' => '',
                ),
                'contentFontsize'  => array(
                    'type'    => 'number',
                    'default' => 16,
                ),
                'contentFontweight'  => array(
                    'type'    => 'string',
                    'default' => 400,
                ),
                'contentLineheight'  => array(
                    'type'    => 'number',
                    'default' => 20,
                ),
                'contentColor'     => array(
                    'type'    => 'string',
                    'default' => '#1f365c',
                ),
                // ReadMore Attributes
                'readmoreText' => array(
                    'type'    => 'string',
					'default' => "Read More",
                ),
                'readmoreFontfamily'    => array(
                    'type'    => 'string',
                    'default' => '',
                ),
                'readmoreFontsize'  => array(
                    'type'    => 'number',
                    'default' => 16,
                ),
                'readmoreFontweight'  => array(
                    'type'    => 'string',
                    'default' => 500,
                ),
                'readmoreLineheight'  => array(
                    'type'    => 'number',
                    'default' => 20,
                ),
                'readmoreBorderwidth'  => array(
                    'type'    => 'number',
                    'default' => 1,
                ),
                'readmoreColor'     => array(
                    'type'    => 'string',
                    'default' => '#fff',
                ),
                'readmoreBackgroundColor'     => array(
                    'type'    => 'string',
                    'default' => '#1f365c',
                ),
                'readmoreBorderColor'     => array(
                    'type'    => 'string',
                    'default' => '#1f365c',
                ),
                'readmoreHoverColor'     => array(
                    'type'    => 'string',
                    'default' => '#fff',
                ),
                'readmoreHoverBackgroundColor'     => array(
                    'type'    => 'string',
                    'default' => '#f56742',
                ),
                'readmoreHoverBorderColor'     => array(
                    'type'    => 'string',
                    'default' => '#f56742',
                ),
                // horizontal layout
                'jnext_s_lick_h__PostToShow' => array(
                    'type' => 'number',
                    'default' => 2,
                ),
                'jnext_s_lick_h__PostToScroll' => array(
                    'type' => 'number',
                    'default' => 1,
                ),
                'jnext_s_lick_h__PostAutoplay' => array(
                    'type' => 'boolean',
                    'default' => false,
                ),
                'jnext_s_lick_h__PostAutoplaySpeed' => array(
                    'type' => 'number',
                    'default' => 5000,
                ),
                'jnext_s_lick_h__PostFade' => array(
                    'type' => 'boolean',
                    'default' => false,
                ),
                'jnext_s_lick_h__PostSpeed' => array(
                    'type' => 'number',
                    'default' => 500,
                ),
                'jnext_s_lick_h__PostArrows' => array(
                    'type' => 'boolean',
                    'default' => true,
                ),
                'jnext_s_lick_h__PostDots' => array(
                    'type' => 'boolean',
                    'default' => false,
                ),
                'jnext_s_lick_h__PostIconSize' => array(
                    'type' => 'number',
                    'default' => 9,
                ),
                'jnext_s_lick_PostIconHeight' => array(
                    'type' => 'number',
                    'default' => 22,
                ),
                'jnext_s_lick_PostIconBgsize' => array(
                    'type' => 'number',
                    'default' => 35,
                ),
                'jnext_s_lick_PostIconborderwidth' => array(
                    'type' => 'number',
                    'default' => 3,
                ),
                'jnext_s_lick_PostIconborderradius' => array(
                    'type' => 'number',
                    'default' => 0,
                ),
                'jnext_s_lick_PostIconFillColor' => array(
                    'type' => 'string',
                    'default' => '#fff',
                ),
                'jnext_s_lick_PostFocus_BgColor' => array(
                    'type' => 'string',
                    'default' => '#1f365c',
                ),
                'jnext_s_lick_PostIconBorderFillColor' => array(
                    'type' => 'string',
                    'default' => '#1f365c',
                ),
                'jnext_s_lick_PostIconColor' => array(
                    'type' => 'string',
                    'default' => '#1f365c',
                ),
                'jnext_s_lick_PostBgColor' => array(
                    'type' => 'string',
                    'default' => '#fff',
                ),
                'jnext_s_lick_PostIconBorderColor' => array(
                    'type' => 'string',
                    'default' => '#1f365c',
                ),
                'jnext_s_lick_PostdotSize' => array(
                    'type' => 'number',
                    'default' => 10,
                ),
                'jnext_s_lick_Postdotradius' => array(
                    'type' => 'number',
                    'default' => 25,
                ),
                'jnext_s_lick_PostdotBgsize' => array(
                    'type' => 'number',
                    'default' => 10,
                ),
                'jnext_s_lick_Postdotborderwidth' => array(
                    'type' => 'number',
                    'default' => 3,
                ),
                'jnext_s_lick_Postdotborderradius' => array(
                    'type' => 'number',
                    'default' => 25,
                ),
                'jnext_s_lick_PostdotBGSpacing' => array(
                    'type' => 'number',
                    'default' => 0,
                ),
                'jnext_s_lick_PostdotFillColor' => array(
                    'type' => 'string',
                    'default' => '#1f365c',
                ),
                'jnext_s_lick_PostDotFocusBgColor' => array(
                    'type' => 'string',
                    'default' => 'transparent',
                ),
                'jnext_s_lick_PostdotBorderFillColor' => array(
                    'type' => 'string',
                    'default' => 'transparent',
                ),
                'jnext_s_lick_PostdotColor' => array(
                    'type' => 'string',
                    'default' => '#1f365c',
                ),
                'jnext_s_lick_PostdotBgColor' => array(
                    'type' => 'string',
                    'default' => 'transparent',
                ),
                'jnext_s_lick_PostdotBorderColor' => array(
                    'type' => 'string',
                    'default' => 'transparent',
                ),
                'jnext_s_lick_PostdotFocusOpacity' => array(
                    'type' => 'number',
                    'default' => 1,
                ),
                'jnext_s_lick_PostdotOpacity' => array(
                    'type' => 'number',
                    'default' => 0.75,
                ),
                'jnext_s_lick_h__PostbottomSpacing' => array(
                    'type' => 'number',
                    'default' => 20,
                )
            ),
            'render_callback' => 'jnext_timeline_blocks_post_timeline_render_latest_posts',
			'editor_script' => 'jnext_timeline_blocks-js',
			'editor_style'  => 'jnext_timeline_blocks-editor-css',
            'style'         => 'jnext_timeline_blocks-css',
        )
    );

}
add_action( 'init', 'jnext_timeline_blocks_register_post_timeline_block' );

/**
 * Get align classes function.
 *
 * @param [type] $index The index.
 * @return array of class
 */
function jnext_align_classes( $index, $attributes ) {
	$classes   = array();
	$classes[] = 'jnext-post-timeline-block__widget';
    if( 'vertical' == $attributes['postTimelineLayout'] ) {

	    $classes[] = ( 0 === $index % 2 ) ? 'jnext-post-timeline-block__right' : ' jnext-post-timeline-block__left';

    }else{
        $classes[] = ( 0 === $index % 2 ) ? 'jnext-post-timeline-block__top' : ' jnext-post-timeline-block__bottom';
    }

	return implode( ' ', $classes );
}

/**
 * Get day align classes function.
 *
 * @param [type] $attributes The attributes.
 * @param [type] $index The index.
 * @return array of class
 */
function get_jnext_day_align_classes( $attributes, $index ){

    $classes   = array();
	
    if ( "left" == $attributes['timelineAlignment'] ) {

        $classes[] = 'jnext_post-timeline-block__day-left';

    } else if ( "right" == $attributes['timelineAlignment'] ){

        $classes[] = 'jnext_post-timeline-block__day-right';

    } else if ( "center" == $attributes['timelineAlignment'] ){

        if( 'vertical' === $attributes['postTimelineLayout'] ) {
            $classes[] = ( 0 == $index % 2 ) ? 'jnext_post-timeline-block__day-left' : ' jnext_post-timeline-block__day-right';
        }else{
            $classes[] = ( 0 == $index % 2 ) ? 'jnext_post-timeline-block__day-bottom' : ' jnext_post-timeline-block__day-top';
        }

    } else if ( "top" == $attributes['timelineAlignment'] ){

        $classes[] = 'jnext_post-timeline-block__day-top';

    } else if ( "bottom" == $attributes['timelineAlignment'] ){

        $classes[] = 'jnext_post-timeline-block__day-bottom';

    }
	
	return implode( ' ', $classes );

}

/**
 * Get left and right align Block Inner Content function.
 *
 * @param [type] $index The index.
 * @param [type] $attributes The attributes.
 * @param [type] $post_id The post_id.
 * @return block data
 */
function get_centerAlignBlock_inner_content( $index, $attributes, $post_id ){

    $detail_wrap_class = 'jtb__post-detail-wrap ';

    $detail_wrap_class .= get_jnext_day_align_classes( $attributes, $index );

    $data = get_icon( $attributes['icon'] );
    $data .= sprintf('
        <div class="jtb-post-day-detail">
            <div class="jtb-post-one-sided_inner_block">
                '. sprintf('<div class="'. $detail_wrap_class .'">'. get_jnext_post_detail( $index, $attributes, $post_id ) .'</div>') .'
            </div>
        </div>'
    );

    return $data;
}

/**
 * Get center align Block Inner Content function.
 *
 * @param [type] $index The index.
 * @param [type] $attributes The attributes.
 * @param [type] $post_id The post_id.
 * @return block data
 */
function get_AlignBlock_inner_content( $index, $attributes, $post_id ){

    $detail_wrap_class = 'jtb__post-detail-wrap ';

    $detail_wrap_class .= get_jnext_day_align_classes( $attributes, $index );
    
    $data = get_icon( $attributes['icon'] );
    $data .= get_jnext_time_data( $attributes, $post_id );
    $data .= sprintf( '<div class="'. $detail_wrap_class .'">'. get_jnext_post_detail( $index, $attributes, $post_id ) .'</div>' );

    return $data;
}

/**
 * Get icon details function.
 *
 * @param [type] $icon The icon.
 * @return $icon block
 */
function get_icon( $icon ){
    
    $render_icon = ( $icon !== '' ) ? rendorIcon( $icon ) : '';

    $icon = sprintf( 
            '<div class="jtb__post-view-icon-wrap">
                <span class="Jtb_post-block-ifb-icon">'. $render_icon .'</span>
            </div>'
        );
    
    return $icon;
}


/**
 * Render Icon function.
 *
 * @param [type] $icon The icon.
 * @return html of svg
 */
function rendorIcon( $icon ) {
    $icon = str_replace( 'far', '', $icon );
    $icon = str_replace( 'fas', '', $icon );
    $icon = str_replace( 'fab', '', $icon );
    $icon = str_replace( 'fa-', '', $icon );
    $icon = str_replace( 'fa', '', $icon );

    $icon = sanitize_text_field( esc_attr( $icon ) );
    $json = load_font_awesome_icons();
    
    $path = isset( $json[ $icon ]['svg']['brands'] ) ? $json[ $icon ]['svg']['brands']['path'] : $json[ $icon ]['svg']['solid']['path'];
    $view = isset( $json[ $icon ]['svg']['brands'] ) ? $json[ $icon ]['svg']['brands']['viewBox'] : $json[ $icon ]['svg']['solid']['viewBox'];
    if ( $view ) {
        $view = implode( ' ', $view );
    }
    return '<svg xmlns="https://www.w3.org/2000/svg" viewBox="' . esc_html( $view ) . '" ><path d="' . esc_html( $path ) . '"></path></svg>';
}

/**
 * Load icon file and get icons function.
 *
 * @return $icon_json
 */
function load_font_awesome_icons() {
    $icon_json = array();

    $json_file = JNEXT_TIMELINE_BLOCK_URL . 'src/Icons/JnextBlocksIcons.json';

    if( !empty( $json_file ) ){
        $str = file_get_contents( $json_file );
        $icon_json = json_decode( $str, true );
    }
    
    return $icon_json;
}

/**
 * Get Time detail function.
 *
 * @param [type] $attributes The attributes.
 * @param [type] $post_id The post_id.
 * @return $time_detail
 */
function get_jnext_time_data( $attributes, $post_id ){

    $time_detail = sprintf( '<div class="jtb__post-block-date-wrap">' );
        $time_detail .= sprintf( '<div class="jtb-time">' );

            if ( isset( $attributes['postType'] ) && 'post' === $attributes['postType'] ) {
                if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
                    $time_detail .= sprintf(
                        '<time datetime="%1$s" class="jnext-timeline-block__date">%2$s</time>',
                        esc_attr( get_the_date( 'c', $post_id ) ),
						esc_html( get_the_date( '', $post_id ) )
                    );
                }   
            } 

        $time_detail .= sprintf( '</div>' );
    $time_detail .= sprintf( '</div>' );
    
    return $time_detail;

}

/**
 * Get post image and detail function.
 *
 * @param [type] $index The index.
 * @param [type] $attributes The attributes.
 * @param [type] $post_id The post_id.
 * @return $post_detail
 */
function get_jnext_post_detail( $index, $attributes, $post_id ){

    $post_thumb_id = get_post_thumbnail_id( $post_id );

    $post_detail = sprintf( '<div class="jtb-post-details">' );
        
        $post_detail .= get_jnext_time_data( $attributes, $post_id );

        if ( isset( $attributes['displayPostImage'] ) && $attributes['displayPostImage'] && $post_thumb_id ) {
            
            $post_detail .= sprintf( '<div class="jtb-post-block__img backend">' );

                $post_thumb_size = 'full';

                if ( ! empty( $attributes['imageSize'] ) ) {
                    $post_thumb_size = $attributes['imageSize'];
                }

                $post_detail .= sprintf( 
                    '<div class="jnext-timeline-blocks__post-timeline-image">
                        <a href="%1$s" rel="bookmark" aria-hidden="true" tabindex="-1"><img src="%2$s" /></a>
                    </div>',
                    esc_url( get_permalink( $post_id ) ),
					wp_get_attachment_image_src($post_thumb_id, $post_thumb_size)[0]
                );

            $post_detail .= sprintf( '</div>' );
        }

        /* Get the post title */
		$post_title = get_the_title( $post_id );

        if ( ! $post_title ) {
            $post_title = __( 'Untitled', 'jnext-timeline-blocks' );
        }

        if ( isset( $attributes['displayPostTitle'] ) && $attributes['displayPostTitle'] ) {

            if ( isset( $attributes['headingTag'] ) ) {
                $post_titleTag = $attributes['headingTag'];
            } else {
                $post_titleTag = 'h2';
            }
            
            $post_detail .= sprintf(
                '<%3$s class="jnext-timeline-blocks-post-timeline__heading"><a class="jnext-post-timeline__heading-text-link" href="%1$s" rel="bookmark">%2$s</a></%3$s>',
                esc_url( get_permalink( $post_id ) ),
                esc_html( $post_title ),
                esc_attr( $post_titleTag )
            );
        }
        
        if ( isset( $attributes['displayPostAuthor'] ) && $attributes['displayPostAuthor'] ) {

            $post_detail .= sprintf(
                '<div class="jnext-timeline-blocks-post-timeline__post-author-wrap">
                    <div class="jnext-timeline-blocks-post-timeline-author" itemprop="author" itemtype="https://schema.org/Person">
                        <a class="jnext-post-timeline-author-text-link" href="%2$s" itemprop="url" rel="author">%1$s</a>
                    </div>
                </div>',
                esc_html( get_the_author_meta( 'display_name', get_the_author_meta( 'ID' ) ) ),
				esc_html( get_author_posts_url( get_the_author_meta( 'ID' ) ) )
            );

        }
        
        if ( isset( $attributes['displayPostExcerpt'] ) && $attributes['displayPostExcerpt'] ) {

            $post_excerpt = apply_filters( 'the_excerpt',
				get_post_field(
					'post_excerpt',
					$post_id,
					'display'
				)
			);

            if ( empty( $post_excerpt ) && isset( $attributes['excerptLength'] ) ) {
				$post_excerpt = apply_filters( 'the_excerpt',
					wp_trim_words(
						preg_replace(
							array(
								'/\<figcaption>.*\<\/figcaption>/',
								'/\[caption.*\[\/caption\]/',
							),
							'',
							get_the_excerpt()
						),
						$attributes['excerptLength']
					)
				);
			}

            if ( ! $post_excerpt ) {
				$post_excerpt = null;
			}

            $post_detail .= sprintf(
                '<div class="jnext-timeline-block-post-timeline__post-content-wrap">
                    <div class="jnext-post-timeline__post-excerpt">
                        %1$s
                    </div>
                </div>', wp_kses_post( $post_excerpt )
            );
            
        }
        
        if ( isset( $attributes['displayPostLink'] ) && $attributes['displayPostLink'] ) {

            $target = ( isset( $attributes['displayTarget'] ) && $attributes['displayTarget'] ) ? '_blank' : '_self';

            $post_detail .= sprintf(
                '<div class="jnext-timeline-blocks-post-timeline__readMore-wrap">
                    <a class="jnext-post-timeline__readMore-text-link" href="%3$s" target="%1$s" rel="bookmark">%2$s</a>
                </div>',
                esc_attr( $target ),
                esc_html( $attributes['readmoreText'] ),
                esc_url( get_permalink( $post_id ) )
            );

        }
        
        $post_detail .= sprintf( '<div class="jnext_post_timeline_block_arrow"></div>' );
        
        
    $post_detail .= sprintf( '</div>' );     
    
    return $post_detail;

}

function add_rand_orderby_rest_post_collection_params( $query_params ) {
	$query_params['orderby']['enum'][] = 'rand';
    $query_params['orderby']['enum'][] = 'menu_order';
	return $query_params;
}
add_filter( 'rest_page_collection_params', 'add_rand_orderby_rest_post_collection_params' );
add_filter( 'rest_post_collection_params', 'add_rand_orderby_rest_post_collection_params' );