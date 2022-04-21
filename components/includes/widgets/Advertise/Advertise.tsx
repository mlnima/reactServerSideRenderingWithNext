import {FC, useState, useEffect} from "react";
import {useRouter} from "next/router";
import styled from "styled-components";
import parse from 'html-react-parser'

const AdvertiseStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  min-width: 300px;
  margin-top: 10px;
  margin-bottom: 10px;
  max-width: 98vw !important;

  .pre-load {
    display: flex;
    justify-content: center;
    align-items: center;
    border: var(--default-border);
    min-height: 100px;
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


    const setAdCode = () =>{
        if (uniqueData?.adCode){
            setTimeout(() => {
                setAdCodeData(uniqueData?.adCode)
            }, 500)
        }
    }


    if (adCodeData){
        return (
            <AdvertiseStyledDiv>
                {parse(adCodeData)}
            </AdvertiseStyledDiv>
        )
    }else return null

};
export default Advertise


// return (
//     <AdvertiseStyledDiv dangerouslySetInnerHTML={{
//         __html: adCodeData ? adCodeData : `<div class='pre-load'><span>loading...</span></div>`
//     }}/>
// )