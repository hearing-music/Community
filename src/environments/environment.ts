/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    hmr: true,
  windowUrl:'http://localhost:4200',
    downloadUrl:'http://localhost:3222',
    downloadUrl2:'https://spleeter.jinzhoushaokao.top:444/',
    // downloadUrl:'http://192.168.43.44:3222',
    // baseUrl:'http://localhost:3222',
    baseUrl:'http://localhost:3222',
    // baseUrl:'https://communities.tingjianmusic.cn:444',
    tencentUrl:'https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com',
    // socketUrl:'http://127.0.0.1:3222',
    socketUrl:'http://localhost:3222',
    websocketUrl: "ws://localhost:4399",
    // baseUrl:'http://communityapi.jinzhoushaokao.top',
};
