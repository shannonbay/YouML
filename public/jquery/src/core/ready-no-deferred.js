define(["../core","../var/document","../var/isFunction"],(function(e,n,t){"use strict";var d=[],i=function(e){d.push(e)},o=function(t){window.setTimeout((function(){t.call(n,e)}))};function a(){n.removeEventListener("DOMContentLoaded",a),window.removeEventListener("load",a),e.ready()}e.fn.ready=function(e){return i(e),this},e.extend({isReady:!1,readyWait:1,ready:function(n){(!0===n?--e.readyWait:e.isReady)||(e.isReady=!0,!0!==n&&--e.readyWait>0||(i=function(e){for(d.push(e);d.length;)e=d.shift(),t(e)&&o(e)})())}}),e.ready.then=e.fn.ready,"complete"===n.readyState||"loading"!==n.readyState&&!n.documentElement.doScroll?window.setTimeout(e.ready):(n.addEventListener("DOMContentLoaded",a),window.addEventListener("load",a))}));