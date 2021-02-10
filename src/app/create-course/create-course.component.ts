import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: "create-course",
    templateUrl: "create-course.component.html",
    styleUrls: ["create-course.component.css"]
})
export class CreateCourseComponent {

    form = this.fb.group({
        description: ["", Validators.required],
        url: ["", Validators.required],
        category: ["beginner", Validators.required],
        longDescription: ["", Validators.required]
    });

    constructor(private fb: FormBuilder) {

    }

}
