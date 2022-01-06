 const capitalizeFirstLetter = (str: unknown)=> {
  // return typeof str === 'string' ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() :str
  return typeof str === 'string' ? str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase()) :str
 }

 export default capitalizeFirstLetter