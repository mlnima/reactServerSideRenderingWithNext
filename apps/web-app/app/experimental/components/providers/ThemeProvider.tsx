'use client';
import {FC, ReactNode, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useSearchParams} from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useSelectedLayoutSegments } from 'next/navigation';



interface PropTypes {
    children: ReactNode,
}

const ThemeProvider: FC<PropTypes> = ({children, ...rest}) => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const segment = useSelectedLayoutSegment();
    const selectedLayoutSegments = useSelectedLayoutSegments();


    // useEffect(() => {
    //
    // }, []);

    return (
        <div>
            {children}
        </div>
    )
};
export default ThemeProvider
