import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, MaxLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { PersonalInput } from 'src/app/shared/models/personal/personalInput';
import { PersonalService } from 'src/app/shared/services/personal.service';
import { onlyLettersValidator } from 'src/app/shared/validators/lettersValidator';
import { onlyNumbersValidator } from 'src/app/shared/validators/numberValidator';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: [],
})
export class PersonalFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    private personalService: PersonalService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {}

  public AddPersonalForm = this.formBuilder.group({
    name: ['', [Validators.required, onlyLettersValidator()]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    passwordCheck: ['', Validators.required],
    lastName: ['', [Validators.required, onlyLettersValidator()]],
    phone: [
      '',
      [Validators.required, onlyNumbersValidator(), Validators.maxLength(15)],
    ],
  });

  addPersonal(): void {
    if (
      this.AddPersonalForm?.value &&
      this.AddPersonalForm?.valid &&
      this.AddPersonalForm.value.password ==
        this.AddPersonalForm.value.passwordCheck
    ) {
      const requestAddPersonal: PersonalInput = {
        name: this.AddPersonalForm.value.name as string,
        email: this.AddPersonalForm.value.email as string,
        password: this.AddPersonalForm.value.password as string,

        lastName: this.AddPersonalForm.value.lastName as string,
        phone: this.AddPersonalForm.value.phone as string,
      };
      console.log(requestAddPersonal);
      this.personalService
        .createPersonal(requestAddPersonal)
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
    }
  }

  cancelAndClearForm() {
    this.AddPersonalForm.reset();
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
