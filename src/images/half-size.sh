#!/bin/bash

shopt -s globstar

for file in **/*.png
do
  ext="${file##*.}"
  filename="${file%.*}"
  cp -v -- "$file" "${filename}@2x.${ext}"
  convert "$file" -resize 50% "$file"
done
