CYAN='\033[0;36m' # Cyan
NC='\033[0m' # No Color

printf "Remove previous build.. "
rm -rf ./dist/src/
echo -e "${CYAN}OK${NC}"
printf "Stripping ts to plain js.. "
tsc --outDir ./dist --target ES6 --declaration --declarationMap false
echo -e "${CYAN}OK${NC}"
printf "Compress and mangle.. "
terser ./dist/src/index.js -o ./dist/src/index.min.js --compress --mangle
echo -e "${CYAN}OK${NC}"
printf "Remove unminified release.. "
rm ./dist/src/index.js
echo -e "${CYAN}OK${NC}"
printf "Copying all svg dependencies.. "
cp ./src/*.svg ./dist/src/components/
echo -e "${CYAN}OK${NC}"
printf "Gzipping.. "
gzip -k ./dist/index.min.js
echo -e "${CYAN}OK${NC}"
sleep 1s