const mobileDeviceDetector = (userAgent)=>{
    const mobileRegex = /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i;
    return mobileRegex.test(userAgent);
}
export default mobileDeviceDetector;