import inherits from"inherits-browser";import CommandInterceptor from"diagram-js/lib/command/CommandInterceptor";import{getBusinessObject,getDi,is}from"../../../util/ModelUtil";import{isAny}from"../util/ModelingUtil";import UpdateSemanticParentHandler from"../cmd/UpdateSemanticParentHandler";export default function DataStoreBehavior(e,t,n,r){function a(e){return e.children.filter((function(e){return is(e,"bpmn:DataStoreReference")&&!e.labelTarget}))}function i(e,r){var a=e.businessObject||e;if(r=r||n.filter((function(e){return is(e,"bpmn:Participant")&&getBusinessObject(e).processRef}))[0]){var i=r.businessObject||r;t.execute("dataStore.updateContainment",{dataStoreBo:a,dataStoreDi:getDi(e),newSemanticParent:i.processRef||i,newDiParent:getDi(r)})}}CommandInterceptor.call(this,r),t.registerHandler("dataStore.updateContainment",UpdateSemanticParentHandler),this.preExecute("shape.create",(function(e){var t=e.context,n=t.shape;is(n,"bpmn:DataStoreReference")&&"label"!==n.type&&(t.hints||(t.hints={}),t.hints.autoResize=!1)})),this.preExecute("elements.move",(function(e){var t=e.context,n=t.shapes;n.filter((function(e){return is(e,"bpmn:DataStoreReference")})).length&&(t.hints||(t.hints={}),t.hints.autoResize=n.filter((function(e){return!is(e,"bpmn:DataStoreReference")})))})),this.postExecute("shape.create",(function(e){var t=e.context.shape,n=t.parent;is(t,"bpmn:DataStoreReference")&&"label"!==t.type&&is(n,"bpmn:Collaboration")&&i(t)})),this.postExecute("shape.move",(function(e){var t=e.context,n=t.shape,r=t.oldParent,a=n.parent;is(r,"bpmn:Collaboration")||is(n,"bpmn:DataStoreReference")&&"label"!==n.type&&is(a,"bpmn:Collaboration")&&i(n,is(r,"bpmn:Participant")?r:getAncestor(r,"bpmn:Participant"))})),this.postExecute("shape.delete",(function(t){var n=t.context.shape,r=e.getRootElement();isAny(n,["bpmn:Participant","bpmn:SubProcess"])&&is(r,"bpmn:Collaboration")&&a(r).filter((function(e){return isDescendant(e,n)})).forEach((function(e){i(e)}))})),this.postExecute("canvas.updateRoot",(function(e){var t=e.context,n=t.oldRoot,r=t.newRoot;a(n).forEach((function(e){is(r,"bpmn:Process")&&i(e,r)}))}))}function isDescendant(e,t){for(var n=e.businessObject||e,r=t.businessObject||t;n.$parent;){if(n.$parent===r.processRef||r)return!0;n=n.$parent}return!1}function getAncestor(e,t){for(;e.parent;){if(is(e.parent,t))return e.parent;e=e.parent}}DataStoreBehavior.$inject=["canvas","commandStack","elementRegistry","eventBus"],inherits(DataStoreBehavior,CommandInterceptor);