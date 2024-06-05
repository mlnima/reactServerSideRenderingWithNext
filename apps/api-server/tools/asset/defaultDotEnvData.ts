const defaultDotEnvData = (domain='http://localhost:3000',isLocalMachine=false,portBase=3) => {
    return `
JWT_KEY = secretKey
NODE_ENV=dev
NEXT_PUBLIC_PRODUCTION_URL= "${isLocalMachine ? `http://localhost:${portBase}000`:domain}"
NEXT_PUBLIC_API_SERVER_URL= "${isLocalMachine ? `http://localhost:${portBase}002`:domain}"
PORT=${portBase}000
API_SERVER_PORT=${portBase}002
DEV_DASHBOARD_PORT = ${portBase}008

DB_NAME= myDB
DB_HOST= "localhost"
DB_USER=
DB_PASS=
DB_PORT=27017

MAIL_SERVER= false
MAIL_SERVER_HOST= "localhost"
MAIL_EXTENSION= "example.com"
    `;
};


export default defaultDotEnvData;