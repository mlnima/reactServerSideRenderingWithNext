import {Widget} from "typescript-types";

export interface WidgetsState {
    requestedWidgets: string[];
    widgetInGroups: {};
    widgets: Widget[],
}