'use client';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@store/hooks';
import { usePathname } from 'next/navigation';
import parse from 'html-react-parser'

const CustomScripts = () => {
    const pathname = usePathname();
    const [scriptsToRender, setScriptsToRender] = useState('');

    const customScripts = useAppSelector(
        ({ settings }) =>
            //@ts-ignore
            settings?.initialSettings?.headDataSettings?.customScripts,
    );

    useEffect(() => {
        if (!!customScripts) {

            setTimeout(()=>{
                setScriptsToRender(customScripts)
            },100)
        }

        return()=>{
            setScriptsToRender('');
        }
    }, [customScripts,pathname]);

    if (!!scriptsToRender){
        return (
            <>
                {parse(scriptsToRender)}
            </>
        );
    }else return  null


};
export default CustomScripts;
