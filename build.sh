#!/bin/bash

currentFolder=$(pwd)

cd $currentFolder/src/functions

errorCode=0
for d in */; do
        cd "$d"
        echo "Processing $d"

        # build, run linter and unit tests
        npm install

        # Remove devDependencies
        npm prune --production
        cd ..
done

cd $currentFolder
exit $errorCode
