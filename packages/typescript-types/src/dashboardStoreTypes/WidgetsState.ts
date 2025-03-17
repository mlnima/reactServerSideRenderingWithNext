import {IWidget} from "@repo/typescript-types";

export interface WidgetsState {
    adminPanelWidgets: {
        [key: string]:IWidget[]
    }
}