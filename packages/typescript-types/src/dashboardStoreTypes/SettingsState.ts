import {DesignSettings,IdentitySettings,MembershipSettings,InitialSettings,UgcSettings} from "@repo/typescript-types";

export interface SettingsState {
    ip?: string,
    initialSettings: InitialSettings,
    ugcSettings: UgcSettings,
    design: DesignSettings,
    identity: IdentitySettings,
    membershipSettings:MembershipSettings
    eCommerce?: {},
}