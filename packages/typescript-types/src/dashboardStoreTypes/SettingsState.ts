import {DesignSettings,IdentitySettings,MembershipSettings,IInitialSettings,UgcSettings} from "@repo/typescript-types";

export interface SettingsState {
    ip?: string,
    initialSettings: IInitialSettings,
    ugcSettings: UgcSettings,
    design: DesignSettings,
    identity: IdentitySettings,
    membershipSettings:MembershipSettings
    eCommerce?: {},
}