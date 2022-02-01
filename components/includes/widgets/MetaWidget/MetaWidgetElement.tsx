import React, {PureComponent} from "react";
import Link from 'next/link'

interface MetaWidgetElementPropTypes{
    typePath:string,
    id:string,
    name:string,
}

class MetaWidgetElement extends PureComponent<MetaWidgetElementPropTypes> {
    render() {
        return(
            <Link href={`/${this?.props?.typePath}/${this?.props?.id}`} key={this?.props?.name}>
                <a className='btn meta-widget-item' title={this?.props?.name}>
                    {this?.props?.name}
                </a>
            </Link>
        )
    }
}

export default MetaWidgetElement;