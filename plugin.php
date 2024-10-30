<?php
/**
 * Plugin Name: gutenberg-timeline-blocks
 * Plugin URI: https://www.jnext.co.in/
 * Description: gutenberg-timeline-blocks — Responsive timeline blocks for gutenberg editor.
 * Author: JNext Services Pvt Ltd
 * Version: 1.1.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'JNEXT_TIMELINE_BLOCKS__FILE__', __FILE__ );
define( 'JNEXT_TIMELINE_BLOCK_URL', trailingslashit( plugin_dir_url( __FILE__ ) ) );
define( 'JNEXT_TIMELINE_BLOCK_DIR', trailingslashit( plugin_dir_path( __FILE__ ) ) );

define( 'JNEXT_TIMELINE_BLOCK_ROOT_DIR', trailingslashit( plugin_dir_path( __FILE__ ) ) );

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';