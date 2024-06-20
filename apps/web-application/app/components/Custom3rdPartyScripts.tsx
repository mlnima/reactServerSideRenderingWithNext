'use client';
import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '@store/hooks';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import parse from 'html-react-parser'

interface PropTypes {}

const Custom3rdPartyScripts: FC<PropTypes> = ({}) => {
    const pathname = usePathname();
    const [scriptsToRender, setScriptsToRender] = useState('');

    const custom3rdPartyScripts = useAppSelector(
        ({ settings }) =>
            //@ts-ignore
            settings?.initialSettings?.headDataSettings?.custom3rdPartyScripts,
    );

    useEffect(() => {
        if (!!custom3rdPartyScripts) {

            setTimeout(()=>{
                setScriptsToRender(custom3rdPartyScripts)
            },100)
        }

        return()=>{
            setScriptsToRender('');
        }
    }, [custom3rdPartyScripts,pathname]);

    if (!!scriptsToRender){
        return (
            <>
                {parse(scriptsToRender)}
            </>
        );
    }else return  null


};
export default Custom3rdPartyScripts;


{/*{scriptsToRender.map((scriptToRender, index) => {*/}
{/*    return (*/}
{/*        <Script*/}
{/*            async*/}
{/*            key={index}*/}
{/*            strategy={'afterInteractive'}*/}
{/*            src={scriptToRender}*/}
{/*        />*/}
{/*    );*/}
{/*})}*/}