import {FC, useState, useEffect} from "react";
import {useRouter} from "next/router";
import parse from 'html-react-parser';

interface AdvertisePropTypes {
    adCode: string,
}

const Advertise: FC<AdvertisePropTypes> = ({adCode}) => {
    const router = useRouter();
    const [adCodeData, setAdCodeData] = useState(() => adCode)

    useEffect(() => {
        setAdCodeData(null)
        setTimeout(()=>{
            setAdCodeData(adCode)
        },500)
    }, [router.pathname,router.query]);

    return (
        <>
            {
                adCodeData ? parse(adCodeData) : null
            }
        </>
    )
};
export default Advertise

