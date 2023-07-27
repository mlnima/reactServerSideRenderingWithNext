'use client';
import {FC, useMemo} from 'react';
import Script from 'next/script'

interface WidgetCustomScriptPropTypes {
    customScript: string,
    customScriptStrategy: string,
}

const WidgetCustomScript: FC<WidgetCustomScriptPropTypes> = ({customScript, customScriptStrategy}) => {

    const script = useMemo(() => {
        return customScript
    }, [])

    return (
        <Script strategy={
            customScriptStrategy as "lazyOnload" | "afterInteractive" | "beforeInteractive" ||
            'lazyOnload'
        }
                dangerouslySetInnerHTML={{
                    __html: `${script}`
                }}
        />
    );
};
export default WidgetCustomScript;
