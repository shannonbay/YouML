import{getChildLanes,LANE_INDENTATION}from"../util/LaneUtil";import{isHorizontal}from"../../../util/DiUtil";export default function SplitLaneHandler(t){this._modeling=t}SplitLaneHandler.$inject=["modeling"],SplitLaneHandler.prototype.preExecute=function(t){var e=this._modeling,i=t.shape,n=t.count,h=getChildLanes(i),o=h.length;if(o>n)throw new Error(`more than <${n}> child lanes`);var r,a,l,N,d=isHorizontal(i),p=d?i.height:i.width,E=Math.round(p/n);for(N=0;N<n;N++)r=N===n-1?p-E*N:E,a=d?{x:i.x+LANE_INDENTATION,y:i.y+N*E,width:i.width-LANE_INDENTATION,height:r}:{x:i.x+N*E,y:i.y+LANE_INDENTATION,width:r,height:i.height-LANE_INDENTATION},N<o?e.resizeShape(h[N],a):(l={type:"bpmn:Lane",isHorizontal:d},e.createShape(l,a,i))};