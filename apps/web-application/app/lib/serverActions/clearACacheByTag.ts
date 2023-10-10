'use server'
import {revalidateTag} from "next/cache";

const clearACacheByTag = (tag:string)=>{
    revalidateTag(tag)
}

export default  clearACacheByTag;