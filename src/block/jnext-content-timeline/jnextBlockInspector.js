import IconRender from "../../Icons/IconRender";
import JnextBlocksIcons from "../../Icons/JnextBlocksIcons.json";
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import JnextTbfontOptions from "../../fonts/GoogleFonts";
import { loadGoogleFont  } from "../../fonts/JTb_font";

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

// Import block components
const { InspectorControls, PanelColorSettings } = wp.blockEditor;

// Import Inspector components
const { RangeControl, PanelBody, TabPanel, RadioControl, SelectControl, ToggleControl, TextControl } = wp.components;


let jnextblockicons = Object.keys(JnextBlocksIcons);
/**
 * Executes inspector container
 */
 export class InspectorContainer extends Component {
    render() {
        const {
            containerMaxWidth,
            setAttributes,
        } = this.props;
        return (
            <Fragment>
            
              
            </Fragment>
        );
    }
}

/**
 * Create an Inspector Controls wrapper Component for Post Timeline Block
 */
export default class JnextBlockInspector extends Component {
    constructor() {
        super(...arguments);
        this.getIfbIcon = this.getIfbIcon.bind(this);
    }

    getIfbIcon(value) {
        this.props.setAttributes({ icon: value });
    }

    render(){

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
        
        // Update color value
        const onChangeDateColor = (value) => setAttributes({ dateColor: value });
        const onChangeBackgroundColor = (value) => setAttributes({ backgroundColor: value });
        const onChangeHeadingColor = (value) => setAttributes({ headingColor: value });
        const onChangeContentColor = (value) => setAttributes({ contentColor: value });

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

        const {
            className,
            attributes,
            setAttributes,
            isSelected,
        } = this.props;

        return(
            <InspectorControls>
                <PanelBody
                    title={ __( 'General Settings', 'jnext-timeline-blocks' ) }
                    initialOpen={ false }
                >
                    <RadioControl
                        label={__("Layout", "jnext-timeline-blocks")}
                        selected={ attributes.timelineLayout }
                        onChange={ ( value ) => setAttributes( { timelineLayout: value } )}
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
                    {attributes.timelineLayout == 'vertical' ? (
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
                                selected={attributes.arrowAlignment}
                                onChange={(value) => setAttributes({ arrowAlignment: value })}
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
                                selected={attributes.arrowAlignment}
                                onChange={(value) => setAttributes({ arrowAlignment: value })}
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
                {attributes.timelineLayout == 'horizontal' && (
                    <PanelBody title={__('Slider Setting', 'jnext-timeline-blocks')}
                        initialOpen={false}
                    >
                        <RangeControl
                            label={__("Slide To Show", "jnext-timeline-blocks")}
                            min={1}
                            max={10}
                            step={1}
                            allowReset
                            value={attributes.jnext_s_lick_slideToShow}
                            onChange={(value) => setAttributes({ jnext_s_lick_slideToShow: value !== undefined ? value : 2 })} />
                        <RangeControl
                            label={__("Slide To Scroll", "jnext-timeline-blocks")}
                            min={0}
                            max={50}
                            step={1}
                            allowReset
                            value={attributes.jnext_s_lick_slideToScroll}
                            onChange={(value) => setAttributes({ jnext_s_lick_slideToScroll: value !== undefined ? value : 1 })} />
                        <ToggleControl
                            label={__("Auto Play", "jnext-timeline-blocks")}
                            checked={attributes.jnext_s_lick_autoplay}
                            onChange={() => this.props.setAttributes({
                                jnext_s_lick_autoplay: !attributes.jnext_s_lick_autoplay,
                            })} />
                        <TextControl
                            label={__(
                                "Auto Play Speed",
                                "jnext-timeline-blocks"
                            )}
                            type="text"
                            value={attributes.jnext_s_lick_autoplaySpeed}
                            onChange={(value) => setAttributes({ jnext_s_lick_autoplaySpeed: value })} />
                        {attributes.jnext_s_lick_slideToShow == 1 && (
                            <ToggleControl
                                label={__("Fade", "jnext-timeline-blocks")}
                                checked={attributes.jnext_s_lick_fade}
                                onChange={() => this.props.setAttributes({
                                    jnext_s_lick_fade: !attributes.jnext_s_lick_fade,
                                })} 
                            />
                        )}
                        <TextControl
                            label={__(
                                "Speed",
                                "jnext-timeline-blocks"
                            )}
                            type="text"
                            value={attributes.jnext_s_lick_Speed}
                            onChange={(value) => setAttributes({ jnext_s_lick_Speed: value })} />
                        <ToggleControl
                            label={__("Arrows", "jnext-timeline-blocks")}
                            checked={attributes.jnext_s_lick_arrows}
                            onChange={() => this.props.setAttributes({
                                jnext_s_lick_arrows: !attributes.jnext_s_lick_arrows,
                            })} />
                        <ToggleControl
                            label={__("Dots", "jnext-timeline-blocks")}
                            checked={attributes.jnext_s_lick_dots}
                            onChange={() => this.props.setAttributes({
                                jnext_s_lick_dots: !attributes.jnext_s_lick_dots,
                            })} />
                        <RangeControl
                            label={__("Slider Bottom Spacing", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_sliderBottomSpacing}
                            onChange={(value) => setAttributes({
                                jnext_s_lick_sliderBottomSpacing: value !== undefined ? value : 20,
                            })}
                            min={0}
                            max={1000}
                            allowReset />
                    </PanelBody>
                )}
                {attributes.timelineLayout == 'horizontal' && attributes.jnext_s_lick_arrows && (
                    <PanelBody title={__('Arrow Setting', 'jnext-timeline-blocks')}
                    initialOpen={false}
                    >
                        <RangeControl
                            label={__("Arrow Icon Size", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_iconSize}
                            onChange={(value) => setAttributes({ jnext_s_lick_iconSize: value !== undefined ? value : 9 })}
                            min={0}
                            max={30}
                            allowReset />
                        <RangeControl
                            label={__("Arrow Icon Height", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_iconHeight}
                            onChange={(value) => setAttributes({ jnext_s_lick_iconHeight: value !== undefined ? value : 22 })}
                            min={0}
                            max={30}
                            allowReset />
                        <RangeControl
                            label={__("Arrow Icon Background Size", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_iconBgsize}
                            onChange={(value) => setAttributes({
                                jnext_s_lick_iconBgsize: value !== undefined ? value : 35,
                            })}
                            min={0}
                            max={90}
                            allowReset />
                        <RangeControl
                            label={__("Arrow Icon Border Width", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_iconborderwidth}
                            onChange={(value) => setAttributes({ jnext_s_lick_iconborderwidth: value !== undefined ? value : 3 })}
                            min={0}
                            max={10}
                            allowReset />
                        <RangeControl
                            label={__("Arrow Icon Border Radius", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_iconborderradius}
                            onChange={(value) => setAttributes({ jnext_s_lick_iconborderradius: value !== undefined ? value : 0 })}
                            min={0}
                            max={100}
                            allowReset />
                        
                        <PanelBody title={__("Arrow Color Settings", "jnext-timeline-blocks")} initialOpen={false}>
                            <TabPanel
                                className="jtb-inspect-tabs jtb-inspect-tabs-col-2"
                                activeClass="active-tab"
                                tabs={[
                                    {
                                        name: "horizontal-normal",
                                        title: __("Normal", "jnext-timeline-blocks"),
                                        className: "jtb-horizontal-normal-tab",
                                    },
                                    {
                                        name: "horizontal-focus",
                                        title: __("Focus", "jnext-timeline-blocks"),
                                        className: "jtb-horizontal-focus-tab",
                                    },
                                ]}
                            >
                            {(tabName) => {
                                let tabout;
                                if ("horizontal-focus" === tabName.name) {
                                    tabout = (
                                        <PanelColorSettings
                                            title={__("Arrow Focus Color Settings", "jnext-timeline-blocks")}
                                            initialOpen={true}
                                            colorSettings={[
                                                {
                                                    value: attributes.jnext_s_lick_iconFillColor,
                                                    onChange: (colorValue) =>
                                                        setAttributes({ jnext_s_lick_iconFillColor: colorValue }),
                                                    label: __("Arrow Color", "jnext-timeline-blocks"),
                                                },
                                                {
                                                    value: attributes.jnext_s_lick_Focus_BgColor,
                                                    onChange: (colorValue) =>
                                                        setAttributes({ jnext_s_lick_Focus_BgColor: colorValue }),
                                                    label: __("Background Color", "jnext-timeline-blocks"),
                                                },
                                                {
                                                    value: attributes.jnext_s_lick_iconBorderFillColor,
                                                    onChange: (colorValue) =>
                                                        setAttributes({ jnext_s_lick_iconBorderFillColor: colorValue }),
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
                                                value: attributes.jnext_s_lick_iconColor,
                                                onChange: (colorValue) =>
                                                    setAttributes({ jnext_s_lick_iconColor: colorValue }),
                                                label: __("Arrow Color", "jnext-timeline-blocks"),
                                            },
                                            {
                                                value: attributes.jnext_s_lick_BgColor,
                                                onChange: (colorValue) =>
                                                    setAttributes({ jnext_s_lick_BgColor: colorValue }),
                                                label: __("Background Color", "jnext-timeline-blocks"),
                                            },
                                            {
                                                value: attributes.jnext_s_lick_iconBorderColor,
                                                onChange: (colorValue) =>
                                                    setAttributes({ jnext_s_lick_iconBorderColor: colorValue }),
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
                {attributes.timelineLayout == 'horizontal' && attributes.jnext_s_lick_dots && (
                    <PanelBody title={__('Dots Setting', 'jnext-timeline-blocks')}
                    initialOpen={false}
                    >
                        <RangeControl
                            label={__("Nav Dot Size", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_dotSize}
                            onChange={(value) => setAttributes({ jnext_s_lick_dotSize: value !== undefined ? value : 9 })}
                            min={0}
                            max={30}
                            allowReset />
                        <RangeControl
                            label={__("Nav Dot Border Radius", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_dotradius}
                            onChange={(value) => setAttributes({ jnext_s_lick_dotradius: value !== undefined ? value : 25 })}
                            min={0}
                            max={30}
                            allowReset />
                        <RangeControl
                            label={__("Nav Dot Background Size", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_dotBgsize}
                            onChange={(value) => setAttributes({
                                jnext_s_lick_dotBgsize: value !== undefined ? value : 10,
                            })}
                            min={0}
                            max={90}
                            allowReset />
                        <RangeControl
                            label={__("Nav Dot Background Border Width", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_dotborderwidth}
                            onChange={(value) => setAttributes({ jnext_s_lick_dotborderwidth: value !== undefined ? value : 3 })}
                            min={0}
                            max={10}
                            allowReset />
                        <RangeControl
                            label={__("Nav Dot Background Border Radius", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_dotborderradius}
                            onChange={(value) => setAttributes({ jnext_s_lick_dotborderradius: value !== undefined ? value : 25 })}
                            min={0}
                            max={100}
                            allowReset />
                        <RangeControl
                            label={__("Nav Dot Background Spacing", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_dotBGSpacing}
                            onChange={(value) => setAttributes({ jnext_s_lick_dotBGSpacing: value !== undefined ? value : 0 })}
                            min={0}
                            max={100}
                            allowReset />
                        <RangeControl
                            label={__("Nav Dot Opacity", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_dotOpacity}
                            onChange={(value) => setAttributes({ jnext_s_lick_dotOpacity: value !== undefined ? value : 0.75 })}
                            min={0}
                            max={1}
                            allowReset />
                        <RangeControl
                            label={__("Focus Nav Dot Opacity", "jnext-timeline-blocks")}
                            value={attributes.jnext_s_lick_dotFocusOpacity}
                            onChange={(value) => setAttributes({ jnext_s_lick_dotFocusOpacity: value !== undefined ? value : 1 })}
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
                                                    value: attributes.jnext_s_lick_dotFillColor,
                                                    onChange: (colorValue) =>
                                                        setAttributes({ jnext_s_lick_dotFillColor: colorValue }),
                                                    label: __("Dot Color", "jnext-timeline-blocks"),
                                                },
                                                {
                                                    value: attributes.jnext_s_lick_Focus_dotBgColor,
                                                    onChange: (colorValue) =>
                                                        setAttributes({ jnext_s_lick_Focus_dotBgColor: colorValue }),
                                                    label: __("Dot Background Color", "jnext-timeline-blocks"),
                                                },
                                                {
                                                    value: attributes.jnext_s_lick_dotBorderFillColor,
                                                    onChange: (colorValue) =>
                                                        setAttributes({ jnext_s_lick_dotBorderFillColor: colorValue }),
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
                                                value: attributes.jnext_s_lick_dotColor,
                                                onChange: (colorValue) =>
                                                    setAttributes({ jnext_s_lick_dotColor: colorValue }),
                                                label: __("Dot Color", "jnext-timeline-blocks"),
                                            },
                                            {
                                                value: attributes.jnext_s_lick_dotBgColor,
                                                onChange: (colorValue) =>
                                                    setAttributes({ jnext_s_lick_dotBgColor: colorValue }),
                                                label: __("Dot Background Color", "jnext-timeline-blocks"),
                                            },
                                            {
                                                value: attributes.jnext_s_lick_dotBorderColor,
                                                onChange: (colorValue) =>
                                                    setAttributes({ jnext_s_lick_dotBorderColor: colorValue }),
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
                    title={__("Heading Typography", "jnext-timeline-blocks")}
                    initialOpen={false}
                    >
                    <SelectControl
                        label={__("Tag", "jnext-timeline-blocks")}
                        options={headingTagOptions}
                        value={attributes.headingTag}
                        onChange={ (value) => setAttributes({ headingTag: value }) }
                    />
                    <SelectControl
                        label={__("Font Family", "jnext-timeline-blocks")}
                        options={JnextTbfontOptions}
                        value={attributes.headingFontFamily}
                        onChange={(value) => {
                            setAttributes({ headingFontFamily: value }),
                            loadGoogleFont(value);
                        }}
                    />
                    <RangeControl 
                        label={__("Font Size", "jnext-timeline-blocks")}
                        min={0}
                        max={50}
                        step={1}
                        allowReset
                        value={attributes.headingFontSize}
                        onChange={ (value) => setAttributes({ headingFontSize: value !== undefined ? value : 20 }) }
                    />
                    <SelectControl
                        label={__("Font Weight", "jnext-timeline-blocks")}
                        options={fontWeightOptions}
                        value={attributes.headingFontWeight}
                        onChange={ (value) => setAttributes({ headingFontWeight: value, }) }
                    />
                    <RangeControl
                        label={__("Line Height", "jnext-timeline-blocks")}
                        value={attributes.headingLineHeight}
                        onChange={ (value) => setAttributes({ headingLineHeight: value !== undefined ? value : 1 }) }
                        min={0}
                        max={100}
                        step={1}
                        allowReset
                    />
                    <RangeControl
                        label={__(
                            "Bottom Margin",
                            "jnext-timeline-blocks"
                        )}
                        value={attributes.headingBottomMargin}
                        onChange={(value) =>
                            setAttributes({
                                headingBottomMargin: value !== undefined ? value : 15,
                            })
                        }
                        min={0}
                        max={50}
                        step={1}
                        allowReset
                    />
                </PanelBody>
                <PanelBody
                    title={__("Content Typography", "jnext-timeline-blocks")}
                    initialOpen={false}
                    >
                    <SelectControl
                        label={__("Font Family", "jnext-timeline-blocks")}
                        options={JnextTbfontOptions}
                        value={attributes.contentFontFamily}
                        onChange={(value) => {
                            setAttributes({ contentFontFamily: value }),
                            loadGoogleFont(value);
                        }}
                    />
                    <RangeControl 
                        label={__("Font Size", "jnext-timeline-blocks")}
                        min={0}
                        max={50}
                        step={1}
                        allowReset
                        value={attributes.contentFontSize}
                        onChange={ (value) => setAttributes({ contentFontSize: value !== undefined ? value : 20 }) }
                    />
                    <SelectControl
                        label={__("Font Weight", "jnext-timeline-blocks")}
                        options={fontWeightOptions}
                        value={attributes.contentFontWeight}
                        onChange={ (value) => setAttributes({ contentFontWeight: value }) }
                    />
                    <RangeControl
                        label={__("Line Height", "jnext-timeline-blocks")}
                        value={attributes.contentLineHeight}
                        onChange={ (value) => setAttributes({ contentLineHeight: value !== undefined ? value : 1 }) }
                        min={0}
                        max={100}
                        step={1}
                        allowReset
                    />
                </PanelBody>
                <PanelBody
                    title={__("Date / Custom Text Typography", "jnext-timeline-blocks")}
                    initialOpen={false}
                    >
                    <SelectControl
                        label={__("Font Family", "jnext-timeline-blocks")}
                        options={JnextTbfontOptions}
                        value={attributes.dateFontFamily}
                        onChange={(value) => {
                            setAttributes({ dateFontFamily: value }),
                            loadGoogleFont(value);
                        }}
                    />
                    <RangeControl 
                        label={__("Font Size", "jnext-timeline-blocks")}
                        min={0}
                        max={50}
                        step={1}
                        allowReset
                        value={attributes.dateFontSize}
                        onChange={ (value) => setAttributes({ dateFontSize: value !== undefined ? value : 20 }) }
                    />
                    <SelectControl
                        label={__("Font Weight", "jnext-timeline-blocks")}
                        options={fontWeightOptions}
                        value={attributes.dateFontWeight}
                        onChange={ (value) => setAttributes({ dateFontWeight: value }) }
                    />
                    <RangeControl
                        label={__("Line Height", "jnext-timeline-blocks")}
                        value={attributes.dateLineHeight}
                        onChange={ (value) => setAttributes({ dateLineHeight: value !== undefined ? value : 1 }) }
                        min={0}
                        max={100}
                        step={1}
                        allowReset
                    />
                </PanelBody>
                <PanelBody 
                    title={__("Control Spacing", "jnext-timeline-blocks")}
                    initialOpen={false}
                    >
                    <RangeControl
                        label={__("connector Spacing", "jnext-timeline-blocks")}
                        value={attributes.horizontalSpace}
                        onChange={(value) =>
                            setAttributes({
                                horizontalSpace: value !== undefined ? value : 0,
                            })
                        }
                        min={0}
                        max={50}
                        step={1}
                        allowReset
                    />
                    <RangeControl
                        label={__("Blocks Spacing", "jnext-timeline-blocks")}
                        value={attributes.verticalSpace}
                        onChange={(value) =>
                            setAttributes({
                                verticalSpace: value !== undefined ? value : 0,
                            })
                        }
                        min={0}
                        max={50}
                        step={1}
                        allowReset
                    />
                </PanelBody>
                <PanelBody
                    title={__("Icon & Connector Settings", "jnext-timeline-blocks")}
                    initialOpen={false}
                    >
                    <FontIconPicker {...block_icon_props} />

                    <RangeControl
                        label={__("Icon Size", "jnext-timeline-blocks")}
                        value={attributes.iconSize}
                        onChange={(value) =>
                            setAttributes({ iconSize: value !== undefined ? value : 20 })
                        }
                        min={0}
                        max={30}
                        allowReset
                    />
                    <RangeControl
                        label={__("Icon Background Size", "jnext-timeline-blocks")}
                        value={attributes.iconBgsize}
                        onChange={(value) =>
                        setAttributes({
                            iconBgsize: value !== undefined ? value : 35,
                        })
                        }
                        min={25}
                        max={90}
                        allowReset
                    />
                    <RangeControl
                        label={__("Icon Border Width", "jnext-timeline-blocks")}
                        value={attributes.iconborderwidth}
                        onChange={(value) =>
                            setAttributes({ iconborderwidth: value !== undefined ? value : 0 })
                        }
                        min={1}
                        max={10}
                        allowReset
                    />
                    <RangeControl
                        label={__("Icon Border Radius", "jnext-timeline-blocks")}
                        value={attributes.iconborderradius}
                        onChange={(value) =>
                            setAttributes({ iconborderradius: value !== undefined ? value : 0 })
                        }
                        min={0}
                        max={100}
                        allowReset
                    />
                    <RangeControl
                        label={__("Connector Width", "jnext-timeline-blocks")}
                        value={attributes.separatorwidth}
                        onChange={(value) =>
                            setAttributes({ separatorwidth: value !== undefined ? value : 3 })
                        }
                        min={1}
                        max={10}
                        allowReset
                    />
                    <PanelBody title={__("Connector Color Settings", "jnext-timeline-blocks")} initialOpen={false}>
                        <TabPanel
                            className="jtb-inspect-tabs jtb-inspect-tabs-col-2"
                            activeClass="active-tab"
                            tabs={[
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
                                    title={__("Jnext Timeline Color Settings", "jnext-timeline-blocks")}
                                    initialOpen={true}
                                    colorSettings={[
                                        {
                                            value: attributes.separatorFillColor,
                                            onChange: (colorValue) =>
                                                setAttributes({ separatorFillColor: colorValue }),
                                            label: __("Timeline Line Color", "jnext-timeline-blocks"),
                                        },
                                        {
                                            value: attributes.iconFocus,
                                            onChange: (colorValue) =>
                                                setAttributes({ iconFocus: colorValue }),
                                            label: __("Timeline Icon Color", "jnext-timeline-blocks"),
                                        },
                                        {
                                            value: attributes.iconBgFocus,
                                            onChange: (colorValue) =>
                                                setAttributes({ iconBgFocus: colorValue }),
                                            label: __("Timeline Background Color", "jnext-timeline-blocks"),
                                        },
                                        {
                                            value: attributes.borderFocus,
                                            onChange: (colorValue) =>
                                                setAttributes({ borderFocus: colorValue }),
                                            label: __("Timeline Border Color", "jnext-timeline-blocks"),
                                        },
                                    ]}
                                    ></PanelColorSettings>
                                );
                            } else {
                                tabout = (
                                    <PanelColorSettings
                                    title={__("Jnext Timeline Color Settings", "jnext-timeline-blocks")}
                                    initialOpen={true}
                                    colorSettings={[
                                        {
                                            value: attributes.separatorColor,
                                            onChange: (colorValue) =>
                                                setAttributes({ separatorColor: colorValue }),
                                            label: __("Timeline Line Color", "jnext-timeline-blocks"),
                                        },
                                        {
                                            value: attributes.iconColor,
                                            onChange: (colorValue) =>
                                                setAttributes({ iconColor: colorValue }),
                                            label: __("Timeline Icon Color", "jnext-timeline-blocks"),
                                        },
                                        {
                                            value: attributes.separatorBg,
                                            onChange: (colorValue) =>
                                                setAttributes({ separatorBg: colorValue }),
                                            label: __("Timeline Background Color", "jnext-timeline-blocks"),
                                        },
                                        {
                                            value: attributes.separatorBorder,
                                            onChange: (colorValue) =>
                                                setAttributes({ separatorBorder: colorValue }),
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
                <PanelColorSettings
                    title={__("Color Settings", "jnext-timeline-blocks")}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: attributes.backgroundColor,
                            onChange: onChangeBackgroundColor,
                            label: __("Block Background Color", "jnext-timeline-blocks"),
                        },
                        {
                            value: attributes.headingColor,
                            onChange: onChangeHeadingColor,
                            label: __("Block Heading Color", "jnext-timeline-blocks"),
                        },
                        {
                            value: attributes.contentColor,
                            onChange: onChangeContentColor,
                            label: __("Block Content Color", "jnext-timeline-blocks"),
                        },
                        {
                            value: attributes.dateColor,
                            onChange: onChangeDateColor,
                            label: __("Block Date / Custom Text Color", "jnext-timeline-blocks"),
                        },
                    ]}
                >
                </PanelColorSettings>
                <InspectorContainer
                    setAttributes={ setAttributes }
                    { ...attributes }
                    
                />
            </InspectorControls>
        );

    }
}