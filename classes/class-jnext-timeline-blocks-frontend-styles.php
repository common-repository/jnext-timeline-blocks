<?php

/**
 * Jnext Timeline Blocks Styles.
 *
 * @package category
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'Jnext_timeline_blocks_Frontend_styles' ) ) {

	
    /**
	 * Class Jnext_timeline_blocks_Frontend_styles.
	 */
    final class Jnext_timeline_blocks_Frontend_styles {


		/**
		 * Member Variable
		 *
		 * @var instance
		 */
		private static $instance;

		/**
		 *  Initiator
		 */
		public static function get_instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self();
			}

			return self::$instance;
		}

		/**
		 * Constructor
		 */
		public function __construct() {
			add_action( 'wp_head', array( $this, 'jnext_timeline_block_frontend_styles' ), 100 );
		}

		/**
		 * Generate stylesheet and print in header.
		 */
		public function jnext_timeline_block_frontend_styles() {
			global $post;
			
			$blocks = array();
			if ( is_object( $post ) ) {
				$blocks = parse_blocks( $post->post_content );
			}
			
			$css = $this->get_styles( $blocks );
			
			echo "<style id='jnext-timeline-blocks-frontend-styles'>$css</style>"; //phpcs:ignore
		}

		/**
		 * Get styles function.
		 *
		 * @param [type] $blocks The blocks.
		 * @return [type]
		 */
		public function get_styles( $blocks ) {
			
			$desktop         = '';
			$tablet          = '';
			$mobile          = '';
			$tab_styling_css = '';
			$mob_styling_css = '';
			$css             = array();
			foreach ( $blocks as $i => $block ) {

				if ( is_array( $block ) ) {
					if ( '' === $block['blockName'] ) {
						continue;
					}
					if ( 'core/block' === $block['blockName'] ) {
						$id = ( isset( $block['attrs']['ref'] ) ) ? $block['attrs']['ref'] : 0;

						if ( $id ) {
							$content = get_post_field( 'post_content', $id );

							$reusable_blocks = $this->parse( $content );

							$css = $this->get_styles( $reusable_blocks );

						}
					} else {

						$css = $this->get_block_css( $block );

						// Get CSS for the Block.
						if ( isset( $css['desktop'] ) ) {
							$desktop .= $css['desktop'];
							$tablet  .= $css['tablet'];
							$mobile  .= $css['mobile'];
						}
					}
				}
			}

			if ( ! empty( $tablet ) ) {
				$tab_styling_css .= '@media only screen and (max-width: 976px) {';
				$tab_styling_css .= $tablet;
				$tab_styling_css .= '}';
			}

			if ( ! empty( $mobile ) ) {
				$mob_styling_css .= '@media only screen and (max-width: 767px) {';
				$mob_styling_css .= $mobile;
				$mob_styling_css .= '}';
			}

			$css = $desktop . $tab_styling_css . $mob_styling_css;
			
			return $css;
		}

		/**
		 * Parse function.
		 *
		 * @param [type] $content The content.
		 * @return [type]
		 */
		public function parse( $content ) {

			global $wp_version;

			return ( version_compare( $wp_version, '5', '>=' ) ) ? parse_blocks( $content ) : gutenberg_parse_blocks( $content );
		}

		/**
		 * Get block css.
		 *
		 * @param [type] $block The block.
		 * @return [type]
		 */
		public function get_block_css( $block ) {
			$block = (array) $block;
			
			$name      = $block['blockName'];
			$css       = array();
			$block_id  = '';
			$blockattr = array();
			if ( ! isset( $name ) ) {
				return '';
			}

			if ( isset( $block['attrs'] ) && is_array( $block['attrs'] ) ) {
				$blockattr = $block['attrs'];
				if ( isset( $blockattr['block_id'] ) ) {
					$block_id = $blockattr['block_id'];
				}
			}

			if( 'jnext-timeline-blocks/jnext-post-timeline' == $name ){
				$css = self::get_jnext_timeline_block_post_timeline_css( $blockattr, $block_id );
			} else if( 'jnext-timeline-blocks/jnext-vertical-timeline' == $name ) {
				$css = self::get_jnext_timeline_block__css( $blockattr, $block_id );
			} else if( 'jnext-timeline-blocks/vertical-timeline-item' == $name ) {
				$css = self::get_jnext_timeline_child_block__css( $blockattr, $block_id );
			} else if( 'jnext-timeline-blocks/jnext-horizontal-timeline' == $name ){
				$css = self::get_jnext_horizontal_content_timeline_block_css( $blockattr, $block_id );
			} else if( 'jnext-timeline-blocks/jnext-curve-timeline' == $name ) {
				$css = self::get_jnext_timeline_curve_block__css( $blockattr, $block_id );
			} else if( 'jnext-timeline-blocks/curve-timeline-item' == $name ) {
				$css = self::get_jnext_timeline_curve_child_block__css( $blockattr, $block_id );
			} 
			
			if ( isset( $block['innerBlocks'] ) ) {

				foreach ( $block['innerBlocks'] as $j => $inner_block ) {

					if ( 'core/block' === $inner_block['blockName'] ) {

						$id = ( isset( $inner_block['attrs']['ref'] ) ) ? $inner_block['attrs']['ref'] : 0;

						if ( $id ) {
							$content = get_post_field( 'post_content', $id );

							$reusable_blocks = $this->parse( $content );

							$css = $this->get_styles( $reusable_blocks );

						}

					} else {

						// Get CSS for the Block.
						$inner_block_css = $this->get_block_css( $inner_block );

						$css_desktop = ( isset( $css['desktop'] ) ? $css['desktop'] : '' );
						$css_tablet  = ( isset( $css['tablet'] ) ? $css['tablet'] : '' );
						$css_mobile  = ( isset( $css['mobile'] ) ? $css['mobile'] : '' );

						if ( isset( $inner_block_css['desktop'] ) ) {
							$css['desktop'] = $css_desktop . $inner_block_css['desktop'];
							$css['tablet']  = $css_tablet . $inner_block_css['tablet'];
							$css['mobile']  = $css_mobile . $inner_block_css['mobile'];
						}

					}

				}

			}

			return $css;
		}

		/**
		 * Get Jnext Post timeline Block CSS
		 *
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array Styles.
		 */
		public static function get_jnext_timeline_block_post_timeline_css( $attr, $id ){

			$defaults = self::get_jnext_timeline_block_post_timeline_default_attributes();
			$attr     = array_merge( $defaults, (array) $attr );

			$mobile_selectors = array();
			$tablet_selectors = array();

			$selector = array();

			if( 'center' !== $attr['timelineAlignment'] && 'horizontal' !== $attr['postTimelineLayout'] ){

				$selector = array(
					' .jtb-post-one-sided_inner_block' => array(
						'border-radius'    => self::get_css_value( $attr['itemBorderRadius'], 'px' ),
						'padding'          => self::get_css_value( $attr['itemPadding'], 'px' ),
						'background-color' => $attr['itemBackgroundColor'],
					)
				);

			}else{

				$selector = array(
					' .jtb-post-details' => array(
						'border-radius'    => self::get_css_value( $attr['itemBorderRadius'], 'px' ),
						'padding'          => self::get_css_value( $attr['itemPadding'], 'px' ),
						'background-color' => $attr['itemBackgroundColor'],
					)
				);

			}

			$border_with_color = '12px solid' . $attr['itemBackgroundColor'];

			$boxShadowPosition = $attr['boxshadowPosition'];

			if ( "outset" === $attr['boxshadowPosition'] || 'undefined' === $attr['boxshadowPosition'] ) {
				$boxShadowPosition = "";
			}

			$seprator_width = ($attr['sepratorWidth'] !== 'undefined') ? $attr['sepratorWidth'] : 2;

			$selectors = array(

				" .jn-post-tb_vertical.jn-post-tb_widget_center-block .jtb__post-block-date-wrap" => array(
					"flex-basis"=>  $attr['post_vertical_ConBox_Width'] . "px",
					"width" => $attr['post_vertical_ConBox_Width'] . "px",
				),
		
				" .jn-post-tb_vertical.jn-post-tb_widget_center-block .jtb__post-detail-wrap" => array(
					"flex-basis"=>  $attr['post_vertical_ConBox_Width'] . "px",
					"width" => $attr['post_vertical_ConBox_Width'] . "px",
				),

				" .jn-post-tb_widget_center-block.jn-post-tb_vertical .jnext-post-timeline-content .jtb__post-block-date-wrap" => array(
					"margin" => ( ( $attr['iconBackgroundSize'] - $attr['dateLineheight'] ) / 2) . "px 0px",
				),

				" .jn-post-tb_widget_left .jn-post-tb_day-right .jnext_post_timeline_block_arrow:after" => array(
					"border-left" => $border_with_color
				),

				" .jn-post-tb_widget_right .jn-post-tb_day-right .jnext_post_timeline_block_arrow:after" => array(
					"border-left" => $border_with_color
				),

				" .jn-post-tb_widget_right .jn-post-tb_day-left .jnext_post_timeline_block_arrow:after" => array(
					"border-right" => $border_with_color
				),

				" .jn-post-tb_widget_left .jn-post-tb_day-left .jnext_post_timeline_block_arrow:after" => array(
					"border-right" => $border_with_color
				),

				" .Jn_post_tb_focusconnector" => array(
					"background-color" => $attr['sepratorFocusColor']
				),

				" .jtb__post-view-icon-wrap .Jtb_post-block-ifb-icon i" => array(
					"color" => $attr['iconColor'],
				),

				" .jtb__post-view-icon-wrap.jn-post-tb_in-view-icon .Jtb_post-block-ifb-icon i" => array(
					"color" => $attr['iconFocusColor'],
				),

				" .jtb__post-view-icon-wrap.jn-post-tb_out-view-icon" => array(
					"background-color" => $attr['iconBackgroundColor'],
					"border-color" => $attr['iconBorderColor'],
					"min-width" => self::get_css_value( $attr['iconBackgroundSize'], "px" ),
					"min-height" => self::get_css_value( $attr['iconBackgroundSize'], "px" ),
					"max-height" => self::get_css_value( $attr['iconBackgroundSize'], "px" ),
					"border-radius" => self::get_css_value( $attr['iconBorderRadius'], "px" )
				),

				" .jtb__post-view-icon-wrap.jn-post-tb_in-view-icon" => array(
					"background-color" => $attr['iconFocusBackgroundColor'],
					"border-color" => $attr['iconFocusBorderColor'],
					"color" => $attr['iconFocusColor'],					
				),


				" .jn-post-tb_horizontal .jnext-post-timeline-content.jnext_splide-prev .jtb__post-view-icon-wrap" => array(
					"background-color" => $attr['iconFocusBackgroundColor'],
					"border-color" => $attr['iconFocusBorderColor'],
					"color" => $attr['iconFocusColor'],					
				),

				" .jn-post-tb_horizontal .jnext-post-timeline-content.splide__slide.is-active .jtb__post-view-icon-wrap" => array(
					"background-color" => $attr['iconFocusBackgroundColor'],
					"border-color" => $attr['iconFocusBorderColor'],
					"color" => $attr['iconFocusColor'],					
				),

				" .jn-post-tb_horizontal .jnext-post-timeline-content.splide__slide.is-active .jtb__post-view-icon-wrap i" => array(
					"color" => $attr['iconFocusColor'],					
				),

				" .jtb__post-view-icon-wrap.jn-post-tb_in-view-icon svg" => array(
					"fill" => $attr['iconFocusColor'],
				),

				" .jn-post-tb_widget_left-block .Jn_post_tb_connector" => array(
					"left" => self::get_css_value( ( $attr['iconBackgroundSize'] + ($attr['iconBorderWidth'] * 2) ) / 2 , "px" )
				),

				" .jn-post-tb_widget_right-block .Jn_post_tb_connector" => array(
					"right" => self::get_css_value( ((( $attr['iconBackgroundSize'] + ($attr['iconBorderWidth'] * 2) ) / 2) - $attr['sepratorWidth']) , "px" )
				),
				
				" .jtb__post-view-icon-wrap .Jtb_post-block-ifb-icon img" => array(
					"width" => self::get_css_value($attr['iconSize'], "px"),
					"height" => self::get_css_value($attr['iconSize'], "px")
				),

				" .jnext-post-timeline-content" => array(
					"margin-bottom" => self::get_css_value( $attr['verticalSpace'], "px" )
				),

				" .jn-post-tb_vertical .jtb__post-view-icon-wrap.jn-post-tb_out-view-icon" => array(
					"margin-left" => self::get_css_value( $attr['horizontalSpace'], "px" ),
					"margin-right" => self::get_css_value( $attr['horizontalSpace'], "px" ),
					"min-width" => self::get_css_value( $attr['iconBackgroundSize'], "px" ),
					"min-height" => self::get_css_value( $attr['iconBackgroundSize'], "px" ),
					"max-height" => self::get_css_value( $attr['iconBackgroundSize'], "px" ),
					"border-width" => self::get_css_value( $attr['iconBorderWidth'], "px" ),
					"border-radius" => self::get_css_value( $attr['iconBorderRadius'], "px" ),
				),

				" .jn-post-tb_vertical .jtb__post-view-icon-wrap.jn-post-tb_in-view-icon" => array(
					"margin-left" => self::get_css_value( $attr['horizontalSpace'], "px" ),
					"margin-right" => self::get_css_value( $attr['horizontalSpace'], "px" ),
					"min-width" => self::get_css_value( $attr['iconBackgroundSize'], "px" ),
					"min-height" => self::get_css_value( $attr['iconBackgroundSize'], "px" ),
					"max-height" => self::get_css_value( $attr['iconBackgroundSize'], "px" ),
					"border-width" => self::get_css_value( $attr['iconBorderWidth'], "px" ),
					"border-radius" => self::get_css_value( $attr['iconBorderRadius'], "px" ),
				),

				" .jn-post-tb_vertical .jtb__post-view-icon-wrap.jn-post-tb_in-view-icon img" => array(
					"border-radius" => self::get_css_value( $attr['iconBorderRadius'], "px" ),
				),

				" .jn-post-tb_horizontal .jtb__post-view-icon-wrap" => array(
					"margin-top" => self::get_css_value( $attr['horizontalSpace'], "px" ),
					"margin-bottom" => self::get_css_value( $attr['horizontalSpace'], "px" ),
					"min-width" => self::get_css_value( $attr['iconBackgroundSize'], "px" ),
					"min-height" => self::get_css_value( $attr['iconBackgroundSize'], "px" ),
					"max-height" => self::get_css_value( $attr['iconBackgroundSize'], "px" ),
					"border-width" => self::get_css_value( $attr['iconBorderWidth'], "px" ),
					"border-radius" => self::get_css_value( $attr['iconBorderRadius'], "px" ),
					"background-color" => self::get_css_value( $attr['iconBackgroundColor'] ),
					"border-color" => self::get_css_value( $attr['iconBorderColor'] ),
				),

				" .jn-post-tb_horizontal .jtb__post-view-icon-wrap img" => array(
					"border-radius" => self::get_css_value( $attr['iconBorderRadius'], "px" ),
				),

				" .Jtb_post-block-ifb-icon " => array(
					"font-size" => self::get_css_value( $attr['iconSize'], "px" ),
				),

				" .jtb-time" => array(
					"color" => $attr['dateColor'],
					"line-height" => self::get_css_value( $attr['dateLineheight'], "px" ),
					"font-weight" => $attr['dateFontweight'],
					"font-size" => self::get_css_value( $attr['dateFontsize'], "px" ),
					"font-family" => !empty($attr['dateFontfamily']) ? $attr['dateFontfamily'][0] : '',
				),

				" .jtb_post_tb_heading .jtb_post_tb_heading_link" => array(
					"color" => $attr['headingColor'],
					"line-height" => self::get_css_value( $attr['headingLineheight'], "px" ),
					"font-weight" => $attr['headingFontweight'],
					"font-size" => self::get_css_value( $attr['headingFontsize'], "px" ),
					"font-family" => !empty($attr['headingFontfamily']) ? $attr['headingFontfamily'][0] : '',
				),

				" .jtb_post_tb_heading" => array(
					"font-size" => self::get_css_value( $attr['headingFontsize'], "px" ),
					"line-height" => self::get_css_value( $attr['headingLineheight'], "px" ),
					"margin-bottom" => self::get_css_value( $attr['headingBottomSpace'], "px" )
				),

				" .jtb_post_timeline_author .jn-post-timeline-author-link" => array(
					"color" => $attr['authorColor'],
					"line-height" => self::get_css_value( $attr['authorLineheight'], "px" ),
					"font-weight" => $attr['authorFontweight'],
					"font-size" => self::get_css_value( $attr['authorFontsize'], "px" ),
					"font-family" => !empty($attr['authorFontfamily']) ? $attr['authorFontfamily'][0] : '',
				),

				" .jtb_post_timeline_author" => array(
					"margin-bottom" => self::get_css_value( $attr['authorBottomSpace'], "px" )
				),

				" .jtb_post_timeline_excerpt p" => array(
					"color" => $attr['contentColor'],
					"line-height" => self::get_css_value( $attr['contentLineheight'], "px" ),
					"font-weight" => $attr['contentFontweight'],
					"font-size" => self::get_css_value( $attr['contentFontsize'], "px" ),
					"font-family" => !empty($attr['contentFontfamily']) ? $attr['contentFontfamily'][0] : '',
				),

				" .jtb_post_timeline_excerpt" => array(
					"margin-bottom" => self::get_css_value( $attr['excerptBottomSpace'], "px" )
				),
				
				" .jtb_post_timeline_readMore-wrap .jtb_post_timeline_readMore-link:hover" => array(
					"background-color" => $attr['readmoreHoverBackgroundColor'],
					"border-color" =>  $attr['readmoreHoverBorderColor'],
					"color" =>  $attr['readmoreHoverColor'] . '!important',
				),

				" .jtb_post_timeline_readMore-wrap .jtb_post_timeline_readMore-link:focus" => array(
					"background-color" => $attr['readmoreHoverBackgroundColor'],
					"border-color" =>  $attr['readmoreHoverBorderColor'],
					"color" =>  $attr['readmoreHoverColor'] . '!important',
				),

				" .jtb_post_timeline_readMore-wrap .jtb_post_timeline_readMore-link:active" => array(
					"background-color" => $attr['readmoreHoverBackgroundColor'],
					"border-color" =>  $attr['readmoreHoverBorderColor'],
					"color" =>  $attr['readmoreHoverColor'] . '!important',
				),

				" .jtb_post_timeline_readMore-wrap .jtb_post_timeline_readMore-link" => array(
					"color" => $attr['readmoreColor'] . '!important',
					"line-height" =>  self::get_css_value( $attr['readmoreLineheight'], "px"),
					"font-weight" =>  $attr['readmoreFontweight'],
					"font-size" =>  self::get_css_value( $attr['readmoreFontsize'], "px"),
					"font-family" =>  !empty($attr['readmoreFontfamily']) ? $attr['readmoreFontfamily'][0] : '',
					"background-color" => $attr['readmoreBackgroundColor'],
					"border-width" => self::get_css_value( $attr['readmoreBorderwidth'], "px" ),
					"border-color" => $attr['readmoreBorderColor'],
					"border-style" => "solid",
					"box-shadow" => self::get_css_value( $attr['boxshadowHorizontal'], "px" ) .' '. 
						self::get_css_value( $attr['boxshadowVertical'], "px" ) .' '. 
						self::get_css_value( $attr['boxshadowBlur'], "px" ) .' '. 
						self::get_css_value( $attr['boxshadowSpread'], "px" ) .' '. 
						$attr['boxshadowColor'] .' '. 
						$boxShadowPosition,
				),

				" .Jn_post_tb_connector" => array(
					"background-color" => $attr['sepratorColor'],
					"width" => self::get_css_value($attr['sepratorWidth'], "px"),
					"margin-left" => ( "center" !== $attr['timelineAlignment'] ) ? self::get_css_value( $attr['horizontalSpace'], "px" )  : "",
					"margin-right" => ( "center" !== $attr['timelineAlignment'] ) ? self::get_css_value( $attr['horizontalSpace'], "px" ) : "",
				),

				" .jn-post-tb_horizontal .Jn_post_tb_connector" => array(
					"height" => self::get_css_value( $attr['sepratorWidth'], "px" ),
					"width" => 'auto',
					"margin-top" => self::get_css_value( $attr['horizontalSpace'], "px" ),
					"margin-bottom" => self::get_css_value( $attr['horizontalSpace'], "px" ),
				),
		
				" .jn-post-tb_horizontal .Jn_post_tb_focusconnector" => array(
					"height" => self::get_css_value( $attr['sepratorWidth'], "px!important" ),
				),
		
				" .jn-post-tb_horizontal .jnext_splide-arrow" => array(
					"width" => self::get_css_value( $attr['jnext_splide_PostIconBgsize'], "px" ),
					"height" => self::get_css_value( $attr['jnext_splide_PostIconBgsize'], "px" ),
					"border" => self::get_css_value( $attr['jnext_splide_PostIconborderwidth'], "px" ) . " solid " . $attr['jnext_splide_PostIconBorderColor'],
					"background" => $attr['jnext_splide_PostBgColor'],
					"border-radius" => self::get_css_value( $attr['jnext_splide_PostIconborderradius'], "px" ),
					"margin-top" => self::get_css_value( $attr['horizontalSpace'], "px" ),
					"margin-bottom" => self::get_css_value( $attr['horizontalSpace'], "px" ),
				),
		
				" .jn-post-tb_horizontal .jnext_splide-arrow svg" => array(
					"font-size" => self::get_css_value( $attr['jnext_splide_h__PostIconSize'], "px" ),
					"height" => self::get_css_value( $attr['jnext_splide_PostIconHeight'], "px" ),
				),
		
				" .jn-post-tb_horizontal .jnext_splide-arrow svg path" => array(
					"fill" => $attr['jnext_splide_PostIconColor'] 
				),
				
				" .jn-post-tb_horizontal .jnext_splide-arrow:hover" => array(
					"border-color" => $attr['jnext_splide_PostIconBorderFillColor'],
					"background" => $attr['jnext_splide_PostFocus_BgColor']
				),

				" .jn-post-tb_horizontal .jnext_splide-arrow:focus" => array(
					"border-color" => $attr['jnext_splide_PostIconBorderFillColor'],
					"background" => $attr['jnext_splide_PostFocus_BgColor']
				),

				" .jn-post-tb_horizontal .jnext_splide-arrow:active" => array(
					"border-color" => $attr['jnext_splide_PostIconBorderFillColor'],
					"background" => $attr['jnext_splide_PostFocus_BgColor']
				),
		
				" .jn-post-tb_horizontal .jnext_splide-arrow:hover svg path" => array(
					"fill" => $attr['jnext_splide_PostIconFillColor'],
				),

				" .jn-post-tb_horizontal .jnext_splide-arrow:focus svg path" => array(
					"fill" => $attr['jnext_splide_PostIconFillColor'],
				),

				" .jn-post-tb_horizontal .jnext_splide-arrow:active svg path" => array(
					"fill" => $attr['jnext_splide_PostIconFillColor'],
				),
		
				" .jn-post-tb_horizontal .jnext_splide-arrow.post_prev-arrow" => array(
					"left" => "-" . self::get_css_value( ( $attr['jnext_splide_PostIconBgsize'] + 5 ), "px" ),
				),
		
				" .jn-post-tb_horizontal .jnext_splide-arrow.post_next-arrow" => array(
					"right" => "-" . self::get_css_value( ( $attr['jnext_splide_PostIconBgsize'] + 5 ), "px" ),
				),
		
				" .jn-post-tb_horizontal .splide__pagination > li" => array(
					"width" => self::get_css_value( ( $attr['jnext_splide_PostdotBgsize'] + ( $attr['jnext_splide_Postdotborderwidth'] * 2 ) ), "px" ),
					"height" => self::get_css_value( ( $attr['jnext_splide_PostdotBgsize'] + ( $attr['jnext_splide_Postdotborderwidth'] * 2 ) ), "px" ),
				),
		
				" .jn-post-tb_horizontal .splide__pagination button:before" => array(
					"width"=> self::get_css_value( $attr['jnext_splide_PostdotSize'] - $attr['jnext_splide_Postdotborderwidth'], "px" ),
					"height"=> self::get_css_value( $attr['jnext_splide_PostdotSize'] - $attr['jnext_splide_Postdotborderwidth'], "px" ),
					"border-radius"=> self::get_css_value( $attr['jnext_splide_Postdotradius'], "px" ),
					"opacity"=> $attr['jnext_splide_PostdotOpacity'],
					"background"=> $attr['jnext_splide_PostdotColor']
				),
		
				" .jn-post-tb_horizontal .splide__pagination button" => array(
					"width"=> self::get_css_value( $attr['jnext_splide_PostdotBgsize'] + ($attr['jnext_splide_Postdotborderwidth'] * 2), "px" ),
					"height"=> self::get_css_value( $attr['jnext_splide_PostdotBgsize'] + ($attr['jnext_splide_Postdotborderwidth'] * 2), "px" ),
					"border"=> self::get_css_value( $attr['jnext_splide_Postdotborderwidth'], "px" ) . " solid " . $attr['jnext_splide_PostdotBorderColor'],
					"border-radius"=> self::get_css_value( $attr['jnext_splide_Postdotborderradius'], "px" ),
					"background"=> $attr['jnext_splide_PostdotBgColor'],
					"padding"=> self::get_css_value( $attr['jnext_splide_PostdotBGSpacing'], "px" ),
					"opacity" => $attr['jnext_splide_PostdotOpacity']
				),
		
				" .jn-post-tb_horizontal .splide__pagination button:hover" => array(
					"border-color" => $attr['jnext_splide_PostdotBorderFillColor'],
					"background" => $attr['jnext_splide_PostDotFocusBgColor'],
					"opacity" => $attr['jnext_splide_PostdotFocusOpacity']
				),
		
				" .jn-post-tb_horizontal .splide__pagination button:hover:before" => array(
					"opacity" => $attr['jnext_splide_PostdotFocusOpacity'],
					"background" => $attr['jnext_splide_PostdotFillColor'],
					"opacity" => $attr['jnext_splide_PostdotFocusOpacity']
				),
		
				" .jn-post-tb_horizontal .splide__pagination .jn_splide-active button:before" => array(
					"opacity" => $attr['jnext_splide_PostdotFocusOpacity'],
					"background" => $attr['jnext_splide_PostdotFillColor']
				),
		
				" .jn-post-tb_horizontal .list > div" => array(
					"padding-bottom"=> self::get_css_value( $attr['jnext_splide_h__PostbottomSpacing'], "px" ),
					"width"=> self::get_css_value( $attr['post_horizontal_ConBox_Width'], "px" )
				),
		
				" .jn-post-tb_horizontal .jnext_post-timeline-block__day-top .jnext_post_timeline_block_arrow:after" => array(
					"border-bottom-color"=> $attr['itemBackgroundColor']
				),
		
				" .jn-post-tb_horizontal .jn-post-tb_day-bottom .jnext_post_timeline_block_arrow:after" => array(
					"border-top-color"=> $attr['itemBackgroundColor']
				),

				" .jn-post-tb_horizontal .jn-post-tb_day-right .jnext_post_timeline_block_arrow:after" => array(
					"border-left-color"=> $attr['itemBackgroundColor']
				),
		
				" .jn-post-tb_horizontal .jn-post-tb_day-left .jnext_post_timeline_block_arrow:after" => array(
					"border-right-color"=> $attr['itemBackgroundColor']
				),
		
				" .jn-post-tb_horizontal .Jn_post_tb_connector::after"  => array(
					"height" => self::get_css_value( $attr['sepratorWidth'], "px" ),
				),
						
				" .jn-post-tb_horizontal .Jn_post_tb_connector::before"  => array(
					"height" => self::get_css_value( $attr['sepratorWidth'], "px"),
				),

				" .jn-post-tb_horizontal .jn-post-tb_day-top .jnext_post_timeline_block_arrow:after" => array(
					"border-bottom-color"  => self::get_css_value( $attr['itemBackgroundColor']),
				),

			);

			$mobile_selectors = array(

				" .jn-post-tb_widget_center-block.jn-post-t-block_mobile .Jn_post_tb_connector" => array(  
					"left" => self::get_css_value( ($attr['iconBackgroundSize'] + ($attr['iconBorderWidth'] * 2)) / 2, "px" ), 
					"right" => self::get_css_value( $attr['iconBackgroundSize'] / 2, "px" ) ,
					"margin-left" => self::get_css_value( $attr['horizontalSpace'] / 2, "px" ),
					"margin-right" => self::get_css_value( $attr['horizontalSpace'] / 2, "px" ),
				),

				" .jn-post-tb_widget_left-block.jn-post-t-block_mobile .Jn_post_tb_connector" => array(  
					"left" => self::get_css_value( ($attr['iconBackgroundSize'] + ($attr['iconBorderWidth'] * 2)) / 2, "px" ), 
					"margin-left" => self::get_css_value( $attr['horizontalSpace'] / 2, "px" ),
					"margin-right" => self::get_css_value( $attr['horizontalSpace'] / 2, "px" ),
				),

				" .jn-post-tb_widget_right-block.jn-post-t-block_mobile .Jn_post_tb_connector" => array(  
					"right" => self::get_css_value( (($attr['iconBackgroundSize'] + ($attr['iconBorderWidth'] * 2)) / 2) - $attr['sepratorWidth'], "px" ), 
					"margin-left" => self::get_css_value( $attr['horizontalSpace'] / 2, "px" ),
					"margin-right" => self::get_css_value( $attr['horizontalSpace'] / 2, "px" ),
				),

				" .jn-post-tb_widget_center-block.jn-post-t-block_mobile .jn-post-tb_day-right .jnext_post_timeline_block_arrow::after" => array(
					"border-right" => $border_with_color,
				),

				" .jn-post-tb_vertical.jn-post-t-block_mobile .jtb__post-view-icon-wrap"=> array(  
					"margin-left" => self::get_css_value( $attr['horizontalSpace'] / 2, "px" ),
					"margin-right" => self::get_css_value( $attr['horizontalSpace'] / 2, "px" ),
				),

			);

			$tablet_selectors = array(

				" .jn-post-tb_widget_center-block.jn-post-t-block_tablet .Jn_post_tb_connector" => array(
					"left" => self::get_css_value( $attr['iconBackgroundSize'] / 2, "px" ), 
					"right" => self::get_css_value( $attr['iconBackgroundSize'] / 2, "px" ),
					"margin-left" => self::get_css_value( $attr['horizontalSpace'], "px" ),
					"margin-right" => self::get_css_value( $attr['horizontalSpace'], "px" ), 
				),

				" .jn-post-tb_widget_left-block.jn-post-t-block_tablet .Jn_post_tb_connector" => array(
					"left" => self::get_css_value( $attr['iconBackgroundSize'] / 2 )
				),

				" .jn-post-tb_widget_right-block.jn-post-t-block_tablet .Jn_post_tb_connector" => array(
					"right" => self::get_css_value( $attr['iconBackgroundSize'] / 2 - $attr['sepratorWidth'], "px" )
				),

				" .jn-post-tb_widget_center-block.jn-post-t-block_tablet .jn-post-tb_day-right .jnext_post_timeline_block_arrow::after" => array(
					"border-right" => $border_with_color,
				),

			);

			$combined_selectors = array(

				'desktop' => array_merge($selectors, $selector),
				'tablet'  => $tablet_selectors,
				'mobile'  => $mobile_selectors,

			);

			$id  = '.jn-tb-post-timeline.block-'. $id;
			$css = self::jnext_timeline_blocks_generate_all_css( $combined_selectors, $id );
			return $css;
		}

		/**
		 * Get Jnext Vertical Content timeline Block CSS
		 *
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array Styles.
		*/
		public static function get_jnext_timeline_block__css( $attr, $id ) {
			
			$defaults = self::get_jnext_timeline_block_default__attributes();
			$attr     = array_merge( $defaults, (array) $attr ); 
			$mobile_selectors = array();
			$tablet_selectors = array();
			$selector = array();

			if ($attr['timelineAlignment'] != 'center') {
				$selector = array( ' .jn-ver-one-side_inner_block' => 
					array(
						'border-radius'    => self::get_css_value( $attr['itemBorderRadius'], 'px' ),
						'border-width'     => self::get_css_value( $attr['itemBorderWidth'], 'px' ),
						'border-style'     => $attr['itemBorderStyle'],
						'border-color'     => $attr['itemBorderColor'],
						'padding'          => self::get_css_value( $attr['itemPadding'], 'px' ),
						'background-color' => $attr['backgroundColor'],
					)
				);
			} else {
				$selector = array( ' .jnext-tb_detail-wrap .jnext-tb-details' => 
					array(
						'border-radius'    => self::get_css_value( $attr['itemBorderRadius'], 'px' ),
						'border-width'     => self::get_css_value( $attr['itemBorderWidth'], 'px' ),
						'border-style'     => $attr['itemBorderStyle'],
						'border-color'     => $attr['itemBorderColor'],
						'padding'          => self::get_css_value( $attr['itemPadding'], 'px' ),
						'background-color' => $attr['backgroundColor'],
					)
				);
			}

			$border_with_color = '12px solid' . $attr['backgroundColor'];
			$seprator_width = ($attr['separatorwidth'] !== 'undefined') ? $attr['separatorwidth'] : 2;
			
			$selectors = array(
				' .jnext_tline_center_block .jnext-tb-date-wrap'  => array(
					'flex-basis' =>   self::get_css_value( $attr['ContentBoxWidth'], 'px' ),
					'width' =>  self::get_css_value( $attr['ContentBoxWidth'], 'px' ),
				),

				' .jnext_tline_center_block .jnext-tb_detail-wrap'  => array(
					'flex-basis' =>   self::get_css_value( $attr['ContentBoxWidth'], 'px' ),
					'width' =>  self::get_css_value( $attr['ContentBoxWidth'], 'px' ),
				),

				' .jnext_tline_center_block .jnext_tline_left .jnext-tb-blocks_arrow::after'  => array(
					'border-left' => "12px solid " .  $attr['backgroundColor'],
				),
			  
				' .jnext_tline_center_block .jnext_tline_right .jnext-tb-blocks_arrow::after'  => array(
					'border-right' => "12px solid " .  $attr['backgroundColor'],
				),

				' .jnext_tline_center_block .list .jnext-tb--content.jnext_tline_left:first-child .jnext-tb-blocks_arrow::after' => array(
					'border-right' => "12px solid " .  $attr['backgroundColor'],
				),

				' .jnext_tline_left_block .jnext-tb-blocks_arrow::after'  => array(
					'border-right' => "12px solid " .  $attr['backgroundColor'],
				),

				' .jnext_tline_right_block .jnext-tb-blocks_arrow::after'  => array(
					'border-left' => "12px solid " .  $attr['backgroundColor'],
				),

				" .jnext-tb--content" => array(
					"margin-bottom" => self::get_css_value( $attr['verticalSpace'], 'px' ),
				),
			  
				" .jnext_tb_focus_connector"=> array(
					"background-color"=> $attr['separatorFillColor'],
				),
				
				" .jnext_tb_connector" => array(
					"background-color"=>  $attr['separatorColor'],
					"width"=> self::get_css_value( $attr['separatorwidth'], 'px' ),  
				),
			  
				" .jnext_tline_vertical .jnext-tb-view-icon-wrap" => array(
					"margin-left"=> self::get_css_value( $attr['horizontalSpace'], 'px' ), 
					"margin-right"=> self::get_css_value( $attr['horizontalSpace'], 'px' ),  
				),

				" .jnext_tb_detail .jnext-tb-view-icon-wrap" => array(
					"background" =>  $attr['separatorBg'],
					"border-color" => $attr['separatorBorder'],
					"color" => $attr['iconFocus'],
					"min-width" =>  self::get_css_value( $attr['iconBgsize'], 'px' ), 
					"min-height" =>  self::get_css_value( $attr['iconBgsize'], 'px' ), 
					"max-height" =>  self::get_css_value( $attr['iconBgsize'], 'px' ), 
					"border-width" =>  self::get_css_value( $attr['iconborderwidth'], 'px' ),  
					"border-radius" =>  self::get_css_value( $attr['iconborderradius'], 'px' ), 
				),

				" .jnext_tb_detail .jnext-tb-view-icon-wrap i" => array(
					"color" => $attr['iconColor']
				),

				' .jnext-tb-view-icon-wrap.jnext-tb_in-view-icon' => array(
					'background'   => $attr['iconBgFocus'],
					'border-color' => $attr['borderFocus'],
				),
				
				' .jnext-tb-view-icon-wrap.jnext-tb_in-view-icon .jnext-tb-ifb-icon i' => array(
					'color' => $attr['iconFocus'],
				),
			  
				" .jnext_tb_detail .jnext-tb-view-icon-wrap img" => array(
					"border-radius" => self::get_css_value( $attr['iconborderradius'], 'px' ),
				),

				" .jnext_tb_detail .jnext-tb-view-icon-wrap .jnext-tb-ifb-icon" => array(
					"font-size" => self::get_css_value( $attr['iconSize'], 'px' ), 
				),
			  
				" .jnext_tb_detail .jnext-tb-view-icon-wrap .jnext-tb-ifb-icon img" => array(
					"width"  => self::get_css_value( $attr['iconSize'], 'px' ), 
					"height" => self::get_css_value( $attr['iconSize'], 'px' ), 
				),
			  
				" .jnext_tline_vertical.jnext_tline_left_block .jnext_tb_connector" => array(
					"left" => self::get_css_value( ($attr['iconBgsize'] + ($attr['iconborderwidth'] * 2) - $attr['separatorwidth'])  / 2 , 'px' ),  
					"margin-left" => self::get_css_value( $attr['horizontalSpace'], 'px' ), 
					"margin-right" => self::get_css_value( $attr['horizontalSpace'], 'px' ), 
				),
			  
				" .jnext_tline_vertical.jnext_tline_right_block .jnext_tb_connector" => array(
					"right" => self::get_css_value( ($attr['iconBgsize'] + ($attr['iconborderwidth'] * 2) - $attr['separatorwidth'])  / 2 , 'px' ),  
					"margin-left" => self::get_css_value( $attr['horizontalSpace'], 'px' ), 
					"margin-right" => self::get_css_value( $attr['horizontalSpace'], 'px' ), 
				),

				" .jnext-tb-details .jnext-tb_heading"=> array(
					"line-height"=> self::get_css_value( $attr['headingLineHeight'], 'px' ), 
					"font-weight"=> $attr['headingFontWeight'], 
					"font-size"=> self::get_css_value( $attr['headingFontSize'], 'px' ), 
					"font-family" => !empty($attr['headingFontFamily']) ? $attr['headingFontFamily'][0] : '',
					"margin-bottom" => self::get_css_value( $attr['headingBottomMargin'], 'px' ), 
					"color"=> $attr['headingColor'], 
				),

				" .jnext-tb-date-wrap .jnext-tb-date" => array(
					'line-height'     => self::get_css_value( $attr['dateLineHeight'], 'px' ),
					"font-weight" => $attr['dateFontWeight'],
					'font-size'     => self::get_css_value( $attr['dateFontSize'], 'px' ),
					"font-family" => !empty($attr['dateFontFamily']) ? $attr['dateFontFamily'][0] : '',
					"color" => $attr['dateColor'],
				),

				" .jnext_tb_detail .jnext-tb-block_desc"=> array(
					"line-height"=> self::get_css_value( $attr['contentLineHeight'], 'px' ), 
					"font-weight"=> $attr['contentFontWeight'], 
					"font-size"=> self::get_css_value( $attr['contentFontSize'], 'px' ), 
					"font-family" => !empty($attr['contentFontFamily']) ? $attr['contentFontFamily'][0] : '',
					"color"=> $attr['contentColor'],
				)

			);

			$mobile_selectors = array(

				" .jnext_tline_center_block.jnext_timeline-block__mobile .jnext_tline_left .jnext-tb-blocks_arrow::after" => array(
					'border-right' => "12px solid " .  $attr['backgroundColor'],
				),
				
				" .jnext_tline_vertical.jnext_timeline-block__mobile .jnext-tb-view-icon-wrap" => array(
					'margin-left' => self::get_css_value( ($attr['horizontalSpace']) / 2 , 'px' ),
					'margin-right' => self::get_css_value( ($attr['horizontalSpace']) / 2 , 'px' ),
				),

				' .jnext_tline_center_block.jnext_timeline-block__mobile.jnext_tline_vertical .jnext_tb_connector' => array(
					'left'  => self::get_css_value( (($attr['iconBgsize'] + ($attr['iconborderwidth'] * 2)  ) / 2) , 'px' ),
					'margin-left' => self::get_css_value( ($attr['horizontalSpace']) / 2 , 'px' ),
					'margin-right' => self::get_css_value( ($attr['horizontalSpace']) / 2 , 'px' ),
				),

				' .jnext_tline_left_block.jnext_timeline-block__mobile .jnext_tb_connector' => array(
					"left" => self::get_css_value( ($attr['iconBgsize'] + ($attr['iconborderwidth'] * 2) - $attr['separatorwidth'])  / 2 , 'px' ),  
					'margin-left' => self::get_css_value( ($attr['horizontalSpace']) / 2 , 'px' ),
					'margin-right' => self::get_css_value( ($attr['horizontalSpace']) / 2 , 'px' ),
				),

				' .jnext_tline_right_block.jnext_timeline-block__mobile .jnext_tb_connector' => array(
					"right" => self::get_css_value( ($attr['iconBgsize'] + ($attr['iconborderwidth'] * 2) - $attr['separatorwidth'])  / 2 , 'px' ),  
					'margin-left' => self::get_css_value( ($attr['horizontalSpace']) / 2 , 'px' ),
					'margin-right' => self::get_css_value( ($attr['horizontalSpace']) / 2 , 'px' ),
				),

			);

			$tablet_selectors = array(
				' .jnext_tline_center_block.jnext_timeline-block__tablet.jnext_tline_vertical .jnext_tb_connector' => array(
					'left' => self::get_css_value( (($attr['iconBgsize'] + ($attr['iconborderwidth'] )  ) / 2) , 'px' ),
					'margin-left' => self::get_css_value( ($attr['horizontalSpace'] + $attr['iconborderwidth']) / 2 , 'px' ),
					'margin-right' => self::get_css_value( ($attr['horizontalSpace'] + $attr['iconborderwidth']) / 2 , 'px' ),
				),

				" .jnext_tline_vertical.jnext_timeline-block__tablet .jnext-tb-view-icon-wrap" => array(
					'margin-left' => self::get_css_value( ($attr['horizontalSpace']) / 2 , 'px' ),
					'margin-right' => self::get_css_value( ($attr['horizontalSpace']) / 2 , 'px' ),
				),
			
				' .jnext_tline_left_block.jnext_timeline-block__tablet.jnext_tline_vertical .jnext_tb_connector' => array(
					'margin-left' => self::get_css_value( ($attr['horizontalSpace']) / 2 , 'px' ),
					'margin-right' => self::get_css_value( ($attr['horizontalSpace']) / 2 , 'px' ),
				),

				' .jnext_tline_right_block.jnext_timeline-block__tablet.jnext_tline_vertical .jnext_tb_connector' => array(
					'margin-left' => self::get_css_value( ($attr['horizontalSpace']) / 2 , 'px' ),
					'margin-right' => self::get_css_value( ($attr['horizontalSpace']) / 2 , 'px' ),
				),

				" .jnext_tline_center_block.jnext_timeline-block__tablet .jnext_tline_left .jnext-tb-blocks_arrow::after" => array(
					"border-right" => '12px solid' . $attr['backgroundColor'],
				),
			);

			$combined_selectors = array(
				'desktop' => array_merge($selectors, $selector),
				'tablet'  => $tablet_selectors,
				'mobile'  => $mobile_selectors,
			);

			$id  = '.jnext-tb-con-tline.block-'. $id;
			$css = self::jnext_timeline_blocks_generate_all_css( $combined_selectors, $id );
			return $css;
		}

		public static function get_jnext_timeline_child_block__css( $attr, $id ) {  
			$defaults = self::get_jnext_timeline_child_block_default__attributes(); 
			$attr     = array_merge( $defaults, (array) $attr ); 
			$mobile_selectors = array();
			$tablet_selectors = array();
			$selector = array();

			$selectors = array(
				

			);

			$mobile_selectors = array(
			);

			$tablet_selectors = array(
			);

			$combined_selectors = array(
				'desktop' => array_merge($selectors, $selector),
				'tablet'  => $tablet_selectors,
				'mobile'  => $mobile_selectors,
			);

			$id  = '.jnext-tb--content.block-'. $attr['itemId'];
			$css = self::jnext_timeline_blocks_generate_all_css( $combined_selectors, $id );
			return $css;
		}

		/**
		 * Get Jnext Horizontal Content timeline Block CSS
		 *
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array Styles.
		 */

		 public static function get_jnext_horizontal_content_timeline_block_css( $attr, $id ) {

			$defaults = self::get_jnext_horizontal_content_timeline_block_default_attributes();
			$attr     = array_merge( $defaults, (array) $attr );

			$mobile_selectors = array();
			$tablet_selectors = array();
			$selector = array();

			$selector = array( ' .jtb-details' => 
				array(
					'border-radius'    => self::get_css_value( $attr['itemBorderRadius'], 'px' ),
					'border-width'     => self::get_css_value( $attr['itemBorderWidth'], 'px' ),
					'border-style'     => $attr['itemBorderStyle'],
					'border-color'     => $attr['itemBorderColor'],
					'padding'          => self::get_css_value( $attr['itemPadding'], 'px' ),
					'background-color' => $attr['backgroundColor'],
				)
			);

			$border_with_color = '12px solid' . $attr['backgroundColor'];

			$seprator_width = ($attr['separatorwidth'] !== 'undefined') ? $attr['separatorwidth'] : 2;
			
			$selectors = array(

				' .jn_timeline_left .jn_timeline_day_right .jn_timeline_blocks_arrow::after' => array(
					'border-left' => $border_with_color
				),

				' .jn_timeline_right .jn_timeline_day_right .jn_timeline_blocks_arrow::after' => array(
					'border-left' => $border_with_color
				),

				' .jn_timeline_right .jn_timeline-day-left .jn_timeline_blocks_arrow::after' => array(
					'border-right' => $border_with_color
				),

				' .jn_timeline_left .jn_timeline-day-left .jn_timeline_blocks_arrow::after' => array(
					'border-right' => $border_with_color
				),

				' .jn_content_timeline .JnextTbconnector' => array(
					'background-color' => $attr['separatorColor'],
				), 
				 
				' .jn_content_timeline.jn_timeline_horizontal .JnextTbfocusconnector' => array(
					'background-color' => $attr['separatorFillColor'],
				),

				' .jn-timeline-blocks-main .Jtb_ifb-icon i' => array(
					'color' => $attr['iconColor'],
				),
				
				' .jtb_view-icon-wrap' => array(
					'background-color' => $attr['separatorBg'],
					'border-color'     => $attr['separatorBorder'],
				),

				' .jtb_view-icon-wrap.jn-tb_in-view-icon' => array(
					'background'   => $attr['iconBgFocus'],
					'border-color' => $attr['borderFocus'],
				),
				
				' .jtb_view-icon-wrap.jn-tb_in-view-icon .Jtb_ifb-icon i' => array(
					'color' => $attr['iconFocus'],
				),

				' .jn_timeline_horizontal .jn-timeline-content.jnext_splide-prev .jtb_view-icon-wrap' => array(
					'background'   => $attr['iconBgFocus'],
					'border-color' => $attr['borderFocus'],
					'color'        => $attr['iconFocus'],
				),

				' .jn_timeline_horizontal .jn-timeline-content.splide__slide.is-active .jtb_view-icon-wrap' => array(
					'background'   => $attr['iconBgFocus'],
					'border-color' => $attr['borderFocus'],
				),

				' .jn_timeline_horizontal .jn-timeline-content.splide__slide.is-active .jtb_view-icon-wrap i' => array(
					'color'        => $attr['iconFocus'],
				),

				' .jn-timeline-blocks-main .jtb_view-icon-wrap.jn-tb_in-view-icon svg' => array(
					'fill' => $attr['iconFocus'],
				),

				' .jn_timeline_left_block .JnextTbconnector' => array(
					'left' => $attr['iconBgsize'] / 2 . 'px',
				),

				' .jn_timeline_right_block .JnextTbconnector' => array(
					'right' => $attr['iconBgsize'] / 2 - $seprator_width . 'px',
				),

				' .jn-timeline-content' => array(
					'margin-bottom' => self::get_css_value( $attr['verticalSpace'], 'px' ),
					'width' => self::get_css_value( $attr['Horizontal_ConBox_Width'], 'px' ),
				),

				' .jn_timeline_horizontal .jtb_view-icon-wrap' => array(
					'min-width'    => self::get_css_value( $attr['iconBgsize'], 'px' ),
					'min-height'   => self::get_css_value( $attr['iconBgsize'], 'px' ),
                    'max-height'   => self::get_css_value( $attr['iconBgsize'], 'px' ),
					'border-width' => self::get_css_value( $attr['iconborderwidth'], 'px' ),
                    'border-radius' => self::get_css_value( $attr['iconborderradius'], 'px' ),
					'margin-top'  => self::get_css_value( $attr['horizontalSpace'], 'px' ),
					'margin-bottom' => self::get_css_value( $attr['horizontalSpace'], 'px' ),
				),

				' .jn_timeline_horizontal .jtb_view-icon-wrap img' => array(
                    'border-radius' => self::get_css_value( $attr['iconborderradius'], 'px' ),
				),

				' .Jtb_ifb-icon i' => array(
					'font-size'  => self::get_css_value( $attr['iconSize'], 'px' ),
				),

				' .Jtb_ifb-icon img' => array(
					'width'  => self::get_css_value( $attr['iconSize'], 'px' ),
					'height' => self::get_css_value( $attr['iconSize'], 'px' ),
				),

				' .jn-timeline-block_date' => array(
					'color'       => $attr['dateColor'],
					'line-height' => self::get_css_value( $attr['dateLineHeight'], 'px' ),
					'font-weight' => $attr['dateFontWeight'],
					'font-size'   => self::get_css_value( $attr['dateFontSize'], 'px' ),
					'font-family' => !empty($attr['dateFontFamily']) ? $attr['dateFontFamily'][0] : '',
					'height'   => self::get_css_value( $attr['dateFontSize'], 'px' ),
				),

				' .jn_tb_heading' => array(
					'color'         => $attr['headingColor'],
					'line-height'   => self::get_css_value( $attr['headingLineHeight'], 'px' ),
					'font-weight'   => $attr['headingFontWeight'],
					'font-size'     => self::get_css_value( $attr['headingFontSize'], 'px' ),
					'font-family'   => !empty($attr['headingFontFamily']) ? $attr['headingFontFamily'][0] : '',
					'margin-bottom' => self::get_css_value( $attr['headingBottomMargin'], 'px' ),
				),

				' .jn-timeline-block_desc' => array(
					'color'       => $attr['contentColor'],
					'line-height' => self::get_css_value( $attr['contentLineHeight'], 'px' ),
					'font-weight' => $attr['contentFontWeight'],
					'font-size'   => self::get_css_value( $attr['contentFontSize'], 'px' ),
					'font-family' => !empty($attr['contentFontFamily']) ? $attr['contentFontFamily'][0] : '',
				),

				' .JnextTbconnector' => array(
					'background-color' => $attr['separatorColor'],
					'width'            => self::get_css_value( $attr['separatorwidth'], 'px' ),
				),

				" .jn_timeline_horizontal .JnextTbconnector" => array(
					'height' => self::get_css_value($attr['separatorwidth'], "px"),
					'width' => '100%',
					'margin-top'      => self::get_css_value( $attr['horizontalSpace'], 'px' ),
					'margin-bottom'     => self::get_css_value( $attr['horizontalSpace'], 'px' ),
				),
		
				" .jn_timeline_horizontal .JnextTbfocusconnector" => array(
					'height' => self::get_css_value($attr['separatorwidth'], "px!important"),
				),

				" .jn_timeline_horizontal .jnext_splide-arrow" => array(
					"width" => self::get_css_value($attr['jnext_splide_iconBgsize'], "px" ),
					"height" => self::get_css_value($attr['jnext_splide_iconBgsize'], "px" ),
					"border" => self::get_css_value($attr['jnext_splide_iconborderwidth'], "px" ) . " solid " . $attr['jnext_splide_iconBorderColor'],
					"background" => $attr['jnext_splide_BgColor'],
					"border-radius" => self::get_css_value($attr['jnext_splide_iconborderradius'], "px"),
					'margin-top'    => self::get_css_value( $attr['horizontalSpace'], 'px' ),
					'margin-bottom' => self::get_css_value( $attr['horizontalSpace'], 'px' ),
				),
		  
				" .jn_timeline_horizontal .jnext_splide-arrow svg" => array(
					"font-size" => self::get_css_value($attr['jnext_splide_iconSize'], "px" ),
					"height" => self::get_css_value($attr['jnext_splide_iconHeight'], "px" ),
				),
		  
				" .jn_timeline_horizontal .jnext_splide-arrow svg path" => array(
					"fill" => $attr['jnext_splide_iconColor']
				),
				  
				" .jn_timeline_horizontal .jnext_splide-arrow:hover" => array(
					"border-color" => $attr['jnext_splide_iconBorderFillColor'],
					"background" => $attr['jnext_splide_Focus_BgColor']
				),

				" .jn_timeline_horizontal .jnext_splide-arrow:focus" => array(
					"border-color" => $attr['jnext_splide_iconBorderFillColor'],
					"background" => $attr['jnext_splide_Focus_BgColor']
				),

				" .jn_timeline_horizontal .jnext_splide-arrow:active" => array(
					"border-color" => $attr['jnext_splide_iconBorderFillColor'],
					"background" => $attr['jnext_splide_Focus_BgColor']
				),
		
				" .jn_timeline_horizontal .jnext_splide-arrow:hover svg path" => array(
					"fill" => $attr['jnext_splide_iconFillColor'],
				),

				" .jn_timeline_horizontal .jnext_splide-arrow:focus svg path" => array(
					"fill" => $attr['jnext_splide_iconFillColor'],
				),

				" .jn_timeline_horizontal .jnext_splide-arrow:active svg path" => array(
					"fill" => $attr['jnext_splide_iconFillColor'],
				),
		  
				" .jn_timeline_horizontal .jnext_splide-arrow.prev-arrow" => array(
					"left" => "-" . self::get_css_value( ( $attr['jnext_splide_iconBgsize'] + 5 ), "px" ),
				),
		  
				" .jn_timeline_horizontal .jnext_splide-arrow.next-arrow" => array(
					"right" => "-" . self::get_css_value( ( $attr['jnext_splide_iconBgsize'] + 5 ), "px" ),
				), 
		  
				" .jn_timeline_horizontal .splide__pagination > li" => array(
					"width" => self::get_css_value( ( $attr['jnext_splide_dotBgsize'] + ( $attr['jnext_splide_dotborderwidth'] * 2 ) ), "px" ),
					"height" => self::get_css_value( ( $attr['jnext_splide_dotBgsize'] + ( $attr['jnext_splide_dotborderwidth'] * 2 ) ), "px" ),
				),
		   
				" .jn_timeline_horizontal .splide__pagination button:before" => array(
					"width" => self::get_css_value( $attr['jnext_splide_dotSize'] - $attr['jnext_splide_dotborderwidth'], "px" ),
					"height" => self::get_css_value( $attr['jnext_splide_dotSize'] - $attr['jnext_splide_dotborderwidth'], "px" ),
					"border-radius" => self::get_css_value( $attr['jnext_splide_dotradius'], "px" ),
					"opacity" => self::get_css_value( $attr['jnext_splide_dotOpacity'] ),
					"background" => $attr['jnext_splide_dotColor']
				),
		  
				" .jn_timeline_horizontal .splide__pagination button" => array(
					"width" => self::get_css_value( $attr['jnext_splide_dotBgsize'] + ($attr['jnext_splide_dotborderwidth'] * 2 ) , "px" ),
					"height" => self::get_css_value( $attr['jnext_splide_dotBgsize'] + ($attr['jnext_splide_dotborderwidth'] * 2 ) , "px" ),
					"border" => self::get_css_value( $attr['jnext_splide_dotborderwidth'], "px" ) . " solid " . $attr['jnext_splide_dotBorderColor'],
					"border-radius" => self::get_css_value( $attr['jnext_splide_dotborderradius'], "px" ),
					"background" => $attr['jnext_splide_dotBgColor'],
					"padding" => self::get_css_value( $attr['jnext_splide_dotBGSpacing'], "px" ),
					"opacity" => self::get_css_value( $attr['jnext_splide_dotOpacity'] ),
				),
		  
				" .jn_timeline_horizontal .splide__pagination button:hover" => array(
					"border-color" => $attr['jnext_splide_dotBorderFillColor'],
					"background" => $attr['jnext_splide_Focus_dotBgColor'],
					"opacity" => $attr['jnext_splide_dotFocusOpacity'],
				),
		  
				" .jn_timeline_horizontal .splide__pagination button:hover:before" => array(
					"opacity" => $attr['jnext_splide_dotFocusOpacity'],
					"background" => $attr['jnext_splide_dotFillColor']
				),
				
				" .jn_timeline_horizontal .splide__pagination .jn_splide-active button:before" => array(
					"opacity" => $attr['jnext_splide_dotFocusOpacity'],
					"background" => $attr['jnext_splide_dotFillColor']
				),

				" .jn_timeline_horizontal .list > div" => array(
					"padding-bottom" => self::get_css_value( $attr['jnext_splide_sliderBottomSpacing'], "px" ),
				),

				" .jn_timeline_horizontal .jn_timeline-day-top .jn_timeline_blocks_arrow:after" => array(
					"border-bottom-color" => $attr['backgroundColor'],
				),
		
				" .jn_timeline_horizontal .jn_timeline_day_bottom .jn_timeline_blocks_arrow:after" => array(
					"border-top-color" => $attr['backgroundColor'],
				),

				" .jn_timeline_horizontal .jn_timeline-day-left .jn_timeline_blocks_arrow:after" => array(
					"border-right-color" => $attr['backgroundColor'],
				),
		
				" .jn_timeline_horizontal .jn_timeline_day_right .jn_timeline_blocks_arrow:after" => array(
					"border-left-color" => $attr['backgroundColor'],
				),

				" .jn_timeline_horizontal .JnextTbconnector::after" => array(
					"height" => self::get_css_value($attr['separatorwidth'], "px"),
				),
				
				" .jn_timeline_horizontal .JnextTbconnector::before" => array(
					"height" => self::get_css_value($attr['separatorwidth'], "px"),
				),

			);

			$mobile_selectors = array(

				' .jn_timeline_left_block.jnext_timeline-block__mobile .JnextTbconnector' => array(
					'left' => self::get_css_value( (($attr['iconBgsize'] + ($attr['iconborderwidth'] * 2)  ) / 2) , 'px' ),
					'margin-left' => self::get_css_value( ($attr['horizontalSpace']) / 2 , 'px' ),
					'margin-right' => self::get_css_value( ($attr['horizontalSpace']) / 2 , 'px' ),
				),

				' .jn_timeline_right_block.jnext_timeline-block__mobile .JnextTbconnector' => array(
					'right' => self::get_css_value( (($attr['iconBgsize'] + ($attr['iconborderwidth'] * 2) ) / 2) - $attr['separatorwidth']  , 'px' ),
					'margin-left' => self::get_css_value( ($attr['horizontalSpace']) / 2 , 'px' ),
					'margin-right' => self::get_css_value( ($attr['horizontalSpace']) / 2 , 'px' ),
				),

				" .jn_timeline_center_block.jnext_timeline-block__mobile .jn_timeline_day_right .jn_timeline_blocks_arrow::after" => array(
					"border-right" => $border_with_color,
				),

			);

			$tablet_selectors = array(

				' .jn_timeline_left_block.jnext_timeline-block__tablet .JnextTbconnector' => array(
					'left' => self::get_css_value( $attr['iconBgsize'] / 2, 'px' ),
				),

				' .jn_timeline_right_block.jnext_timeline-block__tablet .JnextTbconnector' => array(
					'right' => self::get_css_value( ($attr['iconBgsize'] / 2 - $attr['separatorwidth']), 'px' ),
				),

				" .jn_timeline_center_block.jnext_timeline-block__tablet .jn_timeline_day_right .jn_timeline_blocks_arrow::after" => array(
					"border-right" => $border_with_color,
				),

			);

			$combined_selectors = array(

				'desktop' => array_merge($selectors, $selector),
				'tablet'  => $tablet_selectors,
				'mobile'  => $mobile_selectors,

			);

			$id  = '.jn-t-block-con-timeline.block-'. $id;
			$css = self::jnext_timeline_blocks_generate_all_css( $combined_selectors, $id );
			return $css;
		}

		/**
		 * Get Jnext Curve timeline Block CSS
		 *
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array Styles.
		 */
		public static function get_jnext_timeline_curve_block__css( $attr, $id ) {  
			$defaults = self::get_jnext_timeline_curve_block__css_default__attributes(); 
			$attr     = array_merge( $defaults, (array) $attr ); 
			$mobile_selectors = array();
			$tablet_selectors = array();
			$selector = array();

			$selector = array( ' .jnext_curve_tb_detail .jn-ctb-details' => 
				array(
					'border-radius'    => self::get_css_value( $attr['itemBorderRadius'], 'px' ),
					'border-width'     => self::get_css_value( $attr['itemBorderWidth'], 'px' ),
					'border-style'     => $attr['itemBorderStyle'],
					'border-color'     => $attr['itemBorderColor'],
					'padding'          => self::get_css_value( $attr['itemPadding'], 'px' ),
					'background-color' => $attr['backgroundColor'],
				)
			);
			$border_with_color = '12px solid' . $attr['backgroundColor'];
			$selectors = array(
				
				" .jn-ctb-details .jn-ctb_heading"  => array(
					"line-height"=> self::get_css_value( $attr['headingLineHeight'], 'px' ), 
					"font-weight"=> $attr['headingFontWeight'],  
					"font-size"=> self::get_css_value( $attr['headingFontSize'], 'px' ),
					"font-family"=> !empty($attr['headingFontFamily']) ? $attr['headingFontFamily'][0] : '',
					"margin-bottom"=> self::get_css_value( $attr['headingBottomMargin'], 'px' ), 
					"color" => $attr['headingColor']  
				),
		
				" .jn-ctb-details .jn-ctb-block_desc"  => array(
					"line-height"=> self::get_css_value( $attr['contentLineHeight'], 'px' ),  
					"font-weight"=> $attr['contentFontWeight'],   
					"font-size"=> self::get_css_value( $attr['contentFontSize'], 'px' ),    
					"font-family"=> !empty($attr['contentFontFamily']) ? $attr['contentFontFamily'][0] : '', 
					"color" => $attr['contentColor']  
				),
				
				" .jn-ctb-content"  => array(
					"border-color" => $attr['separatorColor'],
					"margin-bottom"=> - $attr['separatorwidth'] . 'px' ,    
				),

				" .jn-ctb-content.jn_curve_tline_left .jn-ctb-blocks_arrow::after" => array(
					"border-right"  => $border_with_color ,
				),
		
				" .jn-ctb-content.jn_curve_tline_right .jn-ctb-blocks_arrow::after" => array(
					"border-left"  => $border_with_color ,
				),

				" .jn-ctb-content.jn_curve_tline_left .jn-ctb-blocks_arrow" => array(
					"left" => (( $attr['iconBgsize'] + ( $attr['iconborderwidth'] * 2 ) ) / 2) + 0 + (10 - $attr['separatorwidth']) . 'px ',   
				),
		
				" .jn-ctb-content.jn_curve_tline_right .jn-ctb-blocks_arrow" => array(
					"right" => (( $attr['iconBgsize'] + ( $attr['iconborderwidth'] * 2 ) ) / 2) + 0  + (10 - $attr['separatorwidth']) . 'px ',
				),
		
				" .jn-ctb-content.jn_curve_tline_right .jnext-curve-tb-row" => array(
					"padding-right" => (( $attr['iconBgsize']  + ( $attr['iconborderwidth'] * 2 ) ) / 2) + 12  + (10 -$attr['separatorwidth'] ) . 'px ',   
				),
		
				" .jn-ctb-content.jn_curve_tline_left .jnext-curve-tb-row" => array(
					"padding-left" => (( $attr['iconBgsize']  + ( $attr['iconborderwidth'] * 2 ) ) / 2) + 12 +  (10 -$attr['separatorwidth'] ) . 'px ',   
				),

				" .jn-ctb-content.jn_curve_tline_right:first-child  .jn-ctb-blocks_arrow::after"=> array(
					"border-right"=> $border_with_color,
					"border-left"=> "unset"
				),

				" .jn-ctb-content.jn_curve_tline_right:first-child .jnext-curve-tb-row"=> array(
					"padding-left" => (( $attr['iconBgsize']  + ( $attr['iconborderwidth'] * 2 ) ) / 2) + 12 +  (10 -$attr['separatorwidth'] ) . 'px ',   
					"padding-right"=> 0
				),

				" .jn-ctb-content:first-child .jnext-curve-tb-row::after"  => array(
					"background-color" => $attr['Dot_Color'], 
				),

				" .jn-ctb-content:last-child .jnext-curve-tb-row::after"  => array(
					"background-color" => $attr['Dot_Color'], 
				),

				" .jn-ctb-content.jn_curve_tline_right"  => array(
					"padding-top" => $attr['verticalSpace'] . 'px', 
					"padding-bottom" => $attr['verticalSpace'] . 'px', 
					"border-width" =>  $attr['separatorwidth'].'px ' . $attr['separatorwidth'].'px ' .   $attr['separatorwidth'].'px ' . '0px'
				),

				" .jn-ctb-content.jn_curve_tline_left"  => array(
					"padding-top" => $attr['verticalSpace'] . 'px', 
					"padding-bottom" => $attr['verticalSpace'] . 'px', 
					"border-width" => self::get_css_value(  $attr['separatorwidth'] , 'px ' ) . "0px " . self::get_css_value(  $attr['separatorwidth'] , 'px ' ) . self::get_css_value(  $attr['separatorwidth'] , 'px ' ) 
				),

				" .jn-ctb-content:first-child" => array(
					"border-width" => "0px " . "0px " . self::get_css_value(  $attr['separatorwidth'] , 'px ' ) . self::get_css_value(  $attr['separatorwidth'] , 'px ' )
				),
		
				" .jn-ctb-content.jn_curve_tline_right:last-child" => array(
					"border-width" => self::get_css_value(  $attr['separatorwidth'] , 'px ' ) . self::get_css_value(  $attr['separatorwidth'] , 'px ' ) . "0px " . "0px "
				),
		
				" .jn-ctb-content.jn_curve_tline_left:last-child" => array(
					"border-width" => self::get_css_value(  $attr['separatorwidth'] , 'px ' ) . "0px " . "0px " . self::get_css_value(  $attr['separatorwidth'] , 'px ' )
				),

				" .jn-ctb-content.jn_curve_tline_left:last-child:first-child" => array(
					"border-width" => "0px " . "0px " . "0px " . self::get_css_value(  $attr['separatorwidth'] , 'px ' ) ,
					"border-radius" => 0 
				),

				" .jn-ctb-content.jn_curve_tline_left:last-child:first-child .jnext-curve-tb-row::before" => array(
					"width" => self::get_css_value(  ($attr['separatorwidth'] * 3), 'px ' ),
					"height" => self::get_css_value(  ($attr['separatorwidth'] * 3), 'px ' ),
					"left" => self::get_css_value( - ($attr['separatorwidth'] * 2), 'px ' ),
					"background-color" => $attr['Dot_Color'], 
				),

				" .jn-ctb-date-wrap .jn-ctb-time p" => array(
					"line-height" => self::get_css_value(  $attr['dateLineHeight'] , 'px ' ),
					"font-weight" => $attr['dateFontWeight'],
					"font-size" => self::get_css_value(  $attr['dateFontSize'] , 'px ' ), 
					"font-family" => !empty($attr['dateFontFamily']) ? $attr['dateFontFamily'][0] : '',  
					"color" => $attr['dateColor']    
				),
		
				" .jn-ctb-content.jn_curve_tline_right .jnext-curve-tb-row .jn-ctb-view-icon-wrap" => array(
					"right" =>  - (( $attr['iconBgsize'] + $attr['separatorwidth'] + ( $attr['iconborderwidth'] * 2 ) ) / 2) . 'px ',   
				),
		
				" .jn-ctb-content.jn_curve_tline_left .jnext-curve-tb-row .jn-ctb-view-icon-wrap" => array(
					"left" =>  - (( $attr['iconBgsize'] + $attr['separatorwidth'] + ( $attr['iconborderwidth'] * 2 ) ) / 2) . 'px ',   
				),

				" .jn-ctb-content:first-child .jnext-curve-tb-row:after" => array(
					"width" =>  ( $attr['separatorwidth'] * 3) . 'px ',    
					"height" =>  ( $attr['separatorwidth'] * 3) . "px",
					"left" =>  - ( $attr['separatorwidth'] * 2) . "px",
				),

				" .jn-ctb-content:last-child .jnext-curve-tb-row:after " => array(
					"width" =>  ( $attr['separatorwidth'] * 3) . 'px ',    
					"height" =>  ( $attr['separatorwidth'] * 3) . "px",
				),
		
				" .jn-ctb-content.jn_curve_tline_left:last-child .jnext-curve-tb-row:after" => array(
					"left" =>  - ( $attr['separatorwidth'] * 2) . "px", 
				),
		
				" .jn-ctb-content.jn_curve_tline_right:last-child .jnext-curve-tb-row:after" => array(
					"right" =>  - ( $attr['separatorwidth'] * 2) . "px", 
				),

				" .jn-ctb-content.jn_curve_tline_right:first-child .jnext-curve-tb-row .jn-ctb-view-icon-wrap" => array(
					"left" =>  - (( $attr['iconBgsize'] + $attr['separatorwidth'] + ( $attr['iconborderwidth'] * 2 ) ) / 2) . 'px ',   
				),
		
				" .jnext_curve_tb_detail .jn-ctb-view-icon-wrap"  => array(
					"background" => $attr['separatorBg'],
					"border-color" => $attr['separatorBorder'],
					"min-width" => self::get_css_value( $attr['iconBgsize'] , 'px ' ),  
					"min-height" => self::get_css_value( $attr['iconBgsize'], 'px ' ),    
					"border-width" => self::get_css_value( $attr['iconborderwidth'], 'px ' ),  
					"border-radius" => self::get_css_value(  $attr['iconborderradius'], 'px ' ),  
				),
		
				" .jnext_curve_tb_detail .jn-ctb-view-icon-wrap i"  => array(
					"color" => $attr['iconColor'],
				),
		
				" .jnext_curve_tb_detail .jn-ctb-view-icon-wrap img"  => array(
					"border-radius" => self::get_css_value(  $attr['iconborderradius'] , 'px ' ),  
				),

				" .jnext_curve_tb_detail .jn-ctb-view-icon-wrap .jn-ctb-ifb-icon"  => array(
					"font-size" => self::get_css_value(  $attr['iconSize'] , 'px ' ), 
				),
		
				" .jnext_curve_tb_detail .jn-ctb-view-icon-wrap .jn-ctb-ifb-icon img"  => array(
					"width" => self::get_css_value(  $attr['iconSize'] , 'px ' ), 
					"height" => self::get_css_value(  $attr['iconSize'] , 'px ' )
				),
				
			);

			$mobile_selectors = array(
				
			);

			$tablet_selectors = array(
			);

			$combined_selectors = array(
				'desktop' => array_merge($selectors, $selector),
				'tablet'  => $tablet_selectors,
				'mobile'  => $mobile_selectors,
			);

			$id  = '.jnext-ctb-con-tline.block-'. $id;
			$css = self::jnext_timeline_blocks_generate_all_css( $combined_selectors, $id );
			return $css;
		}

		public static function get_jnext_timeline_curve_child_block__css( $attr, $id ) {  
			$defaults = self::get_jnext_timeline_curve_child_block__css_default__attributes(); 
			$attr     = array_merge( $defaults, (array) $attr ); 
			$mobile_selectors = array();
			$tablet_selectors = array();
			$selector = array();

			$selectors = array(
				

			);

			$mobile_selectors = array(
			);

			$tablet_selectors = array(
			);

			$combined_selectors = array(
				'desktop' => array_merge($selectors, $selector),
				'tablet'  => $tablet_selectors,
				'mobile'  => $mobile_selectors,
			);

			$id  = '.jnext-tb--content.block-'. $attr['itemId'];
			$css = self::jnext_timeline_blocks_generate_all_css( $combined_selectors, $id );
			return $css;
		}

		/**
		 * Get Defaults for post content timeline block
		 *
		 * @return array
		 */
		public static function get_jnext_timeline_block_post_timeline_default_attributes() {

			return array(
				'itemBackgroundColor' => '#f7faff',
				'block_id' => 'not_set',
				'postTimelineLayout' => 'vertical',
				'post_slider_width_layout' => 'post_slider_width',
				'post_horizontal_ConBox_Width' => 300,
				'post_vertical_ConBox_Width' => 300,
				'categories' => '',
				'className' => '',
				'taxonomyType' => 'category',
				'postType' => 'post',
				'noOfPosts' => 6,
				'orderBy' => 'date',
				'order' => 'desc',
				'offset' => 0,
				'itemBorderRadius' => 5,
				'displayPostDate' => true,
				'displayPostExcerpt' => true,
				'excerptLength' => 55,
				'displayPostAuthor' => true,
				'displayPostImage' => true,
				'displayPostLink' => true,
				'displayPostTitle' => true,
				'displayTarget' => true,
				'imageSize' => 'full',
				'Blockalign' => 'center',
				'timelineAlignment' =>  'center',
				'arrowalignment' => 'center',
				'stack' => 'mobile',
				'iconType' => 'icon',
				'post_icon_image' => '',
				'icon' => '',
				'iconSize' => 12,
				'iconBackgroundSize' => 25,
				'iconBorderWidth' => 1,
				'iconBorderRadius' => 100,
				'sepratorWidth' => 3,
				'sepratorColor' => '#f7faff',
				'iconColor' => '#1f365c',
				'iconBackgroundColor' => '#f7faff',
				'iconBorderColor' => '#f7faff',
				'sepratorFocusColor' => '#f56742',
				'iconFocusColor' => '#fff',
				'iconFocusBackgroundColor' => '#f56742',
				'iconFocusBorderColor' => '#f56742',
				'itemPadding' => 15,
				'headingBottomSpace' => 10,
				'authorBottomSpace' => 10,
				'excerptBottomSpace' => 15,
				'verticalSpace' => 20,
				'horizontalSpace' => 0,
				'boxshadowColor' => '#9c9c9cc2',
				'boxshadowPosition' => 'outset',
				'boxshadowHorizontal' => 0,
				'boxshadowVertical' => 4,
				'boxshadowBlur' => 6,
				'boxshadowSpread' => 2,
				'dateFontfamily' => '',
				'dateFontsize' => 16,
				'dateFontweight' => 400,
				'dateLineheight' => 20,
				'dateColor' => '#1f365c',
				'headingFontfamily' => '',
				'headingFontsize' => 20,
				'headingFontweight' => 400,
				'headingLineheight' => 30,
				'headingColor' => '#1f365c',
				'authorFontfamily' => '',
				'authorFontsize' => 14,
				'authorFontweight' => 400,
				'authorLineheight' => 16,
				'authorColor' => '#1f365c',
				'contentFontfamily' => '',
				'contentFontsize' => 16,
				'contentFontweight' => 400,
				'contentLineheight' => 20,
				'contentColor' => '#1f365c',
				'readmoreText' => 'Read More',
				'readmoreFontfamily' => '',
				'readmoreFontsize' => 16,
				'readmoreFontweight' => 500,
				'readmoreLineheight' => 20,
				'readmoreBorderwidth' => 1,
				'readmoreColor' => '#fff',
				'readmoreBackgroundColor' => '#1f365c',
				'readmoreBorderColor' => '#1f365c',
				'readmoreHoverColor' => '#fff',
				'readmoreHoverBackgroundColor' => '#f56742',
				'readmoreHoverBorderColor' => '#f56742',
				// horizontal layout
				'jn_splide_h_PostToShow' => 2,
				'jn_splide_h_PostToScroll' => 1,
				'jn_splide_h_PostAutoplay' => false,
				'jn_splide_h_PostAutoplaySpeed' => 5000,
				'jn_splide_h_PostFade' => false,
				'jn_splide_h_PostSpeed' => 500,
				'jn_splide_h_PostArrows' => true,
				'jn_splide_h_PostDots' => false,
				'jnext_splide_h__PostIconSize' => 9,
				'jnext_splide_PostIconHeight' => 22,
				'jnext_splide_PostIconBgsize' => 35,
				'jnext_splide_PostIconborderwidth' => 3,
				'jnext_splide_PostIconborderradius' => 0,
				'jnext_splide_PostIconFillColor' => '#fff',
				'jnext_splide_PostFocus_BgColor' => '#1f365c',
				'jnext_splide_PostIconBorderFillColor' => '#1f365c',
				'jnext_splide_PostIconColor' => '#1f365c',
				'jnext_splide_PostBgColor' => '#fff',
				'jnext_splide_PostIconBorderColor' => '#1f365c',
				'jnext_splide_PostdotSize' => 10,
				'jnext_splide_Postdotradius' => 25,
				'jnext_splide_PostdotBgsize' => 10,
				'jnext_splide_Postdotborderwidth' => 3,
				'jnext_splide_Postdotborderradius' => 25,
				'jnext_splide_PostdotBGSpacing' => 0,
				'jnext_splide_PostdotFillColor' => '#1f365c',
				'jnext_splide_PostDotFocusBgColor' => 'transparent',
				'jnext_splide_PostdotBorderFillColor' => 'transparent',
				'jnext_splide_PostdotColor' => '#1f365c',
				'jnext_splide_PostdotBgColor' => 'transparent',
				'jnext_splide_PostdotBorderColor' => 'transparent',
				'jnext_splide_PostdotFocusOpacity' => 1,
				'jnext_splide_PostdotOpacity' => 0.75,
				'jnext_splide_h__PostbottomSpacing' => 20,
			);

		}

		/**
		 * Get Defaults for vertical Parent content timeline block
		 *
		 * @return array
		 */
		public static function get_jnext_timeline_block_default__attributes() {

			return array(
				'block_id'            => '',
				'timelineAlignment'   => 'center',
				'timelineItems'       => '',
				'ContentBoxWidth'     => 280,
				'dateFormat'          => 'F j, Y',
                'itemBorderStyle'     => '',
                'itemBorderColor'     => '',
                'itemBorderWidth'     => 1,
                'itemBorderRadius'    => 5,
                'itemPadding'         => 15,
                'horizontalSpace'     => 0,
                'verticalSpace'       => 15,
				'dateColor'   		  => '#1f365c',
				'headingColor'		  => '#1f365c',
				'contentColor'		  => '#1f365c',
				'backgroundColor'	  => '#f7faff',
				'counterId'			  => 1,
				'separatorColor'	  => '#f7faff',
				'iconColor'			  => '#1f365c',
				'separatorBg'		  => '#f7faff',
				'separatorBorder'	  => '#f7faff',
				'separatorFillColor'  => '#f56742',
				'iconFocus'			  => '#fff',
				'iconBgFocus'		  => '#f56742',
				'borderFocus'		  => '#f56742',
				'separatorwidth'	  => 3,
				'iconborderwidth'	  => 0,
				'iconborderradius'	  => 100,
				'iconBgsize'		  => 25,
				'iconSize'			  => 14,
				'icon'				  => '',
				'iconType'			  => 'icon',
				'icon_image'		  => '',
				'stack'				  => 'mobile',
				'arrowAlignment'	  => 'center',
				'headingFontFamily'	  => '',
				'headingBottomMargin'   => 15,
				'heading_Tag'       => 'h4',
				'headingLineHeight'	  => 30,
				'headingFontWeight'   => 600,
				'headingFontSize'     => 20,
				'contentFontFamily'	  => '',
				'contentLineHeight'     => 20,
				'contentFontWeight'      => 400,
				'contentFontSize'        => 16,
				'dateBottomspace'     => 5,
				'dateFontFamily'	  => '',
				'dateLineHeight'     => 20,
				'dateFontWeight'      => 400,
				'dateFontSize'        => 16,
				'dateBottomspace'     => 5,
				'appear_animation' => false,
				'appear_type' => '',
				'appear_duration' => 1000,
				'appear_delay' => 0
			);

		}

		/**
		 * Get Defaults for vertical Child content timeline block
		 *
		 * @return array
		*/
		public static function get_jnext_timeline_child_block_default__attributes() {
			return array(
				'itemId'            => 0,
			);
		}

		/**
		 * Get Defaults for Jnext Horizontal Content timeline Block
		 *
		 * @return array
		 */
		public static function get_jnext_horizontal_content_timeline_block_default_attributes() {

			return array(
				'block_id'            => '',
				'timelineAlignment'   => 'center',
				"Slider_width_layout" => "slider_width",
				'Horizontal_ConBox_Width'  => 300,
				'timelineItems'       => '',
				'dateFormat'          => 'F j, Y',
				'headingTag'          => 'h4',
				'dateBottomspace'     => 5,
                'itemBorderStyle'     => '',
                'itemBorderColor'     => '',
                'itemBorderWidth'     => 1,
                'itemBorderRadius'    => 5,
                'itemPadding'         => 15,
                'horizontalSpace'     => 0,
                'verticalSpace'       => 15,
                'headingBottomMargin' => 15,
                'dateLineHeight'      => 20,
				'headingFontFamily'   => '',
                'contentFontFamily'   => '',
				'dateFontFamily'	  => '',
				'dateFontWeight'	  => '400',
				'dateFontSize'		  => 16,
				'headingLineHeight'   => 30,
				'headingFontWeight'   => '600',
				'headingFontSize'     => 20,
				'dateColor'   		  => '#1f365c',
				'headingColor'		  => '#1f365c',
				'contentColor'		  => '#1f365c',
				'backgroundColor'	  => '#f7faff',
				'counterId'			  => 1,
				'contentLineHeight'	  => 20,
				'contentFontSize'	  => 16,
				'contentFontWeight'	  => '400',
				'separatorColor'	  => '#f7faff',
				'iconColor'			  => '#1f365c',
				'separatorBg'		  => '#f7faff',
				'separatorBorder'	  => '#f7faff',
				'separatorFillColor'  => '#f56742',
				'iconFocus'			  => '#fff',
				'iconBgFocus'		  => '#f56742',
				'borderFocus'		  => '#f56742',
				'separatorwidth'	  => 3,
				'iconborderwidth'	  => 0,
				'iconborderradius'	  => 100,
				'iconBgsize'		  => 25,
				'iconSize'			  => 14,
				'icon'				  => '',
				'iconType'			  => 'icon',
				'icon_image'		  => '',
				'stack'				  => 'mobile',
				'arrowAlignment'	  => 'center',
				'jnext_splide_slideToShow' => 2,
				'jnext_splide_slideToScroll' => 1,
				'jnext_splide_autoplay' => false,
				'jnext_splide_autoplaySpeed' => 0,
				'jnext_splide_fade' => false,
				'jnext_splide_Speed' => 0,
				'jnext_splide_arrows' => true,
				'jnext_splide_dots' => false,
				'jnext_splide_iconSize' => 12,
				'jnext_splide_iconHeight' => 22,
				'jnext_splide_iconBgsize' => 35,
				'jnext_splide_iconborderwidth' => 3,
				'jnext_splide_iconborderradius' => 0,
				'jnext_splide_iconFillColor' => '#fff',
				'jnext_splide_Focus_BgColor' => '#1f365c',
				'jnext_splide_iconBorderFillColor' => '#1f365c',
				'jnext_splide_iconColor' => '#1f365c',
				'jnext_splide_BgColor' => '#fff',
				'jnext_splide_iconBorderColor' => '#1f365c',
				'jnext_splide_dotSize' => 10,
				'jnext_splide_dotradius' => 25,
				'jnext_splide_dotBgsize' => 10,
				'jnext_splide_dotborderwidth' => 3,
				'jnext_splide_dotborderradius' => 25,
				'jnext_splide_dotBGSpacing' => 0,
				'jnext_splide_dotFillColor' => '#1f365c',
				'jnext_splide_Focus_dotBgColor' => 'transparent',
				'jnext_splide_dotBorderFillColor' => 'transparent',
				'jnext_splide_dotColor' => '#1f365c',
				'jnext_splide_dotBgColor' => 'transparent',
				'jnext_splide_dotBorderColor' => 'transparent',
				'jnext_splide_dotFocusOpacity' => 1,
				'jnext_splide_dotOpacity' => 0.75,
				'jnext_splide_sliderBottomSpacing' => 20,
			);

		}

		/**
		 * Get Defaults for Jnext Curve timeline Block
		 *
		 * @return array
		 */
		public static function get_jnext_timeline_curve_block__css_default__attributes() {

			return array( 
				'block_id'            => '', 
				'timelineItems'       => '',
				'ContentBoxWidth'     => 280,
				'dateFormat'          => 'F j, Y',
                'itemBorderStyle'     => '',
                'itemBorderColor'     => '',
                'itemBorderWidth'     => 1,
                'itemBorderRadius'    => 16,
                'itemPadding'         => 18,
                'horizontalSpace'     => 0,
                'verticalSpace'       => 26,
				'dateColor'   		  => '#1f365c',
				'headingColor'		  => '#1f365c',
				'contentColor'		  => '#1f365c',
				'backgroundColor'	  => '#f7faff',
				'counterId'			  => 1,
				'separatorColor'	  => '#f56742',
				'iconColor'			  => '#FFFFFF',
				'separatorBg'		  => '#f56742',
				'separatorBorder'	  => '#f56742', 
				'Dot_Color'	  => '#000', 
				'separatorwidth'	  => 3,
				'iconborderwidth'	  => 0,
				'iconborderradius'	  => 100,
				'iconBgsize'		  => 25,
				'iconSize'			  => 14,
				'icon'				  => '',
				'iconType'			  => 'icon',
				'icon_image'		  => '',
				'stack'				  => 'mobile', 
				'headingFontFamily'	  => '',
				'headingBottomMargin'   => 8,
				'heading_Tag'       => 'h4',
				'headingLineHeight'	  => 30,
				'headingFontWeight'   => 600,
				'headingFontSize'     => 20,
				'contentFontFamily'	  => '',
				'contentLineHeight'     => 20,
				'contentFontWeight'      => 400,
				'contentFontSize'        => 16,
				'dateBottomspace'     => 5,
				'dateFontFamily'	  => '',
				'dateLineHeight'     => 20,
				'dateFontWeight'      => 400,
				'dateFontSize'        => 16,
				'dateBottomspace'     => 5,
				'appear_animation' => false,
				'appear_type' => '',
				'appear_duration' => 1000,
				'appear_delay' => 0
			);

		}

		/**
		 * Get Defaults for Jnext Curve timeline Block
		 *
		 * @return array
		 */
		public static function get_jnext_timeline_curve_child_block__css_default__attributes() {
			return array(
				'itemId'            => 0,
			);
		}

		/**
		 * Parse CSS into correct CSS syntax.
		 *
		 * @param array  $combined_selectors The combined selector array.
		 * @param string $id The selector ID.
		 */
		public static function jnext_timeline_blocks_generate_all_css( $combined_selectors, $id ) {

			return array(
				'desktop' => self::jnext_timeline_blocks_generate_css( $combined_selectors['desktop'], $id ),
				'tablet'  => self::jnext_timeline_blocks_generate_css( $combined_selectors['tablet'], $id ),
				'mobile'  => self::jnext_timeline_blocks_generate_css( $combined_selectors['mobile'], $id ),
			);

		}

		/**
		 * Parse CSS into correct CSS syntax.
		 *
		 * @param array  $selectors The block selectors.
		 * @param string $id The selector ID.
		 */
		public static function jnext_timeline_blocks_generate_css( $selectors, $id ) {

			$styling_css = '';

			if ( empty( $selectors ) ) {
				return '';
			}

			foreach ( $selectors as $key => $value ) {

				$css = '';
				foreach ( $value as $j => $val ) {

					if ( 'font-family' === $j && 'Default' === $val ) {
						continue;
					}

					if ( ! empty( $val ) || 0 === $val ) {
						if ( 'font-family' === $j ) {
							$css .= $j . ': "' . $val . '";';
						} else {
							$css .= $j . ': ' . $val . ';';
						}
					}
				}

				if ( ! empty( $css ) ) {
					$styling_css .= $id;
					$styling_css .= $key . '{';
					$styling_css .= $css . '}';
				}
			}

			return $styling_css;

		}

		/**
		 * Get CSS value
		 *
		 * @param string $value  CSS value.
		 * @param string $unit  CSS unit.
		 */
		public static function get_css_value( $value = '', $unit = '' ) {

			if ( '' == $value ) { // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
				return $value;
			}

			$css_val = '';

			if ( 0 === $value ) {
				$css_val = 0;
			}

			if ( ! empty( $value ) ) {
				$css_val = esc_attr( $value ) . $unit;
			}

			return $css_val;
			
		}
    }

	Jnext_timeline_blocks_Frontend_styles::get_instance();
}