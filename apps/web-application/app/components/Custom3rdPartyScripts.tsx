'use client';
import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '@store/hooks';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

interface PropTypes {}

const Custom3rdPartyScripts: FC<PropTypes> = ({}) => {
    const pathname = usePathname();
    const [scriptsToRender, setScriptsToRender] = useState([]);

    const custom3rdPartyScripts = useAppSelector(
        ({ settings }) =>
            //@ts-ignore
            settings?.initialSettings?.headDataSettings?.custom3rdPartyScripts,
    );

    useEffect(() => {
        if (!!custom3rdPartyScripts) {
            setScriptsToRender(custom3rdPartyScripts.split(','));
        }
    }, [custom3rdPartyScripts,pathname]);

    return (
        <>
            {scriptsToRender.map((scriptToRender, index) => {
                return (
                    <Script
                        async
                        key={index}
                        strategy={'afterInteractive'}
                        src={scriptToRender}
                    />
                );
            })}
        </>
    );

};
export default Custom3rdPartyScripts;
