/**
 * Set inline CSS class.
 * @param {object} props - The block object.
 * @return {array} The inline CSS class.
 */

 import JnextBlocksIcon from "./JnextBlocksIcons";
 import parseSVG from "./JnextParseIcon";
 
 export default function renderSVG(svg) {
   svg = parseSVG(svg);
 
   var fontAwesome = JnextBlocksIcon[svg];
 
   if ("undefined" != typeof fontAwesome) {
     var viewbox_array = fontAwesome["svg"].hasOwnProperty("brands")
       ? fontAwesome["svg"]["brands"]["viewBox"]
       : fontAwesome["svg"]["solid"]["viewBox"];
     var path = fontAwesome["svg"].hasOwnProperty("brands")
       ? fontAwesome["svg"]["brands"]["path"]
       : fontAwesome["svg"]["solid"]["path"];
     var viewBox = viewbox_array.join(" ");
 
     return (
       <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
         <path d={path}></path>
       </svg>
     );
   }
 }
 