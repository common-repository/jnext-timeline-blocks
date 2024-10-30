/**
 * Jnext Post Timeline Block Control
 */
 import moment from "moment";
 import classnames from "classnames";
 import PostFeaturedImage from '../../components/jnext-post-timeline-image';
 import IconRender from "../../Icons/IconRender";
 import { arrayMove, SortableContainer, SortableElement } from 'react-sortable-hoc';
 import { ArrowNext, ArrowPrev } from '../../components/icons/icons';
 import ContentTimelineClasses, { JnextDayAlignClass, jnextAlignClass } from "../../components/jnext-post-timeline-block-classes";
 import JnextBlockInspector from './JnextBlockInspector';
 import JnextBlockStyles from './jnext-block-styles';
 import * as postTimelineConnector from "./postTimelineConnector";
 import React from "react";
 import $ from 'jquery';
 
 /**
  * Setup blocks from wordpress
  */
 const { compose } = wp.compose;
 const { Component, Fragment, useState  } = wp.element;
 const { __ } = wp.i18n; // Import __() from wp.i18n
 const { decodeEntities } = wp.htmlEntities;
 const { withSelect } = wp.data;

  /**
  * Import inspector components
  */
   const { Placeholder, Spinner, SelectControl, PanelBody } = wp.components;

 /**
  * Import block components
  */
 const { BlockAlignmentToolbar, BlockControls, InspectorControls } = wp.blockEditor;

 
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
class LatestPostsBlock extends Component {
  constructor(props) {
    super(...arguments);
    this.getIfbIcon = this.getIfbIcon.bind(this);
    this.onSelectTaxonomyType = this.onSelectTaxonomyType.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {

    var id = this.props.clientId;
    var element = document.getElementById(
      "jnext-timeline-blocks-post-timeline-block-style-" +
      id
    );

    if (null !== element && undefined !== element) {
      element.innerHTML = JnextBlockStyles(this.props);
    }

    window.addEventListener("load", postTimelineConnector.JnextpostTimelineContent(id));
    window.addEventListener("resize", postTimelineConnector.JnextpostTimelineContent(id));
    $(".edit-post-layout__content").on('scroll', function (event) {
      postTimelineConnector.JnextpostTimelineContent(id);
    });

  }
  componentDidMount() {
    // Assigning block_id in the attribute.
    this.props.setAttributes({ block_id: this.props.clientId });
    this.props.setAttributes({ classMigrate: true });
    
    var id = this.props.clientId;

    window.addEventListener("load", postTimelineConnector.JnextpostTimelineContent(id));
    window.addEventListener("resize", postTimelineConnector.JnextpostTimelineContent(id));
    var time = this;
    $(".edit-post-layout__content").on('scroll', function (event) {
      postTimelineConnector.JnextpostTimelineContent(id);
    });

    // Pushing Style tag for this block css.
    const $style = document.createElement("style");
    $style.setAttribute(
      "id",
      "jnext-timeline-blocks-post-timeline-block-style-" +
      id
    );
    document.head.appendChild($style);
  }

  getIfbIcon(value) {
    this.props.setAttributes({ icon: value });
  }

  onSelectTaxonomyType(value) {
    const { setAttributes } = this.props;

    setAttributes({ taxonomyType: value });
    setAttributes({ categories: "" });
  }
  
  render() {
      
    const {
      className,
      attributes,
      setAttributes,
      isSelected,
      latestPosts,
      taxonomyList,
      categoriesList
    } = this.props;

      // Check if post exists
      const hasPosts = Array.isArray(latestPosts) && latestPosts.length;
      
      // Check the post type
      const isPost = "post" === attributes.postType;
      
      if (!hasPosts) {
          return (
            <Fragment>
              <JnextBlockInspector {...{ setAttributes, ...this.props }} />
              <Placeholder
                icon="admin-post"
                label={__("Jnext Post Timeline", "jnext-timeline-blocks")}
              >
                {!Array.isArray(latestPosts) ? (
                  <Spinner />
                ) : (
                  __("No posts found.", "jnext-timeline-blocks")
                )}
              </Placeholder>
            </Fragment>
          );
      }
      
      var removedPost_latestPost = ( attributes.sortedPosts.length !== 0 ) ? attributes.sortedPosts : latestPosts;
      // Removing posts from display should be instant.
      const displayPosts = latestPosts.length > attributes.noOfPosts ? latestPosts.slice(0, attributes.noOfPosts) : removedPost_latestPost;

      
      // Get the title tag
      const TitleTag = attributes.headingTag ? attributes.headingTag : "h3";
      
      /**
      * Remove Block
      * It also add default block if we remove all elements from array
      * @param {number} index - of block
      */
      const jtb_removeItem = ( index, id ) => {
        if ( displayPosts.length > 1 ) {
          displayPosts.splice( index, 1 );
          this.setState({ displayPosts });

          attributes.orderByIncludeIds.splice( id, 1 );
          let orderByIncludeIds = attributes.orderByIncludeIds;
          let sortedPosts = displayPosts;
          this.props.setAttributes({ orderByIncludeIds });
          this.props.setAttributes({ sortedPosts });
          let arr = [];
          for (let i = 0; i < sortedPosts.length; i++) {
            arr[i] = sortedPosts[i].id;
          }
          
          let excludeRemovedPost = arr;
          this.props.setAttributes({ excludeRemovedPost });
        }
      };
      
      if( attributes.excludeRemovedPost.length == 0 ){
        let excludeRemovedPost = attributes.excludeRemovedPost;
        this.props.setAttributes({ excludeRemovedPost });
      }

      const Lists = () => {

        var id = this.props.clientId;

        const [ listData, setJnextTbListData ] = useState([]);

        const SortableItem = SortableElement(({ value, blockIndex }) => (
          <div
            data-postid={ value.id }
            className={classnames(
              "post-" + value.id,
              "jnext-post-timeline-content",
              "jnext-post-timeline-wrap",
              value.featured_image_src && attributes.displayPostImage
                ? "has-post-thumbnail"
                : null
            )}
            data-order={blockIndex}
            id={blockIndex} >
            <div className={jnextAlignClass(attributes, blockIndex)}>
              <button className="block-remove dashicons dashicons-no" onClick={ ( ) => jtb_removeItem( blockIndex, value.id ) }>
              
              </button>
              <div className="timeline-moveicons" />
              { ( blockIndex + 1 ) % 2 !== 0 ? (
                  <div className="jtb-row">
                      { attributes.timelineAlignment != 'center' && attributes.postTimelineLayout != 'horizontal' ? (
                          <div className="jtb_post_timeline_blocks_detail jtb_post_timeline_block_one_sided_detail">
                              { JnextTbIcon( value, blockIndex ) }
                              <div className="jtb-post-day-detail">
                                  <div className="jtb-post-one-sided_inner_block">
                                      { JnextTbTime( value, blockIndex ) }
                                      { JnextTbDetail( value, blockIndex ) }
                                  </div>
                              </div>
                          </div>
                      ) : (
                          <div className="jtb_post_timeline_blocks_detail">
                              { JnextTbIcon( value, blockIndex ) }
                              { JnextTbDetail( value, blockIndex ) }
                              { JnextTbTime( value, blockIndex ) }
                          </div>
                      ) }
                  </div>
                ) : (
                  <div className="jtb-row">
                      { attributes.timelineAlignment != 'center' && attributes.postTimelineLayout != 'horizontal' ? (
                          <div className="jtb_post_timeline_blocks_detail jtb_post_timeline_block_one_sided_detail">
                              { JnextTbIcon( value, blockIndex ) }
                              <div className="jtb-post-day-detail">
                                  <div className="jtb-post-one-sided_inner_block">
                                      { JnextTbTime( value, blockIndex ) }
                                      { JnextTbDetail( value, blockIndex ) }
                                  </div>
                              </div>
                          </div>
                      ) : (
                          <div className="jtb_post_timeline_blocks_detail">
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

        const JnextTbIcon = ( item, index ) => (
          <div className="jtb__post-view-icon-wrap">
              <span className="Jtb_post-block-ifb-icon">{IconRender(attributes.icon)}</span>
          </div>
        );

        const JnextTbTime = ( item, index ) => (
          <div className="jtb__post-block-date-wrap">
              <div className="jtb-time">
                {attributes.displayPostDate && item.date_gmt && (
                  <time
                    dateTime={moment(item.date_gmt).utc().format()}
                    className={
                      "jnext-timeline-block__date"
                    }
                  >
                    {moment(item.date_gmt)
                      .local()
                      .format(
                        "MMMM DD, Y",
                        "jnext-timeline-blocks"
                      )}
                  </time>
                )}
              </div>
          </div>
        );

        const JnextTbDetail = ( item, index ) => (
          <div className={classnames(
              `jtb__post-detail-wrap`,
              ...JnextDayAlignClass(attributes, index)
          )}>
              <div className="jtb-post-details">
                  { attributes.timelineAlignment == 'center' ? JnextTbTime( item, index ) : '' }
                  <div className="jtb-post-block__img backend">
                    {attributes.displayPostImage &&
                      item.featured_media ? (
                        <PostFeaturedImage
                          {...this.props}
                          imgAlt={
                            decodeEntities(
                              item.title.rendered.trim()
                            ) ||
                            __(
                              "(Untitled)",
                              "jnext-timeline-blocks"
                            )
                          }
                          imgClass={`wp-image-${item.featured_media.toString()}`}
                          imgID={item.featured_media.toString()}
                          imgSize={attributes.imageSize}
                          imgSizeLandscape={item.featured_image_src}
                          imgSizeSquare={item.featured_image_src_square}
                          imgLink={item.link}
                        />
                      ) : null}
                  </div>
                
                  <TitleTag className="jnext-timeline-blocks-post-timeline__heading">
                    <a className="jnext-post-timeline__heading-text-link"
                      href={item.link}
                      target="_blank"
                      rel="bookmark"
                    >
                      {decodeEntities(
                          item.title.rendered.trim()
                        ) ||
                        __(
                          "(Untitled)",
                          "jnext-timeline-blocks"
                        )
                      }
                    </a>
                  </TitleTag>
                  {isPost && (
                    <div className="jnext-timeline-blocks-post-timeline__post-author-wrap">
                      {attributes.displayPostAuthor &&
                        item._embedded.author && (
                          item._embedded.author
                            .map((value, index) => (
                              <div className="jnext-timeline-blocks-post-timeline-author">
                                <a
                                  className="jnext-post-timeline-author-text-link"
                                  target="_blank"
                                  href={value.link}
                                >
                                  {value.name}
                                </a>
                              </div>
                          ))
                        )}
                    </div>
                  )}
                  <div className="jnext-timeline-block-post-timeline__post-content-wrap">
                    {attributes.displayPostExcerpt &&
                      item.excerpt && (
                        <div className="jnext-post-timeline__post-excerpt">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: truncate(
                                item.excerpt.rendered,
                                attributes.excerptLength
                              ),
                            }}
                          />
                        </div>
                      )
                    }
                    {attributes.displayPostLink && (
                      <div className="jnext-timeline-blocks-post-timeline__readMore-wrap">
                        <a
                          className="jnext-post-timeline__readMore-text-link"
                          href={item.link}
                          target="_blank"
                          rel="bookmark"
                        >
                          {attributes.readmoreText}
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="jnext_post_timeline_block_arrow"></div>
              </div>
          </div>
        );

        const hideArrows = (false === attributes.jnext_s_lick_h__PostArrows) ? 'jnext_s_lick_post__h_hide-arrows' : '';

        const SortableList = SortableContainer(({ items }) => {
          return (
            <div className="jnext-post-timeline-blocks-main">
                <div className="jnext-post-timeline-blocks-list">
                    <div className="list" data-autoplay = {this.props.attributes.jnext_s_lick_h__PostAutoplay} data-speed = {this.props.attributes.jnext_s_lick_h__PostSpeed} data-slidesshow = {attributes.jnext_s_lick_h__PostToShow} data-slidescroll = {attributes.jnext_s_lick_h__PostToScroll} data-autoplayspeed = {attributes.jnext_s_lick_h__PostAutoplaySpeed} data-fade = {attributes.jnext_s_lick_h__PostFade} data-arrow = {attributes.jnext_s_lick_h__PostArrows} data-dots = {attributes.jnext_s_lick_h__PostDots}>
                        {items
                        .sort((a, b) => a.position - b.position)
                        .map((value, index) => (
                            <SortableItem key={value.id} index={index} value={value} blockIndex={index} />
                        ))}
                    </div>
                    <button className={classnames(
                        `slide-arrow post_prev-arrow jnext_s_lick_post__h-arrow`,
                        hideArrows
                    )}><ArrowPrev /></button>
                    <button className={classnames(
                        `slide-arrow post_next-arrow jnext_s_lick_post__h-arrow`,
                        hideArrows
                    )}><ArrowNext /></button>
                </div>
            </div>
          );
        });
        
        const onSortEnd = ({ oldIndex, newIndex }) => {

          let arr = arrayMove(displayPosts, oldIndex, newIndex);
          let Ids = [];
          for (let i = 0; i < arr.length; i++) {
            arr[i].position = i;
            Ids[i] = arr[i].id;
          }
          var res = Ids.filter(f => !this.props.attributes.orderByIncludeIds.includes(f.id));
          
          let orderByIncludeIds = res;
          let sortedPosts = arr;
          
          this.props.setAttributes({ orderByIncludeIds });
          this.props.setAttributes({ sortedPosts });
          this.props.setAttributes({ orderByIds: true });
          setJnextTbListData(arr);

          postTimelineConnector.JnextpostTimelineContent(this.props.clientId);
          wp.data.dispatch('core/editor').editPost({meta: {_non_existing_meta: true}});

        };

        const sortAxis = (attributes.timelineLayout == 'vertical') ? 'y' : 'x';
        return (
            <Fragment>
                <SortableList items={displayPosts} helperClass={'gjtb-helper-class'} onSortEnd={onSortEnd} distance={2} disableAutoscroll={true} axis={sortAxis}/>
            </Fragment>
        );

      };
    

      let taxonomyListsOptions = [{ value: "", label: __("Select Taxanomy") }];

      let categoryListsOptions = [{ value: "", label: __("All") }];

      if ("" != taxonomyList) {
          Object.keys(taxonomyList).map((item, thisIndex) => {
              return taxonomyListsOptions.push({
                value: taxonomyList[item]["name"],
                label: taxonomyList[item]["label"],
              });
          });
          
      }

      if ("" != categoriesList) {
          Object.keys(categoriesList).map((item, thisIndex) => {
              return categoryListsOptions.push({
                value: categoriesList[item]["id"],
                label: categoriesList[item]["name"],
              });
          });
      }
      
      return(
        
        <div className={className ? className + ' jnext-timeline-blocks-post-timeline block-'+attributes.block_id : ''}>
          <InspectorControls>
              <PanelBody
                  title={ __( 'Post Query', 'jnext-timeline-blocks' ) }
                  initialOpen={ false }
              >
                  {"" != taxonomyList && (
                      <SelectControl
                          label={__("Taxonomy")}
                          value={attributes.taxonomyType}
                          onChange={(value) => this.onSelectTaxonomyType(value)}
                          options={taxonomyListsOptions}
                      />
                  )}
                  {"" != categoriesList && (
                    <Fragment>
                      <SelectControl
                        label={taxonomyList[attributes.taxonomyType]["label"]}
                        value={attributes.categories}
                        onChange={(value) => setAttributes({ categories: value })}
                        options={categoryListsOptions}
                      />
                    </Fragment>
                  )}
              </PanelBody>
          </InspectorControls>
          <JnextBlockInspector {...{ setAttributes, ...this.props }} />
          <BlockControls>
            <BlockAlignmentToolbar
              value = {attributes.Blockalign}
              onChange = {(value) => {
                setAttributes({ Blockalign: value });
              }}
              controls = {["center", "wide", "full"]}
            />
          </BlockControls>
          <ContainerEdit
              className = {classnames(
                  `jnext-post-timeline ${ isSelected ? 'selected' : '' }`,
                  ...ContentTimelineClasses(attributes)
                )}
              attributes = { attributes }
          >
            <div className="JnextTb__post-block-connector">
                <div className="JnextTb__post-block-focusconnector"></div>
            </div>
            <Lists />
          </ContainerEdit>
          
        </div>
      );
  }
}
 
// Truncate excerpt
function truncate(str, no_words) {
  return str.split(" ").splice(0, no_words).join(" ");
}
 
export default compose([
  withSelect((select, props) => {
    const { order, noOfPosts, orderBy, categories, taxonomyType, postType } = props.attributes;
    
    const { getEntityRecords } = select("core");
    
    let totalTaxonomy = responsive_globals.all_taxonomy;
    let currentTaxanomy = totalTaxonomy[postType];
    let categoriesLists = [];
    let post_rest_base = "";

    if ("undefined" != typeof currentTaxanomy) {
      if ("undefined" != typeof currentTaxanomy["taxonomy"][taxonomyType]) {
        post_rest_base =
          (currentTaxanomy["taxonomy"][taxonomyType]["rest_base"] == false ||
          currentTaxanomy["taxonomy"][taxonomyType]["rest_base"] == null)
            ? currentTaxanomy["taxonomy"][taxonomyType]["name"]
            : currentTaxanomy["taxonomy"][taxonomyType]["rest_base"];
      }

      if ("" != taxonomyType) {
        if (
          "undefined" != typeof currentTaxanomy["terms"] &&
          "undefined" != typeof currentTaxanomy["terms"][taxonomyType]
        ) {
          categoriesLists = currentTaxanomy["terms"][taxonomyType];
        }
      }
    }

    const latestPostsQuery = {
      order: order,
      orderby: orderBy,
      per_page: noOfPosts,
      offset: props.attributes.offset,
      _embed: true,
    }
    
    var allCategories = [];	
    var temp = parseInt(categories);
    
    allCategories.push(temp);
    var categorylength = (categoriesLists) ? categoriesLists.length : 0;
    
    for(var i=0;i<categorylength;i++){
      if(categoriesLists[i].id == temp){
        if(categoriesLists[i].child){
          if(categoriesLists[i].child.length !== 0){
            categoriesLists[i].child.forEach(element => {
              allCategories.push(element);
            });
          }	
        }	
      }
    }
    if ( undefined !== categories && '' !== categories ) {
      latestPostsQuery[post_rest_base] = (undefined === categories || '' === categories ) ? categories : allCategories;
    }
    
    return {
      latestPosts: getEntityRecords(
        "postType",
        postType,
        latestPostsQuery,
      ),
      categoriesList: categoriesLists,
      taxonomyList:
        ("undefined" != typeof currentTaxanomy) ? currentTaxanomy["taxonomy"] : [],
    };
  }),
])(LatestPostsBlock);