import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MeasuresUpdate } from 'src/app/shared/models/measures/measuresUpdate';
import { MeasureService } from 'src/app/shared/services/measure.service';

@Component({
  selector: 'app-measures-edit',
  templateUrl: './measures-edit.component.html',
  styleUrls: ['./measures-edit.component.scss']
})
export class MeasuresEditComponent implements OnDestroy, OnInit {
  measureId: number = 0;
  formMeasuresUpdate!: FormGroup;

constructor(private measureService : MeasureService,
  private route: ActivatedRoute,
  private formBuilder: FormBuilder
) {
  
  this.formMeasuresUpdate = this.formBuilder.group({
  weight: ['', [Validators.required, Validators.min(0)]],
  leftBiceps: ['', [Validators.required, Validators.min(0)]],
  rightBiceps: ['', [Validators.required, Validators.min(0)]],
  waist: ['', [Validators.required, Validators.min(0)]],
  leftQuadriceps: ['', [Validators.required, Validators.min(0)]],
  rightQuadriceps: ['', [Validators.required, Validators.min(0)]],
  leftCalf: ['', [Validators.required, Validators.min(0)]],
  rightCalf: ['', [Validators.required, Validators.min(0)]],
  studentId: ['', [Validators.required, Validators.min(0)]],
  previousDate: ['']
});

}


  ngOnInit(): void {
    this.getMeasureId()
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  getMeasureId(){
    const id = this.route.snapshot.paramMap.get('id');
    this.measureId = id !== null ? +id : 0;

    if (this.measureId) {
      this.measureService.findById(this.measureId).subscribe((measure: MeasuresUpdate) => {
        if (measure) {
          this.formMeasuresUpdate.patchValue(measure);
        }
      });
    }
    console.log(this.measureId)

  }

}
