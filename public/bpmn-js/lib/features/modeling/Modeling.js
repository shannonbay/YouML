import inherits from"inherits-browser";import BaseModeling from"diagram-js/lib/features/modeling/Modeling";import UpdateModdlePropertiesHandler from"./cmd/UpdateModdlePropertiesHandler";import UpdatePropertiesHandler from"./cmd/UpdatePropertiesHandler";import UpdateCanvasRootHandler from"./cmd/UpdateCanvasRootHandler";import AddLaneHandler from"./cmd/AddLaneHandler";import SplitLaneHandler from"./cmd/SplitLaneHandler";import ResizeLaneHandler from"./cmd/ResizeLaneHandler";import UpdateFlowNodeRefsHandler from"./cmd/UpdateFlowNodeRefsHandler";import IdClaimHandler from"./cmd/IdClaimHandler";import SetColorHandler from"./cmd/SetColorHandler";import UpdateLabelHandler from"../label-editing/cmd/UpdateLabelHandler";export default function Modeling(e,t,o,n){BaseModeling.call(this,e,t,o),this._bpmnRules=n}inherits(Modeling,BaseModeling),Modeling.$inject=["eventBus","elementFactory","commandStack","bpmnRules"],Modeling.prototype.getHandlers=function(){var e=BaseModeling.prototype.getHandlers.call(this);return e["element.updateModdleProperties"]=UpdateModdlePropertiesHandler,e["element.updateProperties"]=UpdatePropertiesHandler,e["canvas.updateRoot"]=UpdateCanvasRootHandler,e["lane.add"]=AddLaneHandler,e["lane.resize"]=ResizeLaneHandler,e["lane.split"]=SplitLaneHandler,e["lane.updateRefs"]=UpdateFlowNodeRefsHandler,e["id.updateClaim"]=IdClaimHandler,e["element.setColor"]=SetColorHandler,e["element.updateLabel"]=UpdateLabelHandler,e},Modeling.prototype.updateLabel=function(e,t,o,n){this._commandStack.execute("element.updateLabel",{element:e,newLabel:t,newBounds:o,hints:n||{}})},Modeling.prototype.connect=function(e,t,o,n){var a=this._bpmnRules;if(o||(o=a.canConnect(e,t)),o)return this.createConnection(e,t,o,e.parent,n)},Modeling.prototype.updateModdleProperties=function(e,t,o){this._commandStack.execute("element.updateModdleProperties",{element:e,moddleElement:t,properties:o})},Modeling.prototype.updateProperties=function(e,t){this._commandStack.execute("element.updateProperties",{element:e,properties:t})},Modeling.prototype.resizeLane=function(e,t,o){this._commandStack.execute("lane.resize",{shape:e,newBounds:t,balanced:o})},Modeling.prototype.addLane=function(e,t){var o={shape:e,location:t};return this._commandStack.execute("lane.add",o),o.newLane},Modeling.prototype.splitLane=function(e,t){this._commandStack.execute("lane.split",{shape:e,count:t})},Modeling.prototype.makeCollaboration=function(){var e=this._create("root",{type:"bpmn:Collaboration"}),t={newRoot:e};return this._commandStack.execute("canvas.updateRoot",t),e},Modeling.prototype.makeProcess=function(){var e=this._create("root",{type:"bpmn:Process"}),t={newRoot:e};return this._commandStack.execute("canvas.updateRoot",t),e},Modeling.prototype.updateLaneRefs=function(e,t){this._commandStack.execute("lane.updateRefs",{flowNodeShapes:e,laneShapes:t})},Modeling.prototype.claimId=function(e,t){this._commandStack.execute("id.updateClaim",{id:e,element:t,claiming:!0})},Modeling.prototype.unclaimId=function(e,t){this._commandStack.execute("id.updateClaim",{id:e,element:t})},Modeling.prototype.setColor=function(e,t){e.length||(e=[e]),this._commandStack.execute("element.setColor",{elements:e,colors:t})};