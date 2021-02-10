import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {CourseComponent} from "./course/course.component";
import {CourseResolver} from "./services/course.resolver";
import {LoginComponent} from './login/login.component';
import {CreateCourseComponent} from './create-course/create-course.component';

const routes: Routes = [
    {
        path: "",
        component: HomeComponent

    },
    {
        path: "create-course",
        component: CreateCourseComponent
    },
    {
        path: "about",
        component: AboutComponent
    },
    {
      path: "login",
      component: LoginComponent
    },
    {
        path: 'courses/:courseUrl',
        component: CourseComponent,
        resolve: {
            course: CourseResolver
        }
    },
    {
        path: "**",
        redirectTo: '/'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
