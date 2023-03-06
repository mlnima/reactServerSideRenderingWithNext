import {DesignSettings, IdentitySettings, InitialSettings, MembershipSettings} from "typescript-types";

export interface SettingsState {
    membershipSettings: MembershipSettings;
    ip?: string,
    initialSettings: InitialSettings,
    design: DesignSettings,
    identity: IdentitySettings,
    isSettingSet:boolean,
    eCommerce: {},
}