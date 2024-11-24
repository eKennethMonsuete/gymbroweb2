import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PersonalInput } from 'src/app/shared/models/personal/personalInput';
import { PersonalService } from 'src/app/shared/services/personal.service';
import { onlyLettersValidator } from 'src/app/shared/validators/lettersValidator';
import { onlyNumbersValidator } from 'src/app/shared/validators/numberValidator';
import { Location } from '@angular/common';
@Component({
  selector: 'app-personal-edit',
  templateUrl: './personal-edit.component.html',
  styleUrls: ['./personal-edit.component.css'],
})
export class PersonalEditComponent implements OnInit {
  personalId: number = 0;
  personalInputFormUpdate!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private personalService: PersonalService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.personalInputFormUpdate = this.formBuilder.group({
      name: ['', [Validators.required, onlyLettersValidator()]],
      email: ['', [Validators.required, Validators.email]],
      lastName: ['', [Validators.required, onlyLettersValidator()]],
      phone: [
        '',
        [Validators.required, onlyNumbersValidator(), Validators.maxLength(15)],
      ],
    });
  }

  ngOnInit() {
    this.getPersonalId();
  }

  getPersonalId() {
    const id = this.route.snapshot.paramMap.get('id');
    this.personalId = id !== null ? +id : 0;

    if (this.personalId) {
      this.personalService
        .findById(this.personalId)
        .subscribe((personal: PersonalInput) => {
          if (personal) {
            this.personalInputFormUpdate.patchValue(personal);
          }
        });
    }
    console.log(this.personalId);
  }

  updatePersonal() {
    if (this.personalInputFormUpdate.valid) {
      const updatedpersonal: PersonalInput = {
        ...this.personalInputFormUpdate.value,
        id: this.personalId,
      };
      this.personalService.update(this.personalId, updatedpersonal).subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Atualização',
            detail: 'Perfil atualizado com sucesso!',
          });
          console.log('deu certo');
          // this.router.navigate(['/students']); // Altere o caminho conforme necessário
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao atualizar perfil.',
          });
        }
      );
      setTimeout(() => {
        this.location.back();
      }, 3000);
    }
  }
}
