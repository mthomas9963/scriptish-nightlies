var EXPORTED_SYMBOLS = ["Scriptish_cryptoHash"];
Components.utils.import("resource://scriptish/constants.js");

// this tells updateFromStream to read the entire string 
const PR_UINT32_MAX = 0xffffffff;

function Scriptish_cryptoHash(aString, aAlg, aCharset) {
  let ch = Instances.ch;
  let unicodeConverter = Instances.suc;
  let str = aString + "";
  let alg = ((aAlg || "SHA1") + "").trim().toUpperCase();
  let charset = (aCharset || "UTF-8") + "";

  try {
    ch.initWithString(alg);
  } catch (e) {
    throw new Error("Invalid hash algorithm specified.");
  }

  try {
    unicodeConverter.charset = charset;
  } catch(e) {
    throw new Error("Invalid charset specified.");
  }

  if (str)
    ch.updateFromStream(unicodeConverter.convertToInputStream(str), PR_UINT32_MAX);
  let hash = ch.finish(false); // hash as raw octets
  return [("0" + hash.charCodeAt(i).toString(16)).slice(-2) for (i in hash)]
      .join("");
}
