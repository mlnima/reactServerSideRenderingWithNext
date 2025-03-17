import {IWidget} from "@repo/typescript-types";

export interface AdminPanelWidgets {
    adminPanelWidgets: {
        [key: string]:IWidget[]
    }
}