import {DesignSettings,IdentitySettings,MembershipSettings} from "@repo/typescript-types";


export interface AdminPanelSettings {
    ip?: string,
    design: DesignSettings,
    identity: IdentitySettings,
    membershipSettings:MembershipSettings
    eCommerce?: {},
}