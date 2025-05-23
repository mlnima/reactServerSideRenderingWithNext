import { ServerActionResponse, unwrapResponse } from '@lib/actions/response';
import getSettings from '@lib/actions/database/settings/getSettings';
import { IInitialSettings, IPageSettings } from '@repo/typescript-types';
import { textContentReplacer } from '@repo/utils';

interface IPageHeadMetaGenerator {
  pageSettingToGet: string,
  locale: string,
  pageNumber: string | string[],
  fallbackTitle?: string,
  count?: string
  name?: string
}

type SettingsResponse = {
  [key: string]: IPageSettings | undefined;
};

export const headMetaFromSettings = async (
  { pageSettingToGet, locale = 'en', pageNumber, fallbackTitle, count = '', name = '' }: IPageHeadMetaGenerator,
): Promise<{ title: string, description?: string, keywords?: string } | {}> => {

  try {

    const settingsResponse = unwrapResponse(
      await getSettings([pageSettingToGet]) as unknown as ServerActionResponse<SettingsResponse>,
    );

    if (!settingsResponse?.success) {
      return {};
    }

    // Use the dynamic key to access the page settings
    const pageSettings: IPageSettings | undefined = settingsResponse[pageSettingToGet];

    const { initialSettings } = unwrapResponse(
      await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
        initialSettings: IInitialSettings | undefined;
      }>,
    );

    const pageTitle = pageSettings?.translations?.[locale]?.title || pageSettings?.title || initialSettings?.headDataSettings?.title || fallbackTitle || 'Website';
    const pageKeywords = pageSettings?.translations?.[locale]?.keywords || pageSettings?.keywords || initialSettings?.headDataSettings?.keywords || 'website, cms';
    const pageDescription = pageSettings?.translations?.[locale]?.description || pageSettings?.description || initialSettings?.headDataSettings?.description || 'Welcome to My Website';
    const siteName = initialSettings?.headDataSettings?.siteName || 'Website';

    const page = Array.isArray(pageNumber) ? pageNumber[0] : pageNumber;

    return {
      title: textContentReplacer(pageTitle, { siteName, page, count, name }),
      description: textContentReplacer(pageDescription, { siteName, count, name }),
      keywords: textContentReplacer(pageKeywords, { siteName, count, name })  || '',
    };
  } catch (error) {
    return {
      title: fallbackTitle,
    };
  }
};
