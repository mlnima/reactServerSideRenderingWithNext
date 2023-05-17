import http from 'http';
import https from 'https';
import fsExtra from 'fs-extra';

const dev = process.env.NODE_ENV !== 'production';

const certPath = dev ? '../../ssl/certificate.crt' : '../../../ssl/certificate.crt';
const keyPath = dev ? '../../ssl/private.key' : '../../../ssl/private.key';

export const server = async ({ app }: any): Promise<any> => {
    return http.createServer(app);
    // try {
    //     const certExist = await fsExtra.pathExists(certPath);
    //     const keyExist = await fsExtra.pathExists(keyPath);
    //
    //     if (certExist && keyExist) {
    //         console.log('console=> ', 'HTTPS SERVER');
    //         const privateKey = fsExtra.readFileSync(keyPath, 'utf8');
    //         const certificate = fsExtra.readFileSync(certPath, 'utf8');
    //         const credentials = { key: privateKey, cert: certificate };
    //         return https.createServer(credentials, app);
    //     } else {
    //         console.log('console=> ', 'HTTP SERVER');
    //         return http.createServer(app);
    //     }
    //
    // } catch (error) {
    //     console.error('Error creating server: ', error.message);
    //     return http.createServer(app);
    // }
};

