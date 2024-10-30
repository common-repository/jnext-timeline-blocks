<?php
/**
 * Plugin Name: gutenberg-timeline-blocks
 * Plugin URI: https://www.jnext.co.in/
 * Description: gutenberg-timeline-blocks — Responsive timeline blocks for gutenberg editor.
 * Author: JNext Services Pvt Ltd
 * Version: 1.2.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:  gutenberg-timeline-blocks
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define('JNEXT_TIMELINE_BLOCK_DIR', plugin_dir_path(__FILE__));
define('JNEXT_TIMELINE_BLOCKS_VERSION', '1.0.0');
define( 'JNEXT_TIMELINE_BLOCKS__FILE__', __FILE__ );
define( 'JNEXT_TIMELINE_BLOCK_URL', trailingslashit( plugin_dir_url( __FILE__ ) ) );
define( 'JNEXT_TIMELINE_BLOCK_ROOT_DIR', trailingslashit( plugin_dir_path( __FILE__ ) ) );

require_once JNEXT_TIMELINE_BLOCK_DIR . 'class-block-assets.php';
require_once JNEXT_TIMELINE_BLOCK_DIR . 'src/fonts/GoogleFonts.php';
require_once JNEXT_TIMELINE_BLOCK_DIR . 'classes/class-jnext-timeline-blocks-frontend-styles.php';

add_action('init', 'register_blocks', 100, 9);
function register_blocks()
{
	$jnblocks_Block_Assets = new jnblocks_Block_Assets();
	$dirs = $jnblocks_Block_Assets->getListofBlocks();
	
	if ($dirs) {
	
		foreach ($dirs as $block) {

			$fileUrl = str_replace("\\", "/", addcslashes(str_replace(substr(strrchr(JNEXT_TIMELINE_BLOCK_DIR, '/'), 1), '', substr($block, strrpos(JNEXT_TIMELINE_BLOCK_DIR, '/') + 1)), "\f\r\n\t"));
			
			if ($block) {
				$registerfile = JNEXT_TIMELINE_BLOCK_DIR . $fileUrl . '/register.php';
				if (file_exists($registerfile)) {
					require_once($registerfile);
				}
			}

		}
	}
}