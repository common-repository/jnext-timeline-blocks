<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */

define( 'JNEXT_TIMELINE_BLOCK', WP_PLUGIN_DIR . '/jnext-timeline-blocks' );

/**
 * Load custom style for frontend design
 * Load block file for use save and add attributes
 *
 * @since 1.0.0
 */
require JNEXT_TIMELINE_BLOCK . '/classes/class-jnext-timeline-blocks-frontend-styles.php';
require JNEXT_TIMELINE_BLOCK_DIR . 'src/block/jnext-post-timeline/block.php';

function jnext_timeline_blocks_assets() { 

	// Register block styles for both frontend + backend.
	wp_register_style(
		'jnext_timeline_blocks-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		is_admin() ? array( 'wp-editor' ) : null, // Dependency to include the CSS after it.
		null 
	);

	// Register block editor script for backend.
	wp_register_script(
		'jnext_timeline_blocks-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'lodash', 'react', 'react-dom', 'wp-api-fetch', 'wp-blob', 'wp-block-editor', 'wp-blocks', 'wp-components', 'wp-compose', 'wp-data', 'wp-date', 'wp-dom-ready', 'wp-edit-post', 'wp-editor', 'wp-element', 'wp-hooks', 'wp-i18n', 'wp-keycodes', 'wp-plugins', 'wp-polyfill', 'wp-rich-text', 'wp-token-list', 'wp-url', 'jquery' ), // Dependencies, defined above.
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true
	);
	
	// localize script for used to get taxanomy in js file

	// Pass in REST URL.
	wp_localize_script(
		'jnext_timeline_blocks-js',
		'responsive_globals',
		array(
			'is_wpe'                             => function_exists( 'is_wpe' ),
			'all_taxonomy'                       => get_related_taxonomy(),
			'jnext_timeline_block_ajax_nonce'    => wp_create_nonce( 'jnext_timeline_block_ajax_nonce' ),
		)
	);

	// Register block editor styles for backend.
	wp_register_style(
		'jnext_timeline_blocks-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		null // Version: File modification time.
	);

	wp_enqueue_style('jnext-timeline-block-s_lick-theme-css', JNEXT_TIMELINE_BLOCK_URL . 'src/components/jnextBlock_s_lick-theme.css');
	wp_enqueue_style('jnext-timeline-block-s_lick-css', JNEXT_TIMELINE_BLOCK_URL . 'src/components/jnextBlock_s_lick.css');
	
	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
		'jnext-timeline-blocks/jnext-content-timeline', array(
			'style'         => 'jnext_timeline_blocks-css',// Enqueue blocks.style.build.css on both frontend & backend.
			'editor_script' => 'jnext_timeline_blocks-js',// Enqueue blocks.build.js in the editor only.
			'editor_style'  => 'jnext_timeline_blocks-editor-css',// Enqueue blocks.editor.build.css in the editor only.
		)
	);
	

}
add_action( 'init', 'jnext_timeline_blocks_assets' );

/**
 * load style at admin side
 *
 * @since 1.0.0
 */
function jnext_timeline_blocks_admin_assets(){
	wp_enqueue_style(
		'jnext_timeline_blocks_jnext-admin-common-block-editor',
		plugins_url( 'admin/jnext-admin-common-block-editor.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		null
	);
	wp_enqueue_script('jnext-timeline-block-s_lick-js', JNEXT_TIMELINE_BLOCK_URL . 'src/components/jnextBlock_s_lick.js');
	
}
add_action( 'admin_init',  'jnext_timeline_blocks_admin_assets');

/**
 * load Goggle Fonts
 *
 * @since 1.0.0
 */
function jnext_timeline_blocks_loader(){
	require_once JNEXT_TIMELINE_BLOCK_DIR . 'src/fonts/GoogleFonts.php';
}
add_action( 'plugins_loaded',  'jnext_timeline_blocks_loader');

/**
 * load styles at frontend side
 *
 * @since 1.0.0
 */
function jnext_timeline_blocks_frontend_assets() {

	wp_enqueue_style(
		'jnext-timeline-blocks-editor-css',
		plugins_url( 'admin/jnext-timeline-blocks-editor.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		null
	);

	if( !is_admin() ) {
		// Script.
		wp_enqueue_script(
			'jnext_timeline_blocks-frontend', // Handle.
			JNEXT_TIMELINE_BLOCK_URL . 'src/block/jnext-content-timeline/frontend.js', // frontend style js.
			array( 'jquery' ), 
		);

		wp_enqueue_script(
			'jnext_post_timeline_blocks-frontend', // Handle.
			JNEXT_TIMELINE_BLOCK_URL . 'src/block/jnext-post-timeline/frontend.js', // frontend style js.
			array( 'jquery' ), 
		);
		
		wp_enqueue_script('jnext-timeline-block-frontend-s_lick-js', JNEXT_TIMELINE_BLOCK_URL . 'src/components/jnextBlock_s_lick.js', array('jquery'));
	}
}
add_action( 'enqueue_block_assets', 'jnext_timeline_blocks_frontend_assets' );

/**
 * Get Post Types.
 *
 * @since 1.0.0
 */
function get_posts_types() {

	$post_types = get_post_types(
		array(
			'public'       => true,
			'show_in_rest' => true,
		),
		'objects'
	);

	$options = array();

	foreach ( $post_types as $post_type ) {
		
		if ( 'product' === $post_type->name ) {
			continue;
		}

		if ( 'attachment' === $post_type->name ) {
			continue;
		}

		$options[] = array(
			'value' => $post_type->name,
			'label' => $post_type->label,
		);
		
	}

	return $options;
}

/**
 * Get all taxonomies.
 *
 * @since 1.0.0
 */
function get_related_taxonomy() {

	$post_types = get_posts_types();

	$return_array = array();

	foreach ( $post_types as $key => $value ) {
		$post_type = $value['value'];

		$taxonomies = get_object_taxonomies( $post_type, 'objects' );
		$data       = array();

		foreach ( $taxonomies as $tax_slug => $tax ) {
			if ( ! $tax->public || ! $tax->show_ui || ! $tax->show_in_rest ) {
				continue;
			}

			$data[ $tax_slug ] = $tax;

			$terms = get_terms( $tax_slug );

			$related_tax = array();

			if ( ! empty( $terms ) ) {
				foreach ( $terms as $t_index => $t_obj ) {
					$related_tax[] = array(
						'id'   => $t_obj->term_id,
						'name' => $t_obj->name,
					);
				}

				$return_array[ $post_type ]['terms'][ $tax_slug ] = $related_tax;
			}
		}

		$return_array[ $post_type ]['taxonomy'] = $data;
	}
	
	return $return_array;
}