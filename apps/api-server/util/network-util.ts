import os from "os";

export const getLocalIP = ()  => {
    const networkInterfaces = os.networkInterfaces();
    for (const name of Object.keys(networkInterfaces)) {
        for (const iface of networkInterfaces[name]) {
            if (iface.family === 'IPv4' && iface.address.startsWith('192.168')) {
                return iface.address;
            }
        }
    }
}