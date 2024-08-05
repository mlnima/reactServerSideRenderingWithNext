import {Widget} from "@repo/typescript-types";

export interface WidgetsState {
    adminPanelWidgets: {
        [key: string]:Widget[]
    }
}