define(["../core","../core/toType","../var/isFunction"],(function(n,l,r){"use strict";var e=function(c,t,i,o,u,f,a){var s=0,v=c.length,d=null==i;if("object"===l(i))for(s in u=!0,i)e(c,t,s,i[s],!0,f,a);else if(void 0!==o&&(u=!0,r(o)||(a=!0),d&&(a?(t.call(c,o),t=null):(d=t,t=function(l,r,e){return d.call(n(l),e)})),t))for(;s<v;s++)t(c[s],i,a?o:o.call(c[s],s,t(c[s],i)));return u?c:d?t.call(c):v?t(c[0],i):f};return e}));