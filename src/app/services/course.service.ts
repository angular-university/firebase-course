import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Course } from "../model/course";
import { Observable } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { convertSnaps } from "./db-util";


@Injectable({
    providedIn: "root"
})

export class CoursesService { 

    constructor(private db: AngularFirestore) {

    }

loadCoursesByCategory(category:string): Observable<Course[]> {

   return this.db.collection(
        "courses",
        ref => ref.where("categories", "array-contains", category)
        .orderBy("seqNo")
        )
        .get()
        .pipe(
            map(result =>convertSnaps<Course>(result))) // connected with observable ...
    
    }
}
