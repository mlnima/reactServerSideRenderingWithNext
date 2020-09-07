git stash
git stash drop
pm2 stop 0
git pull origin master
npm install
npm run build
pm2 start 0
