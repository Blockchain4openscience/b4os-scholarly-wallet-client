// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:4200/',
  serviceUrl: 'http://localhost:8000',
  githubAuthUrl: 'https://github.com/login/oauth/authorize?scope=user:email&client_id=8442d1cbd0110eb451db',
  figshareAuthUrl: 'https://figshare.com/account/applications/authorize?client_id=a2d29a16e44e944484050e59f5e066f9517e9a80&redirect_uri=https%3A%2F%2Flocalhost%3A4200%2Fresearch-objects%2Ffigshare&response_type=code'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
