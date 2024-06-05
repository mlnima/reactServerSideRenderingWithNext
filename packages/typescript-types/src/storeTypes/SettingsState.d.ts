import { DesignSettings, IdentitySettings, InitialSettings, MembershipSettings, PageSettings } from "typescript-types";
export interface SettingsState {
    membershipSettings: MembershipSettings;
    ip?: string;
    initialSettings: InitialSettings;
    currentPageSettings: PageSettings;
    design: DesignSettings;
    identity: IdentitySettings;
    isSettingSet: boolean;
    eCommerce: {};
}
//# sourceMappingURL=SettingsState.d.ts.map