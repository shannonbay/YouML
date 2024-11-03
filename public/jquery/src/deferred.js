define(["./core","./var/isFunction","./var/slice","./callbacks"],(function(e,r,n){"use strict";function t(e){return e}function o(e){throw e}function i(e,n,t,o){var i;try{e&&r(i=e.promise)?i.call(e).done(n).fail(t):e&&r(i=e.then)?i.call(e,n,t):n.apply(void 0,[e].slice(o))}catch(e){t.apply(void 0,[e])}}return e.extend({Deferred:function(n){var i=[["notify","progress",e.Callbacks("memory"),e.Callbacks("memory"),2],["resolve","done",e.Callbacks("once memory"),e.Callbacks("once memory"),0,"resolved"],["reject","fail",e.Callbacks("once memory"),e.Callbacks("once memory"),1,"rejected"]],c="pending",a={state:function(){return c},always:function(){return l.done(arguments).fail(arguments),this},catch:function(e){return a.then(null,e)},pipe:function(){var n=arguments;return e.Deferred((function(t){e.each(i,(function(e,o){var i=r(n[o[4]])&&n[o[4]];l[o[1]]((function(){var e=i&&i.apply(this,arguments);e&&r(e.promise)?e.promise().progress(t.notify).done(t.resolve).fail(t.reject):t[o[0]+"With"](this,i?[e]:arguments)}))})),n=null})).promise()},then:function(n,c,a){var l=0;function f(n,i,c,a){return function(){var s=this,u=arguments,d=function(){var e,d;if(!(n<l)){if((e=c.apply(s,u))===i.promise())throw new TypeError("Thenable self-resolution");d=e&&("object"==typeof e||"function"==typeof e)&&e.then,r(d)?a?d.call(e,f(l,i,t,a),f(l,i,o,a)):(l++,d.call(e,f(l,i,t,a),f(l,i,o,a),f(l,i,t,i.notifyWith))):(c!==t&&(s=void 0,u=[e]),(a||i.resolveWith)(s,u))}},h=a?d:function(){try{d()}catch(r){e.Deferred.exceptionHook&&e.Deferred.exceptionHook(r,h.error),n+1>=l&&(c!==o&&(s=void 0,u=[r]),i.rejectWith(s,u))}};n?h():(e.Deferred.getErrorHook?h.error=e.Deferred.getErrorHook():e.Deferred.getStackHook&&(h.error=e.Deferred.getStackHook()),window.setTimeout(h))}}return e.Deferred((function(e){i[0][3].add(f(0,e,r(a)?a:t,e.notifyWith)),i[1][3].add(f(0,e,r(n)?n:t)),i[2][3].add(f(0,e,r(c)?c:o))})).promise()},promise:function(r){return null!=r?e.extend(r,a):a}},l={};return e.each(i,(function(e,r){var n=r[2],t=r[5];a[r[1]]=n.add,t&&n.add((function(){c=t}),i[3-e][2].disable,i[3-e][3].disable,i[0][2].lock,i[0][3].lock),n.add(r[3].fire),l[r[0]]=function(){return l[r[0]+"With"](this===l?void 0:this,arguments),this},l[r[0]+"With"]=n.fireWith})),a.promise(l),n&&n.call(l,l),l},when:function(t){var o=arguments.length,c=o,a=Array(c),l=n.call(arguments),f=e.Deferred(),s=function(e){return function(r){a[e]=this,l[e]=arguments.length>1?n.call(arguments):r,--o||f.resolveWith(a,l)}};if(o<=1&&(i(t,f.done(s(c)).resolve,f.reject,!o),"pending"===f.state()||r(l[c]&&l[c].then)))return f.then();for(;c--;)i(l[c],s(c),f.reject);return f.promise()}}),e}));