define(["./core","./core/isAttached","./var/flat","./var/isFunction","./var/push","./var/rcheckableType","./core/access","./manipulation/var/rtagName","./manipulation/var/rscriptType","./manipulation/wrapMap","./manipulation/getAll","./manipulation/setGlobalEval","./manipulation/buildFragment","./manipulation/support","./data/var/dataPriv","./data/var/dataUser","./data/var/acceptData","./core/DOMEval","./core/nodeName","./core/init","./traversing","./selector","./event"],(function(e,t,n,r,i,o,a,c,s,l,p,u,h,f,d,v,y,m,g){"use strict";var T=/<script|<style|<link/i,C=/checked\s*(?:[^=]|=\s*.checked.)/i,x=/^\s*<!\[CDATA\[|\]\]>\s*$/g;function D(t,n){return g(t,"table")&&g(11!==n.nodeType?n:n.firstChild,"tr")&&e(t).children("tbody")[0]||t}function b(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function N(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function A(t,n){var r,i,o,a,c,s;if(1===n.nodeType){if(d.hasData(t)&&(s=d.get(t).events))for(o in d.remove(n,"handle events"),s)for(r=0,i=s[o].length;r<i;r++)e.event.add(n,o,s[o][r]);v.hasData(t)&&(a=v.access(t),c=e.extend({},a),v.set(n,c))}}function k(e,t){var n=t.nodeName.toLowerCase();"input"===n&&o.test(e.type)?t.checked=e.checked:"input"!==n&&"textarea"!==n||(t.defaultValue=e.defaultValue)}function w(t,i,o,a){i=n(i);var c,l,u,v,y,g,T=0,D=t.length,A=D-1,k=i[0],L=r(k);if(L||D>1&&"string"==typeof k&&!f.checkClone&&C.test(k))return t.each((function(e){var n=t.eq(e);L&&(i[0]=k.call(this,e,n.html())),w(n,i,o,a)}));if(D&&(l=(c=h(i,t[0].ownerDocument,!1,t,a)).firstChild,1===c.childNodes.length&&(c=l),l||a)){for(v=(u=e.map(p(c,"script"),b)).length;T<D;T++)y=c,T!==A&&(y=e.clone(y,!0,!0),v&&e.merge(u,p(y,"script"))),o.call(t[T],y,T);if(v)for(g=u[u.length-1].ownerDocument,e.map(u,N),T=0;T<v;T++)y=u[T],s.test(y.type||"")&&!d.access(y,"globalEval")&&e.contains(g,y)&&(y.src&&"module"!==(y.type||"").toLowerCase()?e._evalUrl&&!y.noModule&&e._evalUrl(y.src,{nonce:y.nonce||y.getAttribute("nonce")},g):m(y.textContent.replace(x,""),y,g))}return t}function L(n,r,i){for(var o,a=r?e.filter(r,n):n,c=0;null!=(o=a[c]);c++)i||1!==o.nodeType||e.cleanData(p(o)),o.parentNode&&(i&&t(o)&&u(p(o,"script")),o.parentNode.removeChild(o));return n}return e.extend({htmlPrefilter:function(e){return e},clone:function(n,r,i){var o,a,c,s,l=n.cloneNode(!0),h=t(n);if(!(f.noCloneChecked||1!==n.nodeType&&11!==n.nodeType||e.isXMLDoc(n)))for(s=p(l),o=0,a=(c=p(n)).length;o<a;o++)k(c[o],s[o]);if(r)if(i)for(c=c||p(n),s=s||p(l),o=0,a=c.length;o<a;o++)A(c[o],s[o]);else A(n,l);return(s=p(l,"script")).length>0&&u(s,!h&&p(n,"script")),l},cleanData:function(t){for(var n,r,i,o=e.event.special,a=0;void 0!==(r=t[a]);a++)if(y(r)){if(n=r[d.expando]){if(n.events)for(i in n.events)o[i]?e.event.remove(r,i):e.removeEvent(r,i,n.handle);r[d.expando]=void 0}r[v.expando]&&(r[v.expando]=void 0)}}}),e.fn.extend({detach:function(e){return L(this,e,!0)},remove:function(e){return L(this,e)},text:function(t){return a(this,(function(t){return void 0===t?e.text(this):this.empty().each((function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=t)}))}),null,t,arguments.length)},append:function(){return w(this,arguments,(function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||D(this,e).appendChild(e)}))},prepend:function(){return w(this,arguments,(function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=D(this,e);t.insertBefore(e,t.firstChild)}}))},before:function(){return w(this,arguments,(function(e){this.parentNode&&this.parentNode.insertBefore(e,this)}))},after:function(){return w(this,arguments,(function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)}))},empty:function(){for(var t,n=0;null!=(t=this[n]);n++)1===t.nodeType&&(e.cleanData(p(t,!1)),t.textContent="");return this},clone:function(t,n){return t=null!=t&&t,n=null==n?t:n,this.map((function(){return e.clone(this,t,n)}))},html:function(t){return a(this,(function(t){var n=this[0]||{},r=0,i=this.length;if(void 0===t&&1===n.nodeType)return n.innerHTML;if("string"==typeof t&&!T.test(t)&&!l[(c.exec(t)||["",""])[1].toLowerCase()]){t=e.htmlPrefilter(t);try{for(;r<i;r++)1===(n=this[r]||{}).nodeType&&(e.cleanData(p(n,!1)),n.innerHTML=t);n=0}catch(e){}}n&&this.empty().append(t)}),null,t,arguments.length)},replaceWith:function(){var t=[];return w(this,arguments,(function(n){var r=this.parentNode;e.inArray(this,t)<0&&(e.cleanData(p(this)),r&&r.replaceChild(n,this))}),t)}}),e.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},(function(t,n){e.fn[t]=function(t){for(var r,o=[],a=e(t),c=a.length-1,s=0;s<=c;s++)r=s===c?this:this.clone(!0),e(a[s])[n](r),i.apply(o,r.get());return this.pushStack(o)}})),e}));