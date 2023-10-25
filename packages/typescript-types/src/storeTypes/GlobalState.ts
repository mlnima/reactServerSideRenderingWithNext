export interface GlobalState {
    loginRegisterFormPopup: boolean | string,
    loading: boolean,
    adminMode: boolean,
    userConfigMenu: boolean,
    backgroundFilter: boolean,
    useSecondaryModeColors: boolean,
    alert: {
        active?: boolean,
        message?: string,
        type?: string | null,
    }
}
