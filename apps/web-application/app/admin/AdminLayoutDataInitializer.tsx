'use client';
import {  useEffect } from 'react';
import { getCustomPagesAction } from '@storeDashboard/reducers/globalStateReducer';
import { useAppDispatch } from '@storeDashboard/hooks';
import { getWidgetsAction } from '@storeDashboard/reducers/widgetsReducer';
import { getSettingsAction } from '@storeDashboard/reducers/settingsReducer';

const AdminLayoutDataInitializer = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getWidgetsAction(null));
    dispatch(getCustomPagesAction());
    dispatch(getSettingsAction(null));
  }, []);
  return null;
};
export default AdminLayoutDataInitializer;
