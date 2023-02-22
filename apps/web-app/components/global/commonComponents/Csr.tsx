import {FC, Fragment as ReactFragment} from "react";
import dynamic from 'next/dynamic'

interface PropTypes {
    children: any
}

const Csr: FC<PropTypes> = (props) => {
    return <ReactFragment>{props.children}</ReactFragment>
};

export default dynamic(() => Promise.resolve(Csr), {
    ssr: false
})
