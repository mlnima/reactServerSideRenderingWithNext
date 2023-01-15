export interface AdminPanelGlobalState {
    customPages: string[];
    loading: boolean,
    alert: {
        active: boolean,
        type?: string,
        err?: string,
        message: ''
    }
    sidebar: boolean,
}