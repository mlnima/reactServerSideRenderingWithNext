import {DesignSettings,IdentitySettings,MembershipSettings} from "typescript-types";


export interface SettingsState {
    ip?: string,
    design: DesignSettings,
    identity: IdentitySettings,
    membershipSettings:MembershipSettings
    eCommerce?: {},
}