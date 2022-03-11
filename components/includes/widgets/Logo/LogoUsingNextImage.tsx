import {FC} from "react";
import Image from 'next/image'

interface LogoUsingNextImagePropTypes {
    logoUrl: string,
    alt: string
}

const LogoUsingNextImage: FC<LogoUsingNextImagePropTypes> = ({logoUrl, alt}) => {

    return (
        <Image src={logoUrl}
               alt={alt}
               layout={'responsive'}
               quality={80}
               priority
               objectFit={'contain'}
               height={100}
               width={300}
        />
    )

};
export default LogoUsingNextImage
