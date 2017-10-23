import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rForm: FormGroup;
  post:any; // a property for the submitted form
  description: string = '';
  name: string = '';

  titleAlert: string = 'This is required!';
  descriptionAlert: string = 'This is required and must be 30 characters!';

  constructor(private fb: FormBuilder) {
    this.rForm = fb.group({
      'name': [null, Validators.required],
      'description': [null, Validators.compose([
        Validators.required, 
        Validators.minLength(30), 
        Validators.maxLength(500)]
      )], 
      'validate': ''
    });
  }

  ngOnInit(): void {
    this.rForm.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.rForm.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = 'You need to specify at least three characters';
        } else {
          // set validators back to original requirements
          this.rForm.get('name').setValidators([Validators.required]);
        }

        this.rForm.updateValueAndValidity();
      }
    );
  }
  
  addPost(post) {
    this.description = post.description;
    this.name = post.name;
  }
}
