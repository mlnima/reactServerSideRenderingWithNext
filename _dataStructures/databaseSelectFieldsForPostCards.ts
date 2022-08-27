import postFieldRequestForCards from "./postFieldRequestForCards";

const databaseSelectFieldsForPostCards = postFieldRequestForCards.reduce((selectFields:{},currentField:string)=>{
    Object.assign({[currentField]:1},selectFields)
    return selectFields
},{})

export default databaseSelectFieldsForPostCards