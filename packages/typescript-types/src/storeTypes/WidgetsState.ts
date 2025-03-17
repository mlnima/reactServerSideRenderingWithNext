import {IWidget} from "@repo/typescript-types";

export interface WidgetsState {
    requestedWidgets: string[];
    widgetInGroups: {};
    widgets: IWidget[],
}