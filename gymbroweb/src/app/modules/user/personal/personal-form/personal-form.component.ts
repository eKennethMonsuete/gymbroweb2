import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.css']
})
export class PersonalFormComponent implements OnInit {

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit() {
  }

  public AddPersonalForm = this.formBuilder.group({
    Name: ['', Validators.required],
    Email: ['', Validators.required],
    Password: ['', Validators.required],
    LastName: ['', Validators.required],
    Phone: ['', Validators.required]
  });

}
