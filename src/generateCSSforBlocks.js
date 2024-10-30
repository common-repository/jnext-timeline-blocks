/**
 * 
 * @param {*} block_selector 
 * @param {*} block_id 
 * @param {*} responsive 
 * @param {*} responsiveType 
 * @returns 
 */
function generateCSSforBlocks(block_selector, block_id, responsive = false, responsiveType = ""){
    
    var breakpoint = "";
    var gen_styling_css = "";
    var res_styling_css = "";

    if (responsiveType == "tablet") {
        breakpoint = 976;
    } else if (responsiveType == "mobile") {
        breakpoint = 767;
    }

    for (var i in block_selector) {
        var sel = block_selector[i];
        var css = "";

        for (var j in sel) {
        var checkString = true;

        if (typeof sel[j] === "string" && sel[j].length === 0) {
            checkString = false;
        }

        if (
            "font-family" === j &&
            typeof sel[j] != "undefined" &&
            "Default" === sel[j]
        ) {
            continue;
        }

        if (typeof sel[j] != "undefined" && checkString) {
            if ("font-family" === j) {
            css += j + ": " + "'" + sel[j] + "'" + ";";
            } else {
            css += j + ": " + sel[j] + ";";
            }
        }
        }

        if (css.length !== 0) {
        gen_styling_css += block_id;
        gen_styling_css += i + "{";
        gen_styling_css += css;
        gen_styling_css += "}";
        }
    }

    if (
        responsive &&
        typeof gen_styling_css !== "undefined" &&
        gen_styling_css.length !== 0
    ) {
        res_styling_css +=
        "@media only screen and (max-width: " + breakpoint + "px) {";
        res_styling_css += gen_styling_css;
        res_styling_css += "}";
    }

    if (responsive) {
        return res_styling_css;
    } else {
        return gen_styling_css;
    }
}
export default generateCSSforBlocks;