#!/bin/bash
echo "Building SVG.... "
tsc -t es2022 -m es2022 --moduleResolution node --outDir icons/dist --allowSyntheticDefaultImports true icons/build-icons.ts  && node icons/dist/build-icons.js
echo "> node icons/dist/build-icons.js"
echo "Building SVG.... Done"
echo " "