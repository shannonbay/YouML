import{add as collectionAdd,remove as collectionRemove}from"diagram-js/lib/util/Collections";import{getDi}from"../../../util/ModelUtil";export default function UpdateCanvasRootHandler(e,t){this._canvas=e,this._modeling=t}UpdateCanvasRootHandler.$inject=["canvas","modeling"],UpdateCanvasRootHandler.prototype.execute=function(e){var t=this._canvas,o=e.newRoot,n=o.businessObject,l=t.getRootElement(),a=l.businessObject,i=a.$parent,s=getDi(l);return t.setRootElement(o),t.removeRootElement(l),collectionAdd(i.rootElements,n),n.$parent=i,collectionRemove(i.rootElements,a),a.$parent=null,l.di=null,s.bpmnElement=n,o.di=s,e.oldRoot=l,[]},UpdateCanvasRootHandler.prototype.revert=function(e){var t=this._canvas,o=e.newRoot,n=o.businessObject,l=e.oldRoot,a=l.businessObject,i=n.$parent,s=getDi(o);return t.setRootElement(l),t.removeRootElement(o),collectionRemove(i.rootElements,n),n.$parent=null,collectionAdd(i.rootElements,a),a.$parent=i,o.di=null,s.bpmnElement=a,l.di=s,[]};