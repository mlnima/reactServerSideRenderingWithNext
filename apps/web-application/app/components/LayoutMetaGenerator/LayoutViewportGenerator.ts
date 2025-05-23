

import getSettings from '@lib/actions/database/settings/getSettings';
import { ServerActionResponse, unwrapResponse } from '@lib/actions/response';
import { IInitialSettings } from '@repo/typescript-types';
export const dynamic = 'force-dynamic';

const LayoutViewportGenerator = async () => {

  const {success, initialSettings } = unwrapResponse(
    await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
      initialSettings: IInitialSettings | undefined;
    }>,
  );

  if (!success){
    return {

    }
  }

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