/**
 * BLOCK: jnext-post-timeline
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';


const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

import edit from './edit';
import { JnextPostTIcon } from '../../components/icons/icons';

// Register alignments
const validBlockAlignments = ["center", "wide", "full"];

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'jnext-timeline-blocks/jnext-post-timeline', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Jnext Post Timeline' ), // Block title.
	icon: JnextPostTIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Jnext Post Timeline', 'jnext-timeline-blocks' ),
		__( 'timeline', 'jnext-timeline-blocks' ),
		__( 'post', 'jnext-timeline-blocks' ),
		__( 'Post', 'jnext-timeline-blocks' ),
		__( 'Post Timeline', 'jnext-timeline-blocks' )
	],

	getEditWrapperProps(attributes) {
		const { Blockalign } = attributes;
		if (-1 !== validBlockAlignments.indexOf(Blockalign)) {
		  return { "data-align": Blockalign };
		}
	},

	edit,

	/**
	 * Save via PHP
	 */
	save: ( ) => {
		return null;
	},
} );
