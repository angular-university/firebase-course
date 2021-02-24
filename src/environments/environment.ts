// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useEmulators: true,
  firebase: {
    apiKey: "AIzaSyAsrcKEDOFUC9fKMxxng0Fi6PjqNVQj8vk",
    authDomain: "fir-course-v2.firebaseapp.com",
    projectId: "fir-course-v2",
    storageBucket: "fir-course-v2.appspot.com",
    messagingSenderId: "507380388733",
    appId: "1:507380388733:web:1f20583d30ea71e02cb214"
  },
  api: {
    createUser: "http://localhost:5001/fir-course-v2/us-central1/createUser"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
