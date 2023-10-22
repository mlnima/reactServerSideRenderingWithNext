export interface GlobalState {
    loginRegisterFormPopup: boolean | string,
    loading: boolean,
    adminMode: boolean,
    backgroundFilter: boolean,
    alert: {
        active?: boolean,
        message?: string,
        type?: string | null,
    }
}
