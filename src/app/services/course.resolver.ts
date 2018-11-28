


import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Course} from "../model/course";
import {Observable, of} from 'rxjs';



@Injectable()
export class CourseResolver implements Resolve<Course> {

    constructor() {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
        return of(undefined);
    }

}

