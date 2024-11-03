import{assign,forEach,isArray,every}from"min-dash";import{is}from"../../util/ModelUtil";import{isExpanded,isHorizontal,isEventSubProcess}from"../../util/DiUtil";import{isAny}from"../modeling/util/ModelingUtil";import{getChildLanes}from"../modeling/util/LaneUtil";import{hasPrimaryModifier}from"diagram-js/lib/util/Mouse";export default function ContextPadProvider(e,n,t,i,a,o,s,c,r,p,l,d,m){e=e||{},i.registerProvider(this),this._contextPad=i,this._modeling=a,this._elementFactory=o,this._connect=s,this._create=c,this._popupMenu=r,this._canvas=p,this._rules=l,this._translate=d,this._eventBus=t,this._appendPreview=m,!1!==e.autoPlace&&(this._autoPlace=n.get("autoPlace",!1)),t.on("create.end",250,(function(e){var n=e.context.shape;if(hasPrimaryModifier(e)&&i.isOpen(n)){var t=i.getEntries(n);t.replace&&t.replace.action.click(e,n)}})),t.on("contextPad.close",(function(){m.cleanUp()}))}function isEventType(e,n,t){var i=e.$instanceOf(n),a=!1,o=e.eventDefinitions||[];return forEach(o,(function(e){e.$type===t&&(a=!0)})),i&&a}ContextPadProvider.$inject=["config.contextPad","injector","eventBus","contextPad","modeling","elementFactory","connect","create","popupMenu","canvas","rules","translate","appendPreview"],ContextPadProvider.prototype.getMultiElementContextPadEntries=function(e){var n=this._modeling,t={};return this._isDeleteAllowed(e)&&assign(t,{delete:{group:"edit",className:"bpmn-icon-trash",title:this._translate("Delete"),action:{click:function(e,t){n.removeElements(t.slice())}}}}),t},ContextPadProvider.prototype._isDeleteAllowed=function(e){var n=this._rules.allowed("elements.delete",{elements:e});return isArray(n)?every(e,(e=>n.includes(e))):n},ContextPadProvider.prototype.getContextPadEntries=function(e){var n=this._contextPad,t=this._modeling,i=this._elementFactory,a=this._connect,o=this._create,s=this._popupMenu,c=this._autoPlace,r=this._translate,p=this._appendPreview,l={};if("label"===e.type)return this._isDeleteAllowed([e])&&assign(l,u()),l;var d=e.businessObject;function m(e,n){a.start(e,n)}function v(e,n){t.removeElements([n])}function u(){return{delete:{group:"edit",className:"bpmn-icon-trash",title:r("Delete"),action:{click:v}}}}function b(e,n,t,a){function s(n,t){var s=i.createShape(assign({type:e},a));o.start(n,s,{source:t})}var r=c?function(n,t){var o=i.createShape(assign({type:e},a));c.append(t,o)}:s,l=c?function(n,t){return p.create(t,e,a),()=>{p.cleanUp()}}:null;return{group:"model",className:n,title:t,action:{dragstart:s,click:r,hover:l}}}function g(e){return function(i,a){t.splitLane(a,e),n.open(a,!0)}}if(isAny(d,["bpmn:Lane","bpmn:Participant"])&&isExpanded(e)){var h=getChildLanes(e);assign(l,{"lane-insert-above":{group:"lane-insert-above",className:"bpmn-icon-lane-insert-above",title:r("Add lane above"),action:{click:function(e,n){t.addLane(n,"top")}}}}),h.length<2&&((isHorizontal(e)?e.height>=120:e.width>=120)&&assign(l,{"lane-divide-two":{group:"lane-divide",className:"bpmn-icon-lane-divide-two",title:r("Divide into two lanes"),action:{click:g(2)}}}),(isHorizontal(e)?e.height>=180:e.width>=180)&&assign(l,{"lane-divide-three":{group:"lane-divide",className:"bpmn-icon-lane-divide-three",title:r("Divide into three lanes"),action:{click:g(3)}}})),assign(l,{"lane-insert-below":{group:"lane-insert-below",className:"bpmn-icon-lane-insert-below",title:r("Add lane below"),action:{click:function(e,n){t.addLane(n,"bottom")}}}})}return is(d,"bpmn:FlowNode")&&(is(d,"bpmn:EventBasedGateway")?assign(l,{"append.receive-task":b("bpmn:ReceiveTask","bpmn-icon-receive-task",r("Append receive task")),"append.message-intermediate-event":b("bpmn:IntermediateCatchEvent","bpmn-icon-intermediate-event-catch-message",r("Append message intermediate catch event"),{eventDefinitionType:"bpmn:MessageEventDefinition"}),"append.timer-intermediate-event":b("bpmn:IntermediateCatchEvent","bpmn-icon-intermediate-event-catch-timer",r("Append timer intermediate catch event"),{eventDefinitionType:"bpmn:TimerEventDefinition"}),"append.condition-intermediate-event":b("bpmn:IntermediateCatchEvent","bpmn-icon-intermediate-event-catch-condition",r("Append conditional intermediate catch event"),{eventDefinitionType:"bpmn:ConditionalEventDefinition"}),"append.signal-intermediate-event":b("bpmn:IntermediateCatchEvent","bpmn-icon-intermediate-event-catch-signal",r("Append signal intermediate catch event"),{eventDefinitionType:"bpmn:SignalEventDefinition"})}):isEventType(d,"bpmn:BoundaryEvent","bpmn:CompensateEventDefinition")?assign(l,{"append.compensation-activity":b("bpmn:Task","bpmn-icon-task",r("Append compensation activity"),{isForCompensation:!0})}):is(d,"bpmn:EndEvent")||d.isForCompensation||isEventType(d,"bpmn:IntermediateThrowEvent","bpmn:LinkEventDefinition")||isEventSubProcess(d)||assign(l,{"append.end-event":b("bpmn:EndEvent","bpmn-icon-end-event-none",r("Append end event")),"append.gateway":b("bpmn:ExclusiveGateway","bpmn-icon-gateway-none",r("Append gateway")),"append.append-task":b("bpmn:Task","bpmn-icon-task",r("Append task")),"append.intermediate-event":b("bpmn:IntermediateThrowEvent","bpmn-icon-intermediate-event-none",r("Append intermediate/boundary event"))})),s.isEmpty(e,"bpmn-replace")||assign(l,{replace:{group:"edit",className:"bpmn-icon-screw-wrench",title:r("Change element"),action:{click:function(e,t){var i=assign(function(e){var t=n.getPad(e).html.getBoundingClientRect();return{x:t.left,y:t.bottom+5}}(t),{cursor:{x:e.x,y:e.y}});s.open(t,"bpmn-replace",i,{title:r("Change element"),width:300,search:!0})}}}}),is(d,"bpmn:SequenceFlow")&&assign(l,{"append.text-annotation":b("bpmn:TextAnnotation","bpmn-icon-text-annotation",r("Add text annotation"))}),isAny(d,["bpmn:FlowNode","bpmn:InteractionNode","bpmn:DataObjectReference","bpmn:DataStoreReference"])&&assign(l,{"append.text-annotation":b("bpmn:TextAnnotation","bpmn-icon-text-annotation",r("Add text annotation")),connect:{group:"connect",className:"bpmn-icon-connection-multi",title:r("Connect to other element"),action:{click:m,dragstart:m}}}),is(d,"bpmn:TextAnnotation")&&assign(l,{connect:{group:"connect",className:"bpmn-icon-connection-multi",title:r("Connect using association"),action:{click:m,dragstart:m}}}),isAny(d,["bpmn:DataObjectReference","bpmn:DataStoreReference"])&&assign(l,{connect:{group:"connect",className:"bpmn-icon-connection-multi",title:r("Connect using data input association"),action:{click:m,dragstart:m}}}),is(d,"bpmn:Group")&&assign(l,{"append.text-annotation":b("bpmn:TextAnnotation","bpmn-icon-text-annotation",r("Add text annotation"))}),this._isDeleteAllowed([e])&&assign(l,u()),l};