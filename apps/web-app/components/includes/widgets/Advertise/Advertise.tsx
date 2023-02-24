import {FC, useState, useEffect, memo} from "react";
import {useRouter} from "next/router";
import styled from "styled-components";
import parse from 'html-react-parser'

const AdvertiseStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 102px;
  min-width: 300px;
  max-width: 98vw !important;

  .pre-load {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 102px;
    min-width: 300px;
  }
`

interface AdvertisePropTypes {
    uniqueData: {
        adCode: string,
    },
}

const Advertise: FC<AdvertisePropTypes> = ({uniqueData}) => {
    const router = useRouter();
    const [adCodeData, setAdCodeData] = useState(null)

    useEffect(() => {
        setAdCodeData(null)
        setAdCode()
    }, [router.pathname, router.query]);

    const setAdCode = () => {
        if (uniqueData?.adCode) {
            setTimeout(() => {
                //@ts-ignore
                setAdCodeData(uniqueData?.adCode)
            }, 500)
        }
    }

    return (
        <AdvertiseStyledDiv>
            {adCodeData ? parse(adCodeData || '') :
                <div className='pre-load'>
                    <span>loading...</span>
                </div>
            }
        </AdvertiseStyledDiv>
    )
};
export default memo(Advertise)


