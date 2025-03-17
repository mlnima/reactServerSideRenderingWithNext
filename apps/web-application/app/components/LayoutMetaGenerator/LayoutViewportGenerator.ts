import getSettings from '@lib/actions/database/operations/settings/getSettings';
import { ServerActionResponse, unwrapResponse } from '@lib/actions/response';
import { IInitialSettings } from '@repo/typescript-types';

const LayoutViewportGenerator = async () => {

  const { initialSettings } = unwrapResponse(
    await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
      initialSettings: IInitialSettings | undefined;
    }>,
  );
    return {
        themeColor:initialSettings?.headDataSettings?.themeColor || 'black',
        viewport: {
            width: 'device-width',
            initialScale: 1,
            maximumScale: 1,
            userScalable: false,
        },
    }
}


export default LayoutViewportGenerator