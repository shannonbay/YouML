import CommandInterceptor from"diagram-js/lib/command/CommandInterceptor";import inherits from"inherits-browser";import{escapeCSS as cssEscape}from"diagram-js/lib/util/EscapeUtil";import{assign,forEach}from"min-dash";import{query as domQuery}from"min-dom";import{attr as svgAttr}from"tiny-svg";var LOW_PRIORITY=250;export default function BpmnReplacePreview(e,a,r,t,n){CommandInterceptor.call(this,e),e.on("shape.move.move",LOW_PRIORITY,(function(e){var m=e.context,i=m.canExecute;m.visualReplacements||(m.visualReplacements={}),i&&i.replacements?function(e){var m=e.canExecute.replacements;forEach(m,(function(m){var i=m.oldElementId,o={type:m.newElementType};if(!e.visualReplacements[i]){var s=a.get(i);assign(o,{x:s.x,y:s.y});var p=r.createShape(o);t.addShape(p,s.parent);var c=domQuery('[data-element-id="'+cssEscape(s.id)+'"]',e.dragGroup);c&&svgAttr(c,{display:"none"});var l=n.addDragger(p,e.dragGroup);e.visualReplacements[i]=l,t.removeShape(p)}}))}(m):function(e){var a=e.visualReplacements;forEach(a,(function(r,t){var n=domQuery('[data-element-id="'+cssEscape(t)+'"]',e.dragGroup);n&&svgAttr(n,{display:"inline"}),r.remove(),a[t]&&delete a[t]}))}(m)}))}BpmnReplacePreview.$inject=["eventBus","elementRegistry","elementFactory","canvas","previewSupport"],inherits(BpmnReplacePreview,CommandInterceptor);