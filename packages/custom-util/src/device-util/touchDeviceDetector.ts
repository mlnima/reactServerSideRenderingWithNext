declare const window: any;
declare const navigator: any;
const touchDeviceDetector = () => {
    if (typeof window === 'undefined') return false
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
export default touchDeviceDetector;