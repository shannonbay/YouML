import inherits from"inherits-browser";import CommandInterceptor from"diagram-js/lib/command/CommandInterceptor";import{getBusinessObject}from"../../../util/ModelUtil";import{isAny}from"../util/ModelingUtil";import{isLabel}from"../../../util/LabelUtil";var LOW_PRIORITY=500;export default function AttachEventBehavior(e,t){t.invoke(CommandInterceptor,this),this._bpmnReplace=e;var n=this;this.postExecuted("elements.create",LOW_PRIORITY,(function(e){var t=e.elements;1===(t=t.filter((function(e){return shouldReplace(e,e.host)}))).length&&t.map((function(e){return t.indexOf(e)})).forEach((function(i){var r=t[i];e.elements[i]=n._replaceShape(t[i],r)}))}),!0),this.preExecute("elements.move",LOW_PRIORITY,(function(e){var t=e.shapes,i=e.newHost;if(1===t.length){var r=t[0];shouldReplace(r,i)&&(e.shapes=[n._replaceShape(r,i)])}}),!0)}function getEventDefinition(e){var t=getBusinessObject(e).eventDefinitions;return t&&t[0]}function shouldReplace(e,t){return!isLabel(e)&&isAny(e,["bpmn:IntermediateThrowEvent","bpmn:IntermediateCatchEvent"])&&!!t}AttachEventBehavior.$inject=["bpmnReplace","injector"],inherits(AttachEventBehavior,CommandInterceptor),AttachEventBehavior.prototype._replaceShape=function(e,t){var n=getEventDefinition(e),i={type:"bpmn:BoundaryEvent",host:t};return n&&(i.eventDefinitionType=n.$type),this._bpmnReplace.replaceElement(e,i,{layoutConnection:!1})};