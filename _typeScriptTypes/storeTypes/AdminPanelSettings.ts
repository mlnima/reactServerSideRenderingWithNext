import {DesignSettings} from "@_typeScriptTypes/settings/DesignSettings";
import {IdentitySettings} from "@_typeScriptTypes/settings/IdentitySettings";
import {MembershipSettings} from "@_typeScriptTypes/settings/MembershipSettings";

export interface AdminPanelSettings {
    ip?: string,
    design: DesignSettings,
    identity: IdentitySettings,
    membershipSettings:MembershipSettings
    eCommerce?: {},
}