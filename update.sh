#!/bin/bash

git stash
git stash drop
git pull origin master
npm install
npm run build

