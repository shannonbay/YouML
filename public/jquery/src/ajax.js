define(["./core","./var/document","./var/isFunction","./var/rnothtmlwhite","./ajax/var/location","./ajax/var/nonce","./ajax/var/rquery","./core/init","./core/parseXML","./event/trigger","./deferred","./serialize"],(function(e,t,a,r,o,n,s){"use strict";var i=/%20/g,c=/#.*$/,d=/([?&])_=[^&]*/,f=/^(.*?):[ \t]*([^\r\n]*)$/gm,p=/^(?:GET|HEAD)$/,u=/^\/\//,l={},y={},h="*/".concat("*"),x=t.createElement("a");function v(e){return function(t,o){"string"!=typeof t&&(o=t,t="*");var n,s=0,i=t.toLowerCase().match(r)||[];if(a(o))for(;n=i[s++];)"+"===n[0]?(n=n.slice(1)||"*",(e[n]=e[n]||[]).unshift(o)):(e[n]=e[n]||[]).push(o)}}function g(t,a,r,o){var n={},s=t===y;function i(c){var d;return n[c]=!0,e.each(t[c]||[],(function(e,t){var c=t(a,r,o);return"string"!=typeof c||s||n[c]?s?!(d=c):void 0:(a.dataTypes.unshift(c),i(c),!1)})),d}return i(a.dataTypes[0])||!n["*"]&&i("*")}function m(t,a){var r,o,n=e.ajaxSettings.flatOptions||{};for(r in a)void 0!==a[r]&&((n[r]?t:o||(o={}))[r]=a[r]);return o&&e.extend(!0,t,o),t}return x.href=o.href,e.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:o.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(o.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":h,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":e.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(t,a){return a?m(m(t,e.ajaxSettings),a):m(e.ajaxSettings,t)},ajaxPrefilter:v(l),ajaxTransport:v(y),ajax:function(a,v){"object"==typeof a&&(v=a,a=void 0),v=v||{};var m,T,j,w,b,S,C,L,H,M,R=e.ajaxSetup({},v),D=R.context||R,q=R.context&&(D.nodeType||D.jquery)?e(D):e.event,E=e.Deferred(),F=e.Callbacks("once memory"),O=R.statusCode||{},A={},N={},$="canceled",k={readyState:0,getResponseHeader:function(e){var t;if(C){if(!w)for(w={};t=f.exec(j);)w[t[1].toLowerCase()+" "]=(w[t[1].toLowerCase()+" "]||[]).concat(t[2]);t=w[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return C?j:null},setRequestHeader:function(e,t){return null==C&&(e=N[e.toLowerCase()]=N[e.toLowerCase()]||e,A[e]=t),this},overrideMimeType:function(e){return null==C&&(R.mimeType=e),this},statusCode:function(e){var t;if(e)if(C)k.always(e[k.status]);else for(t in e)O[t]=[O[t],e[t]];return this},abort:function(e){var t=e||$;return m&&m.abort(t),J(0,t),this}};if(E.promise(k),R.url=((a||R.url||o.href)+"").replace(u,o.protocol+"//"),R.type=v.method||v.type||R.method||R.type,R.dataTypes=(R.dataType||"*").toLowerCase().match(r)||[""],null==R.crossDomain){S=t.createElement("a");try{S.href=R.url,S.href=S.href,R.crossDomain=x.protocol+"//"+x.host!=S.protocol+"//"+S.host}catch(e){R.crossDomain=!0}}if(R.data&&R.processData&&"string"!=typeof R.data&&(R.data=e.param(R.data,R.traditional)),g(l,R,v,k),C)return k;for(H in(L=e.event&&R.global)&&0==e.active++&&e.event.trigger("ajaxStart"),R.type=R.type.toUpperCase(),R.hasContent=!p.test(R.type),T=R.url.replace(c,""),R.hasContent?R.data&&R.processData&&0===(R.contentType||"").indexOf("application/x-www-form-urlencoded")&&(R.data=R.data.replace(i,"+")):(M=R.url.slice(T.length),R.data&&(R.processData||"string"==typeof R.data)&&(T+=(s.test(T)?"&":"?")+R.data,delete R.data),!1===R.cache&&(T=T.replace(d,"$1"),M=(s.test(T)?"&":"?")+"_="+n.guid+++M),R.url=T+M),R.ifModified&&(e.lastModified[T]&&k.setRequestHeader("If-Modified-Since",e.lastModified[T]),e.etag[T]&&k.setRequestHeader("If-None-Match",e.etag[T])),(R.data&&R.hasContent&&!1!==R.contentType||v.contentType)&&k.setRequestHeader("Content-Type",R.contentType),k.setRequestHeader("Accept",R.dataTypes[0]&&R.accepts[R.dataTypes[0]]?R.accepts[R.dataTypes[0]]+("*"!==R.dataTypes[0]?", "+h+"; q=0.01":""):R.accepts["*"]),R.headers)k.setRequestHeader(H,R.headers[H]);if(R.beforeSend&&(!1===R.beforeSend.call(D,k,R)||C))return k.abort();if($="abort",F.add(R.complete),k.done(R.success),k.fail(R.error),m=g(y,R,v,k)){if(k.readyState=1,L&&q.trigger("ajaxSend",[k,R]),C)return k;R.async&&R.timeout>0&&(b=window.setTimeout((function(){k.abort("timeout")}),R.timeout));try{C=!1,m.send(A,J)}catch(e){if(C)throw e;J(-1,e)}}else J(-1,"No Transport");function J(t,a,r,o){var n,s,i,c,d,f=a;C||(C=!0,b&&window.clearTimeout(b),m=void 0,j=o||"",k.readyState=t>0?4:0,n=t>=200&&t<300||304===t,r&&(c=function(e,t,a){for(var r,o,n,s,i=e.contents,c=e.dataTypes;"*"===c[0];)c.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(o in i)if(i[o]&&i[o].test(r)){c.unshift(o);break}if(c[0]in a)n=c[0];else{for(o in a){if(!c[0]||e.converters[o+" "+c[0]]){n=o;break}s||(s=o)}n=n||s}if(n)return n!==c[0]&&c.unshift(n),a[n]}(R,k,r)),!n&&e.inArray("script",R.dataTypes)>-1&&e.inArray("json",R.dataTypes)<0&&(R.converters["text script"]=function(){}),c=function(e,t,a,r){var o,n,s,i,c,d={},f=e.dataTypes.slice();if(f[1])for(s in e.converters)d[s.toLowerCase()]=e.converters[s];for(n=f.shift();n;)if(e.responseFields[n]&&(a[e.responseFields[n]]=t),!c&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),c=n,n=f.shift())if("*"===n)n=c;else if("*"!==c&&c!==n){if(!(s=d[c+" "+n]||d["* "+n]))for(o in d)if((i=o.split(" "))[1]===n&&(s=d[c+" "+i[0]]||d["* "+i[0]])){!0===s?s=d[o]:!0!==d[o]&&(n=i[0],f.unshift(i[1]));break}if(!0!==s)if(s&&e.throws)t=s(t);else try{t=s(t)}catch(e){return{state:"parsererror",error:s?e:"No conversion from "+c+" to "+n}}}return{state:"success",data:t}}(R,c,k,n),n?(R.ifModified&&((d=k.getResponseHeader("Last-Modified"))&&(e.lastModified[T]=d),(d=k.getResponseHeader("etag"))&&(e.etag[T]=d)),204===t||"HEAD"===R.type?f="nocontent":304===t?f="notmodified":(f=c.state,s=c.data,n=!(i=c.error))):(i=f,!t&&f||(f="error",t<0&&(t=0))),k.status=t,k.statusText=(a||f)+"",n?E.resolveWith(D,[s,f,k]):E.rejectWith(D,[k,f,i]),k.statusCode(O),O=void 0,L&&q.trigger(n?"ajaxSuccess":"ajaxError",[k,R,n?s:i]),F.fireWith(D,[k,f]),L&&(q.trigger("ajaxComplete",[k,R]),--e.active||e.event.trigger("ajaxStop")))}return k},getJSON:function(t,a,r){return e.get(t,a,r,"json")},getScript:function(t,a){return e.get(t,void 0,a,"script")}}),e.each(["get","post"],(function(t,r){e[r]=function(t,o,n,s){return a(o)&&(s=s||n,n=o,o=void 0),e.ajax(e.extend({url:t,type:r,dataType:s,data:o,success:n},e.isPlainObject(t)&&t))}})),e.ajaxPrefilter((function(e){var t;for(t in e.headers)"content-type"===t.toLowerCase()&&(e.contentType=e.headers[t]||"")})),e}));