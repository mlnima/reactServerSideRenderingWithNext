const touchDeviceDetector = () => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};
module.exports = touchDeviceDetector;
