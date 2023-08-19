
const config = (revalidate?:number)=> {
    return{
        next:{
            revalidate: revalidate ? revalidate : process.env.NODE_ENV === 'development' ? 1 : 604800
        }
    }
}
export default config