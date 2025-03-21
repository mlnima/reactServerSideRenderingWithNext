'use client';
import { FC, useEffect } from 'react';
import { getCustomPagesAction } from '@storeDashboard/reducers/globalStateReducer';
import { useAppDispatch } from '@storeDashboard/hooks';
import { getWidgetsAction } from 'web-dashboard-app/src/store/reducers/widgetsReducer';
import { getSettingsAction } from 'web-dashboard-app/src/store/reducers/settingsReducer';

interface IProps {
}

const AdminLayoutDataInitializer: FC<IProps> = ({}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getWidgetsAction(null));
    dispatch(getCustomPagesAction());
    dispatch(getSettingsAction(null));
  }, []);
  return null;
};
export default AdminLayoutDataInitializer;
