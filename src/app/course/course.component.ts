import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import {LessonsDataSource} from '../services/lessons.datasource';
import {CoursesService} from '../services/courses.service';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course: Course;

  dataSource: LessonsDataSource;

  displayedColumns = ['seqNo', 'description', 'duration'];


  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService) {

    this.dataSource = new LessonsDataSource(coursesService);

  }

  ngOnInit() {

    this.course = this.route.snapshot.data['course'];

    this.dataSource.loadMoreLessons(this.course.id);


  }

  loadMore() {

    this.dataSource.loadMoreLessons(this.course.id);

  }


}
