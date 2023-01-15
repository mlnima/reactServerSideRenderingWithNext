export interface GlobalState {
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