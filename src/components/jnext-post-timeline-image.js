/**
 * Post featured image.
 */

import get from "lodash/get";
import classnames from "classnames";
import * as postTimelineConnector from "./../block/jnext-post-timeline/postTimelineConnector";
import $ from 'jquery';

const { __ } = wp.i18n;
const { Fragment, Component } = wp.element;
const { Placeholder, Dashicon } = wp.components;
 
export default class PostFeaturedImage extends Component {
    constructor(props) {
        super(...arguments);
    
        this.state = {
            imageUrl: "",
            imageLoaded: false,
            setImageUrlSubscription: false,
        };
        
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.imgSize !== prevProps.imgSize) {
            this.setImageUrl();
        }
    }
 
    componentDidMount() {
        /**
         * Set the image URL on load and when state changes.
         */
        this.setState({
            setImageUrlSubscription: wp.data.subscribe(() => {
                this.setImageUrl();
            }),
        });
    }
 
    componentWillUnmount() {
        /**
         * Cancel the image URL subscription.
         */
        this.setState({});
    }
 
    setImageUrl() {
        let imageUrl = this.getImageUrl();
        
        if (!imageUrl) {
            imageUrl = this.getFullImageSize();
        }
 
        if (imageUrl) {
            this.setState({
                imageUrl,
                imageLoaded: true,
            });
        }
    }
    
    getImageUrl() {
        return get(
            /* get Post Media accepts an image id and returns an object with all the image data. */
            wp.data.select("core").getMedia(this.props.imgID),
            [
                "media_details",
                "sizes",
                this.props.imgSize /* Get the post image slug from the inspector. */,
                "source_url" /* Return the url of the post image size. */,
            ]
        );
    }
 
    /* Get the full post featured image size value as a placeholder. */
    getFullImageSize() {
        return get(
            /* get Post Media accepts an image id and returns an object with all the post image data. */
            wp.data.select("core").getMedia(this.props.imgID),
            [
                "media_details",
                "sizes",
                "full" /* Get the full post featured image size. */,
                "source_url" /* Return the url of the full post featured image size. */,
            ]
        );
    }

    changeSepratorOnImageInit(){

        var timeline = $(".jnext-post-timeline");
        var $card_last = timeline.find(".jnext-post-timeline-wrap:last-child");
        timeline.find(".JnextTb__post-block-connector").css("bottom", $card_last.find('.jtb-post-details').height() - timeline.find(".jtb__post-view-icon-wrap").last().position().top);
        
    }
 
    render() {
        
        if(this.state.imageUrl) {
            postTimelineConnector.JnextpostTimelineContent(this.props.clientId);
        }

        return (
            <Fragment>
                <div
                    className={classnames(
                        "jnext-timeline-blocks__post-timeline-image"
                    )}
                >
                    <a href={this.props.imgLink} target="_blank" rel="bookmark">
                        <img
                            src={
                                this.state.imageUrl
                                ? this.state.imageUrl
                                : this.props.imgSizeLandscape
                            }
                            alt={this.props.imgAlt}
                            className={this.props.imgClass}
                        />
                    </a>
    
                    {
                        /* If we don't have the selected image size, show a warning */
                        !this.getImageUrl() &&
                        this.state.imageLoaded &&
                        "selectimage" !== this.props.imgSize && (
                            <Fragment>
                                <div
                                    className={
                                    "jnext-timeline-blocks__post-timeline-no-image-icon"
                                    }
                                >
                                    <Dashicon icon={"warning"} />
                                </div>
                
                                <Placeholder
                                    className={
                                    "jnext-timeline-blocks__post-timeline-no-image-placeholder"
                                    }
                                >
                                    <Dashicon icon={"info"} />
                                    <div className="jnext-timeline-blocks__post-timeline-placeholder__label">
                                    {__(
                                        "There is no image generated for the selected image size, so a fallback image size is being used.",
                                        "jnext-timeline-blocks"
                                    )}
                                    </div>
                                </Placeholder>
                            </Fragment>
                        )
                    }
                </div>
            </Fragment>
        );
    }
} 