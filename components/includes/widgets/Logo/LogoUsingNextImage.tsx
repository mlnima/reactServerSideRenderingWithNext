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
                   loading={'lazy'}
                   objectFit={'contain'}
                   width={300}
                   height={100}
            />
    )

};
export default LogoUsingNextImage
