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
        setAdCodeData(adCode)
    }, [router.pathname,router.query]);

    return (
        <>
            {parse(adCodeData)}
        </>
    )
};
export default Advertise

