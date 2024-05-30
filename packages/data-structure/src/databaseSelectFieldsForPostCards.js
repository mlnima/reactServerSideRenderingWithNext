const postFieldRequestForCards = require('./postFieldRequestForCards');

const databaseSelectFieldsForPostCards = postFieldRequestForCards.reduce((selectFields,currentField)=>{
    Object.assign({[currentField]:1},selectFields)
    return selectFields
},{})

module.exports =  databaseSelectFieldsForPostCards;