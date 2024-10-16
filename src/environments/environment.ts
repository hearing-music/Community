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
	downloadUrl:'http://localhost:3222',
	downloadUrl2:'https://spleeter.jinzhoushaokao.top:444/',
	// downloadUrl:'http://192.168.43.44:3222',
	// baseUrl:'http://localhost:3222',
	baseUrl:'http://192.168.2.221:3222',
	tencentUrl:'https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com',
	// socketUrl:'http://127.0.0.1:3222',
	socketUrl:'http://192.168.0.53:3222'
	// baseUrl:'http://communityapi.jinzhoushaokao.top',
};
