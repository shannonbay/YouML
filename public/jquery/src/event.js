define(["./core","./var/document","./var/documentElement","./var/isFunction","./var/rnothtmlwhite","./var/rcheckableType","./var/slice","./data/var/acceptData","./data/var/dataPriv","./core/nodeName","./core/init","./selector"],(function(e,t,n,i,r,a,o,s,l,d){"use strict";var c=/^([^.]*)(?:\.(.+)|)/;function u(){return!0}function p(){return!1}function h(t,n,i,r,a,o){var s,l;if("object"==typeof n){for(l in"string"!=typeof i&&(r=r||i,i=void 0),n)h(t,l,i,r,n[l],o);return t}if(null==r&&null==a?(a=i,r=i=void 0):null==a&&("string"==typeof i?(a=r,r=void 0):(a=r,r=i,i=void 0)),!1===a)a=p;else if(!a)return t;return 1===o&&(s=a,a=function(t){return e().off(t),s.apply(this,arguments)},a.guid=s.guid||(s.guid=e.guid++)),t.each((function(){e.event.add(this,n,a,r,i)}))}function v(t,n,i){i?(l.set(t,n,!1),e.event.add(t,n,{namespace:!1,handler:function(t){var i,r=l.get(this,n);if(1&t.isTrigger&&this[n]){if(r)(e.event.special[n]||{}).delegateType&&t.stopPropagation();else if(r=o.call(arguments),l.set(this,n,r),this[n](),i=l.get(this,n),l.set(this,n,!1),r!==i)return t.stopImmediatePropagation(),t.preventDefault(),i}else r&&(l.set(this,n,e.event.trigger(r[0],r.slice(1),this)),t.stopPropagation(),t.isImmediatePropagationStopped=u)}})):void 0===l.get(t,n)&&e.event.add(t,n,u)}return e.event={global:{},add:function(t,i,a,o,d){var u,p,h,v,f,g,m,y,b,E,T,P=l.get(t);if(s(t))for(a.handler&&(a=(u=a).handler,d=u.selector),d&&e.find.matchesSelector(n,d),a.guid||(a.guid=e.guid++),(v=P.events)||(v=P.events=Object.create(null)),(p=P.handle)||(p=P.handle=function(n){return void 0!==e&&e.event.triggered!==n.type?e.event.dispatch.apply(t,arguments):void 0}),f=(i=(i||"").match(r)||[""]).length;f--;)b=T=(h=c.exec(i[f])||[])[1],E=(h[2]||"").split(".").sort(),b&&(m=e.event.special[b]||{},b=(d?m.delegateType:m.bindType)||b,m=e.event.special[b]||{},g=e.extend({type:b,origType:T,data:o,handler:a,guid:a.guid,selector:d,needsContext:d&&e.expr.match.needsContext.test(d),namespace:E.join(".")},u),(y=v[b])||((y=v[b]=[]).delegateCount=0,m.setup&&!1!==m.setup.call(t,o,E,p)||t.addEventListener&&t.addEventListener(b,p)),m.add&&(m.add.call(t,g),g.handler.guid||(g.handler.guid=a.guid)),d?y.splice(y.delegateCount++,0,g):y.push(g),e.event.global[b]=!0)},remove:function(t,n,i,a,o){var s,d,u,p,h,v,f,g,m,y,b,E=l.hasData(t)&&l.get(t);if(E&&(p=E.events)){for(h=(n=(n||"").match(r)||[""]).length;h--;)if(m=b=(u=c.exec(n[h])||[])[1],y=(u[2]||"").split(".").sort(),m){for(f=e.event.special[m]||{},g=p[m=(a?f.delegateType:f.bindType)||m]||[],u=u[2]&&new RegExp("(^|\\.)"+y.join("\\.(?:.*\\.|)")+"(\\.|$)"),d=s=g.length;s--;)v=g[s],!o&&b!==v.origType||i&&i.guid!==v.guid||u&&!u.test(v.namespace)||a&&a!==v.selector&&("**"!==a||!v.selector)||(g.splice(s,1),v.selector&&g.delegateCount--,f.remove&&f.remove.call(t,v));d&&!g.length&&(f.teardown&&!1!==f.teardown.call(t,y,E.handle)||e.removeEvent(t,m,E.handle),delete p[m])}else for(m in p)e.event.remove(t,m+n[h],i,a,!0);e.isEmptyObject(p)&&l.remove(t,"handle events")}},dispatch:function(t){var n,i,r,a,o,s,d=new Array(arguments.length),c=e.event.fix(t),u=(l.get(this,"events")||Object.create(null))[c.type]||[],p=e.event.special[c.type]||{};for(d[0]=c,n=1;n<arguments.length;n++)d[n]=arguments[n];if(c.delegateTarget=this,!p.preDispatch||!1!==p.preDispatch.call(this,c)){for(s=e.event.handlers.call(this,c,u),n=0;(a=s[n++])&&!c.isPropagationStopped();)for(c.currentTarget=a.elem,i=0;(o=a.handlers[i++])&&!c.isImmediatePropagationStopped();)c.rnamespace&&!1!==o.namespace&&!c.rnamespace.test(o.namespace)||(c.handleObj=o,c.data=o.data,void 0!==(r=((e.event.special[o.origType]||{}).handle||o.handler).apply(a.elem,d))&&!1===(c.result=r)&&(c.preventDefault(),c.stopPropagation()));return p.postDispatch&&p.postDispatch.call(this,c),c.result}},handlers:function(t,n){var i,r,a,o,s,l=[],d=n.delegateCount,c=t.target;if(d&&c.nodeType&&!("click"===t.type&&t.button>=1))for(;c!==this;c=c.parentNode||this)if(1===c.nodeType&&("click"!==t.type||!0!==c.disabled)){for(o=[],s={},i=0;i<d;i++)void 0===s[a=(r=n[i]).selector+" "]&&(s[a]=r.needsContext?e(a,this).index(c)>-1:e.find(a,this,null,[c]).length),s[a]&&o.push(r);o.length&&l.push({elem:c,handlers:o})}return c=this,d<n.length&&l.push({elem:c,handlers:n.slice(d)}),l},addProp:function(t,n){Object.defineProperty(e.Event.prototype,t,{enumerable:!0,configurable:!0,get:i(n)?function(){if(this.originalEvent)return n(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},set:function(e){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:e})}})},fix:function(t){return t[e.expando]?t:new e.Event(t)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e;return a.test(t.type)&&t.click&&d(t,"input")&&v(t,"click",!0),!1},trigger:function(e){var t=this||e;return a.test(t.type)&&t.click&&d(t,"input")&&v(t,"click"),!0},_default:function(e){var t=e.target;return a.test(t.type)&&t.click&&d(t,"input")&&l.get(t,"click")||d(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},e.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},e.Event=function(t,n){if(!(this instanceof e.Event))return new e.Event(t,n);t&&t.type?(this.originalEvent=t,this.type=t.type,this.isDefaultPrevented=t.defaultPrevented||void 0===t.defaultPrevented&&!1===t.returnValue?u:p,this.target=t.target&&3===t.target.nodeType?t.target.parentNode:t.target,this.currentTarget=t.currentTarget,this.relatedTarget=t.relatedTarget):this.type=t,n&&e.extend(this,n),this.timeStamp=t&&t.timeStamp||Date.now(),this[e.expando]=!0},e.Event.prototype={constructor:e.Event,isDefaultPrevented:p,isPropagationStopped:p,isImmediatePropagationStopped:p,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=u,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=u,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=u,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},e.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,char:!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:!0},e.event.addProp),e.each({focus:"focusin",blur:"focusout"},(function(n,i){function r(n){if(t.documentMode){var r=l.get(this,"handle"),a=e.event.fix(n);a.type="focusin"===n.type?"focus":"blur",a.isSimulated=!0,r(n),a.target===a.currentTarget&&r(a)}else e.event.simulate(i,n.target,e.event.fix(n))}e.event.special[n]={setup:function(){var e;if(v(this,n,!0),!t.documentMode)return!1;(e=l.get(this,i))||this.addEventListener(i,r),l.set(this,i,(e||0)+1)},trigger:function(){return v(this,n),!0},teardown:function(){var e;if(!t.documentMode)return!1;(e=l.get(this,i)-1)?l.set(this,i,e):(this.removeEventListener(i,r),l.remove(this,i))},_default:function(e){return l.get(e.target,n)},delegateType:i},e.event.special[i]={setup:function(){var e=this.ownerDocument||this.document||this,a=t.documentMode?this:e,o=l.get(a,i);o||(t.documentMode?this.addEventListener(i,r):e.addEventListener(n,r,!0)),l.set(a,i,(o||0)+1)},teardown:function(){var e=this.ownerDocument||this.document||this,a=t.documentMode?this:e,o=l.get(a,i)-1;o?l.set(a,i,o):(t.documentMode?this.removeEventListener(i,r):e.removeEventListener(n,r,!0),l.remove(a,i))}}})),e.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},(function(t,n){e.event.special[t]={delegateType:n,bindType:n,handle:function(t){var i,r=t.relatedTarget,a=t.handleObj;return r&&(r===this||e.contains(this,r))||(t.type=a.origType,i=a.handler.apply(this,arguments),t.type=n),i}}})),e.fn.extend({on:function(e,t,n,i){return h(this,e,t,n,i)},one:function(e,t,n,i){return h(this,e,t,n,i,1)},off:function(t,n,i){var r,a;if(t&&t.preventDefault&&t.handleObj)return r=t.handleObj,e(t.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof t){for(a in t)this.off(a,n,t[a]);return this}return!1!==n&&"function"!=typeof n||(i=n,n=void 0),!1===i&&(i=p),this.each((function(){e.event.remove(this,t,i,n)}))}}),e}));