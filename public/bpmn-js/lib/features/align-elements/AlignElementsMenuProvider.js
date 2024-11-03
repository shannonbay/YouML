import ICONS from"./AlignElementsIcons";import{assign,forEach}from"min-dash";var ALIGNMENT_OPTIONS=["left","center","right","top","middle","bottom"];export default function AlignElementsMenuProvider(e,t,n,i){this._alignElements=t,this._translate=n,this._popupMenu=e,this._rules=i,e.registerProvider("align-elements",this)}AlignElementsMenuProvider.$inject=["popupMenu","alignElements","translate","rules"],AlignElementsMenuProvider.prototype.getPopupMenuEntries=function(e){var t={};return this._isAllowed(e)&&assign(t,this._getEntries(e)),t},AlignElementsMenuProvider.prototype._isAllowed=function(e){return this._rules.allowed("elements.align",{elements:e})},AlignElementsMenuProvider.prototype._getEntries=function(e){var t=this._alignElements,n=this._translate,i=this._popupMenu,l={};return forEach(ALIGNMENT_OPTIONS,(function(r){l["align-elements-"+r]={group:"align",title:n("Align elements "+r),className:"bjs-align-elements-menu-entry",imageHtml:ICONS[r],action:function(){t.trigger(e,r),i.close()}}})),l};