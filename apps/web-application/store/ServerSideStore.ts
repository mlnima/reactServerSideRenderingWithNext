

interface ContentSettings {
    postSettings?: Record<string, any>;
    contentPerPage?: number;
}

interface IInitialSettings {
    contentSettings?: ContentSettings;
    [key: string]: any;
}

class ServerSideStore {
    static initialSettings: IInitialSettings = {};
    static defaultLocale: string = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    static locales: string[] = (process.env.NEXT_PUBLIC_LOCALES || 'en').split(' ');

    static setInitialSettings(settings: IInitialSettings) {
        this.initialSettings = settings;
    }

    static getPostSettings(postType?: string) {
        const { postSettings } = this.initialSettings?.contentSettings || {};
        if (postType) {
            return postSettings?.[postType] || {};
        }
        return postSettings;
    }

    static getLocales({ withDefault = true }: { withDefault?: boolean }) {
        if (!withDefault) {
            return this.locales.filter((locale) => locale !== this.defaultLocale);
        }
        return this.locales;
    }

    static getContentPerPage() {
        return this.initialSettings?.contentSettings?.contentPerPage || 20;
    }
}

export default ServerSideStore;



// import 'server-only'
//
// interface ContentSettings {
//     postSettings?: Record<string, any>;
//     contentPerPage?: number;
// }
//
// interface InitialSettings {
//     contentSettings?: ContentSettings;
//     [key: string]: any;
// }
//
// class ServerSideStore {
//     static initialSettings: InitialSettings = {};
//     defaultLocale: string;
//     locales:string[];
//
//     constructor() {
//         this.defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
//         this.locales = (process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en').split(' ');
//     }
//
//     static setInitialSettings(settings: InitialSettings) {
//         this.initialSettings = settings;
//     }
//
//     static getPostSettings(postType?: string) {
//         const { postSettings } = this.initialSettings?.contentSettings || {};
//         if (postType) {
//             return postSettings?.[postType] || {};
//         }
//         return postSettings;
//     }
//
//     static getLocales({ withDefault = true }) {
//         if (!withDefault) {
//             return this.locales.replace(this.defaultLocale, '').split(' ');
//         }
//         return this.locales;
//     }
//
//     static getContentPerPage() {
//         return this.initialSettings?.contentSettings?.contentPerPage || 20;
//     }
// }
//
// export default ServerSideStore;
//
//
// // class ServerSideStore {
// //     initialSettings: object;
// //
// //     locale: string;
// //
// //     constructor() {
// //         this.initialSettings = {};
// //         this.locale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
// //     }
// //
// //     static setInitialSettings(settings: any) {
// //         this.initialSettings = settings;
// //     }
// //
// //     static getPostSettings(postType?: string) {
// //         if (!!postType) {
// //             return this.initialSettings?.contentSettings?.postSettings?.[postType] || {};
// //         } else {
// //             return this.initialSettings?.contentSettings?.postSettings;
// //         }
// //     }
// //
// //     static getContentPerPage() {
// //         return this.initialSettings?.contentSettings?.contentPerPage || 20;
// //     }
// // }
// //
// // export default ServerSideStore;
