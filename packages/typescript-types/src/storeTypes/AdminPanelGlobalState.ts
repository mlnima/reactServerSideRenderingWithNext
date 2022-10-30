export interface AdminPanelGlobalState {
    customPages: string[];
    beforeUnload: boolean,
    loading: boolean,
    alert: {
        active: boolean,
        type?: string,
        err?: string,
        message: ''
    }
    sidebar: boolean,
}