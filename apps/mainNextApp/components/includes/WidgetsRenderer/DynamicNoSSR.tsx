import {FC, Fragment as ReactFragment} from "react";
import dynamic from 'next/dynamic'

interface ComponentPropTypes {
    children: any
}

const DynamicNoSSR: FC<ComponentPropTypes> = (props) => {
    return <ReactFragment>{props.children}</ReactFragment>
};

export default dynamic(() => Promise.resolve(DynamicNoSSR), {
    ssr: false
})
