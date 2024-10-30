/**
 * BLOCK: jnext-timeline-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.blockEditor;

const blockProps = {
	containerMaxWidth: {
		type: 'number',
		default: 1170,
	},
};

import Edit from './edit';
import Save from './save';

export const defaultBlocks = JSON.stringify([
	{
		title: __('Jnext Timeline Blocks', 'jnext-timeline-blocks'),
		description: __('Jnext Timeline Blocks is wordpress plugin', 'jnext-timeline-blocks'),
		time: __('26 August, 2020', 'jnext-timeline-blocks'),
		key: new Date().getTime() + 1,
		jtbImage: 'none',
		jtbBgColor: '#fff',
		jtbTextColor: '#000',
		order: 1,
		index: 0,
		id: 0,
		position: 0
	},
	{
		title: __('Add Title here', 'jnext-timeline-blocks'),
		description: __('This is Timeline description, you can change me anytime click here...', 'jnext-timeline-blocks'),
		time: __('26 August, 2020', 'jnext-timeline-blocks'),
		key: new Date().getTime() + 1,
		jtbImage: 'none',
		jtbBgColor: '#fff',
		jtbTextColor: '#000',
		order: 2,
		index: 1,
		id: 1,
		position: 1
	}
]);

export const getStyles = attributes => {

	const wrapperStyles = {
		maxWidth: `${attributes.containerMaxWidth === '100%' ? '100%' : attributes.containerMaxWidth + 'px'}`,
		'--maxWidth': `${attributes.containerMaxWidth === '100%' ? '100wh' : attributes.containerMaxWidth + ' '} `,
	};

	return {
		wrapperStyles,
	};

};

import { JnextContentTIcon } from '../../components/icons/icons';

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
registerBlockType('jnext-timeline-blocks/jnext-content-timeline', {

	title: __('Jnext Content Timeline'),
	icon: JnextContentTIcon,
	category: 'common',
	keywords: [
		__('Jnext Content Timeline', 'jnext-timeline-blocks'),
		__('timeline-block', 'jnext-timeline-blocks'),
		__('timeline', 'jnext-timeline-blocks'),
		__('event timeline', 'jnext-timeline-blocks'),
	],
	html: true,
	attributes: {
		...blockProps,
		block_id: {
			type: 'string',
		},
		timelineLayout: {
			type: "string",
			default: "vertical",
		},
		timelineAlignment: {
			type: "string",
			default: "center",
		},
		timelineItems: {
			type: "array",
			default: [],
		},
		dateFormat: {
			type: "string",
			default: "F j, Y",
		},
		headingTag: {
			type: "string",
			default: 'h4',
		},
		dateBottomspace: {
			type: "number",
			default: 5,
		},
		itemBorderStyle: {
			type: "string",
			default: "none",
		},
		itemBorderColor: {
			type: "string",
		},
		itemBorderWidth: {
			type: "number",
			default: 1,
		},
		itemBorderRadius: {
			type: "number",
			default: 5,
		},
		itemPadding: {
			type: "number",
			default: 20,
		},
		horizontalSpace: {
			type: "number",
			default: 0,
		},
		verticalSpace: {
			type: "number",
			default: 15,
		},
		headingBottomMargin: {
			type: "number",
			default: 15,
		},
		dateLineHeight: {
			type: "number",
			default: 20,
		},
		contentFontFamily: {
			type: "string",
		},
		headingFontFamily: {
			type: "string",
		},
		dateFontFamily: {
			type: "string",
		},
		dateFontWeight: {
			type: "string",
			default: "400",
		},
		dateFontSize: {
			type: "number",
			default: 16,
		},
		headingLineHeight: {
			type: "number",
			default: 30,
		},
		headingFontWeight: {
			type: "string",
			default: "600",
		},
		headingFontSize: {
			type: "number",
			default: 20,
		},
		dateColor: {
			type: "string",
			default: "#1f365c",
		},
		headingColor: {
			type: "string",
			default: "#1f365c",
		},
		contentColor: {
			type: "string",
			default: "#1f365c",
		},
		backgroundColor: {
			type: "string",
			default: "#f7faff",
		},
		counterId: {
			type: "string",
			default: 1,
		},
		contentLineHeight: {
			type: "number",
			default: 20,
		},
		contentFontSize: {
			type: "number",
			default: 16,
		},
		contentFontWeight: {
			type: "string",
			default: "400",
		},
		separatorColor: {
			type: "string",
			default: "#f7faff",
		},
		iconColor: {
			type: "string",
			default: "#1f365c",
		},
		separatorBg: {
			type: "string",
			default: "#f7faff",
		},
		separatorBorder: {
			type: "string",
			default: "#f7faff",
		},
		separatorFillColor: {
			type: "string",
			default: "#f56742",
		},
		iconFocus: {
			type: "string",
			default: "#fff",
		},
		iconBgFocus: {
			type: "string",
			default: "#f56742",
		},
		borderFocus: {
			type: "string",
			default: "#f56742",
		},
		separatorwidth: {
			type: "number",
			default: 3,
		},
		iconborderwidth: {
			type: "number",
			default: 0,
		},
		iconborderradius: {
			type: "number",
			default: 100,
		},
		iconBgsize: {
			type: "number",
			default: 25,
		},
		iconSize: {
			type: "number",
			default: 20,
		},
		icon: {
			type: "string",
			default: "",
		},
		stack: {
			type: "string",
			default: "mobile",
		},
		arrowAlignment: {
			type: "string",
			default: "center",
		},
		isFirstLoad: {
			type: 'boolean',
			default: true,
		},
		jnext_s_lick_slideToShow: {
			type: 'number',
			default: 2,
		},
		jnext_s_lick_slideToScroll: {
			type: 'number',
			default: 1,
		},
		jnext_s_lick_autoplay: {
			type: 'boolean',
			default: false,
		},
		jnext_s_lick_autoplaySpeed: {
			type: 'number',
			default: 5000,
		},
		jnext_s_lick_fade: {
			type: 'boolean',
			default: false,
		},
		jnext_s_lick_Speed: {
			type: 'number',
			default: 500,
		},
		jnext_s_lick_arrows: {
			type: 'boolean',
			default: true,
		},
		jnext_s_lick_dots: {
			type: 'boolean',
			default: false,
		},
		jnext_s_lick_iconSize: {
			type: 'number',
			default: 9,
		},
		jnext_s_lick_iconHeight: {
			type: 'number',
			default: 22,
		},
		jnext_s_lick_iconBgsize: {
			type: 'number',
			default: 35,
		},
		jnext_s_lick_iconborderwidth: {
			type: 'number',
			default: 3,
		},
		jnext_s_lick_iconborderradius: {
			type: 'number',
			default: 0,
		},
		jnext_s_lick_iconFillColor: {
			type: 'string',
			default: '#fff',
		},
		jnext_s_lick_Focus_BgColor: {
			type: 'string',
			default: '#1f365c',
		},
		jnext_s_lick_iconBorderFillColor: {
			type: 'string',
			default: '#1f365c',
		},
		jnext_s_lick_iconColor: {
			type: 'string',
			default: '#1f365c',
		},
		jnext_s_lick_BgColor: {
			type: 'string',
			default: '#fff',
		},
		jnext_s_lick_iconBorderColor: {
			type: 'string',
			default: '#1f365c',
		},
		jnext_s_lick_dotSize: {
			type: 'number',
			default: 10,
		},
		jnext_s_lick_dotradius: {
			type: 'number',
			default: 25,
		},
		jnext_s_lick_dotBgsize: {
			type: 'number',
			default: 10,
		},
		jnext_s_lick_dotborderwidth: {
			type: 'number',
			default: 3,
		},
		jnext_s_lick_dotborderradius: {
			type: 'number',
			default: 25,
		},
		jnext_s_lick_dotBGSpacing: {
			type: 'number',
			default: 0,
		},
		jnext_s_lick_dotFillColor: {
			type: 'string',
			default: '#1f365c',
		},
		jnext_s_lick_Focus_dotBgColor: {
			type: 'string',
			default: 'transparent',
		},
		jnext_s_lick_dotBorderFillColor: {
			type: 'string',
			default: 'transparent',
		},
		jnext_s_lick_dotColor: {
			type: 'string',
			default: '#1f365c',
		},
		jnext_s_lick_dotBgColor: {
			type: 'string',
			default: 'transparent',
		},
		jnext_s_lick_dotBorderColor: {
			type: 'string',
			default: 'transparent',
		},
		jnext_s_lick_dotFocusOpacity: {
			type: 'number',
			default: 1,
		},
		jnext_s_lick_dotOpacity: {
			type: 'number',
			default: 0.75,
		},
		jnext_s_lick_sliderBottomSpacing: {
			type: 'number',
			default: 20,
		}
	},
	example: {
		attributes: {
			'preview': true,
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: (props) => {

		if (props.attributes.timelineItems.length === 0 && props.attributes.isFirstLoad) {
			props.setAttributes({
				timelineItems: [...JSON.parse(defaultBlocks)],
				isFirstLoad: false,
			});

			// TODO It is very bad solution to avoid low speed working of setAttributes function
			props.attributes.timelineItems = JSON.parse(defaultBlocks);
			if (!props.attributes.block_id) {
				props.setAttributes({
					block_id: new Date().getTime(),
				});
			}
		}

		return (<Edit {...props} />);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: (props) => {

		return (<Save {...props} />);

	},

});
