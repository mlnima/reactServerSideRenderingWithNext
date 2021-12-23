 const capitalizeFirstLetter = (str:string)=> {
  console.log(typeof str === 'string' ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() :str)
  return typeof str === 'string' ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() :str

// console.log(str[0].toUpperCase())
// return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

 }

 export default capitalizeFirstLetter