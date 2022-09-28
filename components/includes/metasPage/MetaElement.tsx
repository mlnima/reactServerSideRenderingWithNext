import React, {PureComponent} from "react";
import Link from 'next/link'

interface MetaWidgetElementPropTypes {
    typePath: string,
    id: string,
    name: string,
}

class MetaElement extends PureComponent<MetaWidgetElementPropTypes> {
    render() {
        return (
            <div className='meta-widget-item'>
                <Link href={`/${this?.props?.typePath}/${this?.props?.id}`} key={this?.props?.name}>
                    <a title={this?.props?.name}>
                        {this?.props?.name}
                    </a>
                </Link>
            </div>
        )
    }
}

export default MetaElement;