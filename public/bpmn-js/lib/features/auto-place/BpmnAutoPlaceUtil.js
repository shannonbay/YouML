import{is}from"../../util/ModelUtil";import{isAny,isDirectionHorizontal}from"../modeling/util/ModelingUtil";import{getMid,asTRBL,getOrientation}from"diagram-js/lib/layout/LayoutUtil";import{findFreePosition,generateGetNextPosition,getConnectedDistance}from"diagram-js/lib/features/auto-place/AutoPlaceUtil";import{isConnection}from"diagram-js/lib/util/ModelUtil";export function getNewShapePosition(t,i,e){var n=isDirectionHorizontal(t,e);return is(i,"bpmn:TextAnnotation")?getTextAnnotationPosition(t,i,n):isAny(i,["bpmn:DataObjectReference","bpmn:DataStoreReference"])?getDataElementPosition(t,i,n):is(i,"bpmn:FlowNode")?getFlowNodePosition(t,i,n):void 0}export function getFlowNodePosition(t,i,e){var n=asTRBL(t),o=getMid(t),r=e?{directionHint:"e",minDistance:80,baseOrientation:"left",boundaryOrientation:"top",start:"top",end:"bottom"}:{directionHint:"s",minDistance:90,baseOrientation:"top",boundaryOrientation:"left",start:"left",end:"right"},a=getConnectedDistance(t,{filter:function(t){return is(t,"bpmn:SequenceFlow")},direction:r.directionHint}),s=30,d=r.minDistance,g=r.baseOrientation;is(t,"bpmn:BoundaryEvent")&&-1!==(g=getOrientation(t,t.host,-25)).indexOf(r.boundaryOrientation)&&(s*=-1);var m=e?{x:n.right+a+i.width/2,y:o.y+getDistance(g,d,r)}:{x:o.x+getDistance(g,d,r),y:n.bottom+a+i.height/2},c={margin:s,minDistance:d};return findFreePosition(t,i,m,generateGetNextPosition(e?{y:c}:{x:c}))}function getDistance(t,i,e){return t.includes(e.start)?-1*i:t.includes(e.end)?i:0}export function getTextAnnotationPosition(t,i,e){var n=asTRBL(t),o=e?{x:n.right+i.width/2,y:n.top-50-i.height/2}:{x:n.right+50+i.width/2,y:n.bottom+i.height/2};isConnection(t)&&(o=getMid(t),e?(o.x+=100,o.y-=50):(o.x+=100,o.y+=50));var r={margin:e?-30:30,minDistance:20};return findFreePosition(t,i,o,generateGetNextPosition(e?{y:r}:{x:r}))}export function getDataElementPosition(t,i,e){var n=asTRBL(t),o=e?{x:n.right-10+i.width/2,y:n.bottom+40+i.width/2}:{x:n.left-40-i.width/2,y:n.bottom-10+i.height/2},r={margin:30,minDistance:30};return findFreePosition(t,i,o,generateGetNextPosition(e?{x:r}:{y:r}))}