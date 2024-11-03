import{getBusinessObject,getDi,is}from"../../util/ModelUtil";import{forEach,isArray,isUndefined,omit,reduce}from"min-dash";import{isLabel}from"../../util/LabelUtil";function copyProperties(e,t,s){isArray(s)||(s=[s]),forEach(s,(function(s){isUndefined(e[s])||(t[s]=e[s])}))}var LOW_PRIORITY=750;export default function BpmnCopyPaste(e,t,s){function n(t,n){var i=e.create(t.$type);return s.copyElement(t,i,null,n)}t.on("copyPaste.copyElement",LOW_PRIORITY,(function(e){var t=e.descriptor,s=e.element,i=getBusinessObject(s);if(isLabel(s))return t;var r=t.businessObject=n(i,!0),o=t.di=n(getDi(s),!0);o.bpmnElement=r,copyProperties(r,t,"name"),copyProperties(o,t,"isExpanded"),i.default&&(t.default=i.default.id)}));var i="-bpmn-js-refs";t.on("copyPaste.pasteElement",(function(e){var t=e.cache,s=e.descriptor,i=s.businessObject,r=s.di;if(isLabel(s))return s.businessObject=getBusinessObject(t[s.labelTarget]),void(s.di=getDi(t[s.labelTarget]));i=s.businessObject=n(i),(r=s.di=n(r)).bpmnElement=i,copyProperties(s,i,["isExpanded","name"]),s.type=i.$type})),t.on("copyPaste.copyElement",LOW_PRIORITY,(function(e){var t=e.descriptor,s=e.element;if(is(s,"bpmn:Participant")){var i=getBusinessObject(s);i.processRef&&(t.processRef=n(i.processRef,!0))}})),t.on("copyPaste.pasteElement",(function(e){var t=e.descriptor,s=t.processRef;s&&(t.processRef=n(s))})),t.on("copyPaste.pasteElement",LOW_PRIORITY,(function(e){var t=e.cache;!function(e,t){e[i]=t}(t,function(e,t,s){var n=getBusinessObject(e);return e.default&&(s[e.default]={element:n,property:"default"}),e.host&&(getBusinessObject(e).attachedToRef=getBusinessObject(t[e.host])),omit(s,reduce(s,(function(t,s,i){var r=s.element,o=s.property;return i===e.id&&(r.set(o,n),t.push(e.id)),t}),[]))}(e.descriptor,t,function(e){return e[i]=e[i]||{}}(t)))}))}BpmnCopyPaste.$inject=["bpmnFactory","eventBus","moddleCopy"];