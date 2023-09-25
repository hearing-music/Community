const fs = require('fs');

const versionData = {
	version: Date.now(),
	inherit:true
};
fs.writeFileSync('dist/version.json', JSON.stringify(versionData), 'utf-8');
console.log('成功生成版本文件！');


// import SingletonMap from './Singleton.mjs';
// import * as fs from "fs";
// let version=JSON.parse(fs.readFileSync('dist/version.json', 'utf-8')).version
// SingletonMap.set('version', version);
// console.log(SingletonMap);
// // const a=SingletonMap;
// // const b =SingletonMap;
// // console.log(a===b)


// console.log(version===SingletonMap.get('version'));







