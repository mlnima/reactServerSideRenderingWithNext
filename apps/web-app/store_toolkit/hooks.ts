import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import type { RootAdminState, AdminDispatch } from '../../../trash/oldAdminPagesAndComponents/store/adminStore'

// Use throughout your appex instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAdminDispatch = () => useDispatch<AdminDispatch>()
export const useAdminSelector: TypedUseSelectorHook<RootAdminState> = useSelector