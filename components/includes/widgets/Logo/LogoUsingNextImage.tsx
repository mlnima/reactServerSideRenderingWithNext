import {FC} from "react";
import Image from 'next/image'

interface LogoUsingNextImagePropTypes {
    logoUrl: string,
    alt: string
}

const LogoUsingNextImage: FC<LogoUsingNextImagePropTypes> = ({logoUrl, alt}) => {

    return (
        <div>
            <Image src={logoUrl}
                   alt={alt}
                   layout={'intrinsic'}
                   quality={80}
                   loading={'lazy'}
                   width={300}
                   height={100}
            />
        </div>
    )

};
export default LogoUsingNextImage
