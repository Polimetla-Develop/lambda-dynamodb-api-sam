#!/bin/bash

currentFolder=$(pwd)

cd $currentFolder/src/functions

errorCode=0
for d in */; do
        cd "$d"
        echo "Processing $d"
        npm install
        npm run integration
        if [[ $? -ne 0 ]]; then
            errorCode=1
        fi
        cd ..
done
cd $currentFolder
exit $errorCode