import {Widget} from "typescript-types";

export interface WidgetsState {
    adminPanelWidgets: {
        [key: string]:Widget[]
    }
}