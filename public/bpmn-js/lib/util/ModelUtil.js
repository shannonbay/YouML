import{some}from"min-dash";export function is(n,t){var e=getBusinessObject(n);return e&&"function"==typeof e.$instanceOf&&e.$instanceOf(t)}export function isAny(n,t){return some(t,(function(t){return is(n,t)}))}export function getBusinessObject(n){return n&&n.businessObject||n}export function getDi(n){return n&&n.di}