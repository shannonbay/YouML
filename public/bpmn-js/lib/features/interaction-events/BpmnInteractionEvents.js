import{is}from"../../util/ModelUtil";import{isExpanded,isHorizontal}from"../../util/DiUtil";var LABEL_WIDTH=30,LABEL_HEIGHT=30;export default function BpmnInteractionEvents(t,i){this._interactionEvents=i;var e=this;t.on(["interactionEvents.createHit","interactionEvents.updateHit"],(function(t){var i=t.element,n=t.gfx;return is(i,"bpmn:Lane")?e._createParticipantHit(i,n):is(i,"bpmn:Participant")?isExpanded(i)?e._createParticipantHit(i,n):e._createDefaultHit(i,n):is(i,"bpmn:SubProcess")?isExpanded(i)?e._createSubProcessHit(i,n):e._createDefaultHit(i,n):void 0}))}BpmnInteractionEvents.$inject=["eventBus","interactionEvents"],BpmnInteractionEvents.prototype._createDefaultHit=function(t,i){return this._interactionEvents.removeHits(i),this._interactionEvents.createDefaultHit(t,i),!0},BpmnInteractionEvents.prototype._createParticipantHit=function(t,i){this._interactionEvents.removeHits(i),this._interactionEvents.createBoxHit(i,"no-move",{width:t.width,height:t.height}),this._interactionEvents.createBoxHit(i,"click-stroke",{width:t.width,height:t.height});var e=isHorizontal(t)?{width:LABEL_WIDTH,height:t.height}:{width:t.width,height:LABEL_HEIGHT};return this._interactionEvents.createBoxHit(i,"all",e),!0},BpmnInteractionEvents.prototype._createSubProcessHit=function(t,i){return this._interactionEvents.removeHits(i),this._interactionEvents.createBoxHit(i,"no-move",{width:t.width,height:t.height}),this._interactionEvents.createBoxHit(i,"click-stroke",{width:t.width,height:t.height}),this._interactionEvents.createBoxHit(i,"all",{width:t.width,height:LABEL_HEIGHT}),!0};