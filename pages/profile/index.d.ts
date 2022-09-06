/// <reference types="node" />
import type { ReactElement } from 'react';
declare const Profile: {
    (): JSX.Element;
    getLayout(page: ReactElement): JSX.Element;
};
export declare const getServerSideProps: import("next").GetServerSideProps<{
    _nextI18Next: {
        initialI18nStore: any;
        initialLocale: string;
        ns: string[];
        userConfig: import("next-i18next").UserConfig;
    };
}, import("querystring").ParsedUrlQuery, import("next").PreviewData>;
export default Profile;
