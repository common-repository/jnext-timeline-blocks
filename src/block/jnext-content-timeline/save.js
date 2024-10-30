/**
 * Jnext Content Timeline Block Control
 */
 import classnames from "classnames";
 import ContentTimelineClasses, { JnextDayAlignClass, jnextAlignClass } from "../../components/jnext-timeline-classes";
 import IconRender from "../../Icons/IconRender";
 import { ArrowNext, ArrowPrev } from '../../components/icons/icons';

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { RichText } = wp.editor;

export const ContainerSave = ( props ) => {
    const styles = {};  

    return (
        <div
            className={ `${ props.className }  ${props.attributes.timelineAlignment}` }
            style={ { ...styles, ...props.style } }
        >
            { props.children }
        </div>
    );

};

export default class Save extends Component {

    constructor(props) {
        super(...arguments);
    }
    render(){
        const {
            attributes: {
                block_id,
                icon,
                headingTag,
                timelineItems,
                timelineAlignment,
                timelineLayout,
            }
        } = this.props;
        
        const JnextTbIcon = ( item, index ) => (
            <div className="jtb__view-icon-wrap">
                <span className="Jtb_ifb-icon">{IconRender(icon)}</span>
            </div>
        );

        const JnextTbTime = ( item, index ) => (
            <div className="jtb__date-wrap">
                <div className="jtb-time">
                    <RichText.Content
                        tagName="p"
                        className="jnext-timeline-block__date"
                        value={ item.time }
                    />
                </div>
            </div>
        );

        const JnextTbDetail = ( item, index ) => (
            <div className={classnames(
                `jtb__detail-wrap`,
                ...JnextDayAlignClass(this.props.attributes, index)
            )}>
                <div className="jtb-details">
                    { this.props.attributes.timelineAlignment == 'center' ? JnextTbTime( item, index ) : '' }
                    <div className="jtb__img backend">
                        {(item.jtbImage!=='none') &&
                            <img src={item.jtbImage} alt={item.alt}/>
                        }
                    </div>
                    <RichText.Content
                        tagName={headingTag}
                        className="jnext-timeline-block__heading"
                        value={ item.title }
                    />
                    <RichText.Content
                        tagName="p"
                        className="jnext-timeline-block__description"
                        value={ item.description }
                    />
                    <div className="jnext_timeline_blocks_arrow"></div>
                </div>
            </div>
        );

        const hideArrows = (false === this.props.attributes.jnext_s_lick_arrows) ? 'jnext_s_lick_hide-arrows' : '';

        return[
            <div className={this.props.className ? this.props.className + ` jnext-timeline-blocks-content-timeline block-${block_id}` : ''}>
                <ContainerSave
                     className={classnames(
                        `jnext-content-timeline`,
                        ...ContentTimelineClasses(this.props.attributes)
                      )}
                      attributes={ this.props.attributes }
                    >
                    <div className="JnextTbconnector">
                        <div className="JnextTbfocusconnector"></div>
                    </div>
                    <div className="jnext-tmieline-blocks-main">
                        <div className="jnext-tmieline-blocks-list">
                            <div className="list" data-autoplay = {this.props.attributes.jnext_s_lick_autoplay} data-speed = {this.props.attributes.jnext_s_lick_Speed} data-slidesshow = {this.props.attributes.jnext_s_lick_slideToShow} data-slidescroll = {this.props.attributes.jnext_s_lick_slideToScroll} data-autoplayspeed = {this.props.attributes.jnext_s_lick_autoplaySpeed} data-fade = {this.props.attributes.jnext_s_lick_fade} data-arrow = {this.props.attributes.jnext_s_lick_arrows} data-dots = {this.props.attributes.jnext_s_lick_dots}>
                                { timelineItems && timelineItems.map( ( item, index ) => (
                                    <div key={ item.key } className="jnext-timeline-content" data-order={index} id={index}>
                                        <div className={classnames( ...jnextAlignClass(this.props.attributes, index))}>
                                            { ( index + 1 ) % 2 !== 0 ? (
                                                    <div className="jtb-row">
                                                        { timelineAlignment != 'center' && timelineLayout != 'horizontal' ? (
                                                            <div className="jtb_timeline_blocks_detail jtb_timeline_blocks_one_sided_detail">
                                                                { JnextTbIcon( item, index ) }
                                                                <div className="jtb-day-detail">
                                                                    <div className="jtb-one-sided_inner_block">
                                                                        { JnextTbTime( item, index ) }
                                                                        { JnextTbDetail( item, index ) }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="jtb_timeline_blocks_detail">
                                                                { JnextTbIcon( item, index ) }
                                                                { JnextTbDetail( item, index ) }
                                                                { JnextTbTime( item, index ) }
                                                            </div>
                                                        ) }
                                                    </div>
                                            ) : (
                                                    <div className="jtb-row">
                                                        { timelineAlignment != 'center' && timelineLayout != 'horizontal' ? (
                                                            <div className="jtb_timeline_blocks_detail jtb_timeline_blocks_one_sided_detail">
                                                                { JnextTbIcon( item, index ) }
                                                                <div className="jtb-day-detail">
                                                                    <div className="jtb-one-sided_inner_block">
                                                                        { JnextTbTime( item, index ) }
                                                                        { JnextTbDetail( item, index ) }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="jtb_timeline_blocks_detail">
                                                                { JnextTbIcon( item, index ) }
                                                                { JnextTbTime( item, index ) }
                                                                { JnextTbDetail( item, index ) }
                                                            </div>
                                                        ) }
                                                    </div>
                                                ) 
                                            }
                                        </div>
                                    </div>
                                ) ) }
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
                </ContainerSave>
            </div>,
        ];
    }
    
}