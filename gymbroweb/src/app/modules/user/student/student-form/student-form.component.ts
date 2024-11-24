import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { StudentInput } from 'src/app/shared/models/student/studentInput';
import { StudentService } from 'src/app/shared/services/student.service';
import { onlyLettersValidator } from 'src/app/shared/validators/lettersValidator';
import { onlyNumbersValidator } from 'src/app/shared/validators/numberValidator';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  idPersonalAuto: number = Number(localStorage.getItem('idPersonal')) || 0;
  //=
  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('auto id', this.idPersonalAuto);
  }

  public AddStudentForm = this.formBuilder.group({
    name: ['', [Validators.required, onlyLettersValidator()]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    passwordCheck: ['', Validators.required],
    lastName: ['', [Validators.required, onlyLettersValidator()]],
    phone: [
      '',
      [Validators.required, onlyNumbersValidator(), Validators.maxLength(15)],
    ],
    // personalId: ['', [Validators.required, Validators.min(0)]],
  });

  addStudent(): void {
    if (
      this.AddStudentForm?.value &&
      this.AddStudentForm?.valid &&
      this.AddStudentForm.value.password ==
        this.AddStudentForm.value.passwordCheck
    ) {
      const requestAddStudent: StudentInput = {
        name: this.AddStudentForm.value.name as string,
        email: this.AddStudentForm.value.email as string,
        password: this.AddStudentForm.value.password as string,
        lastName: this.AddStudentForm.value.lastName as string,
        phone: this.AddStudentForm.value.phone as string,
        personalId: this.idPersonalAuto,
      };
      console.log(requestAddStudent);
      this.studentService
        .createPersonal(requestAddStudent)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              console.log(response);
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Personal registrado com sucesso!',
                life: 2500,
              });
            }
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao cadastrar Personal!',
              life: 2500,
            });
          },
        });
      // this.AddStudentForm.reset();
      // this.router.navigate(['dashboard']);
    }
  }

  cancelAndClearForm() {
    this.AddStudentForm.reset();
    this.router.navigate(['dashboard']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
