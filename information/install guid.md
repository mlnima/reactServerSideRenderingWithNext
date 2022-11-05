#installation for ubuntu

###update packages
apt update

###install nginx
apt install nginx

###install mongoDB
https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/


###install NodeJs
https://github.com/nodesource/distributions/blob/master/README.md

###install Git

apt install git

### clone the project to specific folder 
/var/www/vhosts/domainName
git clone ProjectURL .

### setup
    npm run update:packages
    create .env file
    build
    config nginx
    restart nginx
    npm install -g pm2 
    npm install -g concurrently
    pm2 start --name=:NAME "npm start" --exp-backoff-restart-delay=1000 --max-memory-restart 4000M
    pm2 save
    pm2 startup
  