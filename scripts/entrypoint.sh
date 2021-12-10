#!/bin/sh

(cd /home/node/app && npx typeorm migration:run && node dist/main.js)