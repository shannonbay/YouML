import{is}from"../../../util/ModelUtil";import{roundBounds}from"diagram-js/lib/layout/LayoutUtil";import{hasPrimaryModifier}from"diagram-js/lib/util/Mouse";var SLIGHTLY_HIGHER_PRIORITY=1001;export default function ResizeLaneBehavior(i,e){i.on("resize.start",SLIGHTLY_HIGHER_PRIORITY+500,(function(i){var e=i.context,n=e.shape;(is(n,"bpmn:Lane")||is(n,"bpmn:Participant"))&&(e.balanced=!hasPrimaryModifier(i))})),i.on("resize.end",SLIGHTLY_HIGHER_PRIORITY,(function(i){var n=i.context,a=n.shape,r=n.canExecute,o=n.newBounds;if(is(a,"bpmn:Lane")||is(a,"bpmn:Participant"))return r&&(o=roundBounds(o),e.resizeLane(a,o,n.balanced)),!1}))}ResizeLaneBehavior.$inject=["eventBus","modeling"];