#!/bin/bash

currentFolder=$(pwd)

cd $currentFolder/src/functions

errorCode=0
# for d in */; do
#         cd "$d"
#         echo "Processing $d"

#         # build, run linter and unit tests
#         npm install
#         npm run integration
#         if [[ $? -ne 0 ]]; then
#             errorCode=1
#         fi
#         cd ..
# done

cd list-devices
npm install
npm run integration
cd $currentFolder
exit $errorCode