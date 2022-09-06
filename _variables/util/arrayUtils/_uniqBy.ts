export const _uniqBy = (dataArray : any[], key:string)=>{
    return  [...new Map(dataArray.map((item:any) => [item[key], item])).values()]
}

export default _uniqBy;