import config from './config';

const APIServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;

interface IFetchSettings {
    requireSettings: string[];
    revalidate?: number | undefined;
    tags?: string[];
}

export const fetchSettings = async ({ requireSettings, revalidate, tags }: IFetchSettings) => {
    try {
        const settingsQuery = requireSettings.map(setting => `setting=${setting}`).join('&');

        const response = await fetch(
            `${APIServerUrl}/api/v1/settings?${settingsQuery}`,
            config({ revalidate, tags: [...(tags || []), 'cacheItem', 'settings'] }),
        );

        // if (!response.ok) {
        //     const errorData = await response.text();
        //     // throw new Error(errorData);
        // }
        return await response.json();
    } catch {
        return;
    }
};
