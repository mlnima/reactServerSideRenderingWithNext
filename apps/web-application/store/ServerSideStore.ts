interface ContentSettings {
    postSettings?: Record<string, any>;
    contentPerPage?: number;
}

interface InitialSettings {
    contentSettings?: ContentSettings;
    [key: string]: any; // Allow additional properties
}

class ServerSideStore {
    static initialSettings: InitialSettings = {}; // Static members are shared across all instances
    locale: string;

    constructor() {
        this.locale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    }

    static setInitialSettings(settings: InitialSettings) {
        this.initialSettings = settings;
    }

    static getPostSettings(postType?: string) {
        const { postSettings } = this.initialSettings?.contentSettings || {};
        if (postType) {
            return postSettings?.[postType] || {};
        }
        return postSettings;
    }

    static getContentPerPage() {
        return this.initialSettings?.contentSettings?.contentPerPage || 20;
    }

    // async connectToDatabase(connectorName?: string) {
    //     try {
    //         const dbUser = process.env.DB_USER ? `${process.env.DB_USER}:` : '';
    //         const dbPass = process.env.DB_PASS ? `${process.env.DB_PASS}@` : '';
    //         const dbHost = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';
    //         const dbConnectQuery = `mongodb://${dbUser}${dbPass}${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    //
    //         console.log(`mongoDBConnectionQueryGenerator()=> `, dbConnectQuery);
    //         await mongoose.connect(dbConnectQuery);
    //         console.log(`${connectorName || ''}* connected to Database *`);
    //     } catch (error) {
    //         console.log('Error connecting to Database', error);
    //         process.exit(1);
    //     }
    // }
}

export default ServerSideStore;


// class ServerSideStore {
//     initialSettings: object;
//
//     locale: string;
//
//     constructor() {
//         this.initialSettings = {};
//         this.locale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
//     }
//
//     static setInitialSettings(settings: any) {
//         this.initialSettings = settings;
//     }
//
//     static getPostSettings(postType?: string) {
//         if (!!postType) {
//             return this.initialSettings?.contentSettings?.postSettings?.[postType] || {};
//         } else {
//             return this.initialSettings?.contentSettings?.postSettings;
//         }
//     }
//
//     static getContentPerPage() {
//         return this.initialSettings?.contentSettings?.contentPerPage || 20;
//     }
// }
//
// export default ServerSideStore;
