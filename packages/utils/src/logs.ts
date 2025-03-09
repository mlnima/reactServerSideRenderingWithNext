export const cLog = (log:any)=>{
  if (log && process.env.NODE_ENV !== 'production'){
    console.log(log)
  }
}