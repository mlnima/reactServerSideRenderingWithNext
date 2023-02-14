// import {isArray} from "lodash";

export const uniqArrayBy = (dataArray : any[], key:string)=>{
    try {
        if (Array.isArray(dataArray)){
            return  [...new Map(dataArray.map((item:any) => [item[key], item])).values()]
        }else{
            return dataArray || []
        }

    }catch (error){
        console.log(error)
        return dataArray || []
    }
    //@ts-ignore

}

export default uniqArrayBy;