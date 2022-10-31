import { createProxyMiddleware } from 'http-proxy-middleware';

//process.env.NEXT_PUBLIC_SOCKET_SERVER_URL

export const config = {
    api: {
        bodyParser: false,
    },
}

console.log('websocketProxy is running')

const proxy = createProxyMiddleware({
    target:'http://192.168.178.21:3005',
    ws: true, // proxy websockets
    changeOrigin: true,
});

export default proxy;