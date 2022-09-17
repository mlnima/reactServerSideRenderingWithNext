import {Widget} from "@_typeScriptTypes/widgets/Widget";

export interface WidgetsState {
    requestedWidgets: string[];
    widgetInGroups: {};
    widgets: Widget[],
}