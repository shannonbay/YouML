import{filter}from"min-dash";import{eachElement}from"diagram-js/lib/util/Elements";import{getLanesRoot,getChildLanes,LANE_INDENTATION}from"../util/LaneUtil";import{isHorizontal}from"../../../util/DiUtil";export default function AddLaneHandler(t,e){this._modeling=t,this._spaceTool=e}AddLaneHandler.$inject=["modeling","spaceTool"],AddLaneHandler.prototype.preExecute=function(t){var e=this._spaceTool,i=this._modeling,o=t.shape,a=t.location,n=getLanesRoot(o),h=n===o,l=h?o:o.parent,r=getChildLanes(l),N=isHorizontal(o);if(N?"left"===a?a="top":"right"===a&&(a="bottom"):"top"===a?a="left":"bottom"===a&&(a="right"),!r.length){var p=N?{x:o.x+LANE_INDENTATION,y:o.y,width:o.width-LANE_INDENTATION,height:o.height}:{x:o.x,y:o.y+LANE_INDENTATION,width:o.width,height:o.height-LANE_INDENTATION};i.createShape({type:"bpmn:Lane",isHorizontal:N},p,l)}var d,s,m,g,A,E=[];eachElement(n,(function(t){return E.push(t),t.label&&E.push(t.label),t===o?[]:filter(t.children,(function(t){return t!==o}))})),"top"===a?(d=-120,m=(s=o.y)+10,g="n",A="y"):"left"===a?(d=-120,m=(s=o.x)+10,g="w",A="x"):"bottom"===a?(d=120,m=(s=o.y+o.height)-10,g="s",A="y"):"right"===a&&(d=120,m=(s=o.x+o.width)-10,g="e",A="x");var T=e.calculateAdjustments(E,A,d,m),L=N?{x:0,y:d}:{x:d,y:0};e.makeSpace(T.movingShapes,T.resizingShapes,L,g,m);var c=N?{x:o.x+(h?LANE_INDENTATION:0),y:s-("top"===a?120:0),width:o.width-(h?LANE_INDENTATION:0),height:120}:{x:s-("left"===a?120:0),y:o.y+(h?LANE_INDENTATION:0),width:120,height:o.height-(h?LANE_INDENTATION:0)};t.newLane=i.createShape({type:"bpmn:Lane",isHorizontal:N},c,l)};