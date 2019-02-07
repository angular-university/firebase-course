import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {CoursesService} from '../services/courses.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';


@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

    form: FormGroup;
    description:string;

    course: Course;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course,
        private coursesService: CoursesService,
        private storage: AngularFireStorage) {

        this.course = course;

        const titles = course.titles;

        this.form = fb.group({
            description: [titles.description, Validators.required],
            longDescription: [titles.longDescription,Validators.required]
        });

    }

    uploadFile(event) {

        const file: File = event.target.files[0];

        const filePath = `courses/${this.course.id}/${file.name}`;

        const task = this.storage.upload(filePath, file);

        task.snapshotChanges()
            .subscribe(console.log);

    }

    ngOnInit() {

    }


    save() {

        const changes = this.form.value;

        this.coursesService.saveCourse(this.course.id, {titles: changes})
            .subscribe(
                () => this.dialogRef.close(this.form.value)
            );
    }

    close() {
        this.dialogRef.close();
    }

}






