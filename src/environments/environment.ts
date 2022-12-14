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
	downloadUrl:'http://localhost:3223',
	// downloadUrl:'http://39.106.64.253:3223',
	baseUrl:'http://localhost:3222',
	// baseUrl:'http://communityapi.jinzhoushaokao.top',
	tencentUrl:'https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com'
};
