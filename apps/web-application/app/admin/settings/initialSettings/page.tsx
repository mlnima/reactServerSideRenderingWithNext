import React, { FC } from 'react';
import './styles.scss';
import InitialSettingsPageWrapper from './components/InitialSettingsPageWrapper';
import getSettings from '@lib/actions/database/settings/getSettings';
import { IInitialSettings } from '@repo/typescript-types';
import { ServerActionResponse, unwrapResponse } from '@lib/actions/response';

interface PropTypes {

}

const InitialSettingsPage: FC<PropTypes> = async () => {

  const { initialSettings } = unwrapResponse(
    await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
      initialSettings: IInitialSettings | undefined
    }>,
  );

  return <InitialSettingsPageWrapper initialSettings={initialSettings}/>
};

export default InitialSettingsPage;