import {FC, useState, useEffect} from "react";
import {useRouter} from "next/router";
// import parse from 'html-react-parser';
import styled from "styled-components";

const AdvertiseStyledDiv = styled.div`
   display:flex;
   justify-content:center;
   align-items:center;
   min-height: 100px;
   min-width: 300px;
   margin-top: 10px ;
   margin-bottom: 10px ;
  
  .pre-load{
    display: flex;
    justify-content: center;
    align-items: center;
    border: var(--default-border);
    min-height: 100px;
    min-width: 300px;
  }
`
interface AdvertisePropTypes {
    uniqueData:{
        adCode: string,
    }
}

const Advertise: FC<AdvertisePropTypes> = ({uniqueData}) => {
    const router = useRouter();
    const [adCodeData, setAdCodeData] = useState(null)

    useEffect(() => {
        setAdCodeData(null)
        setTimeout(()=>{
            setAdCodeData(uniqueData?.adCode)
        },500)
    }, [router.pathname,router.query]);

    return (
        <AdvertiseStyledDiv dangerouslySetInnerHTML={{
            __html:adCodeData ? adCodeData : `<div class='pre-load'><span>loading...</span></div>`
        }}/>
    )

};
export default Advertise

// <AdvertiseStyledDiv >
// {
//     adCodeData ? parse(adCodeData) : null
// }
// </AdvertiseStyledDiv>