/**
 * Load google fonts json file
 */
import fonts from "./GoogleFonts.json";

const JnextTbfontOptions = fonts.map((font) => { 
  return font.family; 
});
export default JnextTbfontOptions;