class ServerSideStore {
    initialSettings: any;

    locale: string;

    constructor() {
        this.initialSettings = {};
        this.locale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    }

    static setInitialSettings(settings: any) {
        this.initialSettings = settings;
    }

    static getPostSettings(postType?: string) {
        if (!!postType) {
            return this.initialSettings?.contentSettings?.postSettings?.[postType] || {};
        } else {
            return this.initialSettings?.contentSettings?.postSettings;
        }
    }

    static getContentPerPage() {
        return this.initialSettings?.contentSettings?.contentPerPage || 20;
    }
}

export default ServerSideStore;
