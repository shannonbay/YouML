define(["../core","../selector"],(function(e){"use strict";e.expr.pseudos.hidden=function(t){return!e.expr.pseudos.visible(t)},e.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}}));