import{assign}from"min-dash";import ICONS from"./AlignElementsIcons";var LOW_PRIORITY=900;export default function AlignElementsContextPadProvider(t,e,n,i){t.registerProvider(LOW_PRIORITY,this),this._contextPad=t,this._popupMenu=e,this._translate=n,this._canvas=i}AlignElementsContextPadProvider.$inject=["contextPad","popupMenu","translate","canvas"],AlignElementsContextPadProvider.prototype.getMultiElementContextPadEntries=function(t){var e={};return this._isAllowed(t)&&assign(e,this._getEntries(t)),e},AlignElementsContextPadProvider.prototype._isAllowed=function(t){return!this._popupMenu.isEmpty(t,"align-elements")},AlignElementsContextPadProvider.prototype._getEntries=function(){var t=this;return{"align-elements":{group:"align-elements",title:t._translate("Align elements"),html:`<div class="entry">${ICONS.align}</div>`,action:{click:function(e,n){var i=t._getMenuPosition(n);assign(i,{cursor:{x:e.x,y:e.y}}),t._popupMenu.open(n,"align-elements",i)}}}}},AlignElementsContextPadProvider.prototype._getMenuPosition=function(t){var e=this._contextPad.getPad(t).html.getBoundingClientRect();return{x:e.left,y:e.bottom+5}};