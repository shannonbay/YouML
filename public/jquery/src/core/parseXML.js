define(["../core"],(function(r){"use strict";return r.parseXML=function(e){var n,t;if(!e||"string"!=typeof e)return null;try{n=(new window.DOMParser).parseFromString(e,"text/xml")}catch(r){}return t=n&&n.getElementsByTagName("parsererror")[0],n&&!t||r.error("Invalid XML: "+(t?r.map(t.childNodes,(function(r){return r.textContent})).join("\n"):e)),n},r.parseXML}));