'use client';
import {FC, useEffect, useState} from "react";
import styled from "styled-components";
import {useAppSelector} from "@store/hooks";
import Script from 'next/script'

interface PropTypes {
}

const Custom3rdPartyScripts: FC<PropTypes> = ({}) => {
    const [scriptsToRender,setScriptsToRender] = useState([])
    const custom3rdPartyScripts = useAppSelector(
        ({ settings }) =>
            //@ts-ignore
            settings?.initialSettings?.headDataSettings?.custom3rdPartyScripts
    );

    useEffect(() => {
        if (!!custom3rdPartyScripts){
            setScriptsToRender(custom3rdPartyScripts.split(','))
        }
    }, [custom3rdPartyScripts]);


    if (!custom3rdPartyScripts) return null;

    return (
        <>
            {scriptsToRender.map(scriptToRender=>{
                return <Script strategy={'lazyOnload'} src={scriptToRender} />
            })}
        </>
    )
};
export default Custom3rdPartyScripts;
