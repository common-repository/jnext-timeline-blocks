
/**
 * Jnext Post Timeline Inspector Controls
 */

// import dependencies
import compact from "lodash/compact";
import map from "lodash/map";
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import JnextTbfontOptions from "../../fonts/GoogleFonts";
import { loadGoogleFont  } from "../../fonts/JTb_font";
import JnextBlocksIcons from "../../Icons/JnextBlocksIcons.json";
import IconRender from "../../Icons/IconRender";
import BoxShadowControl from "../../components/box-shadow";

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

// Import block components
const { InspectorControls, ColorPalette, PanelColorSettings } = wp.blockEditor;

// Import Inspector components
const {
    PanelBody,
    QueryControls,
    RangeControl,
    SelectControl,
    TextControl,
    ToggleControl,
    TabPanel,
    RadioControl,
} = wp.components;

let jnextblockicons = Object.keys(JnextBlocksIcons);

const { addQueryArgs } = wp.url;

const { apiFetch } = wp;

/**
 * Create an Inspector Controls wrapper Component for Post Timeline Block
 */
export default class JnextBlockInspector extends Component {
    constructor() {
        super(...arguments);
        this.state = { categoriesList: [] };
        this.getIfbIcon = this.getIfbIcon.bind(this);
    }

    getIfbIcon(value) {
        this.props.setAttributes({ icon: value });
    }

    componentDidMount() {
        this.stillMounted = true;
        this.fetchRequest = apiFetch({
          path: addQueryArgs("/wp/v2/categories", { per_page: -1 }),
        }).then((categoriesList) => {
            if (this.stillMounted) {
                this.setState({ categoriesList });
            }
        }).catch(() => {
            if (this.stillMounted) {
                this.setState({ categoriesList: [] });
            }
        });
    }
    
    componentWillUnmount() {
        this.stillMounted = false;
    }
    
    /* Get the available image sizes */
    imageSizeSelect() {
        const getSettings = wp.data.select("core/editor").getEditorSettings();

        return compact(
            map(getSettings.imageSizes, ({ name, slug }) => {
                return {
                    value: slug,
                    label: name,
                };
            })
        );
    }

    render(){
        // Setup the attributes
        const { attributes, setAttributes } = this.props;

        const { order, orderBy } = attributes;

        const { categoriesList } = this.state;

        // Post type options
        const postTypeOptions = [
            { value: "post", label: __("Post", "jnext-timeline-blocks") },
            { value: "page", label: __("Page", "jnext-timeline-blocks") },
        ];

        // Font weight options
        const fontWeightOptions = [
            {
              value: "100",
              label: __("100", "jnext-timeline-blocks"),
            },
            {
              value: "200",
              label: __("200", "jnext-timeline-blocks"),
            },
            {
              value: "300",
              label: __("300", "jnext-timeline-blocks"),
            },
            {
              value: "400",
              label: __("400", "jnext-timeline-blocks"),
            },
            {
              value: "500",
              label: __("500", "jnext-timeline-blocks"),
            },
            {
              value: "600",
              label: __("600", "jnext-timeline-blocks"),
            },
            {
              value: "700",
              label: __("700", "jnext-timeline-blocks"),
            },
            {
              value: "800",
              label: __("800", "jnext-timeline-blocks"),
            },
            {
              value: "900",
              label: __("900", "jnext-timeline-blocks"),
            },
        ];

        // Heading Tag Options
        const headingTagOptions = [
            {
                value: "h1",
                label: __("h1", "jnext-timeline-blocks"),
            },
            {
                value: "h2",
                label: __("h2", "jnext-timeline-blocks"),
            },
            {
                value: "h3",
                label: __("h3", "jnext-timeline-blocks"),
            },
            {
                value: "h4",
                label: __("h4", "jnext-timeline-blocks"),
            },
            {
                value: "h5",
                label: __("h5", "jnext-timeline-blocks"),
            },
            {
                value: "h6",
                label: __("h6", "jnext-timeline-blocks"),
            },
            {
                value: "p",
                label: __("p", "jnext-timeline-blocks"),
            },
            {
                value: "span",
                label: __("span", "jnext-timeline-blocks"),
            },
        ];
        

        // Icon properties.
        const block_icon_props = {
            icons: jnextblockicons,
            value: this.props.attributes.icon,
            onChange: this.getIfbIcon,
            isMulti: false,
            renderFunc: IconRender,
            noSelectedPlaceholder: __(
                "Select Icon",
                "jnext-timeline-blocks"
            ),
        };

        // Check the post type
        const isPost = "post" === attributes.postType;

        // Get the image size options
        const imageSizeOptions = this.imageSizeSelect();

        const imageSizeValue = () => {
            for (let i = 0; i < imageSizeOptions.length; i++) {
              if (imageSizeOptions[i].value === attributes.imageSize) {
                return attributes.imageSize;
              }
            }
            return "full";
        };

        let setPostTimelineContentType = (value) => {
            if(value !== 'post') {
              this.props.setAttributes(attributes.categories = '')
            }
            this.props.setAttributes({ postType: value });
            let excludeRemovedPost = [],
                orderByIncludeIds = [],
                sortedPosts = [];
            
            
            this.props.setAttributes({ excludeRemovedPost });
            this.props.setAttributes({ orderByIncludeIds });
            this.props.setAttributes({ sortedPosts });
            this.props.setAttributes({ orderByIds: false });
        }
        
        let blocklayoutOptions =  [
            {
                value: "left",
                label: __("Left", "jnext-timeline-blocks"),
            },
            {
                value: "right",
                label: __("Right", "jnext-timeline-blocks"),
            },
            {
                value: "center",
                label: __("Both Sided", "jnext-timeline-blocks"),
            },
        ];
        
        return (
            <InspectorControls>
                <PanelBody
                    title = {__( "Jnext Post Timeline Settings", "jnext-timeline-blocks" )}
                    className = {
                        isPost ? null : "jnext-timeline-blocks-hide-query"
                    }
                >
                    <RadioControl
                        label = {__( "Content Type", "jnext-timeline-blocks" )}
                        selected = {attributes.postType}
                        onChange = { ( value ) => setPostTimelineContentType( value )}
                        options = {postTypeOptions}
                    />
                    <QueryControls
                        {...{ order, orderBy }}
                        numberOfItems={attributes.noOfPosts}
                        onNumberOfItemsChange={(value) =>
                            setAttributes( { noOfPosts: value } )
                        }
                    />
                    <SelectControl
                        label = {__( "Order By", "jnext-timeline-blocks" )}
                        value = {attributes.orderBy}
                        onChange = {(value) => setAttributes( { orderBy: value } )}
                        options = {[
                            { value: "date", label: __( "Date", "jnext-timeline-blocks" ) },
                            { value: "title", label: __( "Title", "jnext-timeline-blocks" ) },
                            { value: "rand", label: __( "Random", "jnext-timeline-blocks" ) },
                            { value: "menu_order", label: __( "Menu Order", "jnext-timeline-blocks" ) },
                        ]}
                    />
                    <SelectControl
                        label={__("Order", "jnext-timeline-blocks")}
                        value={attributes.order}
                        onChange={(value) => setAttributes({ order: value })}
                        options={[
                        { value: "desc", label: __("Descending", "jnext-timeline-blocks") },
                        { value: "asc", label: __("Ascending", "jnext-timeline-blocks") },
                        ]}
                    />
                    <RangeControl
                        label = {__(
                            "Number of items to offset",
                            "jnext-timeline-blocks"
                        )}
                        value = {attributes.offset}
                        onChange = { ( value ) => setAttributes( { offset: value } )}
                        min = {0}
                        max = {20}
                    />
                    <RangeControl
                        label = {__(
                            "Item Border Radius",
                            "jnext-timeline-blocks"
                        )}
                        value = {attributes.itemBorderRadius}
                        onChange = { ( value ) => setAttributes( { itemBorderRadius: value } )}
                        min = {0}
                        max = {100}
                        allowReset
                    />

                    <RadioControl
                        label={__("Post Timeline Layout", "jnext-timeline-blocks")}
                        selected={ attributes.postTimelineLayout }
                        onChange={ ( value ) => setAttributes( { postTimelineLayout: value } )}
                        options = {[
                            {
                                value: "vertical",
                                label: __("Vertical", "jnext-timeline-blocks"),
                            },
                            {
                                value: "horizontal",
                                label: __("Horizontal", "jnext-timeline-blocks"),
                            },
                        ]}
                    />
                    {attributes.postTimelineLayout == 'vertical' ? (
                        <PanelBody>
                            <RadioControl
                                label={__("Orientation", "jnext-timeline-blocks")}
                                selected={attributes.timelineAlignment}
                                onChange={(value) => setAttributes({ timelineAlignment: value })}
                                options={[
                                    {
                                        value: "left",
                                        label: __("Left", "jnext-timeline-blocks"),
                                    },
                                    {
                                        value: "right",
                                        label: __("Right", "jnext-timeline-blocks"),
                                    },
                                    {
                                        value: "center",
                                        label: __("Center", "jnext-timeline-blocks"),
                                    },
                                ]} 
                            />
                            <RadioControl
                                label={__("Arrow Alignment", "jnext-timeline-blocks")}
                                selected={attributes.arrowalignment}
                                onChange={(value) => setAttributes({ arrowalignment: value })}
                                options={[
                                    {
                                        value: "top",
                                        label: __("Top", "jnext-timeline-blocks"),
                                    },
                                    {
                                        value: "bottom",
                                        label: __("Bottom", "jnext-timeline-blocks"),
                                    },
                                    {
                                        value: "center",
                                        label: __("Center", "jnext-timeline-blocks"),
                                    },
                                ]} 
                            />
                        </PanelBody>
                    ) : (
                        <PanelBody>
                            <RadioControl
                                label={__("Orientation", "jnext-timeline-blocks")}
                                selected={attributes.timelineAlignment}
                                onChange={(value) => setAttributes({ timelineAlignment: value })}
                                options={[
                                    {
                                        value: "top",
                                        label: __("Top", "jnext-timeline-blocks"),
                                    },
                                    {
                                        value: "bottom",
                                        label: __("Bottom", "jnext-timeline-blocks"),
                                    },
                                    {
                                        value: "center",
                                        label: __("Center", "jnext-timeline-blocks"),
                                    },
                                ]} />
                            <RadioControl
                                label={__("Arrow Alignment", "jnext-timeline-blocks")}
                                selected={attributes.arrowalignment}
                                onChange={(value) => setAttributes({ arrowalignment: value })}
                                options={[
                                    {
                                        value: "left",
                                        label: __("Left", "jnext-timeline-blocks"),
                                    },
                                    {
                                        value: "right",
                                        label: __("Right", "jnext-timeline-blocks"),
                                    },
                                    {
                                        value: "center",
                                        label: __("Center", "jnext-timeline-blocks"),
                                    },
                                ]} />
                        </PanelBody>
                    )}
                    <RadioControl
                        label={__("Stack On", "jnext-timeline-blocks")}
                        selected={attributes.stack}
                        onChange={ ( value ) => setAttributes( { stack: value } )}
                        options={[
                            {
                                value: "none",
                                label: __("None", "jnext-timeline-blocks"),
                            },
                            {
                                value: "tablet",
                                label: __("Tablet", "jnext-timeline-blocks"),
                            },
                            {
                                value: "mobile",
                                label: __("Mobile", "jnext-timeline-blocks"),
                            },
                        ]}
                        help={__(
                            "Note: Choose on what breakpoint the columns will stack.",
                            "jnext-timeline-blocks"
                        )}
                    />
                </PanelBody>
                {attributes.postTimelineLayout == 'horizontal' && (
                    <PanelBody title={__('Slider Setting', 'jnext-timeline-blocks')}
                        initialOpen={false}
                    >
                        <RangeControl
                            label={__("Slide To Show", "jnext-timeline-blocks")}
                            min={1}
                            max={10}
                            step={1}
                            allowReset
                            value={attributes.jnext_s_lick_h__PostToShow}
                            onChange={(value) => setAttributes({ jnext_s_lick_h__PostToShow: value !== undefined ? value : 2 })} />
                        <RangeControl
                            label={__("Slide To Scroll", "jnext-timeline-blocks")}
                            min={0}
                            max={50}
                            step={1}
                            allowReset
                            value={attributes.jnext_s_lick_h__PostToScroll}
                            onChange={(value) => setAttributes({ jnext_s_lick_h__PostToScroll: value !== undefined ? value : 1 })} />
                        <ToggleControl
                            label={__("Auto Play", "jnext-timeline-blocks")}
                            checked={attributes.jnext_s_lick_h__PostAutoplay}
                            onChange={() => this.props.setAttributes({
                                jnext_s_lick_h__PostAutoplay: !attributes.jnext_s_lick_h__PostAutoplay,
                            })} />
                        <TextControl
                            label={__(
                                "Auto Play Speed",
                                "jnext-timeline-blocks"
                            )}
                            type="text"
                            value={attributes.jnext_s_lick_h__PostAutoplaySpeed}
                            onChange={(value) => setAttributes({ jnext_s_lick_h__PostAutoplaySpeed: value })} />

                        {attributes.jnext_s_lick_h__PostToShow == 1 && (
                            <ToggleControl
                                label={__("Fade", "jnext-timeline-blocks")}
                                checked={attributes.jnext_s_lick_h__PostFade}
                                onChange={() => this.props.setAttributes({
                                    jnext_s_lick_h__PostFade: !attributes.jnext_s_lick_h__PostFade,
                                })} 
                            />
                        )}

                        <TextControl
                            label={__(
                                "Speed",
                                "jnext-timeline-blocks"
                            )}
                            type="text"
                            value={attributes.jnext_s_lick_h__PostSpeed}
                            onChange={(value) => setAttributes({ jnext_s_lick_h__PostSpeed: value })} />
                        <ToggleControl
                            label={__("Arrows", "jnext-timeline-blocks")}
                            checked={attributes.jnext_s_lick_h__PostArrows}
                            onChange={() => this.props.setAttributes({
                                jnext_s_lick_h__PostArrows: !attributes.jnext_s_lick_h__PostArrows,
                            })} />
                        <ToggleControl
                            label={__("Dots", "jnext-timeline-blocks")}
                            checked={attributes.jnext_s_lick_h__PostDots}
                            onChange={() => this.props.setAttributes({
                                jnext_s_lick_h__PostDots: !attributes.jnext_s_lick_h__PostDots,
                            })} />
                        <RangeControl
                            label={__("Slider Bottom Spacing", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_h__PostbottomSpacing}
                            onChange={(value) => setAttributes({
                                jnext_s_lick_h__PostbottomSpacing: value !== undefined ? value : 20,
                            })}
                            min={0}
                            max={1000}
                            allowReset />
                    </PanelBody>
                )}
                {attributes.postTimelineLayout == 'horizontal' && attributes.jnext_s_lick_h__PostArrows && (
                    <PanelBody title={__('Arrow Setting', 'jnext-timeline-blocks')}
                    initialOpen={false}
                    >
                        <RangeControl
                            label={__("Arrow Icon Size", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_h__PostIconSize}
                            onChange={(value) => setAttributes({ jnext_s_lick_h__PostIconSize: value !== undefined ? value : 9 })}
                            min={0}
                            max={30}
                            allowReset />
                        <RangeControl
                            label={__("Arrow Icon Height", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_PostIconHeight}
                            onChange={(value) => setAttributes({ jnext_s_lick_PostIconHeight: value !== undefined ? value : 22 })}
                            min={0}
                            max={30}
                            allowReset />
                        <RangeControl
                            label={__("Arrow Icon Background Size", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_PostIconBgsize}
                            onChange={(value) => setAttributes({
                                jnext_s_lick_PostIconBgsize: value !== undefined ? value : 35,
                            })}
                            min={0}
                            max={90}
                            allowReset />
                        <RangeControl
                            label={__("Arrow Icon Border Width", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_PostIconborderwidth}
                            onChange={(value) => setAttributes({ jnext_s_lick_PostIconborderwidth: value !== undefined ? value : 3 })}
                            min={0}
                            max={10}
                            allowReset />
                        <RangeControl
                            label={__("Arrow Icon Border Radius", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_PostIconborderradius}
                            onChange={(value) => setAttributes({ jnext_s_lick_PostIconborderradius: value !== undefined ? value : 0 })}
                            min={0}
                            max={100}
                            allowReset />
                        
                        <PanelBody title={__("Arrow Color Settings", "jnext-timeline-blocks")} initialOpen={false}>
                            <TabPanel
                                className="jtb-inspect-tabs jtb-inspect-tabs-col-2"
                                activeClass="active-tab"
                                tabs={[
                                    {
                                        name: "horizontal-post-normal",
                                        title: __("Normal", "jnext-timeline-blocks"),
                                        className: "jtb-horizontal-post-normal-tab",
                                    },
                                    {
                                        name: "horizontal-post-focus",
                                        title: __("Focus", "jnext-timeline-blocks"),
                                        className: "jtb-horizontal-post-focus-tab",
                                    },
                                ]}
                            >
                            {(tabName) => {
                                let tabout;
                                if ("horizontal-post-focus" === tabName.name) {
                                    tabout = (
                                        <PanelColorSettings
                                            title={__("Arrow Focus Color Settings", "jnext-timeline-blocks")}
                                            initialOpen={true}
                                            colorSettings={[
                                                {
                                                    value: attributes.jnext_s_lick_PostIconFillColor,
                                                    onChange: (colorValue) =>
                                                        setAttributes({ jnext_s_lick_PostIconFillColor: colorValue }),
                                                    label: __("Arrow Color", "jnext-timeline-blocks"),
                                                },
                                                {
                                                    value: attributes.jnext_s_lick_PostFocus_BgColor,
                                                    onChange: (colorValue) =>
                                                        setAttributes({ jnext_s_lick_PostFocus_BgColor: colorValue }),
                                                    label: __("Background Color", "jnext-timeline-blocks"),
                                                },
                                                {
                                                    value: attributes.jnext_s_lick_PostIconBorderFillColor,
                                                    onChange: (colorValue) =>
                                                        setAttributes({ jnext_s_lick_PostIconBorderFillColor: colorValue }),
                                                    label: __("Border Color", "jnext-timeline-blocks"),
                                                },
                                            ]}
                                        ></PanelColorSettings>
                                    );
                                } else {
                                    tabout = (
                                        <PanelColorSettings
                                        title={__("Arrow Color Settings", "jnext-timeline-blocks")}
                                        initialOpen={true}
                                        colorSettings={[
                                            {
                                                value: attributes.jnext_s_lick_PostIconColor,
                                                onChange: (colorValue) =>
                                                    setAttributes({ jnext_s_lick_PostIconColor: colorValue }),
                                                label: __("Arrow Color", "jnext-timeline-blocks"),
                                            },
                                            {
                                                value: attributes.jnext_s_lick_PostBgColor,
                                                onChange: (colorValue) =>
                                                    setAttributes({ jnext_s_lick_PostBgColor: colorValue }),
                                                label: __("Background Color", "jnext-timeline-blocks"),
                                            },
                                            {
                                                value: attributes.jnext_s_lick_PostIconBorderColor,
                                                onChange: (colorValue) =>
                                                    setAttributes({ jnext_s_lick_PostIconBorderColor: colorValue }),
                                                label: __("Border Color", "jnext-timeline-blocks"),
                                            },
                                        ]}
                                        ></PanelColorSettings>
                                    );
                                }
                                return <div>{tabout}</div>;
                            }}
                            </TabPanel>
                        </PanelBody>
                        
                    </PanelBody>
                )}
                {attributes.postTimelineLayout == 'horizontal' && attributes.jnext_s_lick_h__PostDots && (
                    <PanelBody title={__('Dots Setting', 'jnext-timeline-blocks')}
                    initialOpen={false}
                    >
                        <RangeControl
                            label={__("Nav Dot Size", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_PostdotSize}
                            onChange={(value) => setAttributes({ jnext_s_lick_PostdotSize: value !== undefined ? value : 9 })}
                            min={0}
                            max={30}
                            allowReset />
                        <RangeControl
                            label={__("Nav Dot Border Radius", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_Postdotradius}
                            onChange={(value) => setAttributes({ jnext_s_lick_Postdotradius: value !== undefined ? value : 25 })}
                            min={0}
                            max={30}
                            allowReset />
                        <RangeControl
                            label={__("Nav Dot Background Size", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_PostdotBgsize}
                            onChange={(value) => setAttributes({
                                jnext_s_lick_PostdotBgsize: value !== undefined ? value : 10,
                            })}
                            min={0}
                            max={90}
                            allowReset />
                        <RangeControl
                            label={__("Nav Dot Background Border Width", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_Postdotborderwidth}
                            onChange={(value) => setAttributes({ jnext_s_lick_Postdotborderwidth: value !== undefined ? value : 3 })}
                            min={0}
                            max={10}
                            allowReset />
                        <RangeControl
                            label={__("Nav Dot Background Border Radius", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_Postdotborderradius}
                            onChange={(value) => setAttributes({ jnext_s_lick_Postdotborderradius: value !== undefined ? value : 25 })}
                            min={0}
                            max={100}
                            allowReset />
                        <RangeControl
                            label={__("Nav Dot Background Spacing", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_PostdotBGSpacing}
                            onChange={(value) => setAttributes({ jnext_s_lick_PostdotBGSpacing: value !== undefined ? value : 0 })}
                            min={0}
                            max={100}
                            allowReset />
                        <RangeControl
                            label={__("Nav Dot Opacity", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_PostdotOpacity}
                            onChange={(value) => setAttributes({ jnext_s_lick_PostdotOpacity: value !== undefined ? value : 0.75 })}
                            min={0}
                            max={1}
                            allowReset />
                        <RangeControl
                            label={__("Focus Nav Dot Opacity", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_PostdotFocusOpacity}
                            onChange={(value) => setAttributes({ jnext_s_lick_PostdotFocusOpacity: value !== undefined ? value : 1 })}
                            min={0}
                            max={1}
                            allowReset />
                        <PanelBody title={__("Dot Color Settings", "jnext-timeline-blocks")} initialOpen={false}>
                            <TabPanel
                                className="jtb-inspect-tabs jtb-inspect-tabs-col-2"
                                activeClass="active-tab"
                                tabs={[
                                    {
                                        name: "horizontal-dot-normal",
                                        title: __("Normal", "jnext-timeline-blocks"),
                                        className: "jtb-horizontal-dot-normal-tab",
                                    },
                                    {
                                        name: "horizontal-dot-focus",
                                        title: __("Focus", "jnext-timeline-blocks"),
                                        className: "jtb-horizontal-dot-focus-tab",
                                    },
                                ]}
                            >
                            {(tabName) => {
                                let tabout;
                                if ("horizontal-dot-focus" === tabName.name) {
                                    tabout = (
                                        <PanelColorSettings
                                            title={__("Dot Focus Color Settings", "jnext-timeline-blocks")}
                                            initialOpen={true}
                                            colorSettings={[
                                                {
                                                    value: attributes.jnext_s_lick_PostdotFillColor,
                                                    onChange: (colorValue) =>
                                                        setAttributes({ jnext_s_lick_PostdotFillColor: colorValue }),
                                                    label: __("Dot Color", "jnext-timeline-blocks"),
                                                },
                                                {
                                                    value: attributes.jnext_s_lick_PostDotFocusBgColor,
                                                    onChange: (colorValue) =>
                                                        setAttributes({ jnext_s_lick_PostDotFocusBgColor: colorValue }),
                                                    label: __("Dot Background Color", "jnext-timeline-blocks"),
                                                },
                                                {
                                                    value: attributes.jnext_s_lick_PostdotBorderFillColor,
                                                    onChange: (colorValue) =>
                                                        setAttributes({ jnext_s_lick_PostdotBorderFillColor: colorValue }),
                                                    label: __("Dot Background Border Color", "jnext-timeline-blocks"),
                                                },
                                            ]}
                                        ></PanelColorSettings>
                                    );
                                } else {
                                    tabout = (
                                        <PanelColorSettings
                                        title={__("Dot Color Settings", "jnext-timeline-blocks")}
                                        initialOpen={true}
                                        colorSettings={[
                                            {
                                                value: attributes.jnext_s_lick_PostdotColor,
                                                onChange: (colorValue) =>
                                                    setAttributes({ jnext_s_lick_PostdotColor: colorValue }),
                                                label: __("Dot Color", "jnext-timeline-blocks"),
                                            },
                                            {
                                                value: attributes.jnext_s_lick_PostdotBgColor,
                                                onChange: (colorValue) =>
                                                    setAttributes({ jnext_s_lick_PostdotBgColor: colorValue }),
                                                label: __("Dot Background Color", "jnext-timeline-blocks"),
                                            },
                                            {
                                                value: attributes.jnext_s_lick_PostdotBorderColor,
                                                onChange: (colorValue) =>
                                                    setAttributes({ jnext_s_lick_PostdotBorderColor: colorValue }),
                                                label: __("Dot Background Border Color", "jnext-timeline-blocks"),
                                            },
                                        ]}
                                        ></PanelColorSettings>
                                    );
                                }
                                return <div>{tabout}</div>;
                            }}
                            </TabPanel>
                        </PanelBody>
                        
                    </PanelBody>
                )}
                <PanelBody
                    title = {__( "Jnext Post Timeline Content", "jnext-timeline-blocks" )}
                    initialOpen = {false}
                >
                    <ToggleControl
                        label = {__(
                            "Display Post Featured Image",
                            "jnext-timeline-blocks"
                        )}
                        checked = {attributes.displayPostImage}
                        onChange = {() =>
                            this.props.setAttributes({
                                displayPostImage: !attributes.displayPostImage,
                            })
                        }
                    />
                    {attributes.displayPostImage && (
                        <SelectControl
                            label = {__("Post Featured Image Size", "jnext-timeline-blocks")}
                            value = {imageSizeValue()}
                            options = {imageSizeOptions}
                            onChange = {(value) =>
                                this.props.setAttributes({
                                    imageSize: value,
                                })
                            }
                        />
                    )}
                    <ToggleControl
                        label = {__("Display Post Title", "jnext-timeline-blocks")}
                        checked = {attributes.displayPostTitle}
                        onChange = {() =>
                            this.props.setAttributes({
                                displayPostTitle: !attributes.displayPostTitle,
                            })
                        }
                    />
                    {isPost && (
                        <ToggleControl
                            label = {__("Display Post Author", "jnext-timeline-blocks")}
                            checked = {attributes.displayPostAuthor}
                            onChange = {() =>
                                this.props.setAttributes({
                                    displayPostAuthor: !attributes.displayPostAuthor,
                                })
                            }
                        />
                    )}
                    {isPost && (
                        <ToggleControl
                            label = {__("Display Post Date", "jnext-timeline-blocks")}
                            checked = {attributes.displayPostDate}
                            onChange = {() =>
                                this.props.setAttributes({
                                    displayPostDate: !attributes.displayPostDate,
                                })
                            }
                        />
                    )}
                    <ToggleControl
                        label = {__("Display Post Excerpt", "jnext-timeline-blocks")}
                        checked = {attributes.displayPostExcerpt}
                        onChange = {() =>
                            this.props.setAttributes({
                                displayPostExcerpt: !attributes.displayPostExcerpt,
                            })
                        }
                    />
                    {attributes.displayPostExcerpt && (
                        <RangeControl
                            label = {__("Post Excerpt Length", "jnext-timeline-blocks")}
                            value = {attributes.excerptLength}
                            onChange = { ( value ) => setAttributes({ excerptLength: value })}
                            min = {0}
                            max = {150}
                        />
                    )}
                    <ToggleControl
                        label = {__(
                            "Display Read More Link",
                            "jnext-timeline-blocks"
                        )}
                        checked = {attributes.displayPostLink}
                        onChange = {() =>
                            this.props.setAttributes({
                                displayPostLink: !attributes.displayPostLink,
                            })
                        }
                    />
                    {attributes.displayPostLink && (
                        <Fragment>
                            <TextControl
                                label = {__(
                                    "Customize Read More Text",
                                    "jnext-timeline-blocks"
                                )}
                                type = "text"
                                value = {attributes.readmoreText}
                                onChange = { ( value ) => setAttributes({ readmoreText: value })}
                            />
                            <ToggleControl
                                label = {__(
                                    "Open post in new tab",
                                    "jnext-timeline-blocks"
                                )}
                                checked = {attributes.displayTarget}
                                onChange = {() => {
                                    this.props.setAttributes({ displayTarget: !attributes.displayTarget });
                                }}
                            />
                        </Fragment>
                    )}
                </PanelBody>
                <PanelBody
                    title = {__("Block Typography", "jnext-timeline-blocks")}
                    initialOpen = {false}
                >
                    <PanelBody 
                        title = {__("Post Title Typography", "jnext-timeline-blocks")}
                        initialOpen = {false}
                    >
                        <SelectControl
                            label = {__("Tag", "jnext-timeline-blocks")}
                            options = {headingTagOptions}
                            value = {attributes.headingTag}
                            onChange = { (value) => setAttributes({ headingTag: value }) }
                        />
                        <SelectControl
                            label = {__("Font Family", "jnext-timeline-blocks")}
                            options = {JnextTbfontOptions}
                            value = {attributes.headingFontfamily}
                            onChange = {(value) => {
                                setAttributes({ headingFontfamily: value }),
                                loadGoogleFont(value);
                            }}
                        />
                        <RangeControl 
                            label = {__("Font Size", "jnext-timeline-blocks")}
                            min = {0}
                            max = {50}
                            step = {1}
                            value = {attributes.headingFontsize}
                            onChange = { (value) => setAttributes({ headingFontsize: value !== undefined ? value : 20 }) }
                            allowReset
                        />
                        <SelectControl
                            label = {__("Font Weight", "jnext-timeline-blocks")}
                            options = {fontWeightOptions}
                            value = {attributes.headingFontweight}
                            onChange = { (value) => setAttributes({ headingFontweight: value, }) }
                        />
                        <RangeControl
                            label = {__("Line Height", "jnext-timeline-blocks")}
                            value = {attributes.headingLineheight}
                            onChange = { (value) => setAttributes({ headingLineheight: value !== undefined ? value : 1 }) }
                            min = {0}
                            max = {100}
                            step = {1}
                            allowReset
                        />
                        <RangeControl
                            label={__(
                                "Bottom Margin",
                                "jnext-timeline-blocks"
                            )}
                            value={attributes.headingBottomSpace}
                            onChange={(value) =>
                                setAttributes({
                                    headingBottomSpace: value !== undefined ? value : 15,
                                })
                            }
                            min={0}
                            max={50}
                            step={1}
                            allowReset
                        />
                    </PanelBody>
                    <PanelBody 
                        title = {__("Post Author Typography", "jnext-timeline-blocks")}
                        initialOpen = {false}
                    >
                        <SelectControl
                            label = {__("Font Family", "jnext-timeline-blocks")}
                            options = {JnextTbfontOptions}
                            value = {attributes.authorFontfamily}
                            onChange = {(value) => {
                                setAttributes({ authorFontfamily: value }),
                                loadGoogleFont(value);
                            }}
                        />
                        <RangeControl 
                            label = {__("Font Size", "jnext-timeline-blocks")}
                            min = {0}
                            max = {50}
                            step = {1}
                            value = {attributes.authorFontsize}
                            onChange = { (value) => setAttributes({ authorFontsize: value !== undefined ? value : 20 }) }
                            allowReset
                        />
                        <SelectControl
                            label = {__("Font Weight", "jnext-timeline-blocks")}
                            options = {fontWeightOptions}
                            value = {attributes.authorFontweight}
                            onChange = { (value) => setAttributes({ authorFontweight: value, }) }
                        />
                        <RangeControl
                            label = {__("Line Height", "jnext-timeline-blocks")}
                            value = {attributes.authorLineheight}
                            onChange = { (value) => setAttributes({ authorLineheight: value !== undefined ? value : 1 }) }
                            min = {0}
                            max = {100}
                            step = {1}
                            allowReset
                        />
                        <RangeControl
                            label={__(
                                "Bottom Margin",
                                "jnext-timeline-blocks"
                            )}
                            value={attributes.authorBottomSpace}
                            onChange={(value) =>
                                setAttributes({
                                    authorBottomSpace: value !== undefined ? value : 15,
                                })
                            }
                            min={0}
                            max={50}
                            step={1}
                            allowReset
                        />
                    </PanelBody>
                    <PanelBody 
                        title = {__("Post Content Typography", "jnext-timeline-blocks")}
                        initialOpen = {false}
                    >
                        <SelectControl
                            label = {__("Font Family", "jnext-timeline-blocks")}
                            options = {JnextTbfontOptions}
                            value = {attributes.contentFontfamily}
                            onChange = {(value) => {
                                setAttributes({ contentFontfamily: value }),
                                loadGoogleFont(value);
                            }}
                        />
                        <RangeControl 
                            label = {__("Font Size", "jnext-timeline-blocks")}
                            min = {0}
                            max = {50}
                            step = {1}
                            value = {attributes.contentFontsize}
                            onChange = { (value) => setAttributes({ contentFontsize: value !== undefined ? value : 20 }) }
                            allowReset
                        />
                        <SelectControl
                            label = {__("Font Weight", "jnext-timeline-blocks")}
                            options = {fontWeightOptions}
                            value = {attributes.contentFontweight}
                            onChange = { (value) => setAttributes({ contentFontweight: value, }) }
                        />
                        <RangeControl
                            label = {__("Line Height", "jnext-timeline-blocks")}
                            value = {attributes.contentLineheight}
                            onChange = { (value) => setAttributes({ contentLineheight: value !== undefined ? value : 1 }) }
                            min = {0}
                            max = {100}
                            step = {1}
                            allowReset
                        />
                        <RangeControl
                            label={__(
                                "Bottom Margin",
                                "jnext-timeline-blocks"
                            )}
                            value={attributes.excerptBottomSpace}
                            onChange={(value) =>
                                setAttributes({
                                    excerptBottomSpace: value !== undefined ? value : 15,
                                })
                            }
                            min={0}
                            max={50}
                            step={1}
                            allowReset
                        />
                    </PanelBody>
                    <PanelBody 
                        title = {__("Post Date Typography", "jnext-timeline-blocks")}
                        initialOpen = {false}
                    >
                        <SelectControl
                            label = {__("Font Family", "jnext-timeline-blocks")}
                            options = {JnextTbfontOptions}
                            value = {attributes.dateFontfamily}
                            onChange = {(value) => {
                                setAttributes({ dateFontfamily: value }),
                                loadGoogleFont(value);
                            }}
                        />
                        <RangeControl 
                            label = {__("Font Size", "jnext-timeline-blocks")}
                            min = {0}
                            max = {50}
                            step = {1}
                            value = {attributes.dateFontsize}
                            onChange = { (value) => setAttributes({ dateFontsize: value !== undefined ? value : 20 }) }
                            allowReset
                        />
                        <SelectControl
                            label = {__("Font Weight", "jnext-timeline-blocks")}
                            options = {fontWeightOptions}
                            value = {attributes.dateFontweight}
                            onChange = { (value) => setAttributes({ dateFontweight: value, }) }
                        />
                        <RangeControl
                            label = {__("Line Height", "jnext-timeline-blocks")}
                            value = {attributes.dateLineheight}
                            onChange = { (value) => setAttributes({ dateLineheight: value !== undefined ? value : 1 }) }
                            min = {0}
                            max = {100}
                            step = {1}
                            allowReset
                        />
                    </PanelBody>
                    <PanelBody 
                        title = {__("Post Read More Typography", "jnext-timeline-blocks")}
                        initialOpen = {false}
                    >
                        <SelectControl
                            label = {__("Font Family", "jnext-timeline-blocks")}
                            options = {JnextTbfontOptions}
                            value = {attributes.readmoreFontfamily}
                            onChange = {(value) => {
                                setAttributes({ readmoreFontfamily: value }),
                                loadGoogleFont(value);
                            }}
                        />
                        <RangeControl 
                            label = {__("Font Size", "jnext-timeline-blocks")}
                            min = {0}
                            max = {50}
                            step = {1}
                            value = {attributes.readmoreFontsize}
                            onChange = { (value) => setAttributes({ readmoreFontsize: value !== undefined ? value : 20 }) }
                            allowReset
                        />
                        <SelectControl
                            label = {__("Font Weight", "jnext-timeline-blocks")}
                            options = {fontWeightOptions}
                            value = {attributes.readmoreFontweight}
                            onChange = { (value) => setAttributes({ readmoreFontweight: value, }) }
                        />
                        <RangeControl
                            label = {__("Line Height", "jnext-timeline-blocks")}
                            value = {attributes.readmoreLineheight}
                            onChange = { (value) => setAttributes({ readmoreLineheight: value !== undefined ? value : 1 }) }
                            min = {0}
                            max = {100}
                            step = {1}
                            allowReset
                        />
                        <RangeControl 
                            label = {__("Border Width", "jnext-timeline-blocks")}
                            min = {0}
                            max = {50}
                            step = {1}
                            value = {attributes.readmoreBorderwidth}
                            onChange = { (value) => setAttributes({ readmoreBorderwidth: value !== undefined ? value : 1 }) }
                            allowReset
                        />
                        <PanelBody
                            title={__("CTA Color Settings", "jnext-timeline-blocks")}
                            initialOpen={false}
                            >
                            <TabPanel
                                className="jnext-timeline-blocks-inspect-tabs jnext-timeline-blocks-inspect-tabs-col-2"
                                activeClass="active-tab"
                                tabs={[
                                {
                                    name: "normal",
                                    title: __("Normal"),
                                    className: "jnext-timeline-blocks-normal-tab",
                                },
                                {
                                    name: "hover",
                                    title: __("Hover"),
                                    className: "jnext-timeline-blocks-hover-tab",
                                },
                                ]}
                            >
                                {(tabName) => {
                                    let readMore_btn_color_tab;
                                    if ("normal" === tabName.name) {
                                        readMore_btn_color_tab = (
                                            <Fragment>
                                                <p className="jnext-timeline-blocks-setting-label">
                                                {__(
                                                    "Read More Text Color",
                                                    "jnext-timeline-blocks"
                                                )}
                                                <span className="components-base-control__label">
                                                    <span
                                                    className="component-color-indicator"
                                                    style={{ color: attributes.readmoreColor }}
                                                    ></span>
                                                </span>
                                                </p>
                                                <ColorPalette
                                                    value={attributes.readmoreColor}
                                                    onChange={(value) =>
                                                        this.props.setAttributes({ readmoreColor: value })
                                                    }
                                                    allowReset
                                                />
                                                <p className="jnext-timeline-blocks-setting-label">
                                                {__(
                                                    "Read More Background Color",
                                                    "jnext-timeline-blocks"
                                                )}
                                                <span className="components-base-control__label">
                                                    <span
                                                    className="component-color-indicator"
                                                    style={{ color: attributes.readmoreBackgroundColor }}
                                                    ></span>
                                                </span>
                                                </p>
                                                <ColorPalette
                                                    value={attributes.readmoreBackgroundColor}
                                                    onChange={(value) =>
                                                        this.props.setAttributes({ readmoreBackgroundColor: value })
                                                    }
                                                    allowReset
                                                />
                                                <p className="jnext-timeline-blocks-setting-label">
                                                    {__(
                                                        "Read More Border Color",
                                                        "jnext-timeline-blocks"
                                                    )}
                                                    <span className="components-base-control__label">
                                                        <span
                                                        className="component-color-indicator"
                                                        style={{ color: attributes.readmoreBorderColor }}
                                                        ></span>
                                                    </span>
                                                </p>
                                                <ColorPalette
                                                    value={attributes.readmoreBorderColor}
                                                    onChange={(value) =>
                                                        this.props.setAttributes({ readmoreBorderColor: value })
                                                    }
                                                    allowReset
                                                />
                                            </Fragment>
                                        );
                                    } else {
                                        readMore_btn_color_tab = (
                                            <Fragment>
                                                <p className="jnext-timeline-blocks-setting-label">
                                                    {__(
                                                        "Read More Text Hover Color",
                                                        "jnext-timeline-blocks"
                                                    )}
                                                    <span className="components-base-control__label">
                                                        <span
                                                        className="component-color-indicator"
                                                        style={{ color: attributes.readmoreHoverColor }}
                                                        ></span>
                                                    </span>
                                                </p>
                                                <ColorPalette
                                                    value={attributes.readmoreHoverColor}
                                                    onChange={(value) =>
                                                        this.props.setAttributes({ readmoreHoverColor: value })
                                                    }
                                                    allowReset
                                                />
                                                <p className="jnext-timeline-blocks-setting-label">
                                                {__(
                                                    "Read More Background Hover Color",
                                                    "jnext-timeline-blocks"
                                                )}
                                                <span className="components-base-control__label">
                                                    <span
                                                        className="component-color-indicator"
                                                        style={{ color: attributes.readmoreHoverBackgroundColor }}
                                                    ></span>
                                                </span>
                                                </p>
                                                <ColorPalette
                                                    value={attributes.readmoreHoverBackgroundColor}
                                                    onChange={(value) =>
                                                        this.props.setAttributes({
                                                            readmoreHoverBackgroundColor: value,
                                                        })
                                                    }
                                                    allowReset
                                                />
                                                <p className="jnext-timeline-blocks-setting-label">
                                                    {__(
                                                        "Read More Border Hover Color",
                                                        "jnext-timeline-blocks"
                                                    )}
                                                    <span className="components-base-control__label">
                                                        <span
                                                        className="component-color-indicator"
                                                        style={{ borderColor: attributes.readmoreHoverBorderColor }}
                                                        ></span>
                                                    </span>
                                                </p>
                                                <ColorPalette
                                                    value={attributes.readmoreHoverBorderColor}
                                                    onChange={(value) =>
                                                        this.props.setAttributes({ readmoreHoverBorderColor: value })
                                                    }
                                                    allowReset
                                                />
                                            </Fragment>
                                        );
                                    }
                                    return <div>{readMore_btn_color_tab}</div>;
                                }}
                            </TabPanel>
                        </PanelBody>
                    </PanelBody>
                </PanelBody>
                <PanelBody
                    title = {__("Icon & Connector Settings", "jnext-timeline-blocks")}
                    initialOpen = {false}
                    >
                    <FontIconPicker {...block_icon_props} />

                    <RangeControl
                        label = {__("Icon Size", "jnext-timeline-blocks")}
                        value = {attributes.iconSize}
                        onChange = {(value) =>
                            setAttributes({ iconSize: value !== undefined ? value : 20 })
                        }
                        min = {0}
                        max = {30}
                        allowReset
                    />
                    <RangeControl
                        label = {__("Icon Background Size", "jnext-timeline-blocks")}
                        value = {attributes.iconBackgroundSize}
                        onChange = {(value) =>
                            setAttributes({
                                iconBackgroundSize: value !== undefined ? value : 35,
                            })
                        }
                        min = {25}
                        max = {90}
                        allowReset
                    />
                    <RangeControl
                        label = {__("Icon Border Width", "jnext-timeline-blocks")}
                        value = {attributes.iconBorderWidth}
                        onChange = {(value) =>
                            setAttributes({ iconBorderWidth: value !== undefined ? value : 1 })
                        }
                        min = {1}
                        max = {10}
                        allowReset
                    />
                    <RangeControl
                        label = {__("Icon Border Radius", "jnext-timeline-blocks")}
                        value = {attributes.iconBorderRadius}
                        onChange = {(value) =>
                            setAttributes({ iconBorderRadius: value !== undefined ? value : 0 })
                        }
                        min = {0}
                        max = {100}
                        allowReset
                    />
                    <RangeControl
                        label = {__("Connector Width", "jnext-timeline-blocks")}
                        value = {attributes.sepratorWidth}
                        onChange = {(value) =>
                            setAttributes({ sepratorWidth: value !== undefined ? value : 3 })
                        }
                        min = {1}
                        max = {10}
                        allowReset
                    />
                    <PanelBody title = {__("Connector Color Settings", "jnext-timeline-blocks")} initialOpen = {false}>
                        <TabPanel
                        className = "jtb-inspect-tabs jtb-inspect-tabs-col-2"
                        activeClass = "active-tab"
                        tabs = {[
                            {
                                name: "normal",
                                title: __("Normal", "jnext-timeline-blocks"),
                                className: "jtb-normal-tab",
                            },
                            {
                                name: "focus",
                                title: __("Focus", "jnext-timeline-blocks"),
                                className: "jtb-focus-tab",
                            },
                        ]}
                        >
                        {(tabName) => {
                            let tabout;
                            if ("focus" === tabName.name) {
                            tabout = (
                                <PanelColorSettings
                                    title = {__("Jnext Timeline Color Settings", "jnext-timeline-blocks")}
                                    initialOpen = {true}
                                    colorSettings = {[
                                        {
                                            value: attributes.sepratorFocusColor,
                                            onChange: (colorValue) =>
                                                setAttributes({ sepratorFocusColor: colorValue }),
                                            label: __("Timeline Line Color", "jnext-timeline-blocks"),
                                        },
                                        {
                                            value: attributes.iconFocusColor,
                                            onChange: (colorValue) =>
                                                setAttributes({ iconFocusColor: colorValue }),
                                            label: __("Timeline Icon Color", "jnext-timeline-blocks"),
                                        },
                                        {
                                            value: attributes.iconFocusBackgroundColor,
                                            onChange: (colorValue) =>
                                                setAttributes({ iconFocusBackgroundColor: colorValue }),
                                            label: __("Timeline Background Color", "jnext-timeline-blocks"),
                                        },
                                        {
                                            value: attributes.iconFocusBorderColor,
                                            onChange: (colorValue) =>
                                                setAttributes({ iconFocusBorderColor: colorValue }),
                                            label: __("Timeline Border Color", "jnext-timeline-blocks"),
                                        },
                                    ]}
                                ></PanelColorSettings>
                            );
                            } else {
                                tabout = (
                                    <PanelColorSettings
                                    title = {__("Jnext Timeline Color Settings", "jnext-timeline-blocks")}
                                    initialOpen = {true}
                                    colorSettings = {[
                                        {
                                            value: attributes.sepratorColor,
                                            onChange: (colorValue) =>
                                                setAttributes({ sepratorColor: colorValue }),
                                            label: __("Timeline Line Color", "jnext-timeline-blocks"),
                                        },
                                        {
                                            value: attributes.iconColor,
                                            onChange: (colorValue) =>
                                                setAttributes({ iconColor: colorValue }),
                                            label: __("Timeline Icon Color", "jnext-timeline-blocks"),
                                        },
                                        {
                                            value: attributes.iconBackgroundColor,
                                            onChange: (colorValue) =>
                                                setAttributes({ iconBackgroundColor: colorValue }),
                                            label: __("Timeline Background Color", "jnext-timeline-blocks"),
                                        },
                                        {
                                            value: attributes.iconBorderColor,
                                            onChange: (colorValue) =>
                                                setAttributes({ iconBorderColor: colorValue }),
                                            label: __("Timeline Border Color", "jnext-timeline-blocks"),
                                        },
                                    ]}
                                    ></PanelColorSettings>
                                );
                            }
                            return <div>{tabout}</div>;
                        }}
                        </TabPanel>
                    </PanelBody>
                </PanelBody>
                <PanelBody
                    title = {__("Spacing", "jnext-timeline-blocks")}
                    initialOpen = {false}
                >
                    <RangeControl
                        label = {__("Vertical Space", "jnext-timeline-blocks")}
                        value = {attributes.verticalSpace}
                        onChange = { (value) => this.props.setAttributes({ verticalSpace: value })}
                        min = {0}
                        max = {100}
                    />
                    <RangeControl
                        label = {__("Horizontal Space", "jnext-timeline-blocks")}
                        value = {attributes.horizontalSpace}
                        onChange = { (value) => this.props.setAttributes({ horizontalSpace: value })}
                        min = {0}
                        max = {50}
                    />
                </PanelBody>
                <PanelBody
                    title={__("Read More Button Box Shadow", "jnext-timeline-blocks")}
                    initialOpen={false}
                    >
                    <BoxShadowControl
                        setAttributes = {setAttributes}
                        label = {__("Box Shadow")}
                        boxshadowColor = {{
                            value: attributes.boxshadowColor,
                            label: __("Color"),
                        }}
                        boxshadowHorizontal = {{
                            value: attributes.boxshadowHorizontal,
                            label: __("Horizontal"),
                        }}
                        boxshadowVertical = {{
                            value: attributes.boxshadowVertical,
                            label: __("Vertical"),
                        }}
                        boxshadowBlur = {{
                            value: attributes.boxshadowBlur,
                            label: __("Blur"),
                        }}
                        boxshadowSpread = {{
                            value: attributes.boxshadowSpread,
                            label: __("Spread"),
                        }}
                        boxshadowPosition = {{
                            value: attributes.boxshadowPosition,
                            label: __("Position"),
                        }}
                    />
                </PanelBody>
            </InspectorControls>
        );
    }
}