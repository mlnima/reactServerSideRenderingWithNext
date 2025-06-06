'use client';
import React from "react";
import {useAppSelector} from "@store/hooks";
import DynamicStyleInjector from '@components/global/DynamicStyleInjector';

const CustomStylesSwitcher = () => {
    const {secondaryModeColors} = useAppSelector(({settings}) => settings?.initialSettings?.layoutSettings);
    const {useSecondaryModeColors} = useAppSelector(({globalState}) => globalState);

    return (
        <>
            {
              useSecondaryModeColors && <DynamicStyleInjector
              styles={secondaryModeColors}
              id={'secondaryModeColors'}
              enableScss={true}
            />
            }
        </>
    )
}

export default CustomStylesSwitcher


