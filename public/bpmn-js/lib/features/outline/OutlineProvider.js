import{assign}from"min-dash";import{attr as svgAttr,create as svgCreate}from"tiny-svg";import{is,isAny}from"../../util/ModelUtil";import{isLabel}from"../../util/LabelUtil";import{DATA_OBJECT_REFERENCE_OUTLINE_PATH,DATA_STORE_REFERENCE_OUTLINE_PATH,DATA_OBJECT_REFERENCE_STANDARD_SIZE,DATA_STORE_REFERENCE_STANDARD_SIZE,createPath}from"./OutlineUtil";const DEFAULT_OFFSET=5;export default function OutlineProvider(t,e){this._styles=e,t.registerProvider(this)}function isStandardSize(t,e){var i;return"bpmn:DataObjectReference"===e?i=DATA_OBJECT_REFERENCE_STANDARD_SIZE:"bpmn:DataStoreReference"===e&&(i=DATA_STORE_REFERENCE_STANDARD_SIZE),t.width===i.width&&t.height===i.height}OutlineProvider.$inject=["outline","styles"],OutlineProvider.prototype.getOutline=function(t){const e=this._styles.cls("djs-outline",["no-fill"]);var i;if(!isLabel(t))return is(t,"bpmn:Gateway")?(i=svgCreate("rect"),assign(i.style,{"transform-box":"fill-box",transform:"rotate(45deg)","transform-origin":"center"}),svgAttr(i,assign({x:2,y:2,rx:4,width:t.width-4,height:t.height-4},e))):isAny(t,["bpmn:Task","bpmn:SubProcess","bpmn:Group","bpmn:CallActivity"])?(i=svgCreate("rect"),svgAttr(i,assign({x:-5,y:-5,rx:14,width:t.width+10,height:t.height+10},e))):is(t,"bpmn:EndEvent")?(i=svgCreate("circle"),svgAttr(i,assign({cx:t.width/2,cy:t.height/2,r:t.width/2+5+1},e))):is(t,"bpmn:Event")?(i=svgCreate("circle"),svgAttr(i,assign({cx:t.width/2,cy:t.height/2,r:t.width/2+5},e))):is(t,"bpmn:DataObjectReference")&&isStandardSize(t,"bpmn:DataObjectReference")?i=createPath(DATA_OBJECT_REFERENCE_OUTLINE_PATH,{x:-6,y:-6},e):is(t,"bpmn:DataStoreReference")&&isStandardSize(t,"bpmn:DataStoreReference")&&(i=createPath(DATA_STORE_REFERENCE_OUTLINE_PATH,{x:-6,y:-6},e)),i},OutlineProvider.prototype.updateOutline=function(t,e){if(!isLabel(t))return isAny(t,["bpmn:SubProcess","bpmn:Group"])?(svgAttr(e,{width:t.width+10,height:t.height+10}),!0):!!isAny(t,["bpmn:Event","bpmn:Gateway","bpmn:DataStoreReference","bpmn:DataObjectReference"])};