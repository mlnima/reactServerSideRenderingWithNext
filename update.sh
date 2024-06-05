#!/bin/bash

git add *
git stash
git stash drop
git pull origin master
npm install -f
npm run build

