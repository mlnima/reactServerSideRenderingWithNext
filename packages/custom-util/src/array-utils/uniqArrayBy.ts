export const uniqArrayBy = (dataArray : any[], key:string)=>{
    //@ts-ignore
    return  [...new Map(dataArray.map((item:any) => [item[key], item])).values()]
}

export default uniqArrayBy;