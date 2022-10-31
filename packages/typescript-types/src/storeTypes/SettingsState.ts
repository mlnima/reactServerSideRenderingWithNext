import {DesignSettings,IdentitySettings,MembershipSettings} from "typescript-types";

export interface SettingsState {
    membershipSettings: MembershipSettings;
    ip?: string,
    design: DesignSettings,
    identity: IdentitySettings,
    isSettingSet:boolean,
    eCommerce: {},
}