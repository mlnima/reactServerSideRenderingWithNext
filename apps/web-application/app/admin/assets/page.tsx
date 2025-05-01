import React from 'react';
import { IInitialSettings } from '@repo/typescript-types';
import AssetsPageContent from './components/AssetsPageContent';
import { ServerActionResponse, unwrapResponse } from '@lib/actions/response';
import getSettings from '@lib/actions/database/operations/settings/getSettings';
import './styles.scss';

const Assets = async () => {
  const { initialSettings } = unwrapResponse(
    await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
      initialSettings: IInitialSettings | undefined
    }>,
  );

  return <AssetsPageContent initialSettings={initialSettings} />;
};

export default Assets;