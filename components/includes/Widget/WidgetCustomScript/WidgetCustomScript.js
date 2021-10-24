import React,{useMemo} from 'react';
import Script from 'next/script'

const WidgetCustomScript = ({customScript, customScriptStrategy}) => {

    const script = useMemo(()=>{
        return customScript
    },[])

    return (
        <Script strategy={customScriptStrategy || 'lazyOnload' }
                dangerouslySetInnerHTML={{
                    __html: `${script}`
                }}
        />

    );
};
export default WidgetCustomScript;
