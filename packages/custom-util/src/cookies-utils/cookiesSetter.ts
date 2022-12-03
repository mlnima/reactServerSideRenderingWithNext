interface cookiesSetterPropTypes{
    name:string,
    value:string,
    days:number
}

const cookiesSetter = async ({name, value, days}:cookiesSetterPropTypes) => {
    try {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = name+"="+value+"; expires="+date.toUTCString()+"; path=/";
    }catch (error){
        console.log(error)
    }
}

export default cookiesSetter;