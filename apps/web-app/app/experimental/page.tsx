'use client';
import {useSelector} from "react-redux";





export default function Page() {

    const store = useSelector((store)=>store)


    return <div>
        <h1>Hello, Next.js!</h1>
        <p>{JSON.stringify(store)}</p>
    </div>;
}