/**
 * Box-Shadow reusable component.
 *
 */
const { __ } = wp.i18n;

const { ColorPalette } = wp.blockEditor;

const { Button, SelectControl, RangeControl, Dashicon } = wp.components;

// Extend component
const { Component, Fragment } = wp.element;

class BoxShadowControl extends Component {
  
  constructor() {
    super(...arguments);
    this.onAdvancedControlClick = this.onAdvancedControlClick.bind(this);
    this.onAdvancedControlReset = this.onAdvancedControlReset.bind(this);
  }

  onAdvancedControlClick() {
    let control = true;
    let label = __("Hide Advanced");

    if (this.state !== null && this.state.showAdvancedControls === true) {
      control = false;
      label = __("Advanced");
    }

    this.setState({
      showAdvancedControls: control,
      showAdvancedControlsLabel: label,
    });
  }

  onAdvancedControlReset() {
    const { setAttributes } = this.props;

    setAttributes({ boxshadowColor: "" });
    setAttributes({ boxshadowHorizontal: 0 });
    setAttributes({ boxshadowVertical: 0 });
    setAttributes({ boxshadowBlur: 0 });
    setAttributes({ boxshadowSpread: 0 });
    setAttributes({ boxshadowPosition: "" });
  }

  render() {

    const {
      setAttributes,
      boxshadowColor,
      boxshadowHorizontal,
      boxshadowVertical,
      boxshadowBlur,
      boxshadowSpread,
      boxshadowPosition,
    } = this.props;

    var advancedControls;
    var boxShadowAdvancedControls;
    var resetBoxShadowAdvancedControls;

    if (this.state !== null && true === this.state.showAdvancedControls) {

      advancedControls = (

        <div className="jnext-timeline-blocks-box-shadow-advanced">
          <Fragment>
            <p className="jnext-timeline-blocks-setting-label">
              {boxshadowColor.label}
              <span className="components-base-control__label">
                <span
                  className="component-color-indicator"
                  style={{ backgroundColor: boxshadowColor.value }}
                ></span>
              </span>
            </p>
            <ColorPalette
              value={boxshadowColor.value}
              onChange={(colorValue) =>
                setAttributes({
                  boxshadowColor: colorValue !== undefined ? colorValue : "",
                })
              }
              allowReset
            />
          </Fragment>

          <Fragment>
            <h2>{boxshadowHorizontal.label}</h2>
            <RangeControl
              value={boxshadowHorizontal.value}
              onChange={(value) =>
                setAttributes({
                  boxshadowHorizontal: value !== undefined ? value : 0,
                })
              }
              min={-100}
              max={100}
              allowReset
            />
          </Fragment>

          <Fragment>
            <h2>{boxshadowVertical.label}</h2>
            <RangeControl
              value={boxshadowVertical.value}
              onChange={(value) =>
                setAttributes({
                  boxshadowVertical: value !== undefined ? value : 0,
                })
              }
              min={-100}
              max={100}
              allowReset
            />
          </Fragment>

          <Fragment>
            <h2>{boxshadowBlur.label}</h2>
            <RangeControl
              value={boxshadowBlur.value}
              onChange={(value) =>
                setAttributes({
                  boxshadowBlur: value !== undefined ? value : 0,
                })
              }
              min={0}
              max={100}
              allowReset
            />
          </Fragment>

          <Fragment>
            <h2>{boxshadowSpread.label}</h2>
            <RangeControl
              value={boxshadowSpread.value}
              onChange={(value) =>
                setAttributes({
                  boxshadowSpread: value !== undefined ? value : 0,
                })
              }
              min={0}
              max={100}
              allowReset
            />
          </Fragment>

          <Fragment>
            <SelectControl
              label={boxshadowPosition.label}
              value={boxshadowPosition.value}
              onChange={(value) => setAttributes({ boxshadowPosition: value })}
              options={[
                { value: "inset", label: __("Inset") },
                { value: "outset", label: __("Outset") },
              ]}
            />
          </Fragment>
        </div>

      );

    }

    resetBoxShadowAdvancedControls = (

      <Button
        className="jnext-timeline-blocks-size-btn jnext-timeline-blocks-typography-reset-btn"
        isSmall
        aria-pressed={this.state !== null}
        onClick={this.onAdvancedControlReset}
      >
        <Dashicon icon="image-rotate" />
      </Button>

    );

    boxShadowAdvancedControls = (

      <Button
        className="jnext-timeline-blocks-size-btn jnext-timeline-blocks-typography-control-btn"
        isSmall
        aria-pressed={this.state !== null}
        onClick={this.onAdvancedControlClick}
      >
        <Dashicon icon="admin-tools" />
      </Button>

    );

    return (

      <div className="jnext-typography-option-actions">
        <span>{this.props.label}</span>
        {boxShadowAdvancedControls}
        {resetBoxShadowAdvancedControls}
        {advancedControls}
      </div>

    );

  }

}

export default BoxShadowControl;
