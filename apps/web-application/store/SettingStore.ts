class SettingStore {
    initialSettings: any;
    dictionary: any;

    constructor() {
        this.initialSettings = {};
        this.dictionary = {};

    }

    setInitialSettings(settings: any) {
        this.initialSettings = settings;
    }

    setDictionary(dictionary: any) {
        this.dictionary = dictionary;
    }

    getDictionary() {
        return this.dictionary;
    }


    getInitialSettings() {
        return this.initialSettings;
    }
    getContentSettings() {
        return this.initialSettings?.contentSettings;
    }
    getPostSettings(postType?:string) {
        // console.log(`getPostSettings=> `,this.initialSettings)
        if (!!postType){
            return this.initialSettings?.contentSettings?.postSettings?.[postType] || {};
        }else {
            return this.initialSettings?.contentSettings?.postSettings;
        }
    }
    getNumberOfCardsPerPage() {
        return this.initialSettings?.contentSettings?.numberOfCardsPerPage || 20;
    }
}

export default new SettingStore();
