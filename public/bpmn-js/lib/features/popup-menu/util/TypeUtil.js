import{getBusinessObject}from"../../../util/ModelUtil";import{isExpanded}from"../../../util/DiUtil";export function isDifferentType(e){return function(t){var i=t.target,n=getBusinessObject(e),r=n.eventDefinitions&&n.eventDefinitions[0],s=n.$type===i.type,d=(r&&r.$type)===i.eventDefinitionType,o=!!i.triggeredByEvent==!!n.triggeredByEvent,p=void 0===i.isExpanded||i.isExpanded===isExpanded(e);return!(s&&d&&o&&p)}}