import inherits from"inherits-browser";import CoreModule from"./core";import DrilldownModdule from"./features/drilldown";import OutlineModule from"./features/outline";import OverlaysModule from"diagram-js/lib/features/overlays";import SelectionModule from"diagram-js/lib/features/selection";import TranslateModule from"diagram-js/lib/i18n/translate";import BaseViewer from"./BaseViewer";export default function Viewer(e){BaseViewer.call(this,e)}inherits(Viewer,BaseViewer),Viewer.prototype._modules=[CoreModule,DrilldownModdule,OutlineModule,OverlaysModule,SelectionModule,TranslateModule],Viewer.prototype._moddleExtensions={};