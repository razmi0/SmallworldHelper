#!/bin/bash
echo "Building SVG.... "
tsc -t es2022 -m es2022 --moduleResolution node --outDir svg/dist --allowSyntheticDefaultImports true svg/build-icons.ts  && node svg/dist/build-icons.js
echo "> node svg/dist/build-icons.js"
echo "Building SVG.... Done"
echo " "