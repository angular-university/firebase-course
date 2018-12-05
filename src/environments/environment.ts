// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
      apiKey: "AIzaSyDg8hs704siPZ_chdtodWYpXicMHxz5nhQ",
      authDomain: "fir-course-recording.firebaseapp.com",
      databaseURL: "https://fir-course-recording.firebaseio.com",
      projectId: "fir-course-recording",
      storageBucket: "fir-course-recording.appspot.com",
      messagingSenderId: "706691571098"
  }
};
