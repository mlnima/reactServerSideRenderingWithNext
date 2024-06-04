import os from 'os';

const getLocalIP = (): string | undefined => {
    const networkInterfaces = os.networkInterfaces();

    for (const name of Object.keys(networkInterfaces)) {
        for (const iface of networkInterfaces[name]) {
            // Skip over internal (i.e. 127.0.0.1) and non-IPv4 addresses
            // if (iface.family === 'IPv4' && !iface.internal) {
            //     return iface.address;
            // }
            if (iface.family === 'IPv4' && iface.address.startsWith('192.168')) {
                return iface.address;
            }
        }
    }
}

export default getLocalIP;