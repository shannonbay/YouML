define(["../core","../var/document","../core/readyException","../deferred"],(function(e,t){"use strict";var n=e.Deferred();function d(){t.removeEventListener("DOMContentLoaded",d),window.removeEventListener("load",d),e.ready()}e.fn.ready=function(t){return n.then(t).catch((function(t){e.readyException(t)})),this},e.extend({isReady:!1,readyWait:1,ready:function(d){(!0===d?--e.readyWait:e.isReady)||(e.isReady=!0,!0!==d&&--e.readyWait>0||n.resolveWith(t,[e]))}}),e.ready.then=n.then,"complete"===t.readyState||"loading"!==t.readyState&&!t.documentElement.doScroll?window.setTimeout(e.ready):(t.addEventListener("DOMContentLoaded",d),window.addEventListener("load",d))}));