import{is}from"../../../util/ModelUtil";import{getLanesRoot,computeLanesResize}from"../util/LaneUtil";import{eachElement}from"diagram-js/lib/util/Elements";import{asTRBL}from"diagram-js/lib/layout/LayoutUtil";import{substractTRBL}from"diagram-js/lib/features/resize/ResizeUtil";export default function ResizeLaneHandler(e,t){this._modeling=e,this._spaceTool=t}ResizeLaneHandler.$inject=["modeling","spaceTool"],ResizeLaneHandler.prototype.preExecute=function(e){var t=e.shape,i=e.newBounds;!1!==e.balanced?this.resizeBalanced(t,i):this.resizeSpace(t,i)},ResizeLaneHandler.prototype.resizeBalanced=function(e,t){var i=this._modeling,a=computeLanesResize(e,t);i.resizeShape(e,t),a.forEach((function(e){i.resizeShape(e.shape,e.newBounds)}))},ResizeLaneHandler.prototype.resizeSpace=function(e,t){var i,a,o,s,n,r=this._spaceTool,l=asTRBL(e),p=asTRBL(t),m=substractTRBL(p,l),c=getLanesRoot(e),h=[],u=[];eachElement(c,(function(e){return h.push(e),(is(e,"bpmn:Lane")||is(e,"bpmn:Participant"))&&u.push(e),e.children})),(m.bottom||m.top)&&(i=m.bottom||m.top,a=e.y+(m.bottom?e.height:0)+(m.bottom?-10:10),o=m.bottom?"s":"n",s=m.top>0||m.bottom<0?-i:i,n=r.calculateAdjustments(h,"y",s,a),r.makeSpace(n.movingShapes,n.resizingShapes,{x:0,y:i},o)),(m.left||m.right)&&(i=m.right||m.left,a=e.x+(m.right?e.width:0)+(m.right?-10:100),o=m.right?"e":"w",s=m.left>0||m.right<0?-i:i,n=r.calculateAdjustments(u,"x",s,a),r.makeSpace(n.movingShapes,n.resizingShapes,{x:i,y:0},o))};