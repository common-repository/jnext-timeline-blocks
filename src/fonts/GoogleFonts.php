<?php
/**
 * Php file for google fonts.
 *
 * @package category
*/

/**
 * Add google fonts funtion.
 *
 * @return void
 */
function jnext_timeline_blocks_add_google_fonts() {
	global $post;
	if ( is_object( $post ) && property_exists( $post, 'post_content' ) ) {
		$jtb__blocks       = parse_blocks( $post->post_content );
		$jtb_google_fonts = jnext_timeline_blocks_gather_google_fonts( $jtb__blocks );

		if ( count( $jtb_google_fonts ) ) {
			foreach ( $jtb_google_fonts as $jtb_font ) {
				$jtb_font = str_replace( ' ', '+', $jtb_font[0] ) . ':100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic';
			}
			$jtb_fonts_url = sprintf( 'https://fonts.googleapis.com/css?family=%s', implode( rawurlencode( '|' ), $jtb_google_fonts ) );
			wp_register_style( 'jnext-timeline-blocks-google-fonts', $jtb_fonts_url, array(), null );
			wp_enqueue_style( 'jnext-timeline-blocks-google-fonts' ); //phpcs:ignore
		}
	}
}
add_action( 'enqueue_block_assets', 'jnext_timeline_blocks_add_google_fonts' );

/**
 * Function to gather google fonts.
 *
 * @param [type] $blocks The blocks.
 * @return [type]
 */
function jnext_timeline_blocks_gather_google_fonts( $jtb__blocks ) {
	$jtb_google_fonts = array();
	foreach ( $jtb__blocks as $jtb__block ) {

		// Gather all "fontFamily" attribute values.
		foreach ( $jtb__block['attrs'] as $attr_name => $jtb_font_name ) {
			if ( preg_match( '/fontFamily$/i', $attr_name ) ) {
				
				if ( ! in_array( $jtb_font_name, $jtb_google_fonts ) ) { //phpcs:ignore
					// $jtb_google_fonts[] = $jtb_font_name;
					array_push($jtb_google_fonts, $jtb_font_name[0]);
				}
			}
		}

		// Look for fonts in inner blocks.
		if ( ! empty( $jtb__block['innerBlocks'] ) ) {
			$jtb_google_fonts = array_unique( array_merge( $jtb_google_fonts, jnext_timeline_blocks_gather_google_fonts( $jtb__block['innerBlocks'] ) ) );			
		}
	}
	return $jtb_google_fonts;
}
