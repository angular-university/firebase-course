// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useEmulators: true,
  firebase: {
      apiKey: "AIzaSyB9LOREMGhj1jpVXOHTKIwQu2oM7pVfjQg",
      authDomain: "fir-course-recording-c7f3e.firebaseapp.com",
      projectId: "fir-course-recording-c7f3e",
      storageBucket: "fir-course-recording-c7f3e.appspot.com",
      messagingSenderId: "927953565493",
      appId: "1:927953565493:web:0d4a8e79cc45fd38733e7c"
  },
  api: {

  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
