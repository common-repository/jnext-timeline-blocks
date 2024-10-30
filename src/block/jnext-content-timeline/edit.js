/**
 * Jnext Content Timeline Block Control
 */
import classnames from "classnames";
import IconRender from "../../Icons/IconRender";
import JnextBlocksIcons from "../../Icons/JnextBlocksIcons.json";
import { getStyles } from './block';
import { arrayMove, SortableContainer, SortableElement } from 'react-sortable-hoc';
import { AddMoreBlock, ArrowNext, ArrowPrev } from '../../components/icons/icons';
import ContentTimelineClasses, { JnextDayAlignClass, jnextAlignClass } from "../../components/jnext-timeline-classes";
import JnextBlockInspector from './JnextBlockInspector';
import JnextBlockStyles from './jnext-block-styles';
import * as timelineConnector from "./timelineConnector";

/**
 * Setup blocks from wordpress
 */
const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component, Fragment, useState  } = wp.element;

/**
 * Import block components
 */
const { RichText, MediaUpload } = wp.blockEditor;
/**
 * Import inspector components
 */
const { Button } = wp.components;

let jtb_key = 0;
let jnextblockicons = Object.keys(JnextBlocksIcons);

/**
  * Provides the initial data for new block
  */
export const defaultJnextItem = {
    title: __( '', 'jnext-timeline-blocks' ),
    description: __( '', 'jnext-timeline-blocks' ),
    time:'',
    jtbImage:'none',
    jtbBgColor:'#fff',
    jtbTextColor:'#000',
    order:0
};

/**
 * Executes the edit container
 * @param {Object} props from editor
 * @return {Node} rendered edit component
 * @constructor
 */
 export const ContainerEdit = ( props ) => {
    const styles = {};
    return (
        <div
            className={ `${ props.className } ${ props.attributes.timelineAlignment } ` }
            style={ { ...styles, ...props.style } }
        >
            { props.children }
        </div>
    );
};

/**
 * @param {Object} props - attributes
 * @returns {Node} rendered component
 */
export default class Edit extends Component {
    constructor(props) {
        super(...arguments);
    }    
    
    componentDidMount() {
        
        //Store client id.
        this.props.setAttributes({ block_id: this.props.clientId });
        this.props.setAttributes({ classMigrate: true });
    
        var id = this.props.clientId;
                
        window.addEventListener("load", timelineConnector.jnextTimelineContent_back(id));
        window.addEventListener("resize", timelineConnector.jnextTimelineContent_back(id));
        window.addEventListener("scroll", timelineConnector.jnextTimelineContent_back(id));

        // Pushing Style tag for this block css.
        const $style = document.createElement("style");
        $style.setAttribute(
          "id",
          "jnext-content-timeline-style-" +
            this.props.clientId
        );
        document.head.appendChild($style);
    }
    
    componentDidUpdate(prevProps, prevState) {
        
        var id = this.props.clientId;
        var element = document.getElementById(
            "jnext-content-timeline-style-" +
            this.props.clientId
        );
        if (null !== element && undefined !== element) {
            element.innerHTML = JnextBlockStyles(this.props);
        }

        window.addEventListener("load", timelineConnector.jnextTimelineContent_back(id));
        window.addEventListener("resize", timelineConnector.jnextTimelineContent_back(id));
        window.addEventListener("scroll", timelineConnector.jnextTimelineContent_back(id));
    }

    /**
     * Add a new item to list with default fields
     */
    jtbaddItem = () => {
        jtb_key++;
        this.props.setAttributes( {
            timelineItems: [ ...this.props.attributes.timelineItems, {
                ...defaultJnextItem,
                key: 'new ' + new Date().getTime(),
            } ],
        } );
        timelineConnector.jnextTimelineContent_back(this.props.clientId);
    };

    /**
     * Change any property of block
     * @param {string} property - editable field
     * @param {string} value - for field
     * @param {number} index - of blocks array
     * @param {boolean} withMutation - in some cases we should avoid mutation for force rerender component
     */
    onChangePropertyItem = ( property, value, index, withMutation = false ) => {
        const timelineItems = withMutation ? [ ...this.props.attributes.timelineItems ] : this.props.attributes.timelineItems;
        if ( ! timelineItems[ index ] || typeof timelineItems[ index ][ property ] !== 'string' ) {
            return;
        }
        timelineItems[ index ][ property ] = value;
        this.props.setAttributes( { timelineItems: timelineItems } );
        wp.data.dispatch('core/editor').editPost({meta: {_non_existing_meta: true}});
    };

    onChangejtbImgItem = ( property, value, index, withMutation = false ) => {
        const timelineItems = withMutation ? [ ...this.props.attributes.timelineItems ] : this.props.attributes.timelineItems;
        if ( ! timelineItems[ index ] || typeof timelineItems[ index ][ property ] !== 'string' ) {
            return;
        }
        if(value.url!==undefined){
            timelineItems[ index ][ property ] = value.url;
        }else{
            timelineItems[ index ][ property ] =value;
        }
        if(value.alt!==undefined){
            timelineItems[ index ]['alt'] =value.alt;
        }
        this.props.setAttributes( { timelineItems: timelineItems } );
    };

    /**
     * Remove Block
     * It also add default block if we remove all elements from array
     * @param {number} index - of block
     */
    jtb_removeItem = ( index ) => {
        const timelineItems = [ ...this.props.attributes.timelineItems ];
        if ( timelineItems.length === 1 ) {
            this.props.setAttributes( { timelineItems: [ defaultJnextItem ] } );
        } else {
            timelineItems.splice( index, 1 );
            this.props.setAttributes( { timelineItems: timelineItems } );
        }
        timelineConnector.jnextTimelineContent_back(this.props.clientId);
    };

    render() {
        
        const {
            className,
            attributes,
            setAttributes,
            isSelected,
        } = this.props;

        const Lists = () => {

            var id = this.props.clientId;

            const [listData, setJnextTbListData] = useState([]);

            const SortableItem = SortableElement(({ value, blockIndex }) => (
                <div
                    key={ value.key }
                    className="jnext-timeline-content"
                    data-order={blockIndex}
                    id={blockIndex}
                >
                    <div className={jnextAlignClass(attributes, blockIndex)}>
                        <button className="block-remove dashicons dashicons-no" onClick={ () => this.jtb_removeItem( blockIndex ) }>
                        
                        </button>
                        <div className="timeline-moveicons" />
                        { ( blockIndex + 1 ) % 2 !== 0 ? (
                                <div className="jtb-row">
                                    { attributes.timelineAlignment != 'center' && attributes.timelineLayout != 'horizontal' ? (
                                        <div className="jtb_timeline_blocks_detail jtb_timeline_blocks_one_sided_detail">
                                            { JnextTbIcon( value, blockIndex ) }
                                            <div className="jtb-day-detail">
                                                <div className="jtb-one-sided_inner_block">
                                                    { JnextTbTime( value, blockIndex ) }
                                                    { JnextTbDetail( value, blockIndex ) }
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="jtb_timeline_blocks_detail">
                                            { JnextTbIcon( value, blockIndex ) }
                                            { JnextTbDetail( value, blockIndex ) }
                                            { JnextTbTime( value, blockIndex ) }
                                        </div>
                                    ) }
                                </div>
                        ) : (
                                <div className="jtb-row">
                                    { attributes.timelineAlignment != 'center' && attributes.timelineLayout != 'horizontal' ? (
                                        <div className="jtb_timeline_blocks_detail jtb_timeline_blocks_one_sided_detail">
                                            { JnextTbIcon( value, blockIndex ) }
                                            <div className="jtb-day-detail">
                                                <div className="jtb-one-sided_inner_block">
                                                    { JnextTbTime( value, blockIndex ) }
                                                    { JnextTbDetail( value, blockIndex ) }
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="jtb_timeline_blocks_detail">
                                            { JnextTbIcon( value, blockIndex ) }
                                            { JnextTbTime( value, blockIndex ) }
                                            { JnextTbDetail( value, blockIndex ) }
                                        </div>
                                    ) }
                                </div>
                            ) 
                        }
                    </div>
                </div>
            ));

            const hideArrows = (false === attributes.jnext_s_lick_arrows) ? 'jnext_s_lick_hide-arrows' : '';
                        
            const SortableList = SortableContainer(({ items }) => {
                return (
                    <div className="jnext-tmieline-blocks-main">
                        <div className="jnext-tmieline-blocks-list">
                            {/* <div className="list" data-slick= { (attributes.timelineLayout == 'horizontal') ? 
                                `{"slidesToShow": ${attributes.jnext_s_lick_slideToShow}, "slidesToScroll": ${attributes.jnext_s_lick_slideToScroll}, "autoplay": ${attributes.jnext_s_lick_autoplay}, "autoplaySpeed": ${attributes.jnext_s_lick_autoplaySpeed}, "fade": ${attributes.jnext_s_lick_fade}, "speed": ${attributes.jnext_s_lick_Speed}, "arrows": ${attributes.jnext_s_lick_arrows}, "dots": ${attributes.jnext_s_lick_dots}, "touchMove": false}` 
                                : '' }
                            > */}
                            <div className="list" data-autoplay = {attributes.jnext_s_lick_autoplay} data-speed = {attributes.jnext_s_lick_Speed} data-slidesshow = {attributes.jnext_s_lick_slideToShow} data-slidescroll = {attributes.jnext_s_lick_slideToScroll} data-autoplayspeed = {attributes.jnext_s_lick_autoplaySpeed} data-fade = {attributes.jnext_s_lick_fade} data-arrow = {attributes.jnext_s_lick_arrows} data-dots = {attributes.jnext_s_lick_dots}>
                                {items
                                .sort((a, b) => a.position - b.position)
                                .map((value, index) => (
                                    <SortableItem  key={value.id} index={index} value={value} blockIndex={index} />
                                ))}
                            </div>
                            
                            <button className={classnames(
                                `slide-arrow prev-arrow jnext_s_lick-arrow`,
                                hideArrows
                            )}><ArrowPrev /></button>
                            <button className={classnames(
                                `slide-arrow next-arrow jnext_s_lick-arrow`,
                                hideArrows
                            )}><ArrowNext /></button>
                                          
                        </div>
                    </div>
                );
            });
            
            const onSortEnd = ({ oldIndex, newIndex }) => {
                let arr = arrayMove(attributes.timelineItems, oldIndex, newIndex);
                
                for (let i = 0; i < arr.length; i++) {
                    arr[i].position = i;
                }
                setJnextTbListData(arr);
                timelineConnector.jnextTimelineContent_back(id)

                wp.data.dispatch('core/editor').editPost({meta: {_non_existing_meta: true}});
            };

            return (
                <Fragment>
                    <SortableList items={attributes.timelineItems} helperClass={'gjtb-helper-class'} onSortEnd={onSortEnd} distance={2} disableAutoscroll={true} axis="y"/>
                </Fragment>
            );

        };
        
        const { wrapperStyles } = getStyles( attributes );

        const JnextTbIcon = ( item, index ) => (
            <div className="jtb__view-icon-wrap">
                <span className="Jtb_ifb-icon">{IconRender(attributes.icon)}</span>
            </div>
        );

        const JnextTbTime = ( item, index ) => (
            <div className="jtb__date-wrap">
                <div className="jtb-time">
                    <RichText
                        tagName="p"
                        className="jnext-timeline-block__date"
                        placeholder={ __( 'Date / Custom Text', 'jnext-timeline-blocks' ) }
                        value={ item.time }
                        keepPlaceholderOnFocus={true}
                        onChange={ ( value ) => this.onChangePropertyItem( 'time', value, index, false ) }
                    />
                </div>
            </div>
        );

        const JnextTbDetail = ( item, index ) => (
            <div className={classnames(
                `jtb__detail-wrap`,
                ...JnextDayAlignClass(attributes, index)
            )}>
                <div className="jtb-details">
                    { attributes.timelineAlignment == 'center' ? JnextTbTime( item, index ) : '' }
                    <div className="jtb__img backend">
                        <MediaUpload
                            onSelect={ ( value ) => this.onChangejtbImgItem( 'jtbImage',value, index, true ) }
                            value={ item.jtbImage }
                            alt={item.alt}
                            allowedTypes={ [ 'image' ] }
                            render={ ( mediaUploadProps ) => (
                                <Fragment>
                                    { ( item.jtbImage !== 'none' ) &&
                                        <Fragment>
                                            <img src={item.jtbImage} alt={item.alt} />
                                            <Button
                                                isSecondary 
                                                onClick={ ( value ) => this.onChangejtbImgItem( 'jtbImage','none', index, true ) }
                                            >
                                                { __( 'Remove Image', 'jnext-timeline-blocks' ) }
                                    
                                            </Button>
                                        
                                        </Fragment>
                                    }
                                    { ( item.jtbImage == 'none' )   &&
                                
                                        <Button isSecondary onClick={ mediaUploadProps.open }>
                                            { __( 'Select a image ...', 'jnext-timeline-blocks' ) }
                                        </Button>
                                    }
                                </Fragment>
                            ) }
                        />
                    </div>
                  
                   
                    <RichText
                        tagName={attributes.headingTag}
                        className="jnext-timeline-block__heading"
                        placeholder={ __( 'Enter Title', 'jnext-timeline-blocks' ) }
                        value={ item.title }
                        keepPlaceholderOnFocus={true}
                        onChange={ ( value ) => this.onChangePropertyItem( 'title', value, index, false ) }
                    />
                    <RichText
                        tagName="p"
                        className="jnext-timeline-block__description"
                        placeholder={ __( 'Enter description here.', 'jnext-timeline-blocks' ) }
                        value={ item.description }
                        keepPlaceholderOnFocus={true}
                        onChange={ ( value ) => this.onChangePropertyItem( 'description', value, index, false ) }
                    />
                    <div className="jnext_timeline_blocks_arrow"></div>
                </div>
            </div>
        );
                  
        return (
            <div className={className ? className + ' jnext-timeline-blocks-content-timeline block-'+attributes.block_id : ''}>
                <JnextBlockInspector {...{ setAttributes, ...this.props }} />
                                
                <ContainerEdit
                    className={classnames(
                        `jnext-content-timeline ${ isSelected ? 'selected' : '' }`,
                        ...ContentTimelineClasses(attributes)
                      )}
                    attributes={ attributes }
                >
                    <div className="JnextTbconnector">
                        <div className="JnextTbfocusconnector"></div>
                    </div>
                    <Lists />
                    
                </ContainerEdit>
                <button
                    className="addWhite"
                    onClick={ this.jtbaddItem }>
                    <span><AddMoreBlock /></span>{ __( 'Add Item', 'jnext-timeline-blocks' ) }
                </button>
                
            </div>
        );
    }
}