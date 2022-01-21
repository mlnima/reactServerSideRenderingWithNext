import {FC} from "react";
import Image from 'next/image'
import styled from "styled-components";


const LogoUsingNextImageStyledDiv = styled.div`
  width: 300px;
  height: 100px;
  position: relative;
`

interface LogoUsingNextImagePropTypes {
    logoUrl: string,
    alt: string
}

const LogoUsingNextImage: FC<LogoUsingNextImagePropTypes> = ({logoUrl, alt}) => {

    return (
        <LogoUsingNextImageStyledDiv>
            <Image src={logoUrl}
                   alt={alt}
                   layout={'fill'}
                   quality={80}
                   loading={'lazy'}
            />
        </LogoUsingNextImageStyledDiv>
    )

};
export default LogoUsingNextImage
