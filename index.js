function splice(str, start, delCount, newSubStr) {
    return str.slice(0, start) + newSubStr + str.slice(start + Math.abs(delCount));
};

/**
 * The map used to add invisible characters. The more entries, the smaller the string size will turn out to be.
 * Last entry is always used to split characters, while the other ones are used to transfer information about the current character
 */
var charMap = ["\u2060", "\u2062", "\u2064", "\u2069", "\u206F", "\u2061"];

const SPLITTER = charMap[charMap.length - 1];
const NUMBER_SYSTEM = charMap.length - 1;

/**;
 * Watermark a string with invisible characters you can later read out with the 'read' function.
 * 
 * @param {string} text - Text which will be shown
 * @param {string} secret - Text which will be hidden in the visible text
 * @param {(number|null)=} pos - Which index to put the secret text at. Maximum is text.length - 1. If not given, it will randomly pick a location.
 * @returns {string} String with the watermark
 * @example mark("Hello world!", "This will be the hidden text!", 4);
 * @author anti.team
 */
function mark(text, secret, pos) {
  var bits = [];

  if(typeof pos === "undefined" || pos === null) {
      pos = (Math.random() * (text.length - 2)) + 1;
  }

  pos = Math.min(pos, text.length - 1);

  for(let i = 0; i < secret.length; i++) {
    var char = secret[i];
    bits.push(char.charCodeAt().toString(NUMBER_SYSTEM))
  }  

  let out = "";
  out += SPLITTER;

  for(let i = 0; i < bits.length; i++) {
    for(let j = 0; j < bits[i].length; j++) {
      let bit = bits[i][j];
      out += charMap[parseInt(bit)];
    }
    out += SPLITTER;
  }
  return splice(text, pos, 0, out);
}


/**
 * Read out the hidden string in the given input
 * @param {string} input - String with an hidden watermark
 * @returns {string|null} If found, the hidden string in the watermark, otherwise null.
 * @author anti.team
 */
function read(input) {
  let start = input.indexOf(SPLITTER);
  let bits = [];
  let bitStr = "";
  for(let i = start; i < input.length; i++) {
    let char = input[i];
    if(charMap.indexOf(char) === -1)
      break;
    
    if(charMap.indexOf(char) === charMap.length - 1) {
      if(bitStr.length < 1) continue;
      bits.push(bitStr);
      bitStr = "";
      continue;
    }
    
    bitStr += (charMap.indexOf(char));
  }
  
  let out = "";
  
  for(let i = 0; i < bits.length; i++) {
    out += String.fromCharCode(parseInt(bits[i], NUMBER_SYSTEM))
  }

  return out.length > 0 && out || null;
}


module.exports = {mark, read, charMap};