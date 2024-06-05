import {fetchChatroomData} from "@lib/fetch-requests/client/fetchChatrooms";
import {capitalizeFirstLetter} from "shared-util";

interface IProps {
    params: {
        lang: string,
        identifier: string,
    }
}

const chatroomMetaGenerator = async ({params}: IProps) => {

    const chatroomsData = await fetchChatroomData({identifier: params.identifier})
    return {
        // alternates: {
        //     canonical: `/chatroom/${params?.identifier}`,
        //     languages: process.env.NEXT_PUBLIC_LOCALES?.replace(`${process.env.NEXT_PUBLIC_DEFAULT_LOCALE} `,'')
        //         ?.split(' ').reduce((finalValue:{[key:string]:string},currentLocale)=>{
        //             finalValue[currentLocale] = `/${currentLocale}/chatroom/${params?.identifier}`
        //             return finalValue
        //         },{}),
        // },
        title: chatroomsData?.chatroom?.name ? `${capitalizeFirstLetter(chatroomsData?.chatroom?.name)} Chatroom` : 'Chatroom',
        description: chatroomsData?.chatroom?.description || '',
        keywords: chatroomsData?.chatroom?.tags || '',
    }
}

export default chatroomMetaGenerator;