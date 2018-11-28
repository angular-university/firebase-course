


import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs";
import {Lesson} from "../model/lesson";
import {CoursesService} from "./courses.service";
import {BehaviorSubject} from "rxjs";
import {catchError, finalize} from "rxjs/operators";
import {of} from "rxjs";



export class LessonsDataSource implements DataSource<Lesson> {

    private lessonsSubject = new BehaviorSubject<Lesson[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    lastPageLoaded = 0;

    constructor(private coursesService: CoursesService) {

    }

    loadMoreLessons(courseId:string) {

        this.loadingSubject.next(true);

        this.coursesService.findLessons(courseId, 'asc',
          this.lastPageLoaded, 3).pipe(
                catchError(() => of([])),
                finalize(() => {
                  this.loadingSubject.next(false);
                  this.lastPageLoaded++;
                })
            )
            .subscribe(moreLessons => {

              const currentLessons = this.lessonsSubject.getValue();

              this.lessonsSubject.next([...currentLessons, ...moreLessons]);
            });

    }

    connect(collectionViewer: CollectionViewer): Observable<Lesson[]> {
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }

}

