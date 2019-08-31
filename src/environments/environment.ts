// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:4200/',
  serviceUrl: 'http://localhost:8000',
  orcidAuthUrl: 'https://orcid.org/oauth/authorize?client_id=APP-NNXW1QUFSJRHMC0C&response_type=code&scope=/authenticate&redirect_uri=https://localhost:4200/login',
  githubAuthUrl: 'https://github.com/login/oauth/authorize?scope=user:email&client_id=3d6b5002cc968c9aeed7',
  figshareAuthUrl: 'https://figshare.com/account/applications/authorize?client_id=1a7f3f6eb3a7d6a5a07565e18181b028f3e95e2f&redirect_uri=https%3A%2F%2Flocalhost%3A4200%2Fresearch-objects%2Ffigshare&response_type=code'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
