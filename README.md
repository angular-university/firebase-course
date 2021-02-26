
## Firebase & AngularFire In Depth 

This repository currently contains the code for the [Firebase & AngularFire In Depth](https://angular-university.io/course/angularfire-course):

![Firebase & AngularFire In Depth](https://angular-university.s3-us-west-1.amazonaws.com/course-images/firebase-course-1.jpg)

You can find the starting point of the course in the [1-start branch](https://github.com/angular-university/firebase-course/tree/1-start).

# Installation pre-requisites

IMPORTANT: Please use Node 14 LST (Long Term Support version).

# Installing the Angular CLI

With the following command the angular-cli will be installed globally in your machine:

    npm install -g @angular/cli 

# How To install this repository

We can install the master branch using the following commands:

    git clone https://github.com/angular-university/firebase-course.git

    cd firebase-course
    npm ci

Note: We recommend using npm ci, instead of npm install. This will ensure that you use the exact dependency versions set on package-lock.json, unlike npm install which might potentially change those versions.

# To run the Development UI Server

To run the frontend part of our code, we will use the Angular CLI:

    npm start 

The application is visible at port 4200: [http://localhost:4200](http://localhost:4200)


