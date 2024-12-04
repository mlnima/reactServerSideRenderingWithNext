import {FC, Fragment as ReactFragment, ReactNode} from "react";
import dynamic from 'next/dynamic'

interface PropTypes {
    children: ReactNode
}

const Csr: FC<PropTypes> = ({children}) => {
    return <ReactFragment>{children}</ReactFragment>
};

export default dynamic(() => Promise.resolve(Csr), {
    ssr: false
})
