export default function IdClaimHandler(e){this._moddle=e}IdClaimHandler.$inject=["moddle"],IdClaimHandler.prototype.execute=function(e){var i=this._moddle.ids,d=e.id,l=e.element;return e.claiming?i.claim(d,l):i.unclaim(d),[]},IdClaimHandler.prototype.revert=function(e){var i=this._moddle.ids,d=e.id,l=e.element;return e.claiming?i.unclaim(d):i.claim(d,l),[]};